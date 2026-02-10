import { NextResponse } from "next/server";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

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

    const { stdout } = await execFileAsync(
      "/usr/local/bin/yt-dlp",
      [
        url,
        "--dump-single-json",
        "--no-check-certificate",
        "--no-warnings",
        "--prefer-free-formats",
        "--add-header",
        "referer:youtube.com",
        "--add-header",
        "user-agent:googlebot",
      ],
      {
        maxBuffer: 10 * 1024 * 1024, // 10MB أمان
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
