"use client"

import { useState } from "react"

function getVideoId(url: string) {
  const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/)
  return match ? match[1] : null
}

export default function Home() {
  const [url, setUrl] = useState("")
  const [error, setError] = useState("")

  const downloadThumbnail = (quality = "maxresdefault") => {
    const videoId = getVideoId(url)
    if (!videoId) {
      setError("رابط يوتيوب غير صالح")
      return
    }

    setError("")
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/${quality}.jpg`

    const a = document.createElement("a")
    a.href = thumbnailUrl
    a.download = `thumbnail_${videoId}.jpg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md space-y-4 p-6 bg-gray-800 rounded-xl">
        <h1 className="text-xl font-bold text-center">
          تحميل Thumbnail من يوتيوب
        </h1>

        <input
          type="text"
          placeholder="ضع رابط فيديو يوتيوب هنا"
          className="w-full p-2 rounded text-black"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => downloadThumbnail("maxresdefault")}
            className="flex-1 bg-red-600 hover:bg-red-700 p-2 rounded"
          >
            أعلى جودة
          </button>

          <button
            onClick={() => downloadThumbnail("hqdefault")}
            className="flex-1 bg-gray-600 hover:bg-gray-700 p-2 rounded"
          >
            جودة عادية
          </button>
        </div>
      </div>
    </main>
  )
}
