import { NextResponse } from 'next/server';

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
      timestamp: new Date().toISOString(),
    };

    console.log('[THE ARCHITECT] Superhero Request Inscription Received:', submission);

    // 2. Email dispatch configuration & delivery
    const apiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.CONTACT_EMAIL;
    const sender = process.env.RESEND_FROM_EMAIL || 'The Architect <onboarding@resend.dev>';
    const templateId = process.env.RESEND_TEMPLATE_ID;

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

    if (!templateId) {
      console.error('[THE ARCHITECT] API Configuration Error: RESEND_TEMPLATE_ID is not defined');
      return NextResponse.json(
        { error: 'Template conduit not configured. Please define RESEND_TEMPLATE_ID.' },
        { status: 503 }
      );
    }

    // Recipients: Send to BOTH the admin (CONTACT_EMAIL) and the petitioner (EMAIL)
    const recipients = Array.from(new Set([recipient, submission.email]));

    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: sender,
          to: recipients,
          reply_to: submission.email,
          template: {
            id: templateId,
            variables: {
              NAME: submission.name,
              AGE: submission.age,
              LOCATION: submission.location,
              EMAIL: submission.email,
              GRIEVANCE: submission.grievance,
              TIMESTAMP: submission.timestamp,
            },
          },
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

      console.log('[THE ARCHITECT] Petition delivered via Resend template:', resData?.id);
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
