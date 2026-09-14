import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ContactReveal from "@/components/ContactReveal";

export const revalidate = 0;

export default async function DevelopersPage() {
  const supabase = await createClient();
  const { data: developers } = await supabase
    .from("developers")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Developers</h1>
          <p className="mt-1 text-sm text-stone-600">
            Developers who build small-business landing pages.
          </p>
        </div>
        <Link href="/developers/new" className="btn-primary">
          List yourself
        </Link>
      </div>

      {!developers?.length && (
        <div className="card flex flex-col items-center gap-3 px-6 py-16 text-center">
          <p className="text-stone-600">No developers listed yet — be the first.</p>
          <Link href="/developers/new" className="btn-secondary">
            List yourself
          </Link>
        </div>
      )}

      <ul className="flex flex-col gap-4">
        {developers?.map((dev) => (
          <li key={dev.id} className="card p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-semibold text-stone-900">{dev.name}</h2>
                {dev.rate_range && (
                  <p className="mt-0.5 text-sm text-stone-500">{dev.rate_range}</p>
                )}
              </div>
              <ContactReveal email={dev.email} />
            </div>
            {dev.bio && <p className="mt-3 text-sm text-stone-700">{dev.bio}</p>}
            {dev.skills?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {dev.skills.map((skill: string) => (
                  <span key={skill} className="badge">
                    {skill}
                  </span>
                ))}
              </div>
            )}
            {dev.portfolio_url && (
              <a
                href={dev.portfolio_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-medium text-accent hover:underline"
              >
                View portfolio →
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
