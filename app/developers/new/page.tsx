"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@/lib/useUser";

export default function NewDeveloperPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  if (loading || !user) return null;

  return (
    <div className="mx-auto w-full max-w-md px-6 py-16">
      <ProfileForm user={user} />
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
    <>
      <h1 className="text-2xl font-semibold text-stone-900">Create your profile</h1>
      <p className="mt-1 text-sm text-stone-600">Signed in as {user.email}</p>

      <form onSubmit={handleSubmit} className="card mt-8 flex flex-col gap-5 p-6">
        <div className="flex flex-col gap-1.5">
          <label className="field-label" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            required
            placeholder="Jamie Rivera"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="field-input"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="field-label" htmlFor="bio">
            Short bio
          </label>
          <textarea
            id="bio"
            placeholder="I build fast, clean landing pages for local businesses..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="field-input"
            rows={3}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="field-label" htmlFor="skills">
            Skills
          </label>
          <input
            id="skills"
            placeholder="Webflow, React, Tailwind"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="field-input"
          />
          <p className="text-xs text-stone-500">Comma separated</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="field-label" htmlFor="portfolio">
            Portfolio URL
          </label>
          <input
            id="portfolio"
            placeholder="https://your-portfolio.com"
            value={portfolioUrl}
            onChange={(e) => setPortfolioUrl(e.target.value)}
            className="field-input"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="field-label" htmlFor="rate">
            Rate range
          </label>
          <input
            id="rate"
            placeholder="$500-$1500 per project"
            value={rateRange}
            onChange={(e) => setRateRange(e.target.value)}
            className="field-input"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button type="submit" disabled={submitting} className="btn-primary">
          {submitting ? "Saving..." : "Publish profile"}
        </button>
      </form>
    </>
  );
}
