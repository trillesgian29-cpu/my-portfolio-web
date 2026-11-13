export interface SocialLinkItem {
  id: 'github' | 'linkedin' | 'email';
  label: string;
  displayValue: string;
  href: string;
  external: boolean;
}

export interface ProfileData {
  name: string;
  academicStatus: string;
  degree: string;
  institution: string;
  location: string;
  tagline: string;
  heroSummary: string;
  aboutHeading: string;
  aboutParagraphs: string[];
  heroPhotoPath: string;
  heroPhotoAlt: string;
  aboutPhotoPath: string;
  aboutPhotoAlt: string;
  stats: Array<{
    value: string;
    label: string;
  }>;
  focusStatementTitle: string;
  focusStatement: string;
  resume: {
    title: string;
    subtitle: string;
    institution: string;
    filePath: string | null;
    fileName: string;
  };
  socialLinks: SocialLinkItem[];
}

export const PROFILE: ProfileData = {
  name: 'Gian Carlo',
  academicStatus: '4th Year Computer Engineering Student',
  degree: 'Bachelor of Science in Computer Engineering (BSCpE)',
  institution: 'Bicol University Polangui Campus',
  location: 'Philippines',
  tagline: 'Building Intelligent Systems Through Engineering.',
  heroSummary:
    'Computer Engineering student focused on embedded systems, software development, and IoT — building reliable hardware-software solutions through hands-on engineering.',
  aboutHeading: '4th Year Computer Engineering Student',
  aboutParagraphs: [
    'I am a 4th year Bachelor of Science in Computer Engineering (BSCpE) student at Bicol University Polangui Campus, with a solid foundation in electronics, programming, networking, and embedded systems.',
    'My coursework spans the full BSCpE curriculum, including Mathematics, Natural Sciences, Basic Engineering Sciences, and Allied and Professional courses. I am passionate about leveraging technology to solve practical problems and thrive in multidisciplinary team environments.',
  ],
  heroPhotoPath: '/1769129128431-1.jpg',
  heroPhotoAlt: 'Portrait of Gian Carlo, Computer Engineering student',
  aboutPhotoPath: '/Picture_Resume.png',
  aboutPhotoAlt: 'Gian Carlo formal portrait photo',
  stats: [
    { value: '4th', label: 'Year BSCpE' },
    { value: '9', label: 'Featured Projects' },
    { value: '9', label: 'Engineering Labs' },
    { value: '13', label: 'Certifications' },
  ],
  focusStatementTitle: 'Engineering Focus',
  focusStatement:
    'Applying principles across embedded systems, software engineering, and computer networks to design, test, and document practical computing systems.',
  resume: {
    title: 'Gian Carlo',
    subtitle: 'BS Computer Engineering Student · 4th Year',
    institution: 'Bicol University Polangui Campus',
    filePath: '/Gian_Carlo_Trilles_Public_Resume.pdf',
    fileName: 'Gian_Carlo_Trilles_Public_Resume.pdf',
  },
  socialLinks: [
    {
      id: 'github',
      label: 'GitHub',
      displayValue: 'github.com/trillesgian29-cpu',
      href: 'https://github.com/trillesgian29-cpu',
      external: true,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      displayValue: 'linkedin.com/in/gian-trilles',
      href: 'https://www.linkedin.com/in/gian-trilles/?skipRedirect=true',
      external: true,
    },
    {
      id: 'email',
      label: 'Email',
      displayValue: 'trillesgian29@gmail.com',
      href: 'mailto:trillesgian29@gmail.com',
      external: false,
    },
  ],
};
