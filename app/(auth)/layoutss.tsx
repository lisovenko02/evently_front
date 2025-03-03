export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative w-full min-h-screen flex justify-center items-center bg-dark">
      <div className="relative w-full max-w-4xl h-[575px] rounded-lg overflow-hidden flex border border-gray-700">
        {/* BACKGROUND IMAGE */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/background-auth.jpg')",
            backgroundAttachment: 'fixed',
          }}
        />

        {/* AUTH FORM */}
        <div className="relative w-full h-full flex">{children}</div>
      </div>
    </div>
  )
}
