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
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <header className="sticky top-0 z-10 border-b border-stone-200 bg-white/80 backdrop-blur">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-sm text-white">
                P
              </span>
              PageMatch
            </Link>
            <div className="flex items-center gap-6 text-sm font-medium text-stone-600">
              <Link href="/developers" className="hidden hover:text-stone-950 sm:inline">
                Developers
              </Link>
              <Link href="/jobs" className="hidden hover:text-stone-950 sm:inline">
                Job board
              </Link>
              <Link href="/login" className="hidden hover:text-stone-950 sm:inline">
                Log in
              </Link>
              <Link href="/login" className="btn-primary !px-4 !py-2 text-xs">
                Get started
              </Link>
            </div>
          </nav>
        </header>

        <main className="flex flex-1 flex-col">{children}</main>

        <footer className="border-t border-stone-200 py-8">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-6 text-center text-sm text-stone-500 sm:flex-row sm:justify-between sm:text-left">
            <p>PageMatch — landing pages for small businesses.</p>
            <div className="flex gap-4">
              <Link href="/developers" className="hover:text-stone-800">
                Developers
              </Link>
              <Link href="/jobs" className="hover:text-stone-800">
                Job board
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
