import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PageMatch — landing pages for small businesses, built by real devs",
  description:
    "Post a landing page project or list yourself as a developer who builds them.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900">
        <header className="border-b border-zinc-200 bg-white">
          <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
            <Link href="/" className="font-semibold">
              PageMatch
            </Link>
            <div className="flex gap-6 text-sm font-medium text-zinc-600">
              <Link href="/developers" className="hover:text-zinc-950">
                Developers
              </Link>
              <Link href="/jobs" className="hover:text-zinc-950">
                Job board
              </Link>
              <Link
                href="/jobs/new"
                className="rounded-full bg-zinc-900 px-4 py-1.5 text-white hover:bg-zinc-700"
              >
                Post a project
              </Link>
            </div>
          </nav>
        </header>
        <main className="flex flex-1 flex-col">{children}</main>
      </body>
    </html>
  );
}
