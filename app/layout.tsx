export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar">
      <body className="bg-gray-900 text-white min-h-screen">
        <header className="p-4 bg-gray-800">
          <nav className="flex gap-4">
            <a href="/" className="hover:underline">الرئيسية</a>
            <a href="/thumbnail" className="hover:underline">Thumbnail</a>
            <a href="/info" className="hover:underline">معلومات الفيديو</a>
            <a href="/transcript" className="hover:underline">سكريبت</a>
            <a href="/audio" className="hover:underline">صوت</a>
          </nav>
        </header>

        <main className="p-6">{children}</main>
      </body>
    </html>
  )
}
