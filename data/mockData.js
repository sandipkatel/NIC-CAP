// ---------------------------------------------------------------------------
// Mock data layer.
// In production these would be fetched from the Django REST Framework API
// (e.g. GET /api/stats, GET /api/events, GET /api/ambassadors, GET /api/stories).
// Keeping them here as plain JS objects lets every page simulate a real
// data-fetch without needing a backend during frontend development.
// ---------------------------------------------------------------------------

// Hero image stack - swap these `src` paths for real photos once supplied.
// Drop the actual files into /public/images/hero/ using these exact filenames
// (see public/images/hero/README.md), and this data is the only place you
// need to update if filenames change.
export const heroImages = [
  { id: 1, src: "/carousel/1.jpeg", alt: "Ambassadors leading a campus workshop", tint: "bg-navy-tint" },
  { id: 2, src: "/carousel/2.jpeg", alt: "Students collaborating at a campus hackathon", tint: "bg-navy" },
  { id: 3, src: "/carousel/3.jpeg", alt: "Innovation bootcamp session", tint: "bg-navy-tint" },
  { id: 4, src: "/carousel/4.jpeg", alt: "Ambassador network meetup", tint: "bg-navy" },
  { id: 5, src: "/carousel/5.jpeg", alt: "Award ceremony for top ambassadors", tint: "bg-navy-tint" },
];

export const stats = [
  { label: "Students Reached", value: "3,333+" },
  { label: "Active Ambassadors", value: "18" },
  { label: "Events Held", value: "33" },
  { label: "Partner Institutions", value: "18" },
];

export const processSteps = [
  {
    step: 1,
    title: "Application",
    description: "Submit your details, motivation, and a recommendation letter online.",
  },
  {
    step: 2,
    title: "Selection",
    description: "NIC reviews every application and shortlists candidates for onboarding.",
  },
  {
    step: 3,
    title: "Training",
    description: "Selected ambassadors complete an orientation on NIC's programs and tools.",
  },
  {
    step: 4,
    title: "Campus Activities",
    description: "Ambassadors run workshops, info sessions, and innovation challenges at their college.",
  },
  {
    step: 5,
    title: "Innovation Leadership",
    description: "Top performers move i1nto regional leadership and mentor new ambassadors.",
  },
];

export const benefits = [
  {
    title: "Leadership Opportunities",
    description: `Lead campus chapters, organize events, and represent NIC to your institution.
lorem ipsum dolor sit amet, consectetur adipiscing elit.
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  },
  {
    title: "Networking",
    description: `Connect with ambassadors, founders, and mentors across Nepal's innovation ecosystem.
lorem ipsum dolor sit amet, consectetur adipiscing elit.
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  },
  {
    title: "Skill Development",
    description: `Build public speaking, project management, and community-building skills.
lorem ipsum dolor sit amet, consectetur adipiscing elit.
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  },
  {
    title: "Recognition",
    description: `Earn certificates, badges, and priority access to NIC programs and internships.
lorem ipsum dolor sit amet, consectetur adipiscing elit.
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  },
];

export const upcomingEvents = [
  {
    id: "evt-101",
    name: "Innovation Bootcamp - Kathmandu Chapter",
    date: "2026-08-14",
    location: "Kathmandu University, Dhulikhel",
    registrationOpen: true,
  },
  {
    id: "evt-102",
    name: "Campus Idea Pitch Night",
    date: "2026-08-22",
    location: "Pokhara University, Pokhara",
    registrationOpen: true,
  },
  {
    id: "evt-103",
    name: "Ambassador Onboarding - Fall Cohort",
    date: "2026-09-05",
    location: "NIC HQ, Jawalakhel",
    registrationOpen: false,
  },
];

export const pastEvents = [
  {
    id: "evt-090",
    name: "National Hackathon 2026",
    date: "2026-05-10",
    location: "Tribhuvan University, Kirtipur",
    outcome: "220 students, 34 teams, 6 projects fast-tracked into NIC incubation.",
  },
  {
    id: "evt-089",
    name: "Design Thinking Workshop Series",
    date: "2026-03-18",
    location: "Multiple colleges (5 cities)",
    outcome: "540 students trained across five partner campuses.",
  },
];

export const ambassadors = [
  // ───────────────── Cohort 2026 (current) ─────────────────
  {
    id: 1,
    name: "Sandip Katel",
    photo: "./carousel/1.jpeg",
    college: "IOE, Pulchowk Campus",
    location: "Kathmandu, Nepal",
    skills: ["Community Building", "Public Speaking"],
    linkedin: "https://linkedin.com/in/sandipkatel",
    cohort: "2026",
    cohortOrder: 2026,
    program: [
      {
        name: "Startup Sprint Bootcamp",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Organized a three-day ideation bootcamp bringing together students from six colleges to prototype early-stage startup ideas.",
        image: "./carousel/5.jpeg",
      },
      {
        name: "Workshop on Apache Kafka",
        description:
          "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, introducing event-driven architecture concepts to over forty engineering students.",
        image: "./carousel/4.jpeg",
      },
    ],
    contribution:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Coordinated sponsor outreach and onboarded a new batch of volunteer ambassadors for the region.",
    gained:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat, gaining hands-on experience in event operations and stakeholder communication.",
    testimonial:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    id: 2,
    name: "Purnima Wagle",
    photo: "./carousel/2.jpeg",
    college: "Prithvi Narayan Campus",
    location: "Pokhara, Nepal",
    skills: ["Design", "Content Writing"],
    linkedin: "https://linkedin.com/in/priya-koirala",
    cohort: "2026",
    cohortOrder: 2026,
    program: [
      {
        name: "Design Thinking Workshop Series",
        description:
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum, running a design-thinking workshop series for first-year students.",
        image: "",
      },
    ],
    contribution:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti, producing all campaign visuals and newsletters for the campus chapter.",
    gained:
      "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat, sharpening both design and project-management skills.",
    testimonial:
      "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet.",
  },
  {
    id: 3,
    name: "Ayusha Hamal",
    photo: "./carousel/3.jpeg",
    college: "Tribhuvan University",
    location: "Pokhara, Nepal",
    skills: ["Outreach", "Data Analysis"],
    linkedin: "https://linkedin.com/in/bibek-thapa",
    cohort: "2026",
    cohortOrder: 2026,
    program: [
      {
        name: "Alumni Mentorship Match",
        description:
          "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur, launching a mentorship-matching program between alumni and current students.",
        image: "./carousel/4.jpeg",
      },
      {
        name: "Data for Good Meetup",
        description:
          "Aut perferendis doloribus asperiores repellat, hosting a monthly meetup teaching practical data-analysis tools to non-technical student volunteers.",
        image: "",
      },
    ],
    contribution:
      "Ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat, building a simple dashboard to track ambassador engagement across colleges.",
    gained:
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet consectetur adipisci velit, developing practical data-analysis and reporting skills.",
    testimonial:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    id: 3,
    name: "Prakriti",
    photo: "./carousel/4.jpeg",
    college: "Tribhuvan University",
    location: "Pokhara, Nepal",
    skills: ["Outreach", "Data Analysis"],
    linkedin: "https://linkedin.com/in/bibek-thapa",
    cohort: "2026",
    cohortOrder: 2026,
    program: [
      {
        name: "Alumni Mentorship Match",
        description:
          "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur, launching a mentorship-matching program between alumni and current students.",
        image: "./carousel/4.jpeg",
      },
      {
        name: "Data for Good Meetup",
        description:
          "Aut perferendis doloribus asperiores repellat, hosting a monthly meetup teaching practical data-analysis tools to non-technical student volunteers.",
        image: "",
      },
    ],
    contribution:
      "Ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat, building a simple dashboard to track ambassador engagement across colleges.",
    gained:
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet consectetur adipisci velit, developing practical data-analysis and reporting skills.",
    testimonial:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },

  // ───────────────── Cohort 2025 ─────────────────
  {
    id: 4,
    name: "Prakriti Gurung",
    photo: "",
    college: "Pokhara University",
    location: "Pokhara, Nepal",
    skills: ["Event Management", "Public Speaking"],
    linkedin: "https://linkedin.com/in/sristi-gurung",
    cohort: "2025",
    cohortOrder: 2025,
    program: [
      {
        name: "Regional Innovation Fair",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod, organizing a regional innovation fair featuring twelve student-led projects.",
        image: "",
      },
    ],
    contribution:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris, recruiting and training a team of ten campus volunteers over two semesters.",
    gained:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur, gaining confidence in public speaking and team leadership.",
    testimonial:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 5,
    name: "Nischal Adhikari",
    photo: "",
    college: "Purbanchal University",
    location: "Biratnagar, Nepal",
    skills: ["Marketing", "Photography"],
    linkedin: "https://linkedin.com/in/nischal-adhikari",
    cohort: "2025",
    cohortOrder: 2025,
    program: [
      {
        name: "Ambassador Summit Campaign",
        description:
          "At vero eos et accusamus et iusto odio dignissimos ducimus, running a social-media takeover campaign to promote the annual ambassador summit.",
        image: "",
      },
    ],
    contribution:
      "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit, shooting and editing event photography used across all NIC channels.",
    gained:
      "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, learning brand storytelling and content strategy.",
    testimonial:
      "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias.",
  },
  {
    id: 6,
    name: "Alisha Rai",
    photo: "",
    college: "Kathmandu University",
    location: "Dhulikhel, Nepal",
    skills: ["Research", "Community Building"],
    linkedin: "https://linkedin.com/in/alisha-rai",
    cohort: "2025",
    cohortOrder: 2025,
    program: [
      {
        name: "Peer Research Circle",
        description:
          "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore, coordinating a peer-research circle on early-stage entrepreneurship in Nepal.",
        image: "",
      },
    ],
    contribution:
      "Ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus, compiling a resource directory now used by new ambassadors nationwide.",
    gained:
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet consectetur adipisci velit, building research and synthesis skills.",
    testimonial:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },

  // ───────────────── Cohort 2024 ─────────────────
  {
    id: 7,
    name: "Suman Basnet",
    photo: "",
    college: "Tribhuvan University",
    location: "Kathmandu, Nepal",
    skills: ["Leadership", "Fundraising"],
    linkedin: "https://linkedin.com/in/suman-basnet",
    cohort: "2024",
    cohortOrder: 2024,
    program: [
      {
        name: "Inter-College Pitch Competition",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, launching the first inter-college pitch competition later adopted as an annual NIC tradition.",
        image: "",
      },
    ],
    contribution:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, securing early sponsors that funded the following two years of programming.",
    gained:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip, developing fundraising and negotiation skills.",
    testimonial:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    id: 8,
    name: "Manisha KC",
    photo: "",
    college: "Pokhara University",
    location: "Pokhara, Nepal",
    skills: ["Content Writing", "Outreach"],
    linkedin: "https://linkedin.com/in/manisha-kc",
    cohort: "2024",
    cohortOrder: 2024,
    program: [
      {
        name: "Founders Monthly Newsletter",
        description:
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia, starting a monthly newsletter highlighting student founders in the region.",
        image: "",
      },
    ],
    contribution:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium, growing the ambassador mailing list from zero to over a thousand subscribers.",
    gained:
      "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus, sharpening long-form writing and editorial planning skills.",
    testimonial:
      "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet.",
  },
  {
    id: 9,
    name: "Rohit Maharjan",
    photo: "",
    college: "IOE Pulchowk Campus",
    location: "Kathmandu, Nepal",
    skills: ["Operations", "Public Speaking"],
    linkedin: "https://linkedin.com/in/rohit-maharjan",
    cohort: "2024",
    cohortOrder: 2024,
    program: [
      {
        name: "National Ambassador Meetup",
        description:
          "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus, running logistics for NIC's first in-person national ambassador meetup.",
        image: "",
      },
    ],
    contribution:
      "Ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores, building the run-of-show template still used for national events today.",
    gained:
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet consectetur adipisci velit, gaining end-to-end event operations experience.",
    testimonial:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
];

export const innovationStories = [
  {
    id: "story-01",
    project: "AgriSense",
    team: "Team Rootstock, Kathmandu University",
    description:
      "A low-cost soil moisture sensor kit built by three ambassadors, now piloted on 40 smallholder farms outside Dhulikhel.",
  },
  {
    id: "story-02",
    project: "SafeCommute",
    team: "Bikash Shrestha & Pulchowk Robotics Club",
    description:
      "A campus shuttle tracking app built during the National Hackathon, now used by over 1,200 students daily.",
  },
  {
    id: "story-03",
    project: "PathshalaConnect",
    team: "Anisha Gurung, Pokhara University",
    description:
      "A volunteer-tutoring platform connecting university students with public school children in rural Kaski district.",
  },
];

// Mock signed-in ambassador, used to render the (placeholder) dashboard.
export const currentAmbassador = {
  name: "Sujata Koirala",
  level: "Level 2 - Campus Lead",
  college: "Kathmandu University",
  tasksCompleted: 18,
  approvedEvents: 4,
  nextEvent: upcomingEvents[0],
};

// Mock admin-facing analytics summary.
export const adminSummary = {
  totalAmbassadors: 186,
  pendingApplications: 23,
  upcomingEvents: upcomingEvents.length,
  publishedStories: innovationStories.length,
};

export const collegeOptions = [
  "Kathmandu University",
  "Tribhuvan University",
  "Pulchowk Campus, IOE",
  "Pokhara University",
  "Purbanchal University",
];

export const academicYearOptions = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduate"];

export const skillOptions = [
  "Public Speaking",
  "UI/UX",
  "Content Writing",
  "Event Planning",
  "Data Analysis",
  "Robotics",
  "Social Media",
  "Mentoring",
];
