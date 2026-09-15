"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  const [method, setMethod] = useState<"magic" | "password">("password");

  return (
    <>
      <h1 className="text-2xl font-semibold text-stone-900">{heading}</h1>
      <p className="mt-1 text-sm text-stone-600">{subtext}</p>

      <div className="card mt-8 flex flex-col gap-5 p-6">
        <GoogleButton redirectPath={redirectPath} />

        <div className="flex items-center gap-3 text-xs text-stone-400">
          <div className="h-px flex-1 bg-stone-200" />
          or
          <div className="h-px flex-1 bg-stone-200" />
        </div>

        <div className="flex gap-1 rounded-full bg-stone-100 p-1 text-sm font-medium">
          <button
            type="button"
            onClick={() => setMethod("password")}
            className={`flex-1 rounded-full py-1.5 ${
              method === "password" ? "bg-white shadow-sm" : "text-stone-500"
            }`}
          >
            Email + password
          </button>
          <button
            type="button"
            onClick={() => setMethod("magic")}
            className={`flex-1 rounded-full py-1.5 ${
              method === "magic" ? "bg-white shadow-sm" : "text-stone-500"
            }`}
          >
            Email link
          </button>
        </div>

        {method === "password" ? (
          <PasswordForm redirectPath={redirectPath} />
        ) : (
          <MagicLinkForm redirectPath={redirectPath} />
        )}
      </div>
    </>
  );
}

function GoogleButton({ redirectPath }: { redirectPath: string }) {
  const supabase = createClient();
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${redirectPath}`,
      },
    });
    if (error) setError(error.message);
  }

  return (
    <div>
      <button type="button" onClick={handleClick} className="btn-secondary w-full">
        Continue with Google
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}

function PasswordForm({ redirectPath }: { redirectPath: string }) {
  const supabase = createClient();
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmationSent, setConfirmationSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const { data, error } =
      mode === "signup"
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });

    setSubmitting(false);
    if (error) {
      setError(error.message);
      return;
    }

    // If email confirmation is required, there's no session yet.
    if (mode === "signup" && !data.session) {
      setConfirmationSent(true);
      return;
    }

    router.push(redirectPath);
  }

  if (confirmationSent) {
    return (
      <p className="text-sm text-stone-700">
        Check <strong>{email}</strong> to confirm your account, then come back
        and sign in.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
      <div className="flex flex-col gap-1.5">
        <label className="field-label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          required
          minLength={8}
          pattern="(?=.*[a-zA-Z])(?=.*[0-9]).{8,}"
          title="At least 8 characters, with a letter and a number"
          type="password"
          placeholder="At least 8 characters, with a letter and a number"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="field-input"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={submitting} className="btn-primary">
        {submitting
          ? "Please wait..."
          : mode === "signup"
            ? "Create account"
            : "Sign in"}
      </button>

      <button
        type="button"
        onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
        className="text-sm text-stone-500 hover:text-stone-800"
      >
        {mode === "signup"
          ? "Already have an account? Sign in"
          : "Need an account? Create one"}
      </button>
    </form>
  );
}

function MagicLinkForm({ redirectPath }: { redirectPath: string }) {
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
      <p className="text-sm text-stone-700">
        Check <strong>{email}</strong> for a sign-in link, then come back here.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="field-label" htmlFor="magic-email">
          Email
        </label>
        <input
          id="magic-email"
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
  );
}
