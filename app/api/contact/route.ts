import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Rate limiting
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return false;
  }

  if (now - record.lastReset > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return false;
  }

  if (record.count >= RATE_LIMIT) {
    return true;
  }

  record.count++;
  return false;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitize(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
}

function getFormattedDate(): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return new Date().toLocaleDateString("en-US", options);
}

// Allowed file types
const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain",
  "application/zip",
  "application/x-rar-compressed",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_TOTAL_SIZE = 25 * 1024 * 1024; // 25MB
const MAX_FILES = 5;

// Category themes
const categoryThemes: Record<
  string,
  {
    label: string;
    emoji: string;
    primaryColor: string;
    secondaryColor: string;
    gradient: string;
    bgGradient: string;
    description: string;
  }
> = {
  project: {
    label: "Project Inquiry",
    emoji: "🚀",
    primaryColor: "#7042f8",
    secondaryColor: "#b49bff",
    gradient: "linear-gradient(135deg, #7042f8 0%, #b49bff 100%)",
    bgGradient: "linear-gradient(135deg, #7042f815 0%, #b49bff10 100%)",
    description: "Someone wants to build something amazing with you!",
  },
  freelance: {
    label: "Freelance Engagement",
    emoji: "💼",
    primaryColor: "#f97316",
    secondaryColor: "#fb923c",
    gradient: "linear-gradient(135deg, #f97316 0%, #fb923c 100%)",
    bgGradient: "linear-gradient(135deg, #f9731615 0%, #fb923c10 100%)",
    description: "A potential freelance opportunity awaits!",
  },
  consulting: {
    label: "Consulting / Audit",
    emoji: "🔍",
    primaryColor: "#10b981",
    secondaryColor: "#34d399",
    gradient: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
    bgGradient: "linear-gradient(135deg, #10b98115 0%, #34d39910 100%)",
    description: "Someone needs your expert advice!",
  },
  hiring: {
    label: "Full-time Opportunity",
    emoji: "🎯",
    primaryColor: "#3b82f6",
    secondaryColor: "#60a5fa",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)",
    bgGradient: "linear-gradient(135deg, #3b82f615 0%, #60a5fa10 100%)",
    description: "A company wants you on their team!",
  },
  other: {
    label: "General Inquiry",
    emoji: "💬",
    primaryColor: "#8b5cf6",
    secondaryColor: "#a78bfa",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)",
    bgGradient: "linear-gradient(135deg, #8b5cf615 0%, #a78bfa10 100%)",
    description: "Someone wants to connect with you!",
  },
};

export async function POST(request: NextRequest) {
  console.log("=== Contact Form API Called ===");

  try {
    console.log("EMAIL_USER exists:", !!process.env.EMAIL_USER);
    console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);
    console.log("EMAIL_TO exists:", !!process.env.EMAIL_TO);

    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";
    console.log("Client IP:", ip);

    if (isRateLimited(ip)) {
      console.log("Rate limited!");
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse FormData (supports file uploads)
    console.log("Parsing form data...");
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const reason = formData.get("reason") as string;
    const message = formData.get("message") as string;
    const attachments = formData.getAll("attachments") as File[];

    console.log("Received data:", {
      name,
      email,
      reason,
      messageLength: message?.length,
      attachmentCount: attachments.length,
    });

    // Validate required fields
    if (!name || !email || !reason || !message) {
      console.log("Validation failed: Missing required fields");
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      console.log("Validation failed: Invalid email format");
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    if (name.length > 100 || email.length > 100 || message.length > 5000) {
      console.log("Validation failed: Input too long");
      return NextResponse.json(
        { error: "Input exceeds maximum length." },
        { status: 400 }
      );
    }

    // Validate attachments
    if (attachments.length > MAX_FILES) {
      return NextResponse.json(
        { error: `Maximum ${MAX_FILES} files allowed.` },
        { status: 400 }
      );
    }

    let totalSize = 0;
    const validAttachments: { filename: string; content: Buffer; contentType: string }[] = [];

    for (const file of attachments) {
      if (file.size === 0) continue; // Skip empty files

      // Check file type
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        console.log(`Invalid file type: ${file.type}`);
        return NextResponse.json(
          { error: `File type not allowed: ${file.name}` },
          { status: 400 }
        );
      }

      // Check individual file size
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `File too large: ${file.name} (max 10MB)` },
          { status: 400 }
        );
      }

      totalSize += file.size;

      // Check total size
      if (totalSize > MAX_TOTAL_SIZE) {
        return NextResponse.json(
          { error: "Total attachments exceed 25MB limit." },
          { status: 400 }
        );
      }

      // Convert file to buffer
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      validAttachments.push({
        filename: file.name,
        content: buffer,
        contentType: file.type,
      });
    }

    console.log(`Valid attachments: ${validAttachments.length}`);

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("ERROR: Missing email configuration!");
      return NextResponse.json(
        { error: "Server email configuration error." },
        { status: 500 }
      );
    }

    const sanitizedName = sanitize(name);
    const sanitizedEmail = sanitize(email);
    const sanitizedReason = sanitize(reason);
    const sanitizedMessage = sanitize(message);

    const theme = categoryThemes[sanitizedReason] || categoryThemes.other;
    const formattedDate = getFormattedDate();

    console.log("Creating email transporter...");
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    console.log("Verifying SMTP connection...");
    try {
      await transporter.verify();
      console.log("SMTP connection verified successfully!");
    } catch (verifyError) {
      console.error("SMTP verification failed:", verifyError);
      return NextResponse.json(
        { error: "Email server connection failed." },
        { status: 500 }
      );
    }

    const logoUrl = "https://david-space--gules.vercel.app/NavLogo.png";
    const portfolioUrl = "https://david-space--gules.vercel.app";

    // Generate attachment info for email
    const attachmentInfo =
      validAttachments.length > 0
        ? `
        <tr>
          <td style="padding: 0 40px 30px 40px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
              <tr>
                <td>
                  <p style="margin: 0 0 15px 0; color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">
                    📎 Attachments (${validAttachments.length})
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <div style="background: linear-gradient(135deg, #030014 0%, #070b16 100%); border-radius: 16px; padding: 20px; border: 1px solid #2A0E6150;">
                    ${validAttachments
                      .map(
                        (att) => `
                      <div style="display: flex; align-items: center; padding: 10px 0; border-bottom: 1px solid #2A0E6130;">
                        <span style="color: #b49bff; margin-right: 10px;">📄</span>
                        <span style="color: #e5e7eb; font-size: 14px;">${att.filename}</span>
                        <span style="color: #6b7280; font-size: 12px; margin-left: auto;">${(att.content.length / 1024).toFixed(1)} KB</span>
                      </div>
                    `
                      )
                      .join("")}
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        `
        : "";

    const mailOptions = {
      from: `"David's Portfolio" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: sanitizedEmail,
      subject: `${theme.emoji} ${theme.label}: ${sanitizedName} wants to connect!${validAttachments.length > 0 ? ` 📎 ${validAttachments.length} file(s)` : ""}`,
      attachments: validAttachments.map((att) => ({
        filename: att.filename,
        content: att.content,
        contentType: att.contentType,
      })),
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${theme.label} - New Message</title>
</head>
<body style="margin: 0; padding: 0; background-color: #030014; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; -webkit-font-smoothing: antialiased;">
  
  <div style="display: none; max-height: 0; overflow: hidden;">
    ${theme.emoji} ${theme.description} - ${sanitizedName} (${sanitizedEmail})${validAttachments.length > 0 ? ` - ${validAttachments.length} attachment(s)` : ""}
  </div>
  
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #030014;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="650" cellspacing="0" cellpadding="0" style="max-width: 650px; width: 100%;">
          
          <!-- Logo Section -->
          <tr>
            <td align="center" style="padding-bottom: 30px;">
              <a href="${portfolioUrl}" style="text-decoration: none;">
                <img src="${logoUrl}" alt="David R. Fajardo" width="70" height="70" style="display: block; border-radius: 16px; box-shadow: 0 10px 40px rgba(112, 66, 248, 0.3);" />
              </a>
            </td>
          </tr>

          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom: 10px;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: -1px;">
                New Message Alert
              </h1>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-bottom: 35px;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                Someone reached out via your portfolio contact form
              </p>
            </td>
          </tr>

          <!-- Category Badge -->
          <tr>
            <td>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: ${theme.bgGradient}; border: 2px solid ${theme.primaryColor}40; border-radius: 20px; overflow: hidden;">
                <tr>
                  <td style="padding: 25px 30px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="70" style="vertical-align: middle;">
                          <div style="width: 60px; height: 60px; background: ${theme.gradient}; border-radius: 16px; box-shadow: 0 8px 25px ${theme.primaryColor}50;">
                            <p style="margin: 0; line-height: 60px; text-align: center; font-size: 28px;">${theme.emoji}</p>
                          </div>
                        </td>
                        <td style="vertical-align: middle; padding-left: 20px;">
                          <p style="margin: 0 0 5px 0; color: ${theme.primaryColor}; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">
                            Category
                          </p>
                          <h2 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700;">
                            ${theme.label}
                          </h2>
                          <p style="margin: 8px 0 0 0; color: #9ca3af; font-size: 14px;">
                            ${theme.description}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr><td style="height: 25px;"></td></tr>

          <!-- Main Card -->
          <tr>
            <td>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(180deg, #0c0f1a 0%, #0f1320 100%); border-radius: 24px; border: 1px solid #1e2337; overflow: hidden; box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.6);">
                
                <tr>
                  <td style="height: 4px; background: ${theme.gradient};"></td>
                </tr>

                <!-- Sender Info -->
                <tr>
                  <td style="padding: 35px 40px 30px 40px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td>
                          <p style="margin: 0 0 15px 0; color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">
                            👤 From
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table role="presentation" cellspacing="0" cellpadding="0">
                            <tr>
                              <td style="vertical-align: middle; padding-right: 18px;">
                                <div style="width: 65px; height: 65px; background: ${theme.gradient}; border-radius: 18px; box-shadow: 0 8px 25px ${theme.primaryColor}40;">
                                  <p style="margin: 0; line-height: 65px; text-align: center; font-size: 26px; font-weight: 700; color: white;">
                                    ${sanitizedName.charAt(0).toUpperCase()}
                                  </p>
                                </div>
                              </td>
                              <td style="vertical-align: middle;">
                                <h3 style="margin: 0 0 6px 0; color: #ffffff; font-size: 22px; font-weight: 600;">
                                  ${sanitizedName}
                                </h3>
                                <a href="mailto:${sanitizedEmail}" style="color: ${theme.primaryColor}; font-size: 15px; text-decoration: none;">
                                  ${sanitizedEmail}
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 0 40px;">
                    <div style="height: 1px; background: linear-gradient(90deg, transparent 0%, #2A0E61 20%, #2A0E61 80%, transparent 100%);"></div>
                  </td>
                </tr>

                <!-- Message -->
                <tr>
                  <td style="padding: 30px 40px 30px 40px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td>
                          <p style="margin: 0 0 15px 0; color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">
                            💬 Message
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div style="background: linear-gradient(135deg, #030014 0%, #070b16 100%); border-radius: 16px; padding: 28px; border-left: 4px solid ${theme.primaryColor}; box-shadow: inset 0 2px 10px rgba(0,0,0,0.3);">
                            <p style="margin: 0; color: #e5e7eb; font-size: 16px; line-height: 1.9; white-space: pre-wrap; word-wrap: break-word;">
${sanitizedMessage}
                            </p>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Attachments Section -->
                ${attachmentInfo}

                <!-- Reply Button -->
                <tr>
                  <td style="padding: 10px 40px 40px 40px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="center">
                          <a href="mailto:${sanitizedEmail}?subject=Re: Your ${theme.label} on my Portfolio&body=Hi ${sanitizedName},%0D%0A%0D%0AThank you for reaching out through my portfolio!%0D%0A%0D%0A" 
                             style="display: inline-block; background: ${theme.gradient}; color: white; padding: 18px 50px; border-radius: 14px; text-decoration: none; font-weight: 600; font-size: 16px; box-shadow: 0 10px 35px ${theme.primaryColor}50;">
                            ✉️ Reply to ${sanitizedName.split(" ")[0]}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <tr><td style="height: 25px;"></td></tr>

          <!-- Metadata -->
          <tr>
            <td>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: #0a0d14; border-radius: 16px; border: 1px solid #1a1f2e;">
                <tr>
                  <td style="padding: 22px 30px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="25%" style="vertical-align: top;">
                          <p style="margin: 0 0 6px 0; color: #4b5563; font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px;">📅 Received</p>
                          <p style="margin: 0; color: #9ca3af; font-size: 12px;">${formattedDate}</p>
                        </td>
                        <td width="25%" style="vertical-align: top; text-align: center;">
                          <p style="margin: 0 0 6px 0; color: #4b5563; font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px;">🌐 Source</p>
                          <p style="margin: 0; color: #9ca3af; font-size: 12px;">Portfolio</p>
                        </td>
                        <td width="25%" style="vertical-align: top; text-align: center;">
                          <p style="margin: 0 0 6px 0; color: #4b5563; font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px;">🏷️ Type</p>
                          <p style="margin: 0; color: ${theme.primaryColor}; font-size: 12px;">${theme.label}</p>
                        </td>
                        <td width="25%" style="vertical-align: top; text-align: right;">
                          <p style="margin: 0 0 6px 0; color: #4b5563; font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px;">📎 Files</p>
                          <p style="margin: 0; color: #9ca3af; font-size: 12px;">${validAttachments.length} attached</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr><td style="height: 40px;"></td></tr>

          <!-- Footer -->
          <tr>
            <td>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding-bottom: 30px;">
                    <div style="height: 1px; background: linear-gradient(90deg, transparent 0%, #2A0E6150 50%, transparent 100%);"></div>
                  </td>
                </tr>

                <tr>
                  <td align="center" style="padding-bottom: 20px;">
                    <a href="${portfolioUrl}" style="text-decoration: none;">
                      <img src="${logoUrl}" alt="David R. Fajardo" width="45" height="45" style="display: block; border-radius: 12px; opacity: 0.9;" />
                    </a>
                  </td>
                </tr>

                <tr>
                  <td align="center" style="padding-bottom: 5px;">
                    <p style="margin: 0; color: #ffffff; font-size: 16px; font-weight: 600;">David R. Fajardo</p>
                  </td>
                </tr>

                <tr>
                  <td align="center" style="padding-bottom: 25px;">
                    <p style="margin: 0; color: #6b7280; font-size: 13px;">Full-Stack Developer & Software Engineer</p>
                  </td>
                </tr>

                <tr>
                  <td align="center" style="padding-bottom: 25px;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding: 0 6px;">
                          <a href="https://github.com/David26v" style="display: inline-block; width: 42px; height: 42px; background: #0c0f1a; border: 1px solid #2A0E61; border-radius: 12px; text-align: center; line-height: 42px; text-decoration: none;">
                            <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" width="20" height="20" style="vertical-align: middle; opacity: 0.7;" />
                          </a>
                        </td>
                        <td style="padding: 0 6px;">
                          <a href="https://www.linkedin.com/in/david-fajardo" style="display: inline-block; width: 42px; height: 42px; background: #0c0f1a; border: 1px solid #2A0E61; border-radius: 12px; text-align: center; line-height: 42px; text-decoration: none;">
                            <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" width="20" height="20" style="vertical-align: middle; opacity: 0.7;" />
                          </a>
                        </td>
                        <td style="padding: 0 6px;">
                          <a href="https://www.facebook.com/LeL0uCh26/" style="display: inline-block; width: 42px; height: 42px; background: #0c0f1a; border: 1px solid #2A0E61; border-radius: 12px; text-align: center; line-height: 42px; text-decoration: none;">
                            <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook" width="20" height="20" style="vertical-align: middle; opacity: 0.7;" />
                          </a>
                        </td>
                        <td style="padding: 0 6px;">
                          <a href="https://www.instagram.com/chinitz_david26/" style="display: inline-block; width: 42px; height: 42px; background: #0c0f1a; border: 1px solid #2A0E61; border-radius: 12px; text-align: center; line-height: 42px; text-decoration: none;">
                            <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" width="20" height="20" style="vertical-align: middle; opacity: 0.7;" />
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td align="center" style="padding-bottom: 20px;">
                    <a href="${portfolioUrl}" style="display: inline-block; color: ${theme.primaryColor}; font-size: 13px; text-decoration: none; padding: 10px 20px; border: 1px solid ${theme.primaryColor}40; border-radius: 8px; background: ${theme.primaryColor}10;">
                      🌐 Visit Portfolio
                    </a>
                  </td>
                </tr>

                <tr>
                  <td align="center">
                    <p style="margin: 0; color: #4b5563; font-size: 11px;">© ${new Date().getFullYear()} David R. Fajardo. All rights reserved.</p>
                    <p style="margin: 8px 0 0 0; color: #374151; font-size: 10px;">This email was automatically generated from the portfolio contact form.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
      text: `
╔══════════════════════════════════════════════════════════════╗
║     ${theme.emoji}  NEW ${theme.label.toUpperCase()}                    
╚══════════════════════════════════════════════════════════════╝

${theme.description}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 SENDER INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   Name:     ${sanitizedName}
   Email:    ${sanitizedEmail}
   Category: ${theme.label}
   Date:     ${formattedDate}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💬 MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${sanitizedMessage}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📎 ATTACHMENTS: ${validAttachments.length} file(s)
${validAttachments.map((att) => `   - ${att.filename}`).join("\n")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

David R. Fajardo
Full-Stack Developer & Software Engineer
🌐 Portfolio: ${portfolioUrl}

© ${new Date().getFullYear()} David R. Fajardo. All rights reserved.
      `,
    };

    console.log("Sending email...");
    console.log("From:", process.env.EMAIL_USER);
    console.log("To:", process.env.EMAIL_TO || process.env.EMAIL_USER);
    console.log("Attachments:", validAttachments.length);

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
    console.log("Message ID:", info.messageId);

    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("=== ERROR IN CONTACT API ===");
    console.error("Error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      { error: `Failed to send email: ${errorMessage}` },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}