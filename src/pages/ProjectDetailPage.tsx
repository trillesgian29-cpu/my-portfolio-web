import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data/projects';

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = PROJECTS.find((item) => item.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (project) {
      document.title = `${project.title} — Gian Carlo`;
    } else {
      document.title = 'Project Not Found — Gian Carlo';
    }
  }, [slug, project]);

  if (!project) {
    return (
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="font-mono-code text-xs uppercase tracking-wider text-[#6B21A8] dark:text-[#C084FC]">
            404 · Project Not Found
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold text-[#21152F] dark:text-[#F3E8FF] sm:text-4xl">
            That project could not be found
          </h1>
          <p className="mt-4 text-base text-[#4A3B5C] dark:text-[#D8B4FE]">
            The requested project slug does not match any verified entry in the portfolio.
          </p>
          <div className="mt-8">
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-[#6B21A8] px-5 py-3 text-sm font-semibold text-white hover:bg-[#9333EA] dark:bg-[#D8B4FE] dark:text-[#21152F] dark:hover:bg-[#C084FC]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Back to Projects</span>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const related = PROJECTS.filter(
    (item) => item.category === project.category && item.slug !== project.slug,
  );

  const hasLinks = Boolean(project.demoUrl || project.githubUrl);

  return (
    <article className="bg-[#FAF7FD] dark:bg-[#180F24] py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#6B21A8] hover:underline dark:text-[#C084FC]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Back to Featured Projects</span>
        </Link>

        <header className="mt-8 border-b border-[#21152F]/10 dark:border-[#D8B4FE]/15 pb-8">
          <p className="font-mono-code text-xs font-medium tracking-wider uppercase text-[#6B21A8] dark:text-[#C084FC] tabular-nums">
            {project.typeLabel} · Project {project.order}
          </p>

          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-[#21152F] dark:text-[#F3E8FF] sm:text-5xl">
            {project.title}
          </h1>

          {hasLinks && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#6B21A8] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#9333EA] dark:bg-[#D8B4FE] dark:text-[#21152F] dark:hover:bg-[#C084FC]"
                >
                  <span>{project.demoLabel ?? 'Live Demo'}</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-[#21152F]/20 dark:border-[#D8B4FE]/30 bg-[#FFFFFF] dark:bg-[#21152F] px-4 py-2.5 text-sm font-semibold text-[#21152F] dark:text-[#F3E8FF] hover:border-[#6B21A8] dark:hover:border-[#C084FC]"
                >
                  <span>View Repository</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </div>
          )}
        </header>

        {/* Overview section */}
        <section aria-labelledby="overview-heading" className="mt-10">
          <h2
            id="overview-heading"
            className="font-display text-xl font-bold text-[#21152F] dark:text-[#F3E8FF]"
          >
            Overview
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#4A3B5C] dark:text-[#D8B4FE]">
            {project.description}
          </p>
        </section>

        {/* Technologies & Stack section */}
        {project.techStack.length > 0 && (
          <section
            aria-labelledby="stack-heading"
            className="mt-10 border-t border-[#21152F]/10 dark:border-[#D8B4FE]/15 pt-8"
          >
            <h2
              id="stack-heading"
              className="font-display text-xl font-bold text-[#21152F] dark:text-[#F3E8FF]"
            >
              Technologies &amp; Topics
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {project.techStack.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-[#21152F]/10 dark:border-[#D8B4FE]/15 bg-[#FFFFFF] dark:bg-[#21152F] px-4 py-2.5 text-sm font-medium text-[#21152F] dark:text-[#F3E8FF]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Related projects in same category (only rendered if supported) */}
        {related.length > 0 && (
          <section
            aria-labelledby="related-heading"
            className="mt-12 border-t border-[#21152F]/10 dark:border-[#D8B4FE]/15 pt-10"
          >
            <h2
              id="related-heading"
              className="font-display text-xl font-bold text-[#21152F] dark:text-[#F3E8FF]"
            >
              Related Projects
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  to={`/projects/${item.slug}`}
                  className="portfolio-card rounded-xl p-5"
                >
                  <p className="font-mono-code text-xs text-[#6B21A8] dark:text-[#C084FC]">
                    {item.typeLabel} · {item.order}
                  </p>
                  <h3 className="mt-1.5 font-display text-lg font-bold text-[#21152F] dark:text-[#F3E8FF]">
                    {item.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-[#4A3B5C] dark:text-[#D8B4FE]">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
