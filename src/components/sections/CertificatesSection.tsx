import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Eye, X } from 'lucide-react';
import { CERTIFICATES, type CertificateItem } from '../../data/certificates';
import { ResilientImage } from '../ResilientImage';
import { SectionHeader } from '../SectionHeader';

export function CertificatesSection() {
  const [previewCert, setPreviewCert] = useState<CertificateItem | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!previewCert) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPreviewCert(null);
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      lastTriggerRef.current?.focus();
    };
  }, [previewCert]);

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="border-b border-[#21152F]/10 dark:border-[#D8B4FE]/15 bg-[#FFFFFF] dark:bg-[#21152F] py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          headingId="certifications-heading"
          kicker="Credentials"
          title="Certifications & Trainings"
          subtitle="Verified courses, workshops, and technical trainings complementing academic coursework."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATES.map((cert) => (
            <article
              key={cert.id}
              className="portfolio-card flex flex-col justify-between rounded-2xl p-6"
            >
              <div>
                <p className="font-mono-code text-xs text-[#6B21A8] dark:text-[#C084FC] tabular-nums">
                  {cert.category ? `${cert.category} · ` : ''}
                  {cert.date ?? 'Date not specified'} · {cert.fileType.toUpperCase()}
                </p>

                <h3 className="mt-2 font-display text-lg font-bold text-[#21152F] dark:text-[#F3E8FF]">
                  {cert.title}
                </h3>

                <p className="mt-1 text-sm text-[#4A3B5C] dark:text-[#D8B4FE]">
                  {cert.issuer}
                </p>
              </div>

              <div className="mt-5 border-t border-[#21152F]/10 dark:border-[#D8B4FE]/15 pt-4">
                <p className="text-xs text-[#4A3B5C] dark:text-[#D8B4FE]">
                  {cert.skills.join(' · ')}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-4">
                  {cert.fileType === 'image' ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        lastTriggerRef.current = e.currentTarget;
                        setPreviewCert(cert);
                      }}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6B21A8] hover:underline dark:text-[#C084FC] cursor-pointer"
                    >
                      <Eye className="h-4 w-4" aria-hidden="true" />
                      <span>Preview Certificate</span>
                    </button>
                  ) : (
                    <a
                      href={cert.filePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${cert.title} certificate PDF`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#6B21A8] hover:underline dark:text-[#C084FC]"
                    >
                      <span>View Certificate (PDF)</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Image Certificate Preview Modal */}
      {previewCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#180F24]/80 p-4 backdrop-blur-sm"
          onClick={() => setPreviewCert(null)}
        >
          <div
            ref={modalRef}
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-[#21152F]/15 dark:border-[#D8B4FE]/25 bg-[#FFFFFF] dark:bg-[#21152F] p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#21152F]/10 dark:border-[#D8B4FE]/15 pb-3">
              <div>
                <h3
                  id="cert-modal-title"
                  className="font-display text-lg font-bold text-[#21152F] dark:text-[#F3E8FF]"
                >
                  {previewCert.title}
                </h3>
                <p className="text-sm text-[#4A3B5C] dark:text-[#D8B4FE]">
                  {previewCert.issuer}
                  {previewCert.date ? ` · ${previewCert.date}` : ''}
                </p>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setPreviewCert(null)}
                aria-label="Close certificate preview"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#21152F]/15 dark:border-[#D8B4FE]/25 text-[#21152F] dark:text-[#F3E8FF] hover:border-[#6B21A8] dark:hover:border-[#C084FC] cursor-pointer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-[#21152F]/10 dark:border-[#D8B4FE]/15 bg-[#FAF7FD] dark:bg-[#180F24]">
              <ResilientImage
                src={previewCert.filePath}
                alt={`${previewCert.title} certificate from ${previewCert.issuer}`}
                loading="eager"
                className="max-h-[70vh] w-full object-contain"
                fallbackTitle={previewCert.title}
                fallbackNote={`Expected file: ${previewCert.filePath.replace('/', '')}`}
              />
            </div>

            <div className="mt-4 flex justify-end">
              <a
                href={previewCert.filePath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6B21A8] hover:underline dark:text-[#C084FC]"
              >
                <span>Open original file</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
