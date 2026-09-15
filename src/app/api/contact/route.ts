import { NextResponse } from 'next/server';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function generateArchitectEmailHtml(submission: {
  name: string;
  age: string;
  location: string;
  email: string;
  grievance: string;
  timestamp: string;
}): string {
  const safeName = escapeHtml(submission.name);
  const safeAge = escapeHtml(submission.age);
  const safeLocation = escapeHtml(submission.location);
  const safeEmail = escapeHtml(submission.email);
  const safeGrievance = escapeHtml(submission.grievance).replace(/\n/g, '<br>');
  const safeTimestamp = escapeHtml(submission.timestamp);

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>THE ARCHITECT — Petition Received</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style type="text/css">
    html, body {
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      height: 100% !important;
      background-color: #050505 !important;
      -webkit-text-size-adjust: 100% !important;
      -ms-text-size-adjust: 100% !important;
    }
    table, td {
      border-collapse: collapse !important;
      mso-table-lspace: 0pt !important;
      mso-table-rspace: 0pt !important;
    }
    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }
    a {
      color: #A8894A;
      text-decoration: none;
    }
    .grievance-text {
      word-break: break-word !important;
      overflow-wrap: anywhere !important;
      white-space: pre-wrap !important;
    }
    @media only screen and (max-width: 580px) {
      .email-wrapper {
        padding: 12px 6px !important;
      }
      .inner-container {
        padding: 32px 18px !important;
      }
      .opening-headline {
        font-size: 26px !important;
        line-height: 1.2 !important;
      }
      .opening-statement-cell {
        padding: 32px 8px 24px !important;
      }
      .petitioner-label-cell {
        width: 85px !important;
        font-size: 8.5px !important;
      }
      .petitioner-value-cell {
        font-size: 14px !important;
      }
      .petition-reliquary-cell {
        padding: 24px 18px !important;
      }
      .grievance-body-text {
        font-size: 17px !important;
        line-height: 1.5 !important;
      }
      .closing-dictum-text {
        font-size: 20px !important;
        line-height: 1.3 !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #050505; color: #E8E0CF; font-family: 'Manrope', Arial, Helvetica, sans-serif; -webkit-font-smoothing: antialiased; line-height: 1.5;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#050505" style="width: 100%; background-color: #050505; margin: 0; padding: 0;">
    <tr>
      <td align="center" valign="top" class="email-wrapper" style="padding: 40px 16px;">
        <!--[if (gte mso 9)|(IE)]>
        <table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" width="640" style="width: 640px;">
        <tr>
        <td align="center" valign="top">
        <![endif]-->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#080706" style="max-width: 640px; width: 100%; background-color: #080706; border: 1px solid #4a3d24; margin: 0 auto;">
          <tr>
            <td class="inner-container" style="padding: 48px 40px;">
              <!-- 1. HEADER -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom: 30px; border-bottom: 1px solid #362c1a;">
                    <div style="margin-bottom: 16px; text-align: center;">
                      <!--[if !mso]><!-->
                      <svg width="44" height="44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="display: inline-block; vertical-align: middle;">
                        <circle cx="50" cy="50" r="46" stroke="#A8894A" stroke-width="1" stroke-dasharray="2 2" opacity="0.6" />
                        <circle cx="50" cy="50" r="38" stroke="#A8894A" stroke-width="0.75" />
                        <path d="M50 16L79 68H21L50 16Z" stroke="#A8894A" stroke-width="1.2" stroke-linejoin="round" />
                        <path d="M50 26L71 63H29L50 26Z" stroke="#756238" stroke-width="0.75" opacity="0.5" />
                        <line x1="20" y1="50" x2="80" y2="50" stroke="#A8894A" stroke-width="0.75" opacity="0.7" />
                        <circle cx="50" cy="50" r="4" fill="#A8894A" />
                      </svg>
                      <!--<![endif]-->
                      <!--[if mso]>
                      <table role="presentation" align="center" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td align="center" style="width: 36px; height: 36px; border: 1px solid #A8894A; background-color: #0d0c09; font-family: Georgia, serif; font-size: 16px; color: #A8894A; line-height: 36px;">
                            &#9651;
                          </td>
                        </tr>
                      </table>
                      <![endif]-->
                    </div>
                    <div style="font-family: 'Manrope', Arial, Helvetica, sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.35em; text-transform: uppercase; color: #A8894A; margin-bottom: 12px;">
                      THE ARCHITECT
                    </div>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 0 auto;">
                      <tr>
                        <td align="center" style="border: 1px solid #4a3d24; background-color: #12100b; padding: 6px 16px; font-family: 'Manrope', Arial, Helvetica, sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: #E8E0CF;">
                          PETITION RECEIVED
                        </td>
                      </tr>
                    </table>
                    <div style="margin-top: 18px; text-align: center; color: #A8894A; font-size: 9px; line-height: 1; letter-spacing: 0.2em;">
                      &#9670;
                    </div>
                  </td>
                </tr>
              </table>

              <!-- 2. OPENING -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" class="opening-statement-cell" style="padding: 42px 16px 34px;">
                    <h1 class="opening-headline" style="margin: 0 0 14px 0; font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif; font-size: 32px; line-height: 1.18; font-weight: 500; letter-spacing: 0.06em; color: #E8E0CF; text-transform: uppercase;">
                      THE ARCHITECT HAS HEARD YOU.
                    </h1>
                    <p style="margin: 0; font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif; font-size: 15px; line-height: 1.6; color: #77736A; font-style: italic; letter-spacing: 0.02em;">
                      A petition has crossed the seal and entered the foundation.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="height: 1px; background-color: #362c1a; font-size: 1px; line-height: 1px;">&nbsp;</td>
                </tr>
              </table>

              <!-- 3. PETITIONER -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 36px; margin-bottom: 36px;">
                <tr>
                  <td style="padding-bottom: 14px;">
                    <span style="font-family: 'Manrope', Arial, Helvetica, sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.26em; text-transform: uppercase; color: #A8894A;">
                      PETITIONER
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top: 1px solid #362c1a;">
                      <tr>
                        <td class="petitioner-label-cell" valign="middle" style="width: 130px; padding: 13px 0; border-bottom: 1px solid #292113; font-family: 'Manrope', Arial, Helvetica, sans-serif; font-size: 9px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #77736A;">
                          NAME &rarr;
                        </td>
                        <td class="petitioner-value-cell" valign="middle" style="padding: 13px 0; border-bottom: 1px solid #292113; font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif; font-size: 16px; font-weight: 600; letter-spacing: 0.03em; color: #E8E0CF; word-break: break-word;">
                          ${safeName}
                        </td>
                      </tr>
                      <tr>
                        <td class="petitioner-label-cell" valign="middle" style="width: 130px; padding: 13px 0; border-bottom: 1px solid #292113; font-family: 'Manrope', Arial, Helvetica, sans-serif; font-size: 9px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #77736A;">
                          AGE &rarr;
                        </td>
                        <td class="petitioner-value-cell" valign="middle" style="padding: 13px 0; border-bottom: 1px solid #292113; font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif; font-size: 16px; font-weight: 600; letter-spacing: 0.03em; color: #E8E0CF; word-break: break-word;">
                          ${safeAge}
                        </td>
                      </tr>
                      <tr>
                        <td class="petitioner-label-cell" valign="middle" style="width: 130px; padding: 13px 0; border-bottom: 1px solid #292113; font-family: 'Manrope', Arial, Helvetica, sans-serif; font-size: 9px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #77736A;">
                          LOCATION &rarr;
                        </td>
                        <td class="petitioner-value-cell" valign="middle" style="padding: 13px 0; border-bottom: 1px solid #292113; font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif; font-size: 16px; font-weight: 600; letter-spacing: 0.03em; color: #E8E0CF; word-break: break-word;">
                          ${safeLocation}
                        </td>
                      </tr>
                      <tr>
                        <td class="petitioner-label-cell" valign="middle" style="width: 130px; padding: 13px 0; border-bottom: 1px solid #362c1a; font-family: 'Manrope', Arial, Helvetica, sans-serif; font-size: 9px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #77736A;">
                          EMAIL &rarr;
                        </td>
                        <td class="petitioner-value-cell" valign="middle" style="padding: 13px 0; border-bottom: 1px solid #362c1a; font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif; font-size: 16px; font-weight: 600; letter-spacing: 0.03em; color: #E8E0CF; word-break: break-word;">
                          ${safeEmail}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- 4. PETITION & 5. RECORD -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 34px;">
                <tr>
                  <td style="padding-bottom: 14px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="left">
                          <span style="font-family: 'Manrope', Arial, Helvetica, sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.26em; text-transform: uppercase; color: #A8894A;">
                            THE PETITION
                          </span>
                        </td>
                        <td align="right">
                          <span style="font-family: 'Manrope', Arial, Helvetica, sans-serif; font-size: 9px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: #77736A;">
                            SOLEMN DEPOSITION
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#0B0A08" style="background-color: #0B0A08; border: 1px solid #4a3d24;">
                      <tr>
                        <td class="petition-reliquary-cell" style="padding: 34px 28px;">
                          <div style="font-family: Georgia, 'Times New Roman', serif; font-size: 32px; line-height: 1; color: #756238; margin-bottom: 10px;">
                            &ldquo;
                          </div>
                          <div class="grievance-text grievance-body-text" style="font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif; font-size: 19px; line-height: 1.58; font-style: italic; color: #E8E0CF; letter-spacing: 0.02em; word-break: break-word; overflow-wrap: anywhere;">${safeGrievance}</div>
                          <div style="font-family: Georgia, 'Times New Roman', serif; font-size: 32px; line-height: 0.8; color: #756238; text-align: right; margin-top: 4px;">
                            &rdquo;
                          </div>
                          <!-- 5. RECORD -->
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 22px; padding-top: 14px; border-top: 1px solid #2e2617;">
                            <tr>
                              <td align="left" valign="middle">
                                <div style="font-family: 'Manrope', Arial, Helvetica, sans-serif; font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase; color: #77736A; font-weight: 600;">
                                  RECORDED
                                </div>
                                <div style="margin-top: 4px; font-family: 'Manrope', Arial, Helvetica, sans-serif; font-size: 9.5px; letter-spacing: 0.12em; color: #A8894A; font-weight: 600; word-break: break-word;">
                                  ${safeTimestamp}
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- 6. CLOSING -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding: 34px 20px 24px;">
                    <div style="margin-bottom: 16px; text-align: center;">
                      <!--[if !mso]><!-->
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="display: inline-block; vertical-align: middle;">
                        <path d="M12 2L21 18H3L12 2Z" stroke="#A8894A" stroke-width="1.2" stroke-linejoin="round" />
                        <circle cx="12" cy="13" r="2" fill="#A8894A" />
                      </svg>
                      <!--<![endif]-->
                      <!--[if mso]>
                      <span style="font-family: Georgia, serif; font-size: 14px; color: #A8894A;">&#9651;</span>
                      <![endif]-->
                    </div>
                    <div class="closing-dictum-text" style="font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif; font-size: 24px; line-height: 1.28; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: #E8E0CF; margin-bottom: 14px;">
                      WHAT HAS FALLEN<br>
                      MAY YET BE REBUILT.
                    </div>
                    <div style="font-family: 'Manrope', Arial, Helvetica, sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.32em; text-transform: uppercase; color: #A8894A;">
                      &mdash; THE ARCHITECT
                    </div>
                  </td>
                </tr>
              </table>

              <!-- 7. FOOTER -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-top: 28px; border-top: 1px solid #362c1a;">
                    <div style="font-family: 'Manrope', Arial, Helvetica, sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase; color: #C2BAAA; margin-bottom: 4px;">
                      THE ARCHITECT
                    </div>
                    <div style="font-family: 'Manrope', Arial, Helvetica, sans-serif; font-size: 9px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: #77736A; margin-bottom: 12px;">
                      HELP PORTAL
                    </div>
                    <div style="font-family: 'Manrope', Arial, Helvetica, sans-serif; font-size: 8px; letter-spacing: 0.16em; text-transform: uppercase; color: #5a554a;">
                      AN AUTOMATED PETITION RECORD
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, age, location, email, grievance } = body;

    // 1. Validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json({ error: 'A valid email address is required' }, { status: 400 });
    }

    if (!grievance || typeof grievance !== 'string' || grievance.trim().length < 3) {
      return NextResponse.json({ error: 'Please describe your request or what has fallen' }, { status: 400 });
    }

    const submission = {
      name: name.trim().slice(0, 100),
      age: age ? String(age).trim().slice(0, 20) : 'Unspecified',
      location: location ? String(location).trim().slice(0, 100) : 'Unspecified',
      email: email.trim().toLowerCase().slice(0, 120),
      grievance: grievance.trim().slice(0, 4000),
      timestamp: new Date().toUTCString(),
    };

    console.log('[THE ARCHITECT] Superhero Request Inscription Received:', submission);

    // 2. Email dispatch configuration & delivery
    const apiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.CONTACT_EMAIL;
    const sender = process.env.RESEND_FROM_EMAIL || 'The Architect <onboarding@resend.dev>';

    if (!apiKey) {
      console.error('[THE ARCHITECT] API Configuration Error: RESEND_API_KEY is not defined');
      return NextResponse.json(
        { error: 'Server email conduit not configured. Please define RESEND_API_KEY.' },
        { status: 503 }
      );
    }

    if (!recipient) {
      console.error('[THE ARCHITECT] API Configuration Error: CONTACT_EMAIL is not defined');
      return NextResponse.json(
        { error: 'Recipient conduit not configured. Please define CONTACT_EMAIL.' },
        { status: 503 }
      );
    }

    // 3. Direct HTML Generation & Dispatch via Resend REST API
    const emailHtml = generateArchitectEmailHtml(submission);

    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: sender,
          to: [recipient],
          subject: `THE ARCHITECT HAS HEARD YOU — ${submission.name}`,
          html: emailHtml,
        }),
      });

      const resData = await res.json().catch(() => null);

      if (!res.ok) {
        console.error('[THE ARCHITECT] Resend API dispatch rejected with status:', res.status, resData);
        const detail = resData?.message || resData?.error || 'Failed to deliver the petition.';
        return NextResponse.json(
          { error: `Failed to deliver the petition: ${detail}` },
          { status: res.status >= 400 && res.status < 600 ? res.status : 502 }
        );
      }

      console.log('[THE ARCHITECT] Petition delivered via direct HTML:', resData?.id);
    } catch (emailErr) {
      console.error('[THE ARCHITECT] Resend dispatch network error:', emailErr);
      return NextResponse.json(
        { error: 'Failed to deliver the petition.' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Your word has been carved into the foundation.',
      timestamp: submission.timestamp,
    });
  } catch (err) {
    console.error('API Contact Error:', err);
    return NextResponse.json({ error: 'An ancient disturbance occurred. Please try again.' }, { status: 500 });
  }
}
