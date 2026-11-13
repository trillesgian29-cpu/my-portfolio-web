export type ProjectCategory = 'software' | 'network' | 'embedded' | 'hardware' | 'ai';

export interface ProjectItem {
  slug: string;
  order: string;
  title: string;
  category: ProjectCategory;
  typeLabel: string;
  description: string;
  techStack: string[];
  githubUrl: string | null;
  demoUrl: string | null;
  demoLabel: string | null;
}

export const PROJECT_CATEGORIES: Array<{ id: 'all' | ProjectCategory; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'software', label: 'Software' },
  { id: 'network', label: 'Network' },
  { id: 'embedded', label: 'Embedded' },
  { id: 'hardware', label: 'Hardware' },
  { id: 'ai', label: 'AI' },
];

export const PROJECTS: ProjectItem[] = [
  {
    slug: 'portfolio-website',
    order: '01',
    title: 'Portfolio Website',
    category: 'software',
    typeLabel: 'Software',
    description:
      'Designed and developed a personal portfolio website to showcase academic projects, certifications, laboratory activities, and skills. Built with clean HTML, CSS, and JavaScript — fully responsive and optimized for viewing on desktop and mobile.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    githubUrl: 'https://github.com/trillesgian29-cpu/MyyPortfolio/',
    demoUrl: 'https://trillesgian29-cpu.github.io/MyyPortfolio/',
    demoLabel: 'Live Site',
  },
  {
    slug: 'vlsm-calculator-cisco-cli',
    order: '02',
    title: 'VLSM Calculator with Cisco CLI Generator',
    category: 'software',
    typeLabel: 'Software',
    description:
      'Designed and developed a fully offline, browser-based VLSM (Variable Length Subnet Masking) calculator that automatically generates complete Cisco IOS router configurations. Supports Static Routing, RIP v2, OSPF, and EIGRP with Bus/Linear and Ring topology WAN link auto-generation — ready to paste directly into Packet Tracer.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Cisco IOS', 'Networking'],
    githubUrl: 'https://github.com/trillesgian29-cpu/',
    demoUrl: 'https://vlsm-calculator-beta.vercel.app/',
    demoLabel: 'Live Site',
  },
  {
    slug: 'networking-laboratory-activities',
    order: '03',
    title: 'Networking Laboratory Activities',
    category: 'network',
    typeLabel: 'Network',
    description:
      'Compiled 19 networking laboratory activities across 4 weeks using Cisco Packet Tracer. Covered network topologies, OSI & TCP/IP models, DNS & HTTP client-server interactions, TCP/UDP transport layer operations, and IP routing with static and dynamic protocols (RIP).',
    techStack: [
      'Cisco Packet Tracer',
      'OSI & TCP/IP',
      'ARP · ICMP',
      'DNS · HTTP',
      'TCP · UDP',
      'IP Routing',
      'Static · RIP',
    ],
    githubUrl: 'https://trillesgian29-cpu.github.io/networking-lab',
    demoUrl: 'https://trillesgian29-cpu.github.io/networking-lab/',
    demoLabel: 'View Activities',
  },
  {
    slug: 'microprocessor-laboratory-experiments',
    order: '04',
    title: 'Microprocessor Laboratory Experiments',
    category: 'embedded',
    typeLabel: 'Embedded',
    description:
      'A 9-part Arduino-based laboratory series applying BSCpE embedded systems concepts. Covered GPIO control, sensor interfacing, ADC conversion, LCD display integration, and multi-threshold automation. Key projects include a drag race traffic light simulation, smart temperature alarm, and an integrated environmental monitoring system combining LM35, potentiometer, 3x3 LED matrix, and buzzer alerts.',
    techStack: ['Arduino Uno', 'C++ (Arduino IDE)', 'GPIO', 'ADC', 'Sensors', 'LCD', 'Buzzer'],
    githubUrl: 'https://github.com/trillesgian29-cpu/Microprocessor-Laboratory',
    demoUrl: 'https://github.com/trillesgian29-cpu/Microprocessor-Laboratory/blob/main/README.md',
    demoLabel: 'View Labs',
  },
  {
    slug: 'pcb-design-easyeda',
    order: '05',
    title: 'PCB Design in EasyEDA',
    category: 'hardware',
    typeLabel: 'Hardware',
    description:
      'Designed printed circuit boards using EasyEDA. Created schematics, routed traces, and generated Gerber files for fabrication. Tested circuits for embedded systems projects.',
    techStack: ['EasyEDA', 'PCB Design', 'Gerber Files', 'Hardware Testing'],
    githubUrl: 'https://github.com/trillesgian29-cpu/Pre-Amplifier-Circuit.git',
    demoUrl: '/Pre-amp_TrillesGianCarlo_2a.pdf',
    demoLabel: 'View PDF',
  },
  {
    slug: 'regulated-power-supply',
    order: '06',
    title: 'Regulated Power Supply Project',
    category: 'hardware',
    typeLabel: 'Electronics',
    description:
      'Built a regulated DC power supply with transformer, rectifier, filter, and regulator stages. Tested voltage stability and implemented safety features for reliable operation.',
    techStack: ['Electronics', 'Power Systems', 'Rectifier', 'Voltage Regulation'],
    githubUrl: 'https://github.com/trillesgian29-cpu/group-power-supply-build.repo.git',
    demoUrl: 'https://drive.google.com/file/d/1IPfjQHo1qnjhI7tn5lbC3KwlXV2Xkx-R/view?usp=sharing',
    demoLabel: 'View Report',
  },
  {
    slug: 'logic-circuits-experiments',
    order: '07',
    title: 'Logic Circuits Experiments',
    category: 'hardware',
    typeLabel: 'Digital Logic',
    description:
      'This repository documents laboratory experiments in Computer Engineering. Starting from Boolean expressions, I constructed truth tables, designed logic circuits, simulated them in AutoCAD, simplified using Karnaugh Maps (K-map), converted designs into NAND-only implementations, and tested circuits using ICs in the lab.',
    techStack: ['Boolean Algebra', 'AutoCAD', 'K-map', 'NAND Implementation', 'IC Testing'],
    githubUrl: 'https://github.com/trillesgian29-cpu/EmbeddedSystems-LogicCircuitExperiment.git',
    demoUrl: null,
    demoLabel: null,
  },
  {
    slug: 'dsa-machine-problems',
    order: '08',
    title: 'Data Structures & Algorithms Machine Problems',
    category: 'software',
    typeLabel: 'Algorithms',
    description:
      'Completed multiple machine problems (MPs) in Data Structures and Algorithms: Sorting algorithms (bubble, insertion, selection, merge, quick), array operations (1D and 2D), linked lists (singly, doubly, circular), and a Python simulation to detect a defective machine in a factory dataset.',
    techStack: ['Python', 'Sorting', 'Arrays', 'Linked Lists', 'Simulation'],
    githubUrl: 'https://github.com/trillesgian29-cpu/dsa-machine-problems.git',
    demoUrl: null,
    demoLabel: null,
  },
  {
    slug: 'permit-tracker-barangay',
    order: '09',
    title: 'Permit Tracker in Barangay',
    category: 'ai',
    typeLabel: 'AI Prototype',
    description:
      'Developed an offline AI prototype for tracking barangay permits with structured datasets. Designed to run locally but can be extended for online deployment, demonstrating applied AI concepts in community governance and record management.',
    techStack: ['AI Applications', 'Data Processing', 'Embedded Systems', 'Community Tech'],
    githubUrl: 'https://github.com/trillesgian29-cpu/Barangay-Permit-Tracker.git',
    demoUrl: 'https://trillesgian29-cpu.github.io/Barangay-Permit-Tracker/permit-tracker.html',
    demoLabel: 'View Demo',
  },
];
