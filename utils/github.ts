/**
 * GitHub Repository Access Management
 *
 * Handles inviting/removing collaborators from tier-specific private SDK repos
 * after Lemon Squeezy purchase/refund events.
 *
 * Tier → Repo mapping:
 *   Student    → GITHUB_REPO_STUDENT  (SDK-Student)
 *   Starter    → GITHUB_REPO_STARTER  (SDK-Starter)
 *   Pro        → GITHUB_REPO_PRO      (SDK-Pro)
 *   Enterprise → GITHUB_REPO_PRO      (same code as Pro + services)
 *
 * Setup:
 * 1. Create a GitHub Personal Access Token (classic) at:
 *    https://github.com/settings/tokens
 * 2. Select scope: "repo" (Full control of private repositories)
 * 3. Add to .env:
 *    GITHUB_TOKEN="ghp_your_token_here"
 *    GITHUB_REPO_OWNER="David26v"
 *    GITHUB_REPO_STUDENT="SDK-Student"
 *    GITHUB_REPO_STARTER="SDK-Starter"
 *    GITHUB_REPO_PRO="SDK-Pro"
 */

import type { LicenseType } from "@/constants/products";

const GITHUB_API = "https://api.github.com";

function getBaseConfig() {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_REPO_OWNER;

  if (!token || !owner) {
    return null;
  }

  return { token, owner };
}

/**
 * Map a license tier to its corresponding GitHub repo name.
 * Enterprise buyers get the same repo as Pro (code is identical).
 */
export function getRepoForTier(tier: LicenseType): string | null {
  const repoMap: Record<string, string | undefined> = {
    student: process.env.GITHUB_REPO_STUDENT,
    starter: process.env.GITHUB_REPO_STARTER,
    pro: process.env.GITHUB_REPO_PRO,
    enterprise: process.env.GITHUB_REPO_PRO, // same code as Pro
  };

  return repoMap[tier] || null;
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
  return getBaseConfig() !== null;
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
  const config = getBaseConfig();
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
 * Invite a user as a collaborator to a specific repo.
 *
 * @param repoName - The repo name (e.g., "SDK-Student")
 * @param email - Buyer's email (used for username lookup fallback)
 * @param permission - Access level (default: "pull" = read-only)
 * @param githubUsername - GitHub username provided during checkout (preferred)
 *
 * Priority: provided username → email search → fail with message
 * Returns { success, method, message, repoName }
 */
export async function inviteCollaborator(
  repoName: string,
  email: string,
  permission: "pull" | "push" = "pull",
  githubUsername?: string
): Promise<{ success: boolean; method: string; message: string; repoName: string }> {
  const config = getBaseConfig();
  if (!config) {
    return {
      success: false,
      method: "none",
      repoName,
      message: "GitHub integration not configured. Set GITHUB_TOKEN and GITHUB_REPO_OWNER in .env",
    };
  }

  const { token, owner } = config;

  // Resolve username: prefer provided username, fallback to email search
  const username = githubUsername || await findGitHubUser(email);

  if (username) {
    try {
      const res = await fetch(
        `${GITHUB_API}/repos/${owner}/${repoName}/collaborators/${username}`,
        {
          method: "PUT",
          headers: headers(token),
          body: JSON.stringify({ permission }),
        }
      );

      if (res.status === 201) {
        console.log(`[GitHub] Invitation sent to @${username} (${email}) for ${owner}/${repoName} — ${permission} access`);
        return {
          success: true,
          method: "username",
          repoName,
          message: `GitHub invitation sent to @${username} for ${repoName}`,
        };
      } else if (res.status === 204) {
        console.log(`[GitHub] @${username} (${email}) is already a collaborator on ${repoName}`);
        return {
          success: true,
          method: "username",
          repoName,
          message: `@${username} already has access to ${repoName}`,
        };
      } else {
        const errText = await res.text();
        console.error(`[GitHub] Failed to invite @${username} to ${repoName}: ${res.status} ${errText}`);
        return {
          success: false,
          method: "username",
          repoName,
          message: `Failed to invite @${username}: ${res.status} — ${errText}`,
        };
      }
    } catch (err) {
      console.error(`[GitHub] Error inviting @${username} to ${repoName}:`, err);
      return {
        success: false,
        method: "username",
        repoName,
        message: `Error inviting @${username}: ${err instanceof Error ? err.message : "Unknown error"}`,
      };
    }
  }

  // No username found — can't invite without one
  console.warn(`[GitHub] No GitHub username provided or found for ${email}. Cannot send invite to ${repoName}.`);
  return {
    success: false,
    method: "none",
    repoName,
    message: `No GitHub username provided or found for ${email}. The buyer needs to provide their GitHub username.`,
  };
}

/**
 * Remove a collaborator from a specific repo (used on refund).
 *
 * @param repoName - The repo name (e.g., "SDK-Student")
 * @param email - Buyer's email
 *
 * Tries by username lookup first, then cancels any pending invitations by email.
 */
export async function removeCollaborator(
  repoName: string,
  email: string
): Promise<{ success: boolean; message: string }> {
  const config = getBaseConfig();
  if (!config) {
    return { success: false, message: "GitHub integration not configured" };
  }

  const { token, owner } = config;
  let removed = false;

  // Step 1: Try to remove by username
  const username = await findGitHubUser(email);
  if (username) {
    try {
      const res = await fetch(
        `${GITHUB_API}/repos/${owner}/${repoName}/collaborators/${username}`,
        { method: "DELETE", headers: headers(token) }
      );

      if (res.status === 204) {
        console.log(`[GitHub] Removed @${username} (${email}) from ${repoName}`);
        removed = true;
      }
    } catch (err) {
      console.error(`[GitHub] Error removing @${username} from ${repoName}:`, err);
    }
  }

  // Step 2: Also cancel any pending invitations
  try {
    const res = await fetch(
      `${GITHUB_API}/repos/${owner}/${repoName}/invitations`,
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
            `${GITHUB_API}/repos/${owner}/${repoName}/invitations/${invite.id}`,
            { method: "DELETE", headers: headers(token) }
          );

          if (delRes.status === 204) {
            console.log(`[GitHub] Cancelled pending invitation for ${email} on ${repoName}`);
            removed = true;
          }
        }
      }
    }
  } catch (err) {
    console.error(`[GitHub] Error cancelling invitations on ${repoName}:`, err);
  }

  if (removed) {
    return { success: true, message: `Access revoked for ${email} on ${repoName}` };
  }

  return {
    success: false,
    message: `Could not find ${email} as collaborator or pending invite on ${repoName}`,
  };
}
