export interface LabActivity {
  id: string;
  code: string;
  domain: string;
  title: string;
  description: string;
  tags: string[];
  outcome: string;
}

export const ENGINEERING_LABS: LabActivity[] = [
  {
    id: 'lab-01',
    code: 'Lab 01',
    domain: 'Circuits',
    title: "Ohm's Law & Kirchhoff's Laws Verification",
    description:
      'Measured V, I, and R in series/parallel circuits to verify KVL and KCL. Compared theoretical vs. experimental values and computed percentage error using formal lab reports.',
    tags: ['Circuits', 'KVL', 'KCL', 'Data Analysis'],
    outcome: 'Data Analysis & Interpretation',
  },
  {
    id: 'lab-02',
    code: 'Lab 02',
    domain: 'Digital Electronics',
    title: 'Boolean Simplification & NAND Conversion',
    description:
      'Designed and implemented digital circuits based on Boolean expressions. Simplified logic using Karnaugh maps, Boolean algebra, and tabular methods. Converted designs into NAND-only gate implementations and verified truth tables on breadboard.',
    tags: [
      'Digital Circuit Design',
      'Boolean Algebra',
      'K-Map Simplification',
      'NAND Gate Conversion',
      'Truth Table Verification',
    ],
    outcome: 'Digital Circuit Design',
  },
  {
    id: 'lab-03',
    code: 'Lab 03',
    domain: 'Microcontrollers',
    title: 'Smart Temperature Alarm & Experiments',
    description:
      'Implemented Arduino-based experiments: smart temperature alarm with potentiometer + LCD, CLI vs GUI interaction, traffic light sequencing, and roller coaster LED patterns using for loops. Demonstrated GPIO control, PWM, and interrupt handling.',
    tags: ['Arduino', 'GPIO', 'PWM', 'Interrupts', 'LCD Display'],
    outcome: 'Embedded Programming · Real-Time Control',
  },
  {
    id: 'lab-04',
    code: 'Lab 04',
    domain: 'Computer Networks',
    title: 'VLAN Configuration & IP Subnetting',
    description:
      'Configured VLANs on managed switches, performed VLSM subnetting, set up inter-VLAN routing and ACLs. Verified end-to-end connectivity across simulated campus topology.',
    tags: ['VLAN', 'Subnetting', 'Routing', 'ACLs'],
    outcome: 'Network Engineering',
  },
  {
    id: 'lab-05',
    code: 'Lab 05',
    domain: 'Data Structures',
    title: 'Linked Lists, Stacks & Queues',
    description:
      'Implemented fundamental data structures in C++ including linked lists, stacks, queues, and binary trees. Practiced sorting and searching algorithms, demonstrating algorithm efficiency and memory management.',
    tags: ['C++', 'Linked List', 'Stacks', 'Queues', 'Binary Trees'],
    outcome: 'Algorithm Design · C++ Programming',
  },
  {
    id: 'lab-06',
    code: 'Lab 06',
    domain: 'Routing Protocols',
    title: 'Static, RIP, EIGRP & OSPF',
    description:
      'Compiled weekly networking activities in Cisco Packet Tracer. Documented routing tables in Excel and configured Static Routing, RIP, EIGRP, and OSPF. Verified connectivity and optimized routing across multiple subnets.',
    tags: ['Packet Tracer', 'Static Routing', 'RIP', 'EIGRP', 'OSPF'],
    outcome: 'Advanced Networking',
  },
  {
    id: 'lab-07',
    code: 'Lab 07',
    domain: 'PCB Design',
    title: 'EasyEDA Circuit Design',
    description:
      'Designed printed circuit boards using EasyEDA. Created schematics, routed traces, and generated Gerber files for fabrication. Tested circuits for embedded systems projects.',
    tags: ['EasyEDA', 'PCB Design', 'Gerber Files', 'Hardware Testing'],
    outcome: 'PCB Design · Hardware Testing',
  },
  {
    id: 'lab-08',
    code: 'Lab 08',
    domain: 'Power Supply',
    title: 'Regulated DC Power Supply',
    description:
      'Built a regulated DC power supply with transformer, rectifier, filter, and regulator stages. Tested voltage stability and implemented safety features for reliable operation.',
    tags: ['Electronics', 'Power Systems', 'Rectifier', 'Voltage Regulation'],
    outcome: 'Electronics · Power Systems',
  },
  {
    id: 'lab-09',
    code: 'Lab 09',
    domain: 'AI Prototype',
    title: 'Agri Soil Analyzer',
    description:
      'Developed an offline AI prototype for soil condition analysis using sensors and embedded logic. Designed for practical agricultural use at Polangui-Albay Institute for AI, demonstrating applied AI concepts in real-world scenarios.',
    tags: ['AI Applications', 'Sensor Interfacing', 'Embedded Systems', 'Agriculture Tech'],
    outcome: 'AI Applications · Embedded Systems',
  },
];
