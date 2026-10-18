import { NextRequest, NextResponse } from "next/server";

const GOOGLE_SCRIPT_URL =
  process.env.NEXT_PUBLIC_PIONEER_OPS_API ||
  "https://script.google.com/macros/s/AKfycbzLAhd4FjQV7d-9o39bNi-AiR5TOgc_o0KLVqRFRtFdIKHk1rpC4hvA556f982iP0x7/exec";

export async function GET(req: NextRequest) {
  try {
    const search = req.nextUrl.searchParams.toString();
    const res = await fetch(`${GOOGLE_SCRIPT_URL}?${search}`, {
      method: "GET",
      redirect: "follow",
      cache: "no-store",
    });
    const text = await res.text();
    try {
      return NextResponse.json(JSON.parse(text));
    } catch {
      return NextResponse.json({
        ok: false,
        error: "Google Script returned HTML instead of JSON. Please run setupDatabase() in Apps Script to authorize permissions and deploy a New Version.",
      });
    }
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Server fetch failed" });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const res = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      redirect: "follow",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body,
    });
    const text = await res.text();
    try {
      return NextResponse.json(JSON.parse(text));
    } catch {
      return NextResponse.json({
        ok: false,
        error: "Google Script returned HTML instead of JSON. Check Apps Script permissions.",
      });
    }
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Server post failed" });
  }
}