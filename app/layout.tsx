import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={'antialiased flex items-center justify-center w-full bg-[#f5f5ee]'}
      >
        {children}
      </body>
    </html>
  );
}
