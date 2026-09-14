import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ContactReveal from "@/components/ContactReveal";

export const revalidate = 0;

export default async function JobsPage() {
  const supabase = await createClient();
  const { data: jobs } = await supabase
    .from("job_posts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Job board</h1>
          <p className="mt-1 text-sm text-stone-600">
            Small businesses looking for a landing page.
          </p>
        </div>
        <Link href="/jobs/new" className="btn-primary">
          Post a project
        </Link>
      </div>

      {!jobs?.length && (
        <div className="card flex flex-col items-center gap-3 px-6 py-16 text-center">
          <p className="text-stone-600">No projects posted yet — be the first.</p>
          <Link href="/jobs/new" className="btn-secondary">
            Post a project
          </Link>
        </div>
      )}

      <ul className="flex flex-col gap-4">
        {jobs?.map((job) => (
          <li key={job.id} className="card p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-semibold text-stone-900">{job.title}</h2>
                {job.budget_range && (
                  <p className="mt-0.5 text-sm text-stone-500">{job.budget_range}</p>
                )}
              </div>
              <ContactReveal email={job.contact_email} />
            </div>
            <p className="mt-3 whitespace-pre-wrap text-sm text-stone-700">
              {job.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
