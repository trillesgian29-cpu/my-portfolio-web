import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  useEffect(() => {
    document.title = '404 Page Not Found — Gian Carlo';
  }, []);

  return (
    <section className="flex min-h-[65vh] items-center justify-center bg-[#FAF7FD] dark:bg-[#180F24] py-20">
      <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
        <p className="font-mono-code text-xs font-medium uppercase tracking-wider text-[#6B21A8] dark:text-[#C084FC]">
          Error 404
        </p>
        <h1 className="mt-3 font-display text-4xl font-extrabold text-[#21152F] dark:text-[#F3E8FF]">
          Page not found
        </h1>
        <p className="mt-4 text-base text-[#4A3B5C] dark:text-[#D8B4FE]">
          The page you requested does not exist. Return to the main portfolio to browse projects, labs, and certifications.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg bg-[#6B21A8] px-5 py-3 text-sm font-semibold text-white hover:bg-[#9333EA] dark:bg-[#D8B4FE] dark:text-[#21152F] dark:hover:bg-[#C084FC]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
