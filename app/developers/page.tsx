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
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Developers</h1>
        <Link
          href="/developers/new"
          className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
        >
          List yourself
        </Link>
      </div>

      {!developers?.length && (
        <p className="text-zinc-600">No developers listed yet.</p>
      )}

      <ul className="flex flex-col gap-4">
        {developers?.map((dev) => (
          <li key={dev.id} className="rounded-lg border border-zinc-200 bg-white p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-semibold">{dev.name}</h2>
                {dev.rate_range && (
                  <p className="text-sm text-zinc-500">{dev.rate_range}</p>
                )}
              </div>
              <ContactReveal email={dev.email} />
            </div>
            {dev.bio && <p className="mt-3 text-sm text-zinc-700">{dev.bio}</p>}
            {dev.skills?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {dev.skills.map((skill: string) => (
                  <span
                    key={skill}
                    className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-700"
                  >
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
                className="mt-3 inline-block text-sm text-zinc-600 underline"
              >
                Portfolio
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
