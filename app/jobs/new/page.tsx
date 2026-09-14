"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import SignInForm from "@/components/SignInForm";

export default function NewJobPage() {
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
      {user ? (
        <JobForm user={user} />
      ) : (
        <SignInForm
          heading="Post a project"
          subtext="We'll email you a sign-in link — no password needed."
          redirectPath="/jobs/new"
        />
      )}
    </div>
  );
}

function JobForm({ user }: { user: User }) {
  const supabase = createClient();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const { error } = await supabase.from("job_posts").insert({
      user_id: user.id,
      title,
      description,
      budget_range: budgetRange || null,
      contact_email: user.email,
    });

    setSubmitting(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/jobs");
  }

  return (
    <>
      <h1 className="text-2xl font-semibold text-stone-900">Post a project</h1>
      <p className="mt-1 text-sm text-stone-600">Signed in as {user.email}</p>

      <form onSubmit={handleSubmit} className="card mt-8 flex flex-col gap-5 p-6">
        <div className="flex flex-col gap-1.5">
          <label className="field-label" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            required
            placeholder="Landing page for a local bakery"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="field-input"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="field-label" htmlFor="description">
            What do you need built?
          </label>
          <textarea
            id="description"
            required
            placeholder="A one-page site with a menu, hours, and a contact form..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="field-input"
            rows={4}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="field-label" htmlFor="budget">
            Budget range
          </label>
          <input
            id="budget"
            placeholder="$500-$1000"
            value={budgetRange}
            onChange={(e) => setBudgetRange(e.target.value)}
            className="field-input"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button type="submit" disabled={submitting} className="btn-primary">
          {submitting ? "Posting..." : "Post project"}
        </button>
      </form>
    </>
  );
}
