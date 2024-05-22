import type { Metadata } from "next";
import localFont from 'next/font/local'

const ggSans = localFont({ src: './fonts/gg-sans.ttf' })

export const metadata: Metadata = {
  title: "Discord widget maker",
  description: "Easily make widgets to show off your Discord profile!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ggSans.className}>{children}</body>
    </html>
  );
}
