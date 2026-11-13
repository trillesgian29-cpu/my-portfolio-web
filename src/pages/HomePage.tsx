import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AboutSection } from '../components/sections/AboutSection';
import { CertificatesSection } from '../components/sections/CertificatesSection';
import { ContactSection } from '../components/sections/ContactSection';
import { HeroSection } from '../components/sections/HeroSection';
import { LabsSection } from '../components/sections/LabsSection';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { ResumeSection } from '../components/sections/ResumeSection';
import { SkillsSection } from '../components/sections/SkillsSection';

interface HomePageProps {
  onActiveSectionChange: (sectionId: string) => void;
}

const SECTION_IDS = [
  'hero',
  'about',
  'skills',
  'projects',
  'labs',
  'certifications',
  'resume',
  'contact',
];

export function HomePage({ onActiveSectionChange }: HomePageProps) {
  const location = useLocation();

  useEffect(() => {
    document.title = 'Gian Carlo — Computer Engineering Portfolio';
  }, []);

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location.hash]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          onActiveSectionChange(visible[0].target.id);
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      },
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [onActiveSectionChange]);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <LabsSection />
      <CertificatesSection />
      <ResumeSection />
      <ContactSection />
    </>
  );
}
