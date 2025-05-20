import type React from "react"
import type { Metadata } from "next"
import { Inter } from "@next/font/google"
// import "./globals.css"
// import { Toaster } from "@/components/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Talents Reach",
  description: "Connect with top talent",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {/* <Toaster /> */}
      </body>
    </html>
  )
}
