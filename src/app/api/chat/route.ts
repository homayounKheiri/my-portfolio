import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const BASE_URL = process.env.BASE_URL_API

const SYSTEM_PROMPT = `You are Aria — a concise, friendly AI assistant embedded on the portfolio website of a consultant who specializes in AI business intelligence and business automation, and who also builds premium websites.

Your role:
- Greet briefly and help visitors understand what the consultant can do for them.
- Answer questions about AI automation, business intelligence, workflow optimization, and modern web development in plain, confident language.
- Keep replies short (2–4 sentences usually). Never produce walls of text. Use short paragraphs or sparse bullets only when genuinely helpful.
- Be warm but professional. Match a premium, minimal brand tone. Do not use emojis.
- If a visitor asks for pricing or a concrete plan, gently invite them to leave their phone number in the Contact section so the consultant can reply within 5 minutes.
- Never invent specific case-study numbers. Speak to capabilities and outcomes in general terms.
- If you don't know something, say so simply and offer to connect them with the consultant.

You are a lightweight assistant, not a search engine. Prioritize clarity and brevity over completeness.`

interface ChatMessage {
  role: "user" | "system"
  content: string
}

// Simple in-process conversation store (per session, memory only)
const conversations = new Map<string, ChatMessage[]>()
const MAX_MESSAGES = 16

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const message: string = (body?.message ?? "").toString().trim()
    const sessionId: string = (body?.sessionId ?? "anon").toString()

    if (!message) {
      return NextResponse.json(
        { ok: false, error: "Message is required." },
        { status: 400 },
      )
    }
    if (message.length > 1000) {
      return NextResponse.json(
        { ok: false, error: "Message is too long." },
        { status: 400 },
      )
    }

    // Load/seed history
    let history = conversations.get(sessionId)
    if (!history) {
      history = []
      conversations.set(sessionId, history)
    }

    // const messages: { role: "assistant" | "user"; content: string }[] = [
    //   { role: "assistant", content: SYSTEM_PROMPT },
    //   ...history,
    //   { role: "user", content: message },
    // ];

    // const zai = await ZAI.create();
    // const completion = await zai.chat.completions.create({
    //   messages,
    //   thinking: { type: "disabled" },
    // });

    const result = await fetch(BASE_URL + "/webhook-test/chat", {
      method: "post",
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: message,
          },
          ...history,
        ],
      }),
    })

    const json: {
      response: string
    } = await result.json()

    if (result.ok && !!json) {
      history.push({ role: "user", content: message })
      history.push({ role: "system", content: json.response })
      while (history.length > MAX_MESSAGES) history.shift()

      return NextResponse.json({ ok: true, response: json, sessionId })
    } else {
      return NextResponse.json({ ok: false, response: "", sessionId })
    }

    // const reply =
    //   completion.choices?.[0]?.message?.content?.trim() ||
    //   "I'm here — could you rephrase that?";

    // Update history (keep system prompt out of stored history)
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json(
      {
        ok: false,
        error: "The assistant is warming up. Please try again in a moment.",
        debug: process.env.NODE_ENV === "development" ? message : undefined,
      },
      { status: 500 },
    )
  }
}
