import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Minimal phone validation: digits, spaces, +, -, (). At least 7 digits.
function isValidPhone(input: string): boolean {
  const digits = input.replace(/[^\d]/g, "");
  const allowed = /^[+()\-\s\d]+$/;
  return digits.length >= 7 && digits.length <= 15 && allowed.test(input.trim());
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const phone: string = (body?.phone ?? "").toString().trim();

    if (!phone) {
      return NextResponse.json(
        { ok: false, error: "Please enter your phone number." },
        { status: 400 }
      );
    }
    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { ok: false, error: "That doesn't look like a valid phone number." },
        { status: 400 }
      );
    }

    // In a real product this would persist to a DB / CRM and trigger a
    // notification. Here we acknowledge receipt so the UX feels complete.
    await new Promise((r) => setTimeout(r, 450));

    return NextResponse.json({
      ok: true,
      message: "Got it. Expect a reply within 5 minutes.",
      receivedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
