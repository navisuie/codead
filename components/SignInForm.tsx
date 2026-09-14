"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SignInForm({
  heading,
  subtext,
  redirectPath,
}: {
  heading: string;
  subtext: string;
  redirectPath: string;
}) {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${redirectPath}`,
      },
    });

    setSending(false);
    if (error) {
      setError(error.message);
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <div className="card p-6 text-center">
        <p className="text-stone-700">
          Check <strong>{email}</strong> for a sign-in link, then come back here.
        </p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-semibold text-stone-900">{heading}</h1>
      <p className="mt-1 text-sm text-stone-600">{subtext}</p>

      <form onSubmit={handleSubmit} className="card mt-8 flex flex-col gap-5 p-6">
        <div className="flex flex-col gap-1.5">
          <label className="field-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            required
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="field-input"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={sending} className="btn-primary">
          {sending ? "Sending..." : "Send sign-in link"}
        </button>
      </form>
    </>
  );
}
