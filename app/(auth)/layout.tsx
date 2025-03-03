import Link from 'next/link'

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative w-full min-h-screen flex flex-col bg-dark">
      {/* HEADER */}
      <header className="w-full py-4 px-6 flex items-center bg-dark/80 border-b border-gray-700">
        {/* LOGO */}
        <Link href="/" className="text-primary text-lg font-bold">
          Evently
        </Link>
      </header>

      {/* AUTH CONTENT */}
      <div className="flex flex-grow justify-center items-center">
        <div className="relative w-full max-w-4xl h-full min-h-[575px] flex rounded-lg overflow-hidden border border-gray-700">
          {/* BACKGROUND IMAGE */}
          <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('/background-auth.jpg')",
              backgroundAttachment: 'fixed',
            }}
          />

          {/* AUTH FORM */}
          <div className="relative w-full h-auto min-h-full flex">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
