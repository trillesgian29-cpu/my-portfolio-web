import { ENGINEERING_LABS } from '../../data/labs';
import { SectionHeader } from '../SectionHeader';

export function LabsSection() {
  return (
    <section
      id="labs"
      aria-labelledby="labs-heading"
      className="border-b border-[#21152F]/10 dark:border-[#D8B4FE]/15 bg-[#FAF7FD] dark:bg-[#180F24] py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          headingId="labs-heading"
          kicker="Laboratory Work"
          title="Engineering Labs"
          subtitle="Hands-on experiments from BSCpE coursework spanning circuits, digital logic, microcontrollers, networking, PCB design, and applied prototypes."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ENGINEERING_LABS.map((lab) => (
            <article
              key={lab.id}
              className="portfolio-card flex flex-col justify-between rounded-2xl p-6"
            >
              <div>
                <p className="font-mono-code text-xs font-medium text-[#6B21A8] dark:text-[#C084FC] tabular-nums">
                  {lab.code} · {lab.domain}
                </p>

                <h3 className="mt-2 font-display text-lg font-bold text-[#21152F] dark:text-[#F3E8FF]">
                  {lab.title}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-[#4A3B5C] dark:text-[#D8B4FE]">
                  {lab.description}
                </p>
              </div>

              <div className="mt-5 border-t border-[#21152F]/10 dark:border-[#D8B4FE]/15 pt-4">
                <p className="text-xs text-[#4A3B5C] dark:text-[#D8B4FE]">
                  {lab.tags.join(' · ')}
                </p>
                <p className="mt-2 text-xs font-semibold text-[#6B21A8] dark:text-[#C084FC]">
                  Outcome: {lab.outcome}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
