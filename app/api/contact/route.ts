import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Rate limiting - simple in-memory store (use Redis in production)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT = 5; // Max requests
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

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

// Email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Sanitize input to prevent injection
function sanitize(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
}

// Get current date formatted
function getFormattedDate(): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  };
  return new Date().toLocaleDateString('en-US', options);
}

export async function POST(request: NextRequest) {
  console.log("=== Contact Form API Called ===");
  
  try {
    // Log environment variables (existence only, not values)
    console.log("EMAIL_USER exists:", !!process.env.EMAIL_USER);
    console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);
    console.log("EMAIL_TO exists:", !!process.env.EMAIL_TO);
    
    // Get client IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || 
               request.headers.get("x-real-ip") || 
               "unknown";
    console.log("Client IP:", ip);

    // Check rate limit
    if (isRateLimited(ip)) {
      console.log("Rate limited!");
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse request body
    console.log("Parsing request body...");
    const body = await request.json();
    const { name, email, reason, message } = body;
    console.log("Received data:", { name, email, reason, messageLength: message?.length });

    // Validate required fields
    if (!name || !email || !reason || !message) {
      console.log("Validation failed: Missing required fields");
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      console.log("Validation failed: Invalid email format");
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Validate field lengths
    if (name.length > 100 || email.length > 100 || message.length > 5000) {
      console.log("Validation failed: Input too long");
      return NextResponse.json(
        { error: "Input exceeds maximum length." },
        { status: 400 }
      );
    }

    // Check if environment variables are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("ERROR: Missing email configuration!");
      console.error("EMAIL_USER:", process.env.EMAIL_USER ? "SET" : "NOT SET");
      console.error("EMAIL_PASS:", process.env.EMAIL_PASS ? "SET" : "NOT SET");
      return NextResponse.json(
        { error: "Server email configuration error. Please contact the administrator." },
        { status: 500 }
      );
    }

    // Sanitize inputs
    const sanitizedName = sanitize(name);
    const sanitizedEmail = sanitize(email);
    const sanitizedReason = sanitize(reason);
    const sanitizedMessage = sanitize(message);
    console.log("Inputs sanitized");

    // Map reason values to labels and icons
    const reasonConfig: Record<string, { label: string; emoji: string; color: string }> = {
      project: { label: "Project Inquiry", emoji: "🚀", color: "#7042f8" },
      freelance: { label: "Freelance Engagement", emoji: "💼", color: "#f97316" },
      consulting: { label: "Consulting / Audit", emoji: "🔍", color: "#10b981" },
      hiring: { label: "Full-time Opportunities", emoji: "🎯", color: "#3b82f6" },
      other: { label: "Other", emoji: "💬", color: "#8b5cf6" },
    };

    const reasonInfo = reasonConfig[sanitizedReason] || { label: sanitizedReason, emoji: "📧", color: "#7042f8" };
    const formattedDate = getFormattedDate();

    // Create Nodemailer transporter
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

    // Verify SMTP connection
    console.log("Verifying SMTP connection...");
    try {
      await transporter.verify();
      console.log("SMTP connection verified successfully!");
    } catch (verifyError) {
      console.error("SMTP verification failed:", verifyError);
      return NextResponse.json(
        { error: "Email server connection failed. Please try again later." },
        { status: 500 }
      );
    }

    // Enhanced Email Template - sent to you
    const mailOptions = {
      from: `"David's Portfolio" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: sanitizedEmail,
      subject: `${reasonInfo.emoji} New ${reasonInfo.label} from ${sanitizedName}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; background-color: #030014; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #030014; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%;">
          
          <!-- Logo & Header -->
          <tr>
            <td style="padding: 0 0 30px 0; text-align: center;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <!-- Logo Circle -->
                    <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #7042f8 0%, #b49bff 100%); border-radius: 20px; display: inline-block; line-height: 80px; font-size: 36px; font-weight: bold; color: white; box-shadow: 0 10px 40px rgba(112, 66, 248, 0.4);">
                      D
                    </div>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 20px;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                      New Message Received
                    </h1>
                    <p style="margin: 10px 0 0 0; color: #b49bff; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">
                      Portfolio Contact Form
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Category Badge -->
          <tr>
            <td align="center" style="padding-bottom: 25px;">
              <div style="display: inline-block; background: ${reasonInfo.color}20; border: 1px solid ${reasonInfo.color}50; border-radius: 50px; padding: 12px 24px;">
                <span style="color: ${reasonInfo.color}; font-size: 14px; font-weight: 600;">
                  ${reasonInfo.emoji} ${reasonInfo.label}
                </span>
              </div>
            </td>
          </tr>

          <!-- Main Content Card -->
          <tr>
            <td>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(180deg, #0c0f1a 0%, #111827 100%); border-radius: 24px; border: 1px solid #2A0E61; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
                
                <!-- Gradient Top Border -->
                <tr>
                  <td style="height: 4px; background: linear-gradient(90deg, #7042f8 0%, #b49bff 50%, #7042f8 100%);"></td>
                </tr>

                <!-- Sender Info Section -->
                <tr>
                  <td style="padding: 35px 35px 25px 35px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td>
                          <table role="presentation" cellspacing="0" cellpadding="0">
                            <tr>
                              <td style="vertical-align: top; padding-right: 20px;">
                                <!-- Avatar -->
                                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #7042f8 0%, #b49bff 100%); border-radius: 16px; line-height: 60px; text-align: center; font-size: 24px; font-weight: bold; color: white; box-shadow: 0 8px 20px rgba(112, 66, 248, 0.3);">
                                  ${sanitizedName.charAt(0).toUpperCase()}
                                </div>
                              </td>
                              <td style="vertical-align: middle;">
                                <h2 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 600;">
                                  ${sanitizedName}
                                </h2>
                                <a href="mailto:${sanitizedEmail}" style="color: #b49bff; font-size: 14px; text-decoration: none; display: inline-flex; align-items: center; margin-top: 4px;">
                                  ✉️ ${sanitizedEmail}
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="padding: 0 35px;">
                    <div style="height: 1px; background: linear-gradient(90deg, transparent 0%, #2A0E61 50%, transparent 100%);"></div>
                  </td>
                </tr>

                <!-- Message Section -->
                <tr>
                  <td style="padding: 25px 35px 35px 35px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td>
                          <p style="margin: 0 0 12px 0; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">
                            💬 Message
                          </p>
                          <div style="background: #030014; border-radius: 16px; padding: 25px; border-left: 4px solid #7042f8;">
                            <p style="margin: 0; color: #e5e7eb; font-size: 16px; line-height: 1.8; white-space: pre-wrap;">
${sanitizedMessage}
                            </p>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Quick Actions -->
                <tr>
                  <td style="padding: 0 35px 35px 35px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="center">
                          <a href="mailto:${sanitizedEmail}?subject=Re: Your inquiry on my portfolio&body=Hi ${sanitizedName},%0D%0A%0D%0AThank you for reaching out!%0D%0A%0D%0A" 
                             style="display: inline-block; background: linear-gradient(135deg, #7042f8 0%, #b49bff 100%); color: white; padding: 16px 40px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 16px; box-shadow: 0 8px 30px rgba(112, 66, 248, 0.4); transition: all 0.3s ease;">
                            ↩️ Reply to ${sanitizedName.split(' ')[0]}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Metadata Footer -->
          <tr>
            <td style="padding: 30px 0;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: #0c0f1a50; border-radius: 16px; border: 1px solid #2A0E6130; padding: 20px;">
                <tr>
                  <td style="padding: 15px 25px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="50%" style="vertical-align: top;">
                          <p style="margin: 0 0 5px 0; color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">
                            📅 Received
                          </p>
                          <p style="margin: 0; color: #9ca3af; font-size: 13px;">
                            ${formattedDate}
                          </p>
                        </td>
                        <td width="50%" style="vertical-align: top; text-align: right;">
                          <p style="margin: 0 0 5px 0; color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">
                            🌐 Source
                          </p>
                          <p style="margin: 0; color: #9ca3af; font-size: 13px;">
                            Portfolio Website
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 0; text-align: center; border-top: 1px solid #2A0E6130;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding-bottom: 20px;">
                    <!-- Social Links -->
                    <a href="https://github.com/David26v" style="display: inline-block; margin: 0 8px; width: 40px; height: 40px; background: #0c0f1a; border: 1px solid #2A0E61; border-radius: 10px; line-height: 40px; text-align: center; text-decoration: none; font-size: 18px;">
                      🐙
                    </a>
                    <a href="https://www.linkedin.com/in/david-fajardo" style="display: inline-block; margin: 0 8px; width: 40px; height: 40px; background: #0c0f1a; border: 1px solid #2A0E61; border-radius: 10px; line-height: 40px; text-align: center; text-decoration: none; font-size: 18px;">
                      💼
                    </a>
                    <a href="https://www.facebook.com/LeL0uCh26/" style="display: inline-block; margin: 0 8px; width: 40px; height: 40px; background: #0c0f1a; border: 1px solid #2A0E61; border-radius: 10px; line-height: 40px; text-align: center; text-decoration: none; font-size: 18px;">
                      📘
                    </a>
                    <a href="https://www.instagram.com/chinitz_david26/" style="display: inline-block; margin: 0 8px; width: 40px; height: 40px; background: #0c0f1a; border: 1px solid #2A0E61; border-radius: 10px; line-height: 40px; text-align: center; text-decoration: none; font-size: 18px;">
                      📸
                    </a>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <p style="margin: 0; color: #6b7280; font-size: 12px;">
                      This email was sent from the contact form on
                    </p>
                    <a href="https://david-space--gules.vercel.app" style="color: #b49bff; font-size: 12px; text-decoration: none; font-weight: 500;">
                      david-space--gules.vercel.app
                    </a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 15px;">
                    <p style="margin: 0; color: #4b5563; font-size: 11px;">
                      © ${new Date().getFullYear()} David R. Fajardo. All rights reserved.
                    </p>
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
═══════════════════════════════════════════════════════
    NEW MESSAGE FROM YOUR PORTFOLIO
═══════════════════════════════════════════════════════

${reasonInfo.emoji} Category: ${reasonInfo.label}

───────────────────────────────────────────────────────
    SENDER INFORMATION
───────────────────────────────────────────────────────

👤 Name:    ${sanitizedName}
📧 Email:   ${sanitizedEmail}
📅 Date:    ${formattedDate}

───────────────────────────────────────────────────────
    MESSAGE
───────────────────────────────────────────────────────

${sanitizedMessage}

───────────────────────────────────────────────────────

To reply, simply respond to this email or click:
mailto:${sanitizedEmail}

═══════════════════════════════════════════════════════
This email was sent from: david-space--gules.vercel.app
© ${new Date().getFullYear()} David R. Fajardo
═══════════════════════════════════════════════════════
      `,
    };

    // Send the main email
    console.log("Sending email...");
    console.log("From:", process.env.EMAIL_USER);
    console.log("To:", process.env.EMAIL_TO || process.env.EMAIL_USER);
    
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
    console.log("Message ID:", info.messageId);

    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("=== ERROR IN CONTACT API ===");
    console.error("Error type:", typeof error);
    console.error("Error name:", error instanceof Error ? error.name : "Unknown");
    console.error("Error message:", error instanceof Error ? error.message : String(error));
    console.error("Full error:", error);
    
    // Return more specific error message
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    
    return NextResponse.json(
      { error: `Failed to send email: ${errorMessage}` },
      { status: 500 }
    );
  }
}

// Handle other methods
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}