import { EDUCATION } from '../../data/education';
import { PROFILE } from '../../data/profile';
import { StudentAvatarPlaceholder } from '../Placeholders3D';
import { ResilientImage } from '../ResilientImage';
import { SectionHeader } from '../SectionHeader';

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-b border-[#21152F]/10 dark:border-[#D8B4FE]/15 bg-[#FFFFFF] dark:bg-[#21152F] py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          headingId="about-heading"
          kicker="About"
          title="Background & Education"
          subtitle="Academic progression and core engineering focus."
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left column: Uploaded portrait + 3D Avatar placeholder */}
          <div className="flex flex-col gap-5 lg:col-span-4">
            <div className="overflow-hidden rounded-2xl border border-[#21152F]/12 dark:border-[#D8B4FE]/20 bg-[#FAF7FD] dark:bg-[#2B1C3D]">
              <ResilientImage
                src={PROFILE.aboutPhotoPath}
                alt={PROFILE.aboutPhotoAlt}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover"
                fallbackTitle={PROFILE.name}
                fallbackNote="Expected file: Picture_Resume.png"
              />
            </div>

            <StudentAvatarPlaceholder />
          </div>

          {/* Right column: Bio, Focus & Education */}
          <div className="flex flex-col gap-8 lg:col-span-8">
            <div>
              <h3 className="font-display text-2xl font-bold text-[#21152F] dark:text-[#F3E8FF]">
                {PROFILE.aboutHeading}
              </h3>

              <div className="mt-4 space-y-4 text-base leading-relaxed text-[#4A3B5C] dark:text-[#D8B4FE]">
                {PROFILE.aboutParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-[#21152F]/12 dark:border-[#D8B4FE]/20 bg-[#F3E8FF]/65 dark:bg-[#2B1C3D] p-5">
                <h4 className="font-display text-sm font-bold tracking-wide uppercase text-[#6B21A8] dark:text-[#C084FC]">
                  {PROFILE.focusStatementTitle}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-[#21152F] dark:text-[#F3E8FF]">
                  {PROFILE.focusStatement}
                </p>
              </div>
            </div>

            <div className="border-t border-[#21152F]/10 dark:border-[#D8B4FE]/15 pt-8">
              <h3 className="font-display text-xl font-bold text-[#21152F] dark:text-[#F3E8FF]">
                Education
              </h3>

              <ol className="mt-5 space-y-6">
                {EDUCATION.map((entry) => (
                  <li
                    key={entry.id}
                    className="rounded-xl border border-[#21152F]/10 dark:border-[#D8B4FE]/15 bg-[#FAF7FD] dark:bg-[#180F24] p-5"
                  >
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#6B21A8] dark:text-[#C084FC]">
                      <span className="font-mono-code font-medium tabular-nums">
                        {entry.period}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{entry.statusLabel}</span>
                    </div>
                    <h4 className="mt-1.5 font-display text-lg font-bold text-[#21152F] dark:text-[#F3E8FF]">
                      {entry.program}
                    </h4>
                    <p className="text-sm font-medium text-[#4A3B5C] dark:text-[#D8B4FE]">
                      {entry.institution}
                    </p>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#4A3B5C] dark:text-[#D8B4FE]">
                      {entry.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
