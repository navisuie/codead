"use client";

import { useState } from "react";
import SignInForm from "@/components/SignInForm";

type Role = "customer" | "developer";

export default function LoginPage() {
  const [role, setRole] = useState<Role | null>(null);

  if (!role) {
    return (
      <div className="mx-auto w-full max-w-md px-6 py-16">
        <h1 className="text-center text-2xl font-semibold text-stone-900">
          Are you looking for a dev, or are you a dev?
        </h1>
        <p className="mt-1 text-center text-sm text-stone-600">
          We&apos;ll set your account up the right way.
        </p>

        <div className="mt-8 flex flex-col gap-4">
          <button
            onClick={() => setRole("customer")}
            className="card p-6 text-left transition-colors hover:border-accent"
          >
            <h2 className="font-semibold text-stone-900">I&apos;m looking for a dev</h2>
            <p className="mt-1 text-sm text-stone-600">
              I need a landing page built and want to post a project.
            </p>
          </button>
          <button
            onClick={() => setRole("developer")}
            className="card p-6 text-left transition-colors hover:border-accent"
          >
            <h2 className="font-semibold text-stone-900">I&apos;m a dev</h2>
            <p className="mt-1 text-sm text-stone-600">
              I build landing pages and want to list myself.
            </p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md px-6 py-16">
      <button
        onClick={() => setRole(null)}
        className="mb-4 text-sm text-stone-500 hover:text-stone-800"
      >
        ← Back
      </button>
      {role === "customer" ? (
        <SignInForm
          heading="Post a project"
          subtext="Create an account or sign in to get started."
          redirectPath="/jobs/new"
        />
      ) : (
        <SignInForm
          heading="List yourself as a developer"
          subtext="Create an account or sign in to get started."
          redirectPath="/developers/new"
        />
      )}
    </div>
  );
}
