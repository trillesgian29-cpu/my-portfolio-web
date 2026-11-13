import { ArrowRight, Download } from 'lucide-react';
import { PROFILE } from '../../data/profile';
import { EngineeringCorePlaceholder } from '../Placeholders3D';

export function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="border-b border-[#21152F]/10 dark:border-[#D8B4FE]/15 bg-[#FAF7FD] dark:bg-[#180F24] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left column: Typographic hierarchy */}
          <div className="lg:col-span-7">
            <p className="font-mono-code text-xs font-medium tracking-wider uppercase text-[#6B21A8] dark:text-[#C084FC]">
              {PROFILE.academicStatus} · {PROFILE.institution}
            </p>

            <h1
              id="hero-heading"
              className="mt-4 font-display text-4xl font-extrabold tracking-tight text-[#21152F] dark:text-[#F3E8FF] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]"
            >
              {PROFILE.tagline}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#4A3B5C] dark:text-[#D8B4FE] sm:text-lg">
              Hi, I&apos;m <strong className="font-semibold text-[#21152F] dark:text-[#F3E8FF]">{PROFILE.name}</strong>.{' '}
              {PROFILE.heroSummary}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg bg-[#6B21A8] px-5 py-3 text-sm font-semibold text-white hover:bg-[#9333EA] dark:bg-[#D8B4FE] dark:text-[#21152F] dark:hover:bg-[#C084FC] whitespace-nowrap shrink-0"
              >
                <span>View Projects</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href="#resume"
                className="inline-flex items-center gap-2 rounded-lg border border-[#21152F]/20 dark:border-[#D8B4FE]/30 bg-[#FFFFFF] dark:bg-[#21152F] px-5 py-3 text-sm font-semibold text-[#21152F] dark:text-[#F3E8FF] hover:border-[#6B21A8] dark:hover:border-[#C084FC] whitespace-nowrap shrink-0"
              >
                <Download className="h-4 w-4 text-[#6B21A8] dark:text-[#C084FC]" aria-hidden="true" />
                <span>Resume</span>
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#4A3B5C] dark:text-[#D8B4FE]">
              <span>{PROFILE.degree}</span>
              <span aria-hidden="true">·</span>
              <span>{PROFILE.location}</span>
              <span aria-hidden="true">·</span>
              <a
                href={PROFILE.socialLinks[0].href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#6B21A8] hover:underline dark:text-[#C084FC]"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Right column: 3D Engineering Core Placeholder */}
          <div className="lg:col-span-5">
            <EngineeringCorePlaceholder />
          </div>
        </div>

        {/* Full-width summary strip below split */}
        <div className="mt-14 grid grid-cols-2 gap-4 border-t border-[#21152F]/10 dark:border-[#D8B4FE]/15 pt-8 sm:grid-cols-4">
          {PROFILE.stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-2xl font-bold tabular-nums text-[#6B21A8] dark:text-[#C084FC] sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-[#4A3B5C] dark:text-[#D8B4FE]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
