import { NextResponse } from "next/server";
import ytdlp from "yt-dlp-exec";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "الرجاء وضع رابط الفيديو" }, { status: 400 });
    }

    // تعديل الخيارات لجلب رابط الفيديو المباشر
    const result = await ytdlp(url, {
      binaryPath: '/usr/local/bin/yt-dlp', // المسار في Docker
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      // نختار صيغة تحتوي على الفيديو والصوت معاً (عادة mp4)
      format: "best[ext=mp4]/best", 
    } as any);

    // الرابط المباشر يكون عادة في حقل url
    // نتحقق من وجوده في النتيجة
    const directUrl = result.url || (result.formats && result.formats.reverse().find((f: any) => f.url)?.url);

    if (!directUrl) {
      throw new Error("لم يتم العثور على رابط مباشر للفيديو");
    }

    return NextResponse.json({
      title: result.title,
      thumbnail: result.thumbnail,
      videoUrl: directUrl, // هذا هو الرابط الذي يمكنك استخدامه في التحميل
      duration: result.duration
    });

  } catch (error: any) {
    console.error("YTDLP Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}