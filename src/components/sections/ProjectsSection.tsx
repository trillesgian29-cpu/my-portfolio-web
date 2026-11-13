import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PROJECT_CATEGORIES, PROJECTS, type ProjectCategory } from '../../data/projects';
import { SectionHeader } from '../SectionHeader';

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<'all' | ProjectCategory>('all');

  const filteredProjects =
    activeFilter === 'all'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === activeFilter);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="border-b border-[#21152F]/10 dark:border-[#D8B4FE]/15 bg-[#FFFFFF] dark:bg-[#21152F] py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeader
            headingId="projects-heading"
            kicker="Selected Work"
            title="Featured Projects"
            subtitle="Academic and personal engineering projects across software, networking, embedded systems, hardware, and applied AI."
          />

          {/* Interactive category filter segmented bar */}
          <div
            role="group"
            aria-label="Filter projects by domain"
            className="mb-10 flex flex-wrap gap-1.5 rounded-xl border border-[#21152F]/12 dark:border-[#D8B4FE]/20 bg-[#FAF7FD] dark:bg-[#180F24] p-1.5"
          >
            {PROJECT_CATEGORIES.map((category) => {
              const selected = activeFilter === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveFilter(category.id)}
                  aria-pressed={selected}
                  className={`rounded-lg px-3.5 py-2 text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                    selected
                      ? 'bg-[#6B21A8] text-white dark:bg-[#D8B4FE] dark:text-[#21152F]'
                      : 'text-[#4A3B5C] hover:text-[#21152F] dark:text-[#D8B4FE] dark:hover:text-[#F3E8FF]'
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <article
              key={project.slug}
              className="portfolio-card flex flex-col justify-between rounded-2xl p-6"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs text-[#6B21A8] dark:text-[#C084FC]">
                  <span>{project.typeLabel}</span>
                  <span className="font-mono-code tabular-nums">{project.order}</span>
                </div>

                <h3 className="mt-2 font-display text-xl font-bold text-[#21152F] dark:text-[#F3E8FF]">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="hover:text-[#6B21A8] dark:hover:text-[#C084FC]"
                  >
                    {project.title}
                  </Link>
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[#4A3B5C] dark:text-[#D8B4FE]">
                  {project.description}
                </p>
              </div>

              <div className="mt-6 border-t border-[#21152F]/10 dark:border-[#D8B4FE]/15 pt-4">
                <p className="text-xs leading-relaxed text-[#4A3B5C] dark:text-[#D8B4FE]">
                  {project.techStack.join(' · ')}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm font-semibold">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="text-[#6B21A8] hover:underline dark:text-[#C084FC]"
                  >
                    Project Details
                  </Link>

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#21152F] hover:text-[#6B21A8] dark:text-[#F3E8FF] dark:hover:text-[#C084FC]"
                    >
                      <span>{project.demoLabel ?? 'Demo'}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#4A3B5C] hover:text-[#6B21A8] dark:text-[#D8B4FE] dark:hover:text-[#C084FC]"
                    >
                      <span>GitHub</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
