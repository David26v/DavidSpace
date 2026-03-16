/**
 * GitHub Repository Access Management
 *
 * Handles inviting/removing collaborators from the private SDK repo
 * after Lemon Squeezy purchase/refund events.
 *
 * Setup:
 * 1. Create a GitHub Personal Access Token (classic) at:
 *    https://github.com/settings/tokens
 * 2. Select scope: "repo" (Full control of private repositories)
 * 3. Add to .env:
 *    GITHUB_TOKEN="ghp_your_token_here"
 *    GITHUB_REPO_OWNER="David26v"
 *    GITHUB_REPO_NAME="TurboRepoSDKSale"
 */

const GITHUB_API = "https://api.github.com";

function getConfig() {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME;

  if (!token || !owner || !repo) {
    return null;
  }

  return { token, owner, repo };
}

function headers(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

/**
 * Check if GitHub delivery is configured
 */
export function isGitHubConfigured(): boolean {
  return getConfig() !== null;
}

/**
 * Look up a GitHub username by email address.
 * Returns the username if found, null otherwise.
 *
 * Note: This only works if the user has a public email on GitHub.
 * If not found, we'll send the invite by email instead.
 */
export async function findGitHubUser(
  email: string
): Promise<string | null> {
  const config = getConfig();
  if (!config) return null;

  try {
    const res = await fetch(
      `${GITHUB_API}/search/users?q=${encodeURIComponent(email)}+in:email`,
      { headers: headers(config.token) }
    );

    if (!res.ok) return null;

    const data = await res.json();
    if (data.total_count > 0 && data.items?.[0]?.login) {
      return data.items[0].login;
    }

    return null;
  } catch (err) {
    console.error("[GitHub] Error searching user by email:", err);
    return null;
  }
}

/**
 * Invite a user as a collaborator to the SDK repo.
 *
 * Tries by GitHub username first, falls back to email-based invitation.
 * Returns { success, method, message }
 */
export async function inviteCollaborator(
  email: string,
  permission: "pull" | "push" = "pull"
): Promise<{ success: boolean; method: string; message: string }> {
  const config = getConfig();
  if (!config) {
    return {
      success: false,
      method: "none",
      message: "GitHub integration not configured. Set GITHUB_TOKEN, GITHUB_REPO_OWNER, GITHUB_REPO_NAME in .env",
    };
  }

  const { token, owner, repo } = config;

  // Step 1: Try to find the GitHub username by email
  const username = await findGitHubUser(email);

  if (username) {
    // Invite by username (most reliable)
    try {
      const res = await fetch(
        `${GITHUB_API}/repos/${owner}/${repo}/collaborators/${username}`,
        {
          method: "PUT",
          headers: headers(token),
          body: JSON.stringify({ permission }),
        }
      );

      if (res.status === 201) {
        // Invitation sent
        console.log(`[GitHub] Invitation sent to @${username} (${email}) — ${permission} access`);
        return {
          success: true,
          method: "username",
          message: `GitHub invitation sent to @${username}`,
        };
      } else if (res.status === 204) {
        // User is already a collaborator
        console.log(`[GitHub] @${username} (${email}) is already a collaborator`);
        return {
          success: true,
          method: "username",
          message: `@${username} already has access`,
        };
      } else {
        const errText = await res.text();
        console.error(`[GitHub] Failed to invite @${username}: ${res.status} ${errText}`);
        // Fall through to email method
      }
    } catch (err) {
      console.error(`[GitHub] Error inviting @${username}:`, err);
      // Fall through to email method
    }
  }

  // Step 2: Invite by email (works even if user doesn't have a GitHub account yet)
  try {
    const res = await fetch(
      `${GITHUB_API}/repos/${owner}/${repo}/invitations`,
      {
        method: "POST",
        headers: headers(token),
        body: JSON.stringify({
          invitee_email: email,
          permissions: permission,
        }),
      }
    );

    // GitHub may return 201 (created) or 422 (already invited/collaborator)
    if (res.status === 201) {
      console.log(`[GitHub] Email invitation sent to ${email} — ${permission} access`);
      return {
        success: true,
        method: "email",
        message: `GitHub invitation sent to ${email}. They'll receive an email to accept.`,
      };
    } else if (res.status === 422) {
      const data = await res.json();
      const errMsg = data.message || "Already invited";
      console.log(`[GitHub] ${email} — ${errMsg}`);
      return {
        success: true,
        method: "email",
        message: `${email} already has a pending invitation or access`,
      };
    } else {
      const errText = await res.text();
      console.error(`[GitHub] Email invite failed: ${res.status} ${errText}`);
      return {
        success: false,
        method: "email",
        message: `Failed to send invitation: ${res.status}`,
      };
    }
  } catch (err) {
    console.error("[GitHub] Error sending email invite:", err);
    return {
      success: false,
      method: "email",
      message: `Error: ${err instanceof Error ? err.message : "Unknown error"}`,
    };
  }
}

/**
 * Remove a collaborator from the SDK repo (used on refund).
 *
 * Tries by username lookup first, then cancels any pending invitations by email.
 */
export async function removeCollaborator(
  email: string
): Promise<{ success: boolean; message: string }> {
  const config = getConfig();
  if (!config) {
    return { success: false, message: "GitHub integration not configured" };
  }

  const { token, owner, repo } = config;
  let removed = false;

  // Step 1: Try to remove by username
  const username = await findGitHubUser(email);
  if (username) {
    try {
      const res = await fetch(
        `${GITHUB_API}/repos/${owner}/${repo}/collaborators/${username}`,
        { method: "DELETE", headers: headers(token) }
      );

      if (res.status === 204) {
        console.log(`[GitHub] Removed @${username} (${email}) from repo`);
        removed = true;
      }
    } catch (err) {
      console.error(`[GitHub] Error removing @${username}:`, err);
    }
  }

  // Step 2: Also cancel any pending invitations
  try {
    const res = await fetch(
      `${GITHUB_API}/repos/${owner}/${repo}/invitations`,
      { headers: headers(token) }
    );

    if (res.ok) {
      const invitations = await res.json();
      for (const invite of invitations) {
        const inviteeEmail = invite.invitee?.email;
        const inviteeLogin = invite.invitee?.login;

        if (
          inviteeEmail === email ||
          (username && inviteeLogin === username)
        ) {
          const delRes = await fetch(
            `${GITHUB_API}/repos/${owner}/${repo}/invitations/${invite.id}`,
            { method: "DELETE", headers: headers(token) }
          );

          if (delRes.status === 204) {
            console.log(`[GitHub] Cancelled pending invitation for ${email}`);
            removed = true;
          }
        }
      }
    }
  } catch (err) {
    console.error("[GitHub] Error cancelling invitations:", err);
  }

  if (removed) {
    return { success: true, message: `Access revoked for ${email}` };
  }

  return {
    success: false,
    message: `Could not find ${email} as collaborator or pending invite`,
  };
}
