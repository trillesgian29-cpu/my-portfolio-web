import { useEffect, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { PROFILE } from '../data/profile';

async function copyFooterEmail(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback for sandboxed iframes without clipboard-write permission
    }
  }
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

export function Footer() {
  const [copied, setCopied] = useState(false);

  const externalLinks = PROFILE.socialLinks.filter((item) => item.id !== 'email');
  const emailLink = PROFILE.socialLinks.find((item) => item.id === 'email');
  const emailAddress = emailLink?.displayValue ?? '';
  const mailtoHref = emailLink?.href ?? `mailto:${emailAddress}`;
  const gmailHref = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(emailAddress)}`;

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2500);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    if (!emailAddress) return;
    const ok = await copyFooterEmail(emailAddress);
    if (ok) setCopied(true);
  };

  return (
    <footer className="border-t border-[#21152F]/10 dark:border-[#D8B4FE]/15 bg-[#FFFFFF] dark:bg-[#180F24]">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-8 text-sm text-[#4A3B5C] dark:text-[#D8B4FE] lg:flex-row lg:items-center sm:px-6 lg:px-8">
        <p>
          {PROFILE.name} · {PROFILE.academicStatus} · {PROFILE.institution}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {externalLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#6B21A8] hover:underline dark:text-[#C084FC]"
            >
              {link.label}
            </a>
          ))}

          {emailAddress && (
            <>
              <span aria-hidden="true" className="text-[#4A3B5C]/40 dark:text-[#D8B4FE]/40">
                |
              </span>
              <span className="font-medium text-[#21152F] dark:text-[#F3E8FF]">
                {emailAddress}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 rounded border border-[#21152F]/20 dark:border-[#D8B4FE]/25 px-2.5 py-1 text-xs font-semibold text-[#21152F] dark:text-[#F3E8FF] hover:border-[#6B21A8] dark:hover:border-[#C084FC] cursor-pointer"
              >
                {copied ? (
                  <Check className="h-3 w-3 text-[#6B21A8] dark:text-[#C084FC]" aria-hidden="true" />
                ) : (
                  <Copy className="h-3 w-3 text-[#6B21A8] dark:text-[#C084FC]" aria-hidden="true" />
                )}
                <span>{copied ? 'Copied' : 'Copy email'}</span>
              </button>
              <a
                href={mailtoHref}
                className="font-medium text-[#6B21A8] hover:underline dark:text-[#C084FC]"
              >
                Send email
              </a>
              <a
                href={gmailHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#6B21A8] hover:underline dark:text-[#C084FC]"
              >
                Open in Gmail
              </a>
            </>
          )}
        </div>
      </div>
    </footer>
  );
}
