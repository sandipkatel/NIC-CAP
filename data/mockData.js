// ---------------------------------------------------------------------------
// Mock data layer.
// In production these would be fetched from the Django REST Framework API
// (e.g. GET /api/stats, GET /api/events, GET /api/ambassadors, GET /api/stories).
// Keeping them here as plain JS objects lets every page simulate a real
// data-fetch without needing a backend during frontend development.
// ---------------------------------------------------------------------------

export const stats = [
  { label: "Students Reached", value: "12,400+" },
  { label: "Active Ambassadors", value: "186" },
  { label: "Events Held", value: "94" },
  { label: "Partner Institutions", value: "37" },
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
    description: "Top performers move into regional leadership and mentor new ambassadors.",
  },
];

export const benefits = [
  {
    title: "Leadership Opportunities",
    description: "Lead campus chapters, organize events, and represent NIC to your institution.",
  },
  {
    title: "Networking",
    description: "Connect with ambassadors, founders, and mentors across Nepal's innovation ecosystem.",
  },
  {
    title: "Skill Development",
    description: "Build public speaking, project management, and community-building skills.",
  },
  {
    title: "Recognition",
    description: "Earn certificates, badges, and priority access to NIC programs and internships.",
  },
];

export const upcomingEvents = [
  {
    id: "evt-101",
    name: "Innovation Bootcamp — Kathmandu Chapter",
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
    name: "Ambassador Onboarding — Fall Cohort",
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
  {
    id: "amb-01",
    name: "Sujata Koirala",
    college: "Kathmandu University",
    location: "Dhulikhel",
    linkedin: "https://linkedin.com/in/sujata-koirala",
    skills: ["Public Speaking", "UI/UX", "Event Planning"],
    achievements: "Organized 4 campus workshops, 300+ attendees",
  },
  {
    id: "amb-02",
    name: "Bikash Shrestha",
    college: "Pulchowk Campus, IOE",
    location: "Lalitpur",
    linkedin: "https://linkedin.com/in/bikash-shrestha",
    skills: ["Robotics", "Team Leadership"],
    achievements: "Led winning team at National Hackathon 2026",
  },
  {
    id: "amb-03",
    name: "Anisha Gurung",
    college: "Pokhara University",
    location: "Pokhara",
    linkedin: "https://linkedin.com/in/anisha-gurung",
    skills: ["Content Writing", "Social Media"],
    achievements: "Grew campus chapter Instagram to 5,000 followers",
  },
  {
    id: "amb-04",
    name: "Prakash Tamang",
    college: "Purbanchal University",
    location: "Biratnagar",
    linkedin: "https://linkedin.com/in/prakash-tamang",
    skills: ["Data Analysis", "Mentoring"],
    achievements: "Mentored 15 first-year students into NIC programs",
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
  level: "Level 2 — Campus Lead",
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
