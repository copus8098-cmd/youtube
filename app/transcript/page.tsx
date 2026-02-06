"use client"

import { useState } from "react"

export default function TranscriptPage() {
  const [url, setUrl] = useState("")
  const [transcript, setTranscript] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const fetchTranscript = async () => {
    setLoading(true)
    setTranscript(null)
    try {
      const res = await fetch("/api/transcript", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })
      const data = await res.json()
      setTranscript(data)
    } catch (e) {
      alert("حدث خطأ")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">سحب سكريبت الفيديو (Transcript)</h1>
      <input
        type="text"
        placeholder="ضع رابط فيديو يوتيوب"
        className="w-full p-2 rounded text-black"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        onClick={fetchTranscript}
        className="bg-green-600 hover:bg-green-700 p-2 rounded"
      >
        {loading ? "جاري السحب..." : "سحب السكريبت"}
      </button>

      {transcript && (
        <pre className="bg-gray-800 p-4 rounded overflow-x-auto">
          {JSON.stringify(transcript.subtitles || transcript, null, 2)}
        </pre>
      )}
    </div>
  )
}

