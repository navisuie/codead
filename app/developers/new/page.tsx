"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

export default function NewDeveloperPage() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setCheckingSession(false);
    });
  }, [supabase]);

  if (checkingSession) return null;

  return (
    <div className="mx-auto w-full max-w-md px-6 py-16">
      {user ? <ProfileForm user={user} /> : <SignInForm />}
    </div>
  );
}

function ProfileForm({ user }: { user: User }) {
  const supabase = createClient();
  const router = useRouter();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [rateRange, setRateRange] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const { error } = await supabase.from("developers").insert({
      user_id: user.id,
      name,
      email: user.email,
      bio,
      skills: skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      portfolio_url: portfolioUrl || null,
      rate_range: rateRange || null,
    });

    setSubmitting(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/developers");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Create your profile</h1>
      <p className="text-sm text-zinc-600">Signed in as {user.email}</p>

      <input
        required
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="rounded-md border border-zinc-300 px-3 py-2"
      />
      <textarea
        placeholder="Short bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="rounded-md border border-zinc-300 px-3 py-2"
        rows={3}
      />
      <input
        placeholder="Skills (comma separated, e.g. Webflow, React, Tailwind)"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        className="rounded-md border border-zinc-300 px-3 py-2"
      />
      <input
        placeholder="Portfolio URL"
        value={portfolioUrl}
        onChange={(e) => setPortfolioUrl(e.target.value)}
        className="rounded-md border border-zinc-300 px-3 py-2"
      />
      <input
        placeholder="Rate range (e.g. $500-$1500 per project)"
        value={rateRange}
        onChange={(e) => setRateRange(e.target.value)}
        className="rounded-md border border-zinc-300 px-3 py-2"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50"
      >
        {submitting ? "Saving..." : "Publish profile"}
      </button>
    </form>
  );
}

function SignInForm() {
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
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
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
      <p className="text-zinc-700">
        Check <strong>{email}</strong> for a sign-in link, then come back here.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">List yourself as a developer</h1>
      <p className="text-sm text-zinc-600">
        We&apos;ll email you a sign-in link — no password needed.
      </p>
      <input
        required
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="rounded-md border border-zinc-300 px-3 py-2"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={sending}
        className="rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50"
      >
        {sending ? "Sending..." : "Send sign-in link"}
      </button>
    </form>
  );
}
