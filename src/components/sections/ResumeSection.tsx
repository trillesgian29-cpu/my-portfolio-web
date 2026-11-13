import { Download, ExternalLink, FileText } from 'lucide-react';
import { PROFILE } from '../../data/profile';
import { ResilientImage } from '../ResilientImage';
import { SectionHeader } from '../SectionHeader';

export function ResumeSection() {
  return (
    <section
      id="resume"
      aria-labelledby="resume-heading"
      className="border-b border-[#21152F]/10 dark:border-[#D8B4FE]/15 bg-[#FAF7FD] dark:bg-[#180F24] py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          headingId="resume-heading"
          kicker="Curriculum Vitae"
          title="Resume"
          subtitle="Complete overview of academic background, technical skills, projects, and certifications."
        />

        <div className="flex flex-col justify-between gap-6 rounded-2xl border border-[#21152F]/12 dark:border-[#D8B4FE]/20 bg-[#FFFFFF] dark:bg-[#21152F] p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border border-[#21152F]/15 dark:border-[#D8B4FE]/25 bg-[#F3E8FF] dark:bg-[#2B1C3D]">
              <ResilientImage
                src={PROFILE.heroPhotoPath}
                alt={PROFILE.heroPhotoAlt}
                loading="lazy"
                className="h-full w-full object-cover"
                fallbackTitle="GC"
              />
            </div>

            <div>
              <h3 className="font-display text-xl font-bold text-[#21152F] dark:text-[#F3E8FF]">
                {PROFILE.resume.title}
              </h3>
              <p className="text-sm text-[#4A3B5C] dark:text-[#D8B4FE]">
                {PROFILE.resume.subtitle} · {PROFILE.resume.institution}
              </p>
              <p className="mt-1 inline-flex items-center gap-1.5 font-mono-code text-xs text-[#6B21A8] dark:text-[#C084FC]">
                <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{PROFILE.resume.fileName}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {PROFILE.resume.filePath ? (
              <>
                <a
                  href={PROFILE.resume.filePath}
                  download={PROFILE.resume.fileName}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#6B21A8] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#9333EA] dark:bg-[#D8B4FE] dark:text-[#21152F] dark:hover:bg-[#C084FC] whitespace-nowrap shrink-0"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  <span>Download PDF</span>
                </a>

                <a
                  href={PROFILE.resume.filePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-[#21152F]/20 dark:border-[#D8B4FE]/30 bg-transparent px-4 py-2.5 text-sm font-semibold text-[#21152F] dark:text-[#F3E8FF] hover:border-[#6B21A8] dark:hover:border-[#C084FC] whitespace-nowrap shrink-0"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  <span>View Online</span>
                </a>
              </>
            ) : (
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="inline-flex items-center gap-2 rounded-lg border border-[#21152F]/20 dark:border-[#D8B4FE]/30 bg-[#F3E8FF] dark:bg-[#2B1C3D] px-4 py-2.5 text-sm font-semibold text-[#4A3B5C] dark:text-[#D8B4FE] opacity-80 cursor-not-allowed whitespace-nowrap shrink-0"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                <span>Download Resume (NEEDS CONFIRMATION)</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
