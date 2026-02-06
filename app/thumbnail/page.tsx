"use client"
import { useState } from "react"

function getVideoId(url: string) {
  const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/)
  return match ? match[1] : null
}

export default function ThumbnailPage() {
  const [url, setUrl] = useState("")

  const downloadThumbnail = () => {
    const videoId = getVideoId(url)
    if (!videoId) return alert("رابط غير صالح")
    const a = document.createElement("a")
    a.href = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    a.download = `thumbnail_${videoId}.jpg`
    a.click()
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">تحميل Thumbnail</h1>
      <input
        type="text"
        placeholder="ضع رابط فيديو يوتيوب"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-2 rounded text-black"
      />
      <button
        onClick={downloadThumbnail}
        className="bg-red-600 p-2 rounded hover:bg-red-700"
      >
        تحميل
      </button>
    </div>
  )
}
