import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Moon, Sun, X } from 'lucide-react';
import type { Theme } from '../hooks/useTheme';

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
  activeSection: string;
}

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'labs', label: 'Labs' },
  { id: 'certifications', label: 'Certifications' },
];

export function Navbar({ theme, onToggleTheme, activeSection }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const burgerRef = useRef<HTMLButtonElement | null>(null);
  const isHome = location.pathname === '/';

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        burgerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  const handleSectionClick = (sectionId: string) => {
    setMobileOpen(false);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isHome) {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
        window.history.replaceState(null, '', `/#${sectionId}`);
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#21152F]/10 dark:border-[#D8B4FE]/15 bg-[#FAF7FD]/92 dark:bg-[#180F24]/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand */}
        <Link
          to="/"
          onClick={() => {
            if (isHome) {
              const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
              window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
            }
          }}
          className="font-display text-lg font-extrabold tracking-tight text-[#21152F] dark:text-[#F3E8FF] whitespace-nowrap shrink-0"
        >
          Gian Carlo
        </Link>

        {/* Zone 2: Primary Navigation (4-5 clean links) */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => {
            const active = isHome && activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSectionClick(item.id)}
                aria-current={active ? 'location' : undefined}
                className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                  active
                    ? 'text-[#6B21A8] dark:text-[#C084FC]'
                    : 'text-[#4A3B5C] hover:text-[#21152F] dark:text-[#D8B4FE] dark:hover:text-[#F3E8FF]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute right-0 -bottom-0.5 left-0 h-0.5 rounded-full bg-[#6B21A8] dark:bg-[#C084FC] transition-transform duration-200 origin-left ${
                    active ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Theme Toggle + Primary Action + Mobile Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={theme === 'dark'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#21152F]/14 dark:border-[#D8B4FE]/20 bg-[#FFFFFF] dark:bg-[#21152F] text-[#21152F] dark:text-[#F3E8FF] hover:border-[#6B21A8] dark:hover:border-[#C084FC] cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4" aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            onClick={() => handleSectionClick('contact')}
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#6B21A8] px-4 py-2 text-sm font-semibold text-white hover:bg-[#9333EA] dark:bg-[#D8B4FE] dark:text-[#21152F] dark:hover:bg-[#C084FC] whitespace-nowrap shrink-0 cursor-pointer"
          >
            Contact
          </button>

          <button
            ref={burgerRef}
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#21152F]/14 dark:border-[#D8B4FE]/20 bg-[#FFFFFF] dark:bg-[#21152F] text-[#21152F] dark:text-[#F3E8FF] md:hidden cursor-pointer"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-[#21152F]/10 dark:border-[#D8B4FE]/15 bg-[#FAF7FD] dark:bg-[#180F24] px-4 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {[...NAV_ITEMS, { id: 'resume', label: 'Resume' }, { id: 'contact', label: 'Contact' }].map(
              (item) => {
                const active = isHome && activeSection === item.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => handleSectionClick(item.id)}
                      aria-current={active ? 'location' : undefined}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-base font-medium cursor-pointer ${
                        active
                          ? 'bg-[#F3E8FF] text-[#6B21A8] dark:bg-[#2B1C3D] dark:text-[#C084FC]'
                          : 'text-[#21152F] hover:bg-[#F3E8FF]/60 dark:text-[#F3E8FF] dark:hover:bg-[#21152F]'
                      }`}
                    >
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              },
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}
