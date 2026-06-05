// ─── Projects ─────────────────────────────────────────────────
export interface Project {
  id: string
  title: string
  kicker: string
  description: string
  tags: string[]
  code: string
  accent: string
  year: string
  github?: string
  live?: string
  featured?: boolean
  lesson?: string
  metrics?: string[]
}

export const projects: Project[] = [
  {
    id: 'consensus-engine',
    title: 'Evolutionary Consensus Engine',
    kicker: 'Flagship AI experiment',
    description: 'A multi-agent reasoning system where distinct epistemic agents debate a question, receive confidence scores, and eliminate weak positions until the strongest synthesis remains.',
    tags: ['Python', 'AI', 'Machine Learning', 'Systems'],
    code: 'ECE',
    accent: '#FFB800',
    year: '2026',
    featured: true,
    lesson: 'The strongest answer is not the loudest answer. It is the one that survives pressure from multiple ways of thinking.',
    metrics: ['5 reasoning agents', 'Elimination scoring', 'Interactive demo'],
  },
  {
    id: 'food-delivery-clone',
    title: 'Food Delivery App Clone',
    kicker: 'Object-oriented systems',
    description: 'A functional Python clone of major food delivery services, built to understand object-oriented design, ordering flows, account state, and the architecture behind real product logic.',
    tags: ['Python', 'OOP', 'Systems'],
    code: 'FDC',
    accent: '#60A5FA',
    year: '2024',
    lesson: 'Cloning an existing product is one of the most honest ways to test whether you actually understand it.',
    metrics: ['Python core', 'Product logic', 'OOP practice'],
  },
  {
    id: 'bi-dashboard',
    title: 'Automated BI Dashboard System',
    kicker: 'Solara Remote Data Delivery',
    description: 'Designed and maintained automated dashboards that translated remote delivery data into usable stakeholder views, KPI tracking, and operational reporting.',
    tags: ['Python', 'SQL', 'Data', 'BI Tools', 'Dashboards'],
    code: 'BID',
    accent: '#34D399',
    year: '2026',
    featured: true,
    lesson: 'Data is only as valuable as the speed and clarity with which it reaches decision-makers.',
    metrics: ['KPI reporting', 'Stakeholder visibility', 'Operational data'],
  },
  {
    id: 'data-pipeline',
    title: 'Automated Data Pipeline',
    kicker: 'Bison Software',
    description: 'Built and maintained Python-assisted ETL pipelines for extraction, cleaning, and structuring of large datasets while supporting schema design and backend integration work.',
    tags: ['Python', 'SQL', 'Data Pipelines', 'ETL', 'Data'],
    code: 'ETL',
    accent: '#A78BFA',
    year: '2025',
    featured: true,
    lesson: 'A pipeline that needs constant babysitting is not infrastructure yet. Reliability is part of the product.',
    metrics: ['SQL optimization', 'Data cleaning', 'Schema support'],
  },
  {
    id: 'snowaway-platform',
    title: 'Snowaway Solutions',
    kicker: 'Founder-operator system',
    description: 'Founded and operated a service business across snow removal, landscaping, and auto detailing, handling acquisition, scheduling, invoicing, client relationships, and financial tracking.',
    tags: ['Business', 'Operations', 'CRM'],
    code: 'OPS',
    accent: '#F87171',
    year: '2024 — Present',
    lesson: 'Building a business teaches you more about systems thinking than any algorithm.',
    metrics: ['Client acquisition', 'Scheduling', 'Financial tracking'],
  },
  {
    id: 'telus-analytics',
    title: 'Telus Marketing Analytics Engine',
    kicker: 'Marketing analytics',
    description: 'Analyzed usage patterns, demographic data, product performance, and CRM signals at Telus to recommend tailored solutions and guide regional outreach.',
    tags: ['Data', 'Analytics', 'Business', 'CRM'],
    code: 'CRM',
    accent: '#FB7185',
    year: '2024',
    lesson: 'Customer data is compressed human behaviour. The job is to decode it without losing the person inside the pattern.',
    metrics: ['CRM signals', 'Retention insights', 'Regional outreach'],
  },
]

// ─── Experience ───────────────────────────────────────────────
export interface ExperienceItem {
  role: string
  company: string
  location: string
  period: string
  current?: boolean
  bullets: string[]
  tags?: string[]
}

export const experience: ExperienceItem[] = [
  {
    role: 'Data Visualization & BI Intern',
    company: 'Solara Remote Data Delivery Inc.',
    location: 'Winnipeg, MB',
    period: '2026',
    current: true,
    bullets: [
      'Designed and maintained automated dashboards to translate complex remote delivery data into accessible visual insights for stakeholders.',
      'Utilized BI tools to track KPIs and report on operational efficiency across delivery networks.',
      'Collaborated with cross-functional teams to identify data trends and support strategic business objectives.',
    ],
    tags: ['BI Tools', 'Dashboards', 'Python', 'Data Visualization'],
  },
  {
    role: 'Database Management & SQL Intern',
    company: 'Bison Software',
    location: 'Winnipeg, MB',
    period: '2025',
    bullets: [
      'Managed and optimized relational databases using advanced SQL queries to ensure data integrity, security, and efficient retrieval.',
      'Developed and maintained data pipelines using Python to automate ETL processes for large dataset analysis.',
      'Collaborated on database schema design and resolved backend data integration issues.',
      'Translated complex datasets into actionable reports for business intelligence and decision-making.',
    ],
    tags: ['SQL', 'Python', 'ETL', 'Database Design'],
  },
  {
    role: 'Owner & Operator',
    company: 'Snowaway and Landscaping Solutions',
    location: 'Winnipeg, MB',
    period: 'Nov 2024 – Present',
    current: true,
    bullets: [
      'Founded and managed a service business providing commercial and residential snow removal, landscaping, and auto detailing.',
      'Handled all aspects of operations: client acquisition, scheduling, invoicing, and customer relationship management.',
      'Maintained financial records, tracked expenses and revenue, and optimized resource allocation to maximize profitability.',
    ],
    tags: ['Entrepreneurship', 'Operations', 'CRM', 'Business Strategy'],
  },
  {
    role: 'Software Technician',
    company: 'SCR Renovations',
    location: 'Winnipeg, MB',
    period: 'Dec 2024 – Jun 2025',
    bullets: [
      'Maintained and optimized internal software systems and databases for project management and client records.',
      'Troubleshot technical issues and implemented software solutions that reduced day-to-day operational friction.',
      'Ensured data integrity and security across company platforms while managing hardware/software deployments.',
    ],
    tags: ['Software Systems', 'Data Integrity', 'IT Support'],
  },
  {
    role: 'Senior Marketing Consultant',
    company: 'Telus Communications',
    location: 'Winnipeg, MB',
    period: 'Mar 2024 – Nov 2024',
    bullets: [
      'Analyzed customer usage patterns, demographic data, and product performance metrics to recommend tailored solutions.',
      'Tracked and evaluated regional sales metrics to optimize marketing outreach and consistently meet or exceed quarterly targets.',
      'Managed customer relationship data to maximize retention, identify upsell opportunities, and reduce churn.',
    ],
    tags: ['Data Analysis', 'CRM', 'Marketing Analytics', 'Sales Strategy'],
  },
  {
    role: 'Marketing & Sales Associate',
    company: 'EPH Apparel',
    location: 'Winnipeg, MB',
    period: 'Sep 2023 – Feb 2024',
    bullets: [
      'Leveraged CRM software to log customer measurements, preferences, and purchase history for personalized marketing.',
      'Analyzed seasonal sales trends and consumer feedback to identify top-performing products and assist inventory forecasting.',
      'Executed data-driven marketing campaigns and client outreach for custom menswear sales.',
    ],
    tags: ['CRM', 'Sales Analytics', 'Content Strategy'],
  },
]

// ─── Profile ─────────────────────────────────────────────────
export const profile = {
  name: 'John Paul Giftson',
  location: 'Winnipeg, MB, Canada',
  email: 'johnpaul081023@gmail.com',
  businessEmail: 'snowawaysolutionsltd@gmail.com',
  phone: '204-881-3187',
  school: 'University of Manitoba',
  degree: 'Bachelor of Science — Artificial Intelligence & Machine Learning Engineering',
  schoolYears: '2023 – 2028',
  standing: '3rd Year',
  gpa: '3.4',
  headline: 'AI & Machine Learning Engineering student building data systems, BI tools, and experiments in machine reasoning.',
}

export const skillGroups = {
  Programming: ['Python', 'Java', 'C++', 'SQL', 'RStudio'],
  'Data & ML': ['Machine Learning Fundamentals', 'Relational Databases', 'Data Pipelines', 'BI Tools', 'Dashboards', 'Data Visualization'],
  Business: ['CRM Software', 'Operations', 'Client Acquisition', 'Financial Tracking', 'Business Strategy'],
  Marketing: ['Social Media Management', 'Instagram', 'TikTok', 'Content Strategy', 'Sales Analytics'],
}

// ─── Writing ──────────────────────────────────────────────────
export interface WritingPost {
  id: string
  title: string
  excerpt: string
  category: string
  readTime: number
  date: string
  slug: string
  body: string[]
}

export const writingPosts: WritingPost[] = [
  {
    id: '1',
    title: 'The Anatomy of a Good ML Pipeline',
    excerpt: 'Most machine learning pipelines fail not because of bad models — they fail because of bad plumbing. A meditation on what separates a production-grade pipeline from a glorified Jupyter notebook.',
    category: 'Engineering',
    readTime: 6,
    date: 'May 2026',
    slug: 'anatomy-of-good-ml-pipeline',
    body: [
      'A good machine learning pipeline is less about the model and more about the conditions around the model. Inputs change, schemas drift, users invent edge cases, and the clean notebook version slowly becomes a memory.',
      'The pipeline has to make change visible. That means contracts around data shape, validation before transformation, clear ownership, and a habit of measuring the boring things: freshness, completeness, latency, and silent failure.',
      'The best pipelines feel almost uneventful. They do not ask for attention unless something meaningful has changed. That quietness is not accidental; it is the product.',
    ],
  },
  {
    id: '2',
    title: 'Why I Started a Business Before My Third Year',
    excerpt: 'I founded Snowaway Solutions not because I needed the money — I needed to know what it felt like to build something from zero, with skin in the game. Here\'s what it taught me about systems, people, and pressure.',
    category: 'Reflection',
    readTime: 5,
    date: 'Mar 2026',
    slug: 'why-i-started-a-business',
    body: [
      'Starting Snowaway Solutions made systems thinking physical. Scheduling stopped being a diagram and became a driveway, a client expectation, a weather forecast, an invoice, and a vehicle that needed to be in the right place at the right time.',
      'A service business teaches the cost of vagueness. If a process is unclear, someone feels it immediately. That pressure builds useful instincts: write things down, track money, remember customers, and design around reality rather than optimism.',
      'The lesson carried back into software is simple: every system has people inside it. Good tools respect that.',
    ],
  },
  {
    id: '3',
    title: 'Intelligence Isn\'t Artificial',
    excerpt: 'A case for human-centred AI: the most important question isn\'t whether machines can think — it\'s whether we\'re building them in ways that amplify or diminish human cognition. Spoiler: the architecture is the ethics.',
    category: 'AI & Society',
    readTime: 8,
    date: 'Jan 2026',
    slug: 'intelligence-isnt-artificial',
    body: [
      'The phrase artificial intelligence can make intelligence sound detached from people. But every system we build carries human choices: which data matters, what errors are acceptable, whose workflow gets optimized, and what kind of judgment is being automated.',
      'That is why architecture is never only technical. The way a model reasons, explains, defers, or fails shapes the ethics of the product before anyone writes a policy document.',
      'The most interesting AI systems will not replace human cognition as much as reorganize it. The question is whether they make us more careful or simply faster.',
    ],
  },
  {
    id: '4',
    title: 'What BI Dashboards Actually Tell You',
    excerpt: 'After designing dashboards for real stakeholders at Solara, I learned something counterintuitive: the best dashboards are the ones people stop looking at. Here\'s why that\'s a feature, not a bug.',
    category: 'Data',
    readTime: 4,
    date: 'Apr 2026',
    slug: 'what-bi-dashboards-tell-you',
    body: [
      'A dashboard is not a wall of charts. It is an agreement about what deserves attention. If everything is visible, nothing is prioritized.',
      'Working with dashboard systems taught me that the best visualizations reduce the distance between signal and action. They help stakeholders notice what changed, why it matters, and what decision is now easier to make.',
      'The goal is not to make people stare at dashboards forever. The goal is to make the state of the system obvious enough that action becomes less hesitant.',
    ],
  },
]
