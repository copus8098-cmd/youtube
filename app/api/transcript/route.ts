import { NextResponse } from "next/server";
import ytdlp from "yt-dlp-exec";
import { join } from "path";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ error: "الرابط مطلوب" }, { status: 400 });

    // المسار الذي قمنا بتثبيت yt-dlp فيه داخل الـ Dockerfile
    const linuxBinaryPath = '/usr/local/bin/yt-dlp';

    const result = await ytdlp(url, {
      // إجبار المكتبة على استخدام المسار الصحيح
      binaryPath: linuxBinaryPath, 
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      addHeader: ['referer:youtube.com', 'user-agent:googlebot'],
    } as any);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Full Error:", error);
    
    // رسالة خطأ توضيحية للمساعدة في التشخيص
    return NextResponse.json({ 
      error: "فشل التشغيل: تأكد من اختيار Docker في إعدادات Render",
      details: error.message 
    }, { status: 500 });
  }
}