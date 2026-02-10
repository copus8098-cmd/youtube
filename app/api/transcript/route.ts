import { NextResponse } from "next/server";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { writeFileSync } from "node:fs";

const execFileAsync = promisify(execFile);

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    if (!url) {
      return NextResponse.json(
        { error: "الرابط مطلوب" },
        { status: 400 }
      );
    }

    // 1️⃣ تأكد أن cookies موجودة
    if (!process.env.YTDLP_COOKIES) {
      return NextResponse.json(
        { error: "cookies غير مهيأة في السيرفر" },
        { status: 500 }
      );
    }

    // 2️⃣ اكتب cookies في ملف مؤقت
    const cookiesPath = "/tmp/cookies.txt";
    writeFileSync(cookiesPath, process.env.YTDLP_COOKIES);

    // 3️⃣ شغّل yt-dlp
    const { stdout } = await execFileAsync(
      "/usr/local/bin/yt-dlp",
      [
        url,
        "--dump-single-json",
        "--no-check-certificate",
        "--no-warnings",
        "--prefer-free-formats",
        "--cookies",
        cookiesPath,
      ],
      {
        maxBuffer: 10 * 1024 * 1024, // 10MB
      }
    );

    const result = JSON.parse(stdout);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("yt-dlp error:", error);

    return NextResponse.json(
      {
        error: "فشل جلب البيانات",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
