export interface SkillDomain {
  id:
    | 'electronics-hardware'
    | 'programming-software'
    | 'networking'
    | 'embedded-systems'
    | 'ai-applied-computing'
    | 'engineering-design-practice';
  index: string;
  title: string;
  items: string[];
}

export const SKILL_DOMAINS: SkillDomain[] = [
  {
    id: 'electronics-hardware',
    index: '01',
    title: 'Electronics & Hardware',
    items: [
      'Circuit Analysis (KVL/KCL)',
      'Analog Circuits',
      'Digital Logic',
      'Boolean Algebra · K-Map',
      'PCB Layout · EasyEDA',
      'Gerber Files · Hardware Testing',
      'Power Systems · Voltage Regulation',
      'Multisim / Proteus',
    ],
  },
  {
    id: 'programming-software',
    index: '02',
    title: 'Programming & Software',
    items: [
      'Python · Simulation',
      'C / C++',
      'Object-Oriented Programming',
      'Data Structures · Linked Lists',
      'Stacks · Queues · Binary Trees',
      'Algorithm Design · Sorting',
      'HTML · CSS · JavaScript',
      'Responsive Web Design',
    ],
  },
  {
    id: 'networking',
    index: '03',
    title: 'Networking',
    items: [
      'TCP/IP · OSI Model',
      'IP Addressing · VLSM',
      'Subnetting',
      'Cisco Packet Tracer',
      'VLAN · ACLs',
      'Static Routing',
      'RIP v2',
      'EIGRP',
      'OSPF',
      'Network Troubleshooting',
    ],
  },
  {
    id: 'embedded-systems',
    index: '04',
    title: 'Embedded Systems',
    items: [
      'Arduino Uno',
      'ESP32',
      'Microcontrollers',
      'GPIO & PWM Control',
      'Sensor Integration',
      'Interrupt Handling',
      'LCD Display · LED Matrix',
    ],
  },
  {
    id: 'ai-applied-computing',
    index: '05',
    title: 'AI & Applied Computing',
    items: [
      'AI Applications',
      'Barangay Permit Tracker',
      'Agri Soil Analyzer',
      'Data Processing',
      'Sensor Interfacing',
      'Community Tech Solutions',
    ],
  },
  {
    id: 'engineering-design-practice',
    index: '06',
    title: 'Engineering Design & Professional Practice',
    items: [
      'System Design',
      'Lab Experimentation',
      'Data Analysis',
      'MATLAB',
      'AutoCAD',
      'Engineering Reports',
      'Collaborative Work',
      'Technical Writing',
      'Oral Presentation',
      'Documentation',
      'Problem Solving',
      'Time Management',
    ],
  },
];

export const CURRICULUM_ALIGNMENT = {
  title: 'BSCpE Curriculum Alignment',
  description:
    'Skills developed through the Computer Engineering program at Bicol University Polangui Campus — covering Mathematics, Natural and Physical Sciences, Basic Engineering Sciences, and Allied & Professional Courses as prescribed by CHED. Core competencies include system design, experimental analysis, data interpretation, teamwork across disciplines, and application of modern engineering tools (aligned with ABET/CHED outcomes a–l).',
};
