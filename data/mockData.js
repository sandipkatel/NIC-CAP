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
    project: "Apache Kafka: Real-World Data at Scale",
    team: "Sandip Katel & Code for Nepal",
    thumbnail: "/images/stories/apache-kafka-session.jpeg",
    description: [
      "Behind almost every app we use daily - from ride-hailing to food delivery to banking - there's a constant, invisible flood of data moving between systems in real time. Apache Kafka is the tool that many of the world's largest tech companies rely on to manage that flood, and it was the centerpiece of a hands-on session organized by Code for Nepal, led by College Ambassador Sandip Katel.",
      "Rather than keeping the topic confined to theory, the session was designed to show students why Kafka matters in practice. High-scale platforms can't afford to have services waiting on each other or losing data when traffic spikes; Kafka solves this by acting as a durable, high-throughput messaging backbone that lets independent systems publish and consume streams of events without ever talking to each other directly. Students learned about core concepts like topics, producers, consumers, and partitions, and how these pieces combine to let companies process millions of events per second reliably.",
      "To ground these concepts in industry reality, the session featured Sabin Shapkota, a Software Engineer at Fleet Panda, who walked students through how real-world engineering teams design systems around Kafka - from handling sudden traffic surges to ensuring data isn't lost even when parts of a system fail. This kind of first-hand perspective is exactly the industry-level exposure Code for Nepal set out to bring to students beyond what a typical classroom covers.",
      "Sandip Katel's initiative in organizing this event reflects a broader mission of making practical, job-relevant tech skills accessible to students early in their academic journey. By pairing a technical topic that's genuinely used in production systems with a speaker who works with it daily, the session gave attendees a rare, grounded look at what building for scale actually looks like - and left them with both new technical vocabulary and a clearer sense of where that knowledge fits in the industry.",
    ],
  },
  {
    id: "story-02",
    project: "Cybersecurity, AI, and the Future of Work: A Panel Discussion",
    team: "Sandesh Acharya & REC IT Club, Rapti Engineering College",
    thumbnail: "/images/stories/rec-panel-discussion.jpeg",
    description: [
      "As technology becomes more deeply woven into everyday life, the questions it raises are no longer just technical - they're personal, professional, and societal. That was the spirit behind a panel discussion held at Rapti Engineering College, organized by College Ambassador Sandesh Acharya in collaboration with the REC IT Club, bringing together three urgent conversations under one roof: cybersecurity awareness, whether technology is making us smarter or more dependent, and the impact of AI on jobs and opportunities.",
      "The cybersecurity segment focused on the everyday digital habits students often overlook - weak passwords, unsecured public networks, oversharing on social media - and how these small vulnerabilities can snowball into real risks. Panelists discussed practical awareness strategies, helping students see cybersecurity not as an abstract IT concern but as a life skill relevant to anyone who owns a smartphone or a bank account.",
      "The second theme took a more reflective turn: is technology making us smarter, or simply more dependent on it? Panelists and students debated how constant access to information, search engines, and now AI assistants has changed the way people learn and think, weighing the convenience of instant answers against the erosion of independent problem-solving and memory. It was less about reaching a single conclusion and more about equipping students to be intentional about their own relationship with technology.",
      "The final and perhaps most pressing topic explored how AI is reshaping the job market - which roles are being automated, which new careers are emerging, and how students preparing to enter the workforce can position themselves to adapt rather than be displaced. This conversation resonated strongly with the audience, many of whom are only a few years away from starting their careers in a landscape that is shifting faster than ever,",
      "Sandesh Acharya's leadership in bringing this panel together gave students at Rapti Engineering College a rare space to engage critically with the technologies shaping their futures, rather than simply consuming them. By tackling three distinct but deeply connected topics in one session, the event created exactly the kind of reflective, real-world dialogue that classroom lectures rarely have room for.",
    ],
  },
  {
    id: "story-03",
    project: "From Circuits to Robots: A 3-Day Electronics Workshop",
    team: "Manisha Khatri, Alice Jimee, Alisha Ghimire & Mini Shakya, with BMRIC Club",
    thumbnail: "/images/stories/electronics-workshop.jpeg",
    description: [
      "For many students, electronics and robotics remain concepts confined to textbooks - diagrams of circuits and code snippets that rarely turn into something you can actually hold in your hands. A 3-day workshop organized in collaboration with the BMRIC Club of the National Institute of Engineering & Technology Nepal set out to change that, giving participants the chance to move from theory to tangible, working robots over just three days.",
      "The workshop began with the fundamentals: understanding microcontrollers and how they act as the 'brain' of any electronic project. Participants got hands-on with Arduino and ESP32 boards, two of the most widely used platforms in embedded systems today, learning how to write and upload code that could control real physical components. From there, the sessions moved into sensor interfacing - teaching participants how devices sense the world around them, whether it's detecting distance, light, motion, or touch, and how that raw sensor data gets translated into meaningful action.",
      "By the final day, participants were applying everything they'd learned to design and build their own robots from scratch - combining microcontrollers, sensors, and motors into functioning systems they had conceived and assembled themselves. Watching a robot they built respond to its environment for the first time was, for many, the moment the workshop's earlier technical lessons truly clicked into place.",
      "None of this would have been possible without the guidance of mentors Alice Jimee, Alisha Ghimire, and Mini Shakya, who worked closely with participants throughout the three days, patiently walking them through debugging circuits, fixing code, and refining their robot designs. Their willingness to share hands-on expertise turned what could have been an intimidating technical subject into an approachable, encouraging learning experience.",
      "The workshop was organized by College Ambassador Manisha Khatri, whose planning and coordination with the BMRIC Club brought together the right mix of curriculum, mentorship, and hands-on time that made the event a genuine success. With participants leaving not just with notes but with robots they built themselves, the workshop stands as a strong example of how experiential learning can turn curiosity into real engineering skill - and a promising sign of more hands-on workshops to come.",
    ],
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
