"use client"
import { useState } from "react"

const API_KEY = "YOUR_YOUTUBE_API_KEY"

export default function InfoPage() {
  const [url, setUrl] = useState("")
  const [info, setInfo] = useState<any>(null)

  const getVideoId = (url: string) => {
    const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/)
    return match ? match[1] : null
  }

  const fetchInfo = async () => {
    const videoId = getVideoId(url)
    if (!videoId) return alert("رابط غير صالح")
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`
    )
    const data = await res.json()
    setInfo(data.items[0])
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">معلومات الفيديو</h1>
      <input
        type="text"
        placeholder="ضع رابط فيديو يوتيوب"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-2 rounded text-black"
      />
      <button
        onClick={fetchInfo}
        className="bg-blue-600 p-2 rounded hover:bg-blue-700"
      >
        جلب المعلومات
      </button>

      {info && (
        <div className="mt-4 bg-gray-800 p-4 rounded space-y-2">
          <h2 className="text-xl font-bold">{info.snippet.title}</h2>
          <p>المشاهدات: {info.statistics.viewCount}</p>
          <p>الإعجابات: {info.statistics.likeCount}</p>
          <p>الوصف: {info.snippet.description}</p>
        </div>
      )}
    </div>
  )
}
