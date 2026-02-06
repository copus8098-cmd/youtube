import { NextResponse } from "next/server";
import ytdlp from "yt-dlp-exec";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json(
        { error: "الرجاء إدخال رابط الفيديو" },
        { status: 400 }
      );
    }

    // ملاحظة: yt-dlp-exec تحول الخصائص داخلياً إلى CLI flags
    // نستخدم 'as any' لتفادي تعارض الأنواع إذا كانت المكتبة قديمة أو غير متوافقة تماماً
    const result = await ytdlp(url, {
      dumpSingleJson: true,
      skipDownload: true,
      writeSubs: true,
      subLang: "en", // إذا أردت لغات متعددة استخدم "en,ar" كسلسلة نصية واحدة
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      addHeader: [
        "referer:youtube.com",
        "user-agent:googlebot"
      ],
    } as any);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("YTDLP Error:", error);
    return NextResponse.json(
      { error: error.message || "حدث خطأ أثناء جلب البيانات" },
      { status: 500 }
    );
  }
}