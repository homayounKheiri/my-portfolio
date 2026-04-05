export type TProject = {
  name: string;
  images: string[];
  technologies: string[];
  description: string;
};

const projectsData: TProject[] = [
  {
    name: 'ParsUHM',
    images: [
      '/images/portfolio/ParsUHM/01.jpg',
      '/images/portfolio/ParsUHM/02.jpg',
      '/images/portfolio/ParsUHM/03.jpg',
    ],
    technologies: ['ReactJs', 'MUI', 'Type Script', 'XTerm'],
    description:
      'ParsUHM is an intelligent system for comprehensive management and reinforcement of network and industrial infrastructures, improving network security and performance through automatic equipment identification, monitoring and automatic reinforcement, backup, change management, and status notifications. This system provides ease of use and economic savings for organizations with a graphical user interface and flexible access level definitions and is developed according to ISO/IEC 27033 standards and NIST CSF and RIT frameworks.',
  },
  {
    name: 'Treatment Room',
    images: [
      '/images/portfolio/Otaghe Darman/01.jpg',
      '/images/portfolio/Otaghe Darman/02.jpg',
    ],
    technologies: ['ReactJs', 'MUI', 'Type Script', 'Zustand'],
    description:
      '"Treatment Room" is a platform for online patient consultation and visitation. The system uses AI to analyze conversations between doctors and patients, providing therapeutic recommendations. Additionally, by reviewing each session, it displays the patient\'s status and medical history throughout the treatment course for the doctor. The management panel provided to doctors enables them to manage patients, view the analysis results of each session, and access other features.',
  },
  {
    name: 'Treatment Room Extension',
    images: ['/images/portfolio/Otaghe Darman Ext/01.jpg'],
    technologies: ['ReactJs', 'MUI', 'Type Script', 'Web Socket'],
    description:
      '"Treatment Room" is a platform for online patient consultation and visitation. This system uses AI to analyze conversations between doctors and patients, providing therapeutic recommendations. The Treatment Room extension is responsible for extracting the text of conversations and sending it instantly to the server. The received text is analyzed by AI, and necessary solutions are provided.',
  },
  {
    name: 'Zaryazd',
    images: [
      '/images/portfolio/Zaryazd/01.jpg',
      '/images/portfolio/Zaryazd/02.jpg',
      '/images/portfolio/Zaryazd/03.jpg',
    ],
    technologies: [
      'NextJs',
      'MUI',
      'Redux',
      'Type Script',
      'Web Socket',
      'SSR',
    ],
    description:
      'A platform for the online buying and selling of gold with real-time updates on prices and products, secure payments, chat, and dedicated panels for customers and managers. This project is fully responsive and implemented with SSR architecture to provide better speed and user experience and is optimized for SEO.',
  },
  {
    name: 'AVL System',
    images: [
      '/images/portfolio/AVL/01.jpg',
      '/images/portfolio/AVL/02.jpg',
      '/images/portfolio/AVL/03.jpg',
    ],
    technologies: ['NextJs', 'MUI', 'Redux', 'Type Script', 'Web Socket'],
    description:
      'A system for managing and real-time tracking of mobile entities, creating routes, establishing boundaries, etc., on a map, developed on the NextJs platform. This system, due to its nature, can be utilized in any organization that requires such management (such as municipalities, fire departments, school services, etc.).',
  },
  {
    name: 'Crowd Funding Platform',
    images: [
      '/images/portfolio/CrowdFunding/01.jpg',
      '/images/portfolio/CrowdFunding/02.jpg',
      '/images/portfolio/CrowdFunding/03.jpg',
    ],
    technologies: ['NextJs', 'MUI', 'Type Script', 'Redux'],
    description: 'A modern crowdfunding platform',
  },
  {
    name: 'Delvin',
    images: [
      '/images/portfolio/Delvin/01.jpg',
      '/images/portfolio/Delvin/02.jpg',
    ],
    technologies: ['VueJs', 'Quasar', 'Pinia'],
    description:
      'Delvin is a beauty salon management system. The Delvin web app is designed for customer use. Customers can view services and other information about a salon or beautician, select the desired services, and book their appointments at their preferred time. In the Delvin panel, salon owners and beauticians can log into their accounts and access services, financial reports, appointment management, and more. This project was implemented using the Quasar framework and Vue 3.',
  },
  {
    name: 'Comprehensive Citizen Service Payment System Pay',
    images: [
      '/images/portfolio/Pay/01.jpg',
      '/images/portfolio/Pay/02.jpg',
      '/images/portfolio/Pay/03.jpg',
    ],
    technologies: ['NextJs', 'MUI', 'Type Script', 'Redux'],
    description:
      'The Pay system is a comprehensive system for paying all urban and citizen services that is available to citizens and customers. The goal of this system is to facilitate the processes for citizens to use urban services, providing features such as online ticket purchasing for all citizen services, payment via identifiers for using urban buses and taxis, defining bank cards, and more.',
  },
  {
    name: 'Grandbitex',
    images: [
      '/images/portfolio/Grandbitex/01.jpg',
      '/images/portfolio/Grandbitex/02.jpg',
      '/images/portfolio/Grandbitex/03.jpg',
    ],
    technologies: ['ReactJs', 'Redux', 'Web Socket'],
    description:
      'Grandbitex is a cryptocurrency exchange that provides a platform for buying and selling currencies and all the features that a cryptocurrency exchange offers to users. The user and management panels of Grandbitex are implemented on the React platform.',
  },
  {
    name: 'Megatoken',
    images: [
      '/images/portfolio/Megatoken/01.jpg',
      '/images/portfolio/Megatoken/02.jpg',
      '/images/portfolio/Megatoken/03.jpg',
    ],
    technologies: ['ReactJs', 'Redux', 'Web Socket'],
    description:
      'Megatoken is a platform for Bitcoin mining and earning from it. Users can receive Bitcoin by purchasing HPW tokens on the Binance network and depositing them in Megatoken. The user panel, management panel, and landing page of Megatoken are implemented on the React platform.',
  },
  {
    name: 'My Yazd System',
    images: [
      '/images/portfolio/My Yazd/01.jpg',
      '/images/portfolio/My Yazd/02.jpg',
      '/images/portfolio/My Yazd/03.jpg',
    ],
    technologies: ['NextJs', 'MUI', 'Type Script', 'Redux'],
    description:
      'A comprehensive platform for using urban and citizen services developed under the supervision of Yazd Municipality. This platform includes various sections including public transportation service (Otoman), electronic wallet, waste collection system, and more.',
  },
  {
    name: 'Otoman System',
    images: [
      '/images/portfolio/Otoman/01.jpg',
      '/images/portfolio/Otoman/02.jpg',
      '/images/portfolio/Otoman/03.jpg',
      '/images/portfolio/Otoman/04.jpg',
    ],
    technologies: ['NextJs', 'MUI', 'Redux', 'Type Script', 'Web Socket'],
    description:
      "The Otoman System is a platform for using urban transportation services that was implemented at the request of Yazd Municipality and is part of the comprehensive 'My Yazd' platform. Otoman was developed on the NextJs platform in the form of two separate websites (Citizen and Management). The Citizen website is for citizens to view all stations, routes, and the real-time location of urban buses. The management website is entirely under the control of the terminal control center, providing comprehensive access and facilities for managing the fleet system.",
  },

  {
    name: 'Sitbuy',
    images: [
      '/images/portfolio/Sitbuy/01.jpg',
      '/images/portfolio/Sitbuy/02.jpg',
    ],
    technologies: ['VueJs', 'Quasar', 'VueX'],
    description:
      'SitBuy is an online store web app, implemented using the Quasar framework and Vue 3.',
  },
];

export default projectsData;
