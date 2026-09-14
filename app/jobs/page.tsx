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
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Job board</h1>
        <Link
          href="/jobs/new"
          className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
        >
          Post a project
        </Link>
      </div>

      {!jobs?.length && <p className="text-zinc-600">No projects posted yet.</p>}

      <ul className="flex flex-col gap-4">
        {jobs?.map((job) => (
          <li key={job.id} className="rounded-lg border border-zinc-200 bg-white p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-semibold">{job.title}</h2>
                {job.budget_range && (
                  <p className="text-sm text-zinc-500">{job.budget_range}</p>
                )}
              </div>
              <ContactReveal email={job.contact_email} />
            </div>
            <p className="mt-3 whitespace-pre-wrap text-sm text-zinc-700">
              {job.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
