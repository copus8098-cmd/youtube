import { NextResponse } from "next/server";
import { create as createYtDlp } from "yt-dlp-exec";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ error: "الرابط مطلوب" }, { status: 400 });

    // المسار الذي قمنا بتثبيته في Dockerfile
    const EXECUTABLE_PATH = '/usr/local/bin/yt-dlp';

    // نستخدم دالة create لإنشاء نسخة مخصصة تشير للمسار الصحيح مباشرة
    const ytdlpCustom = createYtDlp(EXECUTABLE_PATH);

    const result = await ytdlpCustom(url, {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      // تأكد من مسح أي binaryPath من هنا لأننا وضعناه في الأعلى
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("YTDLP Error:", error);
    return NextResponse.json({ 
      error: "حدث خطأ أثناء معالجة الفيديو", 
      details: error.message 
    }, { status: 500 });
  }
}