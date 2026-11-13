interface SectionHeaderProps {
  kicker: string;
  title: string;
  subtitle?: string;
  headingId: string;
}

export function SectionHeader({ kicker, title, subtitle, headingId }: SectionHeaderProps) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="mb-2 font-mono-code text-xs font-medium tracking-wider uppercase text-[#6B21A8] dark:text-[#C084FC]">
        {kicker}
      </p>
      <h2
        id={headingId}
        className="font-display text-3xl font-bold tracking-tight text-[#21152F] dark:text-[#F3E8FF] sm:text-4xl"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base text-[#4A3B5C] dark:text-[#D8B4FE]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
