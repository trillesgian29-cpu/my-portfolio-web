import { useEffect, useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Copy, Mail, Send } from 'lucide-react';
import { PROFILE } from '../../data/profile';
import { SectionHeader } from '../SectionHeader';

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

async function copyTextSafe(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall back to execCommand below when iframe clipboard permission is restricted
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

export function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('Project Collaboration');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const emailLink = PROFILE.socialLinks.find((item) => item.id === 'email');
  const recipientAddress = emailLink?.displayValue ?? '';
  const mailtoBaseHref = emailLink?.href ?? `mailto:${recipientAddress}`;
  const gmailComposeHref = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(
    recipientAddress,
  )}`;
  const externalLinks = PROFILE.socialLinks.filter((item) => item.id !== 'email');

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2500);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleCopyEmail = async () => {
    if (!recipientAddress) return;
    const ok = await copyTextSafe(recipientAddress);
    if (ok) {
      setCopied(true);
    } else {
      setStatusMessage(`Copy blocked by browser — please copy manually: ${recipientAddress}`);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors: FormErrors = {};

    if (!name.trim()) nextErrors.name = 'Please enter your name.';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!subject.trim()) nextErrors.subject = 'Please enter a subject.';
    if (!message.trim()) nextErrors.message = 'Please enter a message.';

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatusMessage('Please review the highlighted fields before sending.');
      return;
    }

    const formattedSubject = `[${inquiryType}] ${subject.trim()}`;
    const formattedBody = `Name: ${name.trim()}\nReply-To: ${email.trim()}\nInquiry Type: ${inquiryType}\n\n${message.trim()}`;
    const mailtoUrl = `${mailtoBaseHref}?subject=${encodeURIComponent(
      formattedSubject,
    )}&body=${encodeURIComponent(formattedBody)}`;

    window.location.href = mailtoUrl;
    setStatusMessage(
      `Prepared email draft to ${recipientAddress} (opens your email app). If no email app opens, use Copy email or Open in Gmail.`,
    );
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-[#FFFFFF] dark:bg-[#21152F] py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          headingId="contact-heading"
          kicker="Contact"
          title="Get in Touch"
          subtitle="Open to engineering collaborations, technical inquiries, and professional connections."
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left column: Verified GitHub, LinkedIn, Email + Copy/Mailto/Gmail options */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            <p className="text-sm leading-relaxed text-[#4A3B5C] dark:text-[#D8B4FE]">
              You can reach me directly via email or connect through GitHub and LinkedIn.
            </p>

            <ul className="space-y-3">
              {externalLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio-card flex items-center justify-between gap-3 rounded-xl px-4 py-3.5"
                  >
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#6B21A8] dark:text-[#C084FC]">
                        {link.label}
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-[#21152F] dark:text-[#F3E8FF] break-all">
                        {link.displayValue}
                      </p>
                    </div>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-[#6B21A8] dark:text-[#C084FC]"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}

              {recipientAddress && (
                <li className="rounded-xl border border-[#21152F]/11 dark:border-[#D8B4FE]/15 bg-[#FFFFFF] dark:bg-[#21152F] px-4 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#6B21A8] dark:text-[#C084FC]">
                        Email
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-[#21152F] dark:text-[#F3E8FF] break-all">
                        {recipientAddress}
                      </p>
                    </div>
                    <Mail
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#6B21A8] dark:text-[#C084FC]"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-[#21152F]/10 dark:border-[#D8B4FE]/15 pt-3">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#21152F]/20 dark:border-[#D8B4FE]/30 bg-[#FAF7FD] dark:bg-[#180F24] px-3 py-1.5 text-xs font-semibold text-[#21152F] dark:text-[#F3E8FF] hover:border-[#6B21A8] dark:hover:border-[#C084FC] cursor-pointer"
                    >
                      {copied ? (
                        <Check
                          className="h-3.5 w-3.5 text-[#6B21A8] dark:text-[#C084FC]"
                          aria-hidden="true"
                        />
                      ) : (
                        <Copy
                          className="h-3.5 w-3.5 text-[#6B21A8] dark:text-[#C084FC]"
                          aria-hidden="true"
                        />
                      )}
                      <span>{copied ? 'Copied' : 'Copy email'}</span>
                    </button>

                    <a
                      href={mailtoBaseHref}
                      className="inline-flex items-center gap-1 rounded-lg border border-[#21152F]/20 dark:border-[#D8B4FE]/30 bg-[#FAF7FD] dark:bg-[#180F24] px-3 py-1.5 text-xs font-semibold text-[#6B21A8] dark:text-[#C084FC] hover:border-[#6B21A8] dark:hover:border-[#C084FC]"
                    >
                      <span>Send email</span>
                    </a>

                    <a
                      href={gmailComposeHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg bg-[#6B21A8] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#9333EA] dark:bg-[#D8B4FE] dark:text-[#21152F] dark:hover:bg-[#C084FC]"
                    >
                      <span>Open in Gmail</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </li>
              )}
            </ul>
          </div>

          {/* Right column: Accessible Contact Form (mailto) */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-2xl border border-[#21152F]/12 dark:border-[#D8B4FE]/20 bg-[#FAF7FD] dark:bg-[#180F24] p-6 sm:p-8 lg:col-span-7"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-semibold uppercase tracking-wide text-[#4A3B5C] dark:text-[#D8B4FE]"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  placeholder="Your name"
                  className="mt-1.5 w-full rounded-lg border border-[#21152F]/18 dark:border-[#D8B4FE]/25 bg-[#FFFFFF] dark:bg-[#21152F] px-3.5 py-2.5 text-sm text-[#21152F] dark:text-[#F3E8FF] placeholder:text-[#4A3B5C]/70 dark:placeholder:text-[#D8B4FE]/60"
                />
                {errors.name && (
                  <p id="contact-name-error" className="mt-1 text-xs font-medium text-[#6B21A8] dark:text-[#C084FC]">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-semibold uppercase tracking-wide text-[#4A3B5C] dark:text-[#D8B4FE]"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  placeholder="you@example.com"
                  className="mt-1.5 w-full rounded-lg border border-[#21152F]/18 dark:border-[#D8B4FE]/25 bg-[#FFFFFF] dark:bg-[#21152F] px-3.5 py-2.5 text-sm text-[#21152F] dark:text-[#F3E8FF] placeholder:text-[#4A3B5C]/70 dark:placeholder:text-[#D8B4FE]/60"
                />
                {errors.email && (
                  <p id="contact-email-error" className="mt-1 text-xs font-medium text-[#6B21A8] dark:text-[#C084FC]">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="contact-type"
                className="block text-xs font-semibold uppercase tracking-wide text-[#4A3B5C] dark:text-[#D8B4FE]"
              >
                Inquiry Type
              </label>
              <select
                id="contact-type"
                value={inquiryType}
                onChange={(e) => setInquiryType(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-[#21152F]/18 dark:border-[#D8B4FE]/25 bg-[#FFFFFF] dark:bg-[#21152F] px-3.5 py-2.5 text-sm text-[#21152F] dark:text-[#F3E8FF]"
              >
                <option value="Project Collaboration">Project Collaboration</option>
                <option value="Engineering Inquiry">Engineering Inquiry</option>
                <option value="General Inquiry">General Inquiry</option>
              </select>
            </div>

            <div className="mt-4">
              <label
                htmlFor="contact-subject"
                className="block text-xs font-semibold uppercase tracking-wide text-[#4A3B5C] dark:text-[#D8B4FE]"
              >
                Subject
              </label>
              <input
                id="contact-subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                placeholder="Collaboration or technical question"
                className="mt-1.5 w-full rounded-lg border border-[#21152F]/18 dark:border-[#D8B4FE]/25 bg-[#FFFFFF] dark:bg-[#21152F] px-3.5 py-2.5 text-sm text-[#21152F] dark:text-[#F3E8FF] placeholder:text-[#4A3B5C]/70 dark:placeholder:text-[#D8B4FE]/60"
              />
              {errors.subject && (
                <p id="contact-subject-error" className="mt-1 text-xs font-medium text-[#6B21A8] dark:text-[#C084FC]">
                  {errors.subject}
                </p>
              )}
            </div>

            <div className="mt-4">
              <label
                htmlFor="contact-message"
                className="block text-xs font-semibold uppercase tracking-wide text-[#4A3B5C] dark:text-[#D8B4FE]"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                placeholder="Write your message..."
                className="mt-1.5 w-full rounded-lg border border-[#21152F]/18 dark:border-[#D8B4FE]/25 bg-[#FFFFFF] dark:bg-[#21152F] px-3.5 py-2.5 text-sm text-[#21152F] dark:text-[#F3E8FF] placeholder:text-[#4A3B5C]/70 dark:placeholder:text-[#D8B4FE]/60"
              />
              {errors.message && (
                <p id="contact-message-error" className="mt-1 text-xs font-medium text-[#6B21A8] dark:text-[#C084FC]">
                  {errors.message}
                </p>
              )}
            </div>

            {statusMessage && (
              <p
                role="status"
                aria-live="polite"
                className="mt-4 rounded-lg border border-[#6B21A8]/25 dark:border-[#C084FC]/30 bg-[#F3E8FF] dark:bg-[#2B1C3D] px-4 py-2.5 text-sm text-[#21152F] dark:text-[#F3E8FF]"
              >
                {statusMessage}
              </p>
            )}

            <button
              type="submit"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#6B21A8] px-5 py-3 text-sm font-semibold text-white hover:bg-[#9333EA] dark:bg-[#D8B4FE] dark:text-[#21152F] dark:hover:bg-[#C084FC] cursor-pointer"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              <span>Compose Email</span>
            </button>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[#4A3B5C] dark:text-[#D8B4FE]">
              <p>Submitting builds a mailto draft and opens your email app.</p>
              {recipientAddress && (
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="font-semibold text-[#6B21A8] hover:underline dark:text-[#C084FC] cursor-pointer"
                  >
                    {copied ? 'Copied' : 'Copy email'}
                  </button>
                  <span aria-hidden="true">·</span>
                  <a
                    href={gmailComposeHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#6B21A8] hover:underline dark:text-[#C084FC]"
                  >
                    Open in Gmail
                  </a>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
