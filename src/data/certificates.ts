export interface CertificateItem {
  id: string;
  category?: string;
  title: string;
  issuer: string;
  date: string | null;
  skills: string[];
  filePath: string;
  fileType: 'pdf' | 'image';
}

export const CERTIFICATES: CertificateItem[] = [
  {
    id: 'python-essentials-1',
    title: 'Python Essentials 1',
    issuer: 'DICT Sorsogon',
    date: null,
    skills: ['Python', 'Programming', 'Problem Solving'],
    filePath: '/PythonEssential1.pdf',
    fileType: 'pdf',
  },
  {
    id: 'cpp-essentials-1',
    title: 'C++ Essentials 1',
    issuer: 'C++ Institute',
    date: 'Feb 3 – Apr 3',
    skills: ['C++', 'OOP', 'Data Structures'],
    filePath: '/C--_Essentials_1_certificate.pdf',
    fileType: 'pdf',
  },
  {
    id: 'electronic-communication-tech',
    title: 'Electronic Communication & Technology',
    issuer: 'Webinar Certificate',
    date: null,
    skills: ['Electronics', 'Communication', 'Technology'],
    filePath: '/ElectronnicsCommunication.pdf',
    fileType: 'pdf',
  },
  {
    id: 'practical-ai-daily-use',
    title: 'Practical Application of AI for Daily Use',
    issuer: 'Albay Institute for Artificial Intelligence',
    date: 'Feb 7 — Albay',
    skills: ['Artificial Intelligence', 'AI Tools', 'Productivity'],
    filePath: '/certificate_practical_application_of_ai_for_daily_use.jpg',
    fileType: 'image',
  },
  {
    id: 'fundamentals-mobile-tech',
    title: 'Fundamentals of Mobile Technology',
    issuer: 'DICT Region 2 — Webinar',
    date: null,
    skills: ['Mobile Tech', 'Networking', 'ICT'],
    filePath: '/FundamentalOfMobileTechnology.pdf',
    fileType: 'pdf',
  },
  {
    id: 'cisco-packet-tracer',
    title: 'Getting Started with Cisco Packet Tracer',
    issuer: 'Cisco Networking Academy (NetAcad)',
    date: null,
    skills: ['Packet Tracer', 'Networking', 'Cisco'],
    filePath: '/GettingStartedWithPacketTracer.pdf',
    fileType: 'pdf',
  },
  {
    id: 'icpep-congress-byte2025',
    title: 'ICpEP National CPE Student Congress',
    issuer: 'BYTE2025: Building Young Tech Experts for a Smarter Future',
    date: 'May 8–9, 2025',
    skills: ['Engineering', 'Leadership', 'Networking'],
    filePath: '/certiificate_national_ICEpEP_challenge.jpg',
    fileType: 'image',
  },
  {
    id: 'work-smarter-ai',
    title: 'Work Smarter, Not Harder: Optimize Work with AI',
    issuer: 'DICT CAR ILCDB Webinar',
    date: 'Jan 28, 2026',
    skills: ['AI Tools', 'Productivity', 'Digital Skills'],
    filePath: '/WorkSmarterNotHarder.pdf',
    fileType: 'pdf',
  },
  {
    id: 'intro-data-science',
    title: 'Introduction to Data Science',
    issuer: 'DICT Training',
    date: '2025',
    skills: ['Data Science', 'Python', 'Analytics'],
    filePath: '/Introduction_to_Data_Science_certificate.pdf',
    fileType: 'pdf',
  },
  {
    id: 'data-analytics-essentials',
    title: 'Data Analytics Essentials',
    issuer: 'DICT Training',
    date: '2025',
    skills: ['Data Analytics', 'Visualization', 'Problem Solving'],
    filePath: '/Data_Analytics_Essentials_certificate.pdf',
    fileType: 'pdf',
  },
  {
    id: 'intro-embedded-design',
    title: 'Introduction to Embedded Design',
    issuer: 'Alison Online Course',
    date: '2025',
    skills: ['Embedded Systems', 'Circuit Design', 'Microcontrollers'],
    filePath: '/Introduction_to_EmbeddeDesign.png',
    fileType: 'image',
  },
  {
    id: 'network-addressing-troubleshooting',
    title: 'Network Addressing & Basic Troubleshooting',
    issuer: 'DICT-ITU DTC Initiative',
    date: 'Feb 9 – Feb 28, 2026',
    skills: ['IP Addressing', 'Troubleshooting', 'Networking'],
    filePath: '/Network_Addressing_and_Basic_Troubleshooting_certificate.pdf',
    fileType: 'pdf',
  },
  {
    id: 'ml-in-ai-beginners',
    category: 'AI / Machine Learning',
    title: 'Machine Learning in Artificial Intelligence for Beginners',
    issuer: 'Ethel Programming Computer Programming Services',
    date: 'January 28, 2026',
    skills: ['Machine Learning', 'Artificial Intelligence', 'Webinar'],
    filePath: '/machineLearningInAI.pdf',
    fileType: 'pdf',
  },
];
