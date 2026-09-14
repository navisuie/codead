"use client";

import { useState } from "react";

export default function ContactReveal({ email }: { email: string }) {
  const [revealed, setRevealed] = useState(false);

  if (revealed) {
    return (
      <a href={`mailto:${email}`} className="text-sm font-medium text-zinc-900 underline">
        {email}
      </a>
    );
  }

  return (
    <button
      onClick={() => setRevealed(true)}
      className="text-sm font-medium text-zinc-900 underline underline-offset-2"
    >
      Reveal email
    </button>
  );
}
