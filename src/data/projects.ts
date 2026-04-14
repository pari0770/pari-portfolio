export interface ProjectDetail {
  title: string;
  period?: string;       // e.g. "2025–2026"
  description: string;   // paragraphs separated by \n\n
  videos?: string[];
  pdf?: string;
}

export interface Project {
  id: string;
  company: string;
  year: string;
  image: string;
  imageAlt: string;
  orientation: 'landscape' | 'portrait';
  detail?: ProjectDetail;
}

export const projects: Project[] = [
  {
    id: 'microsoft-copilot',
    company: 'Microsoft Copilot',
    year: '2026',
    image: '/assets/copilot.png',
    imageAlt: 'Microsoft Copilot interface on a Surface laptop',
    orientation: 'landscape',
    detail: {
      title: 'Copilot on Windows: the best of OS-integrations & Local agentic capabilities',
      period: '2025–2026',
      description:
        "Over the past 2 years, I've shepherded the app from its inception to 10 million weekly active users. Currently leading a team of 6 designers I've hired, mentored & coached on crafting, coding & shipping every pixel for how the Copilot app looks, feels & integrates into your windows shell to bring the best of local agentic capabilities.\n\nMy team also owns and designs for the macOS Copilot app.",
      videos: [
        '/assets/copilot/02.mp4',
        '/assets/copilot/03.mp4',
      ],
    },
  },
  {
    id: 'meta',
    company: 'Meta',
    year: '2022',
    image: '/assets/meta.png',
    imageAlt: 'Meta dashboard on a MacBook',
    orientation: 'landscape',
    detail: {
      title: 'Lead product designer, Ads integrity Meta Singapore',
      period: '2022',
      description:
        'Led a cross-functional team (research, data, engineering, operations) to redesign the Content Review Tool: improving review accuracy by 15% and decreasing reviewer handle time by 12%. Was the first designer to support this team.',
      pdf: '/assets/meta-case-study.pdf',
    },
  },
  {
    id: 'microsoft-teams',
    company: 'Microsoft Teams',
    year: '2021',
    image: '/assets/teams.png',
    imageAlt: 'Microsoft Teams on laptop and mobile',
    orientation: 'landscape',
    detail: {
      title: 'Calendar Objects for Teams & M365 Ecosystem',
      period: '2021',
      description:
        'Defined the company-wide design spec on calendar (time) objects. Drove the vision effort from start to finish, pitching to leadership, and aligning designers across Teams and Outlook.',
      pdf: '/assets/teams-case-study.pdf',
    },
  },
  {
    id: 'microsoft-edge',
    company: 'Microsoft Edge',
    year: '2020',
    image: '/assets/edge.png',
    imageAlt: 'Microsoft Edge browser showing e-commerce UI',
    orientation: 'landscape',
    detail: {
      title: 'Personalisation on the Edge Browser: Capturing users through unique value',
      period: '2020',
      description:
        'Led multiple projects: from foundational research to final design specs, pitching it to executive leadership and working with engineers across Edge & Bing to launch.\n\n1 Billion Edge installs, 2.2M+ engaged DAU, 183k Chrome conversions, $500M+ savings from shopping assistance. Positive user reaction & sentiment.',
      pdf: '/assets/edge-case-study.pdf',
    },
  },
];
