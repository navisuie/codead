"use client";

import { useState } from "react";

export default function ContactReveal({ email }: { email: string }) {
  const [revealed, setRevealed] = useState(false);

  if (revealed) {
    return (
      <a
        href={`mailto:${email}`}
        className="shrink-0 rounded-full bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent hover:bg-accent/15"
      >
        {email}
      </a>
    );
  }

  return (
    <button
      onClick={() => setRevealed(true)}
      className="shrink-0 rounded-full border border-stone-300 px-3 py-1.5 text-sm font-medium text-stone-700 hover:border-stone-400 hover:bg-stone-50"
    >
      Reveal email
    </button>
  );
}
