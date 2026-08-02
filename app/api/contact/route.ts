import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

import { contactSchema } from '@/lib/validations/contact';

export const runtime = 'nodejs';

const resend = new Resend(process.env.RESEND_API_KEY);

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const globalForRateLimit = globalThis as typeof globalThis & {
  contactRateLimit?: Map<string, RateLimitEntry>;
};

const rateLimitStore =
  globalForRateLimit.contactRateLimit ??
  new Map<string, RateLimitEntry>();

globalForRateLimit.contactRateLimit = rateLimitStore;

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');

  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown';
  }

  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}

function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const current = rateLimitStore.get(identifier);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });

    return false;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  current.count += 1;
  return false;
}

function isAllowedOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');

  if (!origin) {
    return false;
  }

  const allowedOrigins = new Set(
    [
      process.env.NEXT_PUBLIC_SITE_URL,
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : undefined,
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : undefined,
    ].filter((value): value is string => Boolean(value)),
  );

  return allowedOrigins.has(origin);
}

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
      })[character] ?? character,
  );
}

function jsonResponse(
  body: Record<string, unknown>,
  status: number,
): NextResponse {
  return NextResponse.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured.');

      return jsonResponse(
        {
          error: 'Email service is not configured.',
        },
        500,
      );
    }

    if (
      !process.env.CONTACT_EMAIL_TO ||
      !process.env.CONTACT_EMAIL_FROM
    ) {
      console.error(
        'CONTACT_EMAIL_TO or CONTACT_EMAIL_FROM is not configured.',
      );

      return jsonResponse(
        {
          error: 'Email service is not configured.',
        },
        500,
      );
    }

    if (!isAllowedOrigin(request)) {
      return jsonResponse(
        {
          error: 'Request origin is not allowed.',
        },
        403,
      );
    }

    const contentType = request.headers.get('content-type');

    if (!contentType?.includes('application/json')) {
      return jsonResponse(
        {
          error: 'Content-Type must be application/json.',
        },
        415,
      );
    }

    const contentLength = Number(
      request.headers.get('content-length') ?? '0',
    );

    if (contentLength > 15_000) {
      return jsonResponse(
        {
          error: 'Request is too large.',
        },
        413,
      );
    }

    const clientIp = getClientIp(request);

    if (isRateLimited(clientIp)) {
      return jsonResponse(
        {
          error:
            'Too many messages have been submitted. Please try again later.',
        },
        429,
      );
    }

    let requestBody: unknown;

    try {
      requestBody = await request.json();
    } catch {
      return jsonResponse(
        {
          error: 'Invalid request body.',
        },
        400,
      );
    }

    const validation = contactSchema.safeParse(requestBody);

    if (!validation.success) {
      return jsonResponse(
        {
          error: 'Please check the form fields.',
          fieldErrors:
            validation.error.flatten().fieldErrors,
        },
        400,
      );
    }

    const {
      name,
      company,
      email,
      projectType,
      message,
      website,
    } = validation.data;

    /*
     * Honeypot spam protection.
     * Return success without sending an email.
     */
    if (website) {
      return jsonResponse(
        {
          message:
            'Your message has been sent successfully.',
        },
        200,
      );
    }

    const safeName = escapeHtml(name);
    const safeCompany = escapeHtml(
      company || 'Not provided',
    );
    const safeEmail = escapeHtml(email);
    const safeProjectType = escapeHtml(projectType);
    const safeMessage = escapeHtml(message).replace(
      /\n/g,
      '<br />',
    );

    const submittedAt = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Asia/Colombo',
    }).format(new Date());

    const safeSubmittedAt = escapeHtml(submittedAt);

    const replySubject = encodeURIComponent(
      `Re: Your Ceyra Labs enquiry — ${projectType}`,
    );

    const { data, error } = await resend.emails.send({
      from: process.env.CONTACT_EMAIL_FROM,
      to: [process.env.CONTACT_EMAIL_TO],
      replyTo: email,
      subject: `New project enquiry from ${name} — ${projectType}`,

      text: [
        'NEW CEYRA LABS PROJECT ENQUIRY',
        '',
        `Name: ${name}`,
        `Company: ${company || 'Not provided'}`,
        `Email: ${email}`,
        `Project type: ${projectType}`,
        `Submitted: ${submittedAt}`,
        '',
        'PROJECT DESCRIPTION',
        '',
        message,
        '',
        `Reply directly to: ${email}`,
      ].join('\n'),

      html: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <meta name="color-scheme" content="light" />
            <meta
              name="supported-color-schemes"
              content="light"
            />
            <title>New Ceyra Labs Project Enquiry</title>
          </head>

          <body
            style="
              margin: 0;
              padding: 0;
              background-color: #f4f4f7;
              font-family: Arial, Helvetica, sans-serif;
              color: #18181b;
            "
          >
            <table
              role="presentation"
              width="100%"
              cellspacing="0"
              cellpadding="0"
              border="0"
              style="
                width: 100%;
                background-color: #f4f4f7;
              "
            >
              <tr>
                <td
                  align="center"
                  style="padding: 32px 16px;"
                >
                  <table
                    role="presentation"
                    width="100%"
                    cellspacing="0"
                    cellpadding="0"
                    border="0"
                    style="
                      width: 100%;
                      max-width: 640px;
                      background-color: #ffffff;
                      border: 1px solid #e4e4e7;
                      border-radius: 16px;
                      overflow: hidden;
                      box-shadow: 0 8px 30px rgba(24, 24, 27, 0.08);
                    "
                  >
                    <!-- Header -->
                    <tr>
                      <td
                        style="
                          padding: 36px 40px;
                          background-color: #14141c;
                          background-image: linear-gradient(
                            135deg,
                            #14141c 0%,
                            #1c1c26 100%
                          );
                        "
                      >
                        <p
                          style="
                            margin: 0 0 12px;
                            font-size: 12px;
                            font-weight: 700;
                            letter-spacing: 2px;
                            text-transform: uppercase;
                            color: #ff6b00;
                          "
                        >
                          Ceyra Labs
                        </p>

                        <h1
                          style="
                            margin: 0;
                            font-size: 28px;
                            line-height: 1.3;
                            font-weight: 700;
                            color: #f5f5f7;
                          "
                        >
                          New Project Enquiry
                        </h1>

                        <p
                          style="
                            margin: 12px 0 0;
                            font-size: 15px;
                            line-height: 1.6;
                            color: #a1a1aa;
                          "
                        >
                          A new message was submitted through
                          the Ceyra Labs website contact form.
                        </p>
                      </td>
                    </tr>

                    <!-- Main content -->
                    <tr>
                      <td style="padding: 36px 40px;">
                        <p
                          style="
                            margin: 0 0 22px;
                            font-size: 16px;
                            line-height: 1.7;
                            color: #3f3f46;
                          "
                        >
                          <strong style="color: #18181b;">
                            ${safeName}
                          </strong>
                          ${
                            company
                              ? ` from <strong style="color:#18181b;">${safeCompany}</strong>`
                              : ''
                          }
                          is interested in discussing a
                          potential project.
                        </p>

                        <!-- Project type badge -->
                        <table
                          role="presentation"
                          cellspacing="0"
                          cellpadding="0"
                          border="0"
                          style="margin-bottom: 28px;"
                        >
                          <tr>
                            <td
                              style="
                                padding: 9px 14px;
                                background-color: #fff3e8;
                                border: 1px solid #ffd4b3;
                                border-radius: 999px;
                                font-size: 13px;
                                line-height: 1.4;
                                font-weight: 700;
                                color: #c45100;
                              "
                            >
                              ${safeProjectType}
                            </td>
                          </tr>
                        </table>

                        <!-- Contact details -->
                        <table
                          role="presentation"
                          width="100%"
                          cellspacing="0"
                          cellpadding="0"
                          border="0"
                          style="
                            width: 100%;
                            margin-bottom: 28px;
                            border: 1px solid #e4e4e7;
                            border-radius: 12px;
                            border-collapse: separate;
                            border-spacing: 0;
                            overflow: hidden;
                          "
                        >
                          <tr>
                            <td
                              colspan="2"
                              style="
                                padding: 16px 20px;
                                background-color: #fafafa;
                                border-bottom: 1px solid #e4e4e7;
                                font-size: 14px;
                                font-weight: 700;
                                color: #18181b;
                              "
                            >
                              Contact details
                            </td>
                          </tr>

                          <tr>
                            <td
                              width="140"
                              style="
                                width: 140px;
                                padding: 14px 20px;
                                border-bottom: 1px solid #eeeeef;
                                font-size: 13px;
                                font-weight: 700;
                                color: #71717a;
                                vertical-align: top;
                              "
                            >
                              Name
                            </td>

                            <td
                              style="
                                padding: 14px 20px;
                                border-bottom: 1px solid #eeeeef;
                                font-size: 14px;
                                line-height: 1.6;
                                color: #18181b;
                              "
                            >
                              ${safeName}
                            </td>
                          </tr>

                          <tr>
                            <td
                              width="140"
                              style="
                                width: 140px;
                                padding: 14px 20px;
                                border-bottom: 1px solid #eeeeef;
                                font-size: 13px;
                                font-weight: 700;
                                color: #71717a;
                                vertical-align: top;
                              "
                            >
                              Company
                            </td>

                            <td
                              style="
                                padding: 14px 20px;
                                border-bottom: 1px solid #eeeeef;
                                font-size: 14px;
                                line-height: 1.6;
                                color: #18181b;
                              "
                            >
                              ${safeCompany}
                            </td>
                          </tr>

                          <tr>
                            <td
                              width="140"
                              style="
                                width: 140px;
                                padding: 14px 20px;
                                border-bottom: 1px solid #eeeeef;
                                font-size: 13px;
                                font-weight: 700;
                                color: #71717a;
                                vertical-align: top;
                              "
                            >
                              Email
                            </td>

                            <td
                              style="
                                padding: 14px 20px;
                                border-bottom: 1px solid #eeeeef;
                                font-size: 14px;
                                line-height: 1.6;
                              "
                            >
                              <a
                                href="mailto:${safeEmail}"
                                style="
                                  color: #ff6b00;
                                  font-weight: 600;
                                  text-decoration: none;
                                "
                              >
                                ${safeEmail}
                              </a>
                            </td>
                          </tr>

                          <tr>
                            <td
                              width="140"
                              style="
                                width: 140px;
                                padding: 14px 20px;
                                border-bottom: 1px solid #eeeeef;
                                font-size: 13px;
                                font-weight: 700;
                                color: #71717a;
                                vertical-align: top;
                              "
                            >
                              Project type
                            </td>

                            <td
                              style="
                                padding: 14px 20px;
                                border-bottom: 1px solid #eeeeef;
                                font-size: 14px;
                                line-height: 1.6;
                                color: #18181b;
                              "
                            >
                              ${safeProjectType}
                            </td>
                          </tr>

                          <tr>
                            <td
                              width="140"
                              style="
                                width: 140px;
                                padding: 14px 20px;
                                font-size: 13px;
                                font-weight: 700;
                                color: #71717a;
                                vertical-align: top;
                              "
                            >
                              Submitted
                            </td>

                            <td
                              style="
                                padding: 14px 20px;
                                font-size: 14px;
                                line-height: 1.6;
                                color: #18181b;
                              "
                            >
                              ${safeSubmittedAt}
                            </td>
                          </tr>
                        </table>

                        <!-- Project description -->
                        <h2
                          style="
                            margin: 0 0 12px;
                            font-size: 16px;
                            line-height: 1.4;
                            color: #18181b;
                          "
                        >
                          Project description
                        </h2>

                        <div
                          style="
                            margin-bottom: 30px;
                            padding: 20px;
                            background-color: #fafafa;
                            border: 1px solid #e4e4e7;
                            border-left: 4px solid #ff6b00;
                            border-radius: 10px;
                            font-size: 15px;
                            line-height: 1.75;
                            color: #3f3f46;
                            word-break: break-word;
                          "
                        >
                          ${safeMessage}
                        </div>

                        <!-- Reply button -->
                        <table
                          role="presentation"
                          cellspacing="0"
                          cellpadding="0"
                          border="0"
                        >
                          <tr>
                            <td
                              style="
                                background-color: #ff6b00;
                                border-radius: 8px;
                              "
                            >
                              <a
                                href="mailto:${safeEmail}?subject=${replySubject}"
                                style="
                                  display: inline-block;
                                  padding: 13px 22px;
                                  border-radius: 8px;
                                  font-size: 14px;
                                  line-height: 1.4;
                                  font-weight: 700;
                                  color: #ffffff;
                                  text-decoration: none;
                                "
                              >
                                Reply to ${safeName}
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td
                        style="
                          padding: 24px 40px;
                          background-color: #fafafa;
                          border-top: 1px solid #e4e4e7;
                        "
                      >
                        <p
                          style="
                            margin: 0 0 6px;
                            font-size: 12px;
                            line-height: 1.6;
                            color: #71717a;
                          "
                        >
                          This email was generated automatically
                          from the Ceyra Labs website contact
                          form.
                        </p>

                        <p
                          style="
                            margin: 0;
                            font-size: 12px;
                            line-height: 1.6;
                            color: #a1a1aa;
                          "
                        >
                          Do not forward this message publicly,
                          as it may contain customer contact
                          information.
                        </p>
                      </td>
                    </tr>
                  </table>

                  <p
                    style="
                      margin: 20px 0 0;
                      font-size: 12px;
                      line-height: 1.6;
                      color: #a1a1aa;
                      text-align: center;
                    "
                  >
                    © ${new Date().getFullYear()} Ceyra Labs.
                    All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error(
        'Resend contact email error:',
        error,
      );

      return jsonResponse(
        {
          error:
            'Your message could not be sent. Please try again.',
        },
        502,
      );
    }

    console.info('Contact email sent:', data?.id);

    return jsonResponse(
      {
        message:
          'Your message has been sent successfully.',
      },
      200,
    );
  } catch (error) {
    console.error(
      'Unexpected contact form error:',
      error,
    );

    return jsonResponse(
      {
        error:
          'Something went wrong while sending your message.',
      },
      500,
    );
  }
}