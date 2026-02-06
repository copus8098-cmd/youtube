"use client"

import { useState } from "react"

// تعريف واجهة للبيانات القادمة من السيرفر
interface VideoData {
  title: string;
  thumbnail: string;
  videoUrl: string;
}

export default function VideoPage() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [videoData, setVideoData] = useState<VideoData | null>(null)
  const [error, setError] = useState("")

  const fetchVideo = async () => {
    setLoading(true)
    setError("")
    setVideoData(null)
    
    try {
      const res = await fetch("/api/audio", { // تأكد أن المسار يطابق اسم الملف في api
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })
      
      const data = await res.json()
      
      if (data.error) {
        setError("حدث خطأ: " + data.error)
      } else {
        setVideoData(data)
      }
    } catch (e) {
      setError("حدث خطأ أثناء الاتصال بالسيرفر")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold">تحميل فيديوهات يوتيوب</h1>
      
      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="ضع رابط فيديو يوتيوب هنا"
          className="w-full p-3 rounded border border-gray-600 bg-gray-800 text-white focus:ring-2 focus:ring-purple-500 outline-none"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          onClick={fetchVideo}
          disabled={loading || !url}
          className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-500 p-3 rounded font-bold transition"
        >
          {loading ? "جاري جلب البيانات..." : "استخراج الفيديو"}
        </button>
      </div>

      {error && <p className="text-red-400 font-medium">{error}</p>}

      {/* عرض النتائج في حال نجاح العملية */}
      {videoData && (
        <div className="mt-8 p-4 border border-gray-700 rounded-lg bg-gray-900 animate-in fade-in duration-500">
          <img 
            src={videoData.thumbnail} 
            alt={videoData.title} 
            className="w-full rounded-md mb-4 shadow-lg"
          />
          <h2 className="text-xl font-semibold mb-4 text-right">{videoData.title}</h2>
          
          <div className="flex flex-col gap-2">
            <a
              href={videoData.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white p-3 rounded font-bold transition flex items-center justify-center gap-2"
            >
              📥 فتح رابط الفيديو للتحميل
            </a>
            <p className="text-xs text-gray-400">
              * ملاحظة: قد تحتاج للضغط كليك يمين ثم "Save video as" إذا فتح الفيديو في المتصفح.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}