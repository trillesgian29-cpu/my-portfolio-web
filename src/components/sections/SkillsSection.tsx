import { BookOpen } from 'lucide-react';
import { CURRICULUM_ALIGNMENT, SKILL_DOMAINS } from '../../data/skills';
import { SectionHeader } from '../SectionHeader';

export function SkillsSection() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="border-b border-[#21152F]/10 dark:border-[#D8B4FE]/15 bg-[#FAF7FD] dark:bg-[#180F24] py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          headingId="skills-heading"
          kicker="Capabilities"
          title="Skills & Technical Domains"
          subtitle="Core competencies developed across the BSCpE curriculum, laboratory coursework, and personal engineering projects."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SKILL_DOMAINS.map((domain) => (
            <article
              key={domain.id}
              className="portfolio-card flex flex-col rounded-2xl p-6"
            >
              <div className="flex items-baseline justify-between gap-2 border-b border-[#21152F]/10 dark:border-[#D8B4FE]/15 pb-3">
                <h3 className="font-display text-lg font-bold text-[#21152F] dark:text-[#F3E8FF]">
                  {domain.index}. {domain.title}
                </h3>
              </div>

              <ul className="mt-4 space-y-2 text-sm text-[#4A3B5C] dark:text-[#D8B4FE]">
                {domain.items.map((item) => (
                  <li key={item} className="leading-snug">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-8 flex items-start gap-4 rounded-2xl border border-[#21152F]/12 dark:border-[#D8B4FE]/20 bg-[#FFFFFF] dark:bg-[#21152F] p-6">
          <BookOpen
            className="mt-0.5 h-5 w-5 shrink-0 text-[#6B21A8] dark:text-[#C084FC]"
            aria-hidden="true"
          />
          <div>
            <h3 className="font-display text-base font-bold text-[#21152F] dark:text-[#F3E8FF]">
              {CURRICULUM_ALIGNMENT.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[#4A3B5C] dark:text-[#D8B4FE]">
              {CURRICULUM_ALIGNMENT.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
