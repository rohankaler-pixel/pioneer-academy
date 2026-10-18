import { NextRequest, NextResponse } from "next/server";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzLAhd4FjQV7d-9o39bNi-AiR5TOgc_o0KLVqRFRtFdIKHk1rpC4hvA556f982iP0x7/exec";

export async function GET(req: NextRequest) {
  try {
    const search = req.nextUrl.searchParams.toString();
    const targetUrl = `${GOOGLE_SCRIPT_URL}?${search}`;
    
    const res = await fetch(targetUrl, {
      method: "GET",
      redirect: "follow",
      cache: "no-store",
    });

    const text = await res.text();
    
    try {
      const json = JSON.parse(text);
      return NextResponse.json(json);
    } catch {
      // If Google returned HTML/text instead of JSON, return it cleanly for debugging
      return NextResponse.json({
        ok: false,
        error: `Google Script returned non-JSON response. Check Apps Script deployment permissions. Raw: ${text.slice(0, 150)}`,
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
      const json = JSON.parse(text);
      return NextResponse.json(json);
    } catch {
      return NextResponse.json({
        ok: false,
        error: `Google Script POST returned non-JSON. Raw: ${text.slice(0, 150)}`,
      });
    }
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Server post failed" });
  }
}