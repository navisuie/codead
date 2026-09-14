"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function NewJobPage() {
  const supabase = createClient();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const { error } = await supabase.from("job_posts").insert({
      title,
      description,
      budget_range: budgetRange || null,
      contact_email: contactEmail,
    });

    setSubmitting(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/jobs");
  }

  return (
    <div className="mx-auto w-full max-w-md px-6 py-16">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">Post a project</h1>
        <p className="text-sm text-zinc-600">
          No account needed — developers will reach out by email.
        </p>

        <input
          required
          placeholder="Title (e.g. Landing page for a local bakery)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-md border border-zinc-300 px-3 py-2"
        />
        <textarea
          required
          placeholder="What do you need built?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="rounded-md border border-zinc-300 px-3 py-2"
          rows={4}
        />
        <input
          placeholder="Budget range (e.g. $500-$1000)"
          value={budgetRange}
          onChange={(e) => setBudgetRange(e.target.value)}
          className="rounded-md border border-zinc-300 px-3 py-2"
        />
        <input
          required
          type="email"
          placeholder="Your email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          className="rounded-md border border-zinc-300 px-3 py-2"
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50"
        >
          {submitting ? "Posting..." : "Post project"}
        </button>
      </form>
    </div>
  );
}
