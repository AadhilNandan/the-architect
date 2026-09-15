import { NextResponse } from 'next/server';

interface ChatRequestBody {
  message: string;
  step: number;
  formData?: {
    name?: string;
    age?: string;
    location?: string;
    email?: string;
    grievance?: string;
  };
  history?: Array<{ role: 'user' | 'model'; text: string }>;
}

const FALLBACK_RESPONSES: Record<number, (name?: string) => string> = {
  0: () => 'The foundation listens. Declare your name to the Sovereign.',
  1: (name) => `${name ? name + '. ' : ''}How many years have you walked this world?`,
  2: () => 'Where do you stand? Name the realm or territory from which you speak.',
  3: () => 'And where may I reach you? Establish the conduit for my counsel.',
  4: () => 'What has fallen? Describe what must be rebuilt.',
};

export async function POST(req: Request) {
  try {
    const body: ChatRequestBody = await req.json();
    const { message, step, formData = {}, history = [] } = body;

    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL || 'gemini-flash-latest';

    // If API key is not configured, gracefully return persona fallback
    if (!apiKey) {
      console.warn('[THE ARCHITECT] GEMINI_API_KEY not configured. Using fallback persona.');
      const fallbackFn = FALLBACK_RESPONSES[step] || FALLBACK_RESPONSES[0];
      return NextResponse.json({
        reply: fallbackFn(formData.name),
        fallback: true,
      });
    }

    const systemPrompt = `You are The Architect, an ancient mythological superhero and sovereign who perceives reality not as chaos, but as a living structural design.
Core Philosophy:
- "I do not command reality. I understand it."
- "What is understood can be rebuilt."
- "Do not destroy what you cannot rebuild."

Persona:
- Ancient, solemn, restrained, authoritative, intellectual, calm, philosophical.
- Use architectural and structural metaphors (foundations, fractures, blueprints, keystones, masonry, unbinding, resonance).
- NEVER sound like a generic AI assistant ("How can I assist you today?").
- NEVER use modern slang, corporate language, cyberpunk tropes, or superhero clichés.
- Keep answers concise (1 to 2 sentences max), dignified and suited for a monumental stone communion slab.

Current context:
You are in communion with a mortal petitioner at the subterranean throne.
The application collects 5 pieces of information:
- Step 0: Name ("Who are you?")
- Step 1: Age ("How many years have you walked this world?")
- Step 2: Location ("Where do you stand?")
- Step 3: Email ("And where may I reach you?")
- Step 4: Grievance ("So... tell me. How can I help?" / "What has fallen?")

Currently the petitioner is at Step ${step}.
Data gathered so far:
Name: "${formData.name || 'Not yet declared'}"
Age: "${formData.age || 'Not yet declared'}"
Location: "${formData.location || 'Not yet declared'}"
Email: "${formData.email || 'Not yet declared'}"
Grievance: "${formData.grievance || 'Not yet shared'}"

The petitioner just submitted: "${message}"

Your task:
- If this is Step 0 (they just told you their name or greeted you):
  If they provided a name, acknowledge their name solemnly and ask: "How many years have you walked this world?"
  If they just said hello or asked who you are, respond: "The seal is open. Who are you?"
- If this is Step 1 (they just answered their age):
  Acknowledge their mortal span, and ask: "Where do you stand in this world?"
- If this is Step 2 (they just answered their location/realm):
  Acknowledge their territory or city, and ask: "And where may I reach you? Establish your conduit."
- If this is Step 3 (they just answered their email/conduit):
  Acknowledge that the conduit is recorded, and invite them: "So... tell me. What has fallen? How can I help?"
- If this is Step 4 (they are describing what has broken, shattered, or their problem):
  Respond with profound empathy and structural understanding. Acknowledge the weight of the fracture. Ask what failed first or assure them that what is understood can be restored.
- If their input was unexpected, tangential, or confused:
  Respond in character calmly, grounding them, and bring them back to the necessary question for Step ${step}.

Keep your response under 40 words. Speak with calm authority.`;

    // Construct request contents
    const contents = [
      {
        role: 'user',
        parts: [{ text: systemPrompt }],
      },
      {
        role: 'model',
        parts: [{ text: 'I understand the foundation. I shall speak as The Architect.' }],
      },
    ];

    // Append up to last 4 turns of history
    if (history.length > 0) {
      const recentHistory = history.slice(-4);
      for (const h of recentHistory) {
        contents.push({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }],
        });
      }
    }

    // Append current user message
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    try {
      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 120,
              topP: 0.85,
            },
          }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!geminiRes.ok) {
        console.error('[THE ARCHITECT] Gemini API responded with status:', geminiRes.status);
        const fallbackFn = FALLBACK_RESPONSES[step] || FALLBACK_RESPONSES[0];
        return NextResponse.json({
          reply: fallbackFn(formData.name),
          fallback: true,
        });
      }

      const geminiData = await geminiRes.json();
      const generatedText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

      if (!generatedText) {
        const fallbackFn = FALLBACK_RESPONSES[step] || FALLBACK_RESPONSES[0];
        return NextResponse.json({
          reply: fallbackFn(formData.name),
          fallback: true,
        });
      }

      // Clean any accidental quotes or formatting around the response
      const cleanReply = generatedText.replace(/^["“”']|["“”']$/g, '').trim();

      return NextResponse.json({
        reply: cleanReply,
        fallback: false,
      });
    } catch (fetchErr) {
      clearTimeout(timeoutId);
      console.error('[THE ARCHITECT] Gemini request failed or timed out:', fetchErr);
      const fallbackFn = FALLBACK_RESPONSES[step] || FALLBACK_RESPONSES[0];
      return NextResponse.json({
        reply: fallbackFn(formData.name),
        fallback: true,
      });
    }
  } catch (err) {
    console.error('[THE ARCHITECT] /api/chat error:', err);
    return NextResponse.json(
      {
        reply: 'The foundation is obscured. Speak again, and I shall listen.',
        fallback: true,
      },
      { status: 200 }
    );
  }
}
