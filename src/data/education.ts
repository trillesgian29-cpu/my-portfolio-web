export interface EducationEntry {
  id: string;
  period: string;
  program: string;
  institution: string;
  statusLabel: string;
  description: string;
}

export const EDUCATION: EducationEntry[] = [
  {
    id: 'bscpe-bicol-university',
    period: '2026 – Present',
    program: 'BS Computer Engineering (BSCpE)',
    institution: 'Bicol University Polangui Campus',
    statusLabel: '4th Year Student',
    description:
      'Pursuing a BSCpE degree with coursework covering embedded systems, computer networks, digital electronics, signal processing, software engineering, and database management. Actively participating in webinars, national congresses, and DICT training programs to supplement academic learning.',
  },
  {
    id: 'css-manito-nhs',
    period: '2023',
    program: 'Computer Systems Servicing (CSS)',
    institution: 'Manito National High School',
    statusLabel: 'Senior High School',
    description:
      'Completed the Technical-Vocational track with a specialization in Computer Systems Servicing. Gained hands-on skills in computer hardware assembly and disassembly, OS installation and configuration, network setup, and basic troubleshooting — laying a strong practical foundation for computer engineering.',
  },
];
