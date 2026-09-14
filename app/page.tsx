import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-4xl flex-1 flex-col items-center justify-center gap-10 px-6 py-24 text-center">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Landing pages for small businesses, built by real developers
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-zinc-600">
          Post what you need and hear from developers directly, or browse the
          directory and reach out yourself — no bidding wars, no middleman.
        </p>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href="/jobs/new"
          className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-700"
        >
          I need a landing page
        </Link>
        <Link
          href="/developers/new"
          className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium hover:bg-zinc-100"
        >
          I build landing pages
        </Link>
      </div>
    </div>
  );
}
