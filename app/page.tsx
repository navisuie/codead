import Link from "next/link";

const features = [
  {
    title: "No bidding wars",
    body: "Post what you need once. Interested developers reach out directly — no race-to-the-bottom auction.",
  },
  {
    title: "Landing pages only",
    body: "Every developer here builds small-business landing pages, so you're not sifting through unrelated skill sets.",
  },
  {
    title: "Talk directly, no middleman",
    body: "Contact info is shared directly between you and the developer. You work out scope and price yourselves.",
  },
];

const steps = [
  {
    step: "1",
    title: "Post your project",
    body: "Describe what you need and your budget range. Takes two minutes, no account required.",
  },
  {
    step: "2",
    title: "Hear from developers",
    body: "Developers who build landing pages browse the board and email you directly if it's a fit.",
  },
  {
    step: "3",
    title: "Pick who to work with",
    body: "Compare a few conversations and choose — you're always talking to the person doing the work.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="border-b border-stone-200 bg-gradient-to-b from-indigo-50/60 to-background">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-6 py-24 text-center">
          <span className="badge">Now focused on small-business landing pages</span>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
            Landing pages for small businesses, built by real developers
          </h1>
          <p className="max-w-xl text-lg text-stone-600">
            Post what you need and hear from developers directly, or browse the
            directory and reach out yourself — no bidding wars, no middleman.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/jobs/new" className="btn-primary">
              I need a landing page
            </Link>
            <Link href="/developers/new" className="btn-secondary">
              I build landing pages
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 py-20">
        <div className="grid gap-6 sm:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="card p-6">
              <h3 className="font-semibold text-stone-900">{f.title}</h3>
              <p className="mt-2 text-sm text-stone-600">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-stone-200 bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center text-2xl font-semibold text-stone-900">
            How it works
          </h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white">
                  {s.step}
                </div>
                <h3 className="mt-4 font-semibold text-stone-900">{s.title}</h3>
                <p className="mt-2 text-sm text-stone-600">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
