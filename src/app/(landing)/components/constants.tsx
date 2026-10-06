export const navigation = [
  { name: "Home", href: "/#home" },
  { name: "Features", href: "/#features" },
  { name: "Beta Program", href: "/#beta" },
  { name: "FAQ", href: "/#faq" },
  { name: "Contact", href: "/#contact" },
];

export const betaNav = [
  { name: "Home", href: "/" },
  { name: "Beta Program", href: "/beta" },
  { name: "Apply", href: "/beta/apply" },
];

export const features = [
  {
    icon: "🏢",
    title: "Property & Unit Records",
    description:
      "One place for all your properties, units, and tenant assignments.",
  },
  {
    icon: "💰",
    title: "Rent Tracking",
    description:
      "Log payments manually or let tenants pay via M‑Pesa automatically.",
  },
  {
    icon: "🔧",
    title: "Maintenance Log",
    description: "Track requests, assign tasks, and keep a history of repairs.",
  },
  {
    icon: "📊",
    title: "Financial Snapshot",
    description: "See income, expenses, and net balance per property instantly.",
  },
];

export const betaRoles = [
  { icon: "🏠", title: "Landlords", description: "Manage 5+ units" },
  { icon: "🤝", title: "Agents", description: "Portfolio managers" },
  { icon: "🔧", title: "Property Managers", description: "Day‑to‑day operations" },
  { icon: "📈", title: "Investors", description: "Scaling portfolios" },
];

export const betaTerms = {
  title: "📋 Beta Program Terms & Conditions",
  intro: "By applying, you agree to the following:",
  items: [
    {
      label: "Active Participation:",
      text: "Use LPMS for your core property management tasks at least weekly.",
    },
    {
      label: "Constructive Feedback:",
      text: "Share what works, what doesn't, and what's missing via our dedicated feedback channel.",
    },
    {
      label: "Bug Reporting:",
      text: "Report any issues you encounter with clear steps to reproduce.",
    },
    {
      label: "Confidentiality (NDA):",
      text: "Keep all platform features, pricing, and unreleased functionality confidential. Do not share screenshots or details publicly.",
    },
    {
      label: "Data Privacy:",
      text: "Your property and tenant data are yours. We will never share or sell your data. All data is encrypted and stored securely.",
    },
    {
      label: "Free Access:",
      text: "Beta participants retain free access for 12 months after the public launch, followed by a 40% lifetime discount.",
    },
    {
      label: "No Obligation:",
      text: "You can opt‑out at any time. Your data will be exported and provided upon request.",
    },
    {
      label: "Feedback Ownership:",
      text: "All feedback becomes the property of LPMS to improve the product.",
    },
  ],
  note: "Full legal agreement will be provided upon acceptance into the program.",
};

export const privacyTerms = {
  title: "🔒 Privacy Policy (Data Handling)",
  items: [
    {
      label: "Data Collection:",
      text: "We collect only the information you provide (name, email, phone, property details) for the sole purpose of managing your account and improving the service.",
    },
    {
      label: "Data Storage:",
      text: "All data is stored on secure servers with encryption at rest and in transit.",
    },
    {
      label: "Data Sharing:",
      text: "We do not sell, rent, or share your personal data with third parties for marketing purposes.",
    },
    {
      label: "Tenant Data:",
      text: "Tenant information is treated with the same level of confidentiality as your own.",
    },
    {
      label: "Access Control:",
      text: "Only authorized LPMS staff have access to the database for maintenance and support.",
    },
    {
      label: "Data Portability:",
      text: "You can request a full export of your data in CSV/PDF format at any time.",
    },
  ],
};

export const faqs = [
  {
    question: "What does the Beta program cost?",
    answer:
      "Nothing. LPMS is completely free during the beta period. Beta users keep free access for 12 months after launch, then receive a 40% lifetime discount.",
  },
  {
    question: "Do I need to install any software?",
    answer:
      "No. LPMS runs entirely in your browser — just sign up and start managing your properties from any device with internet access.",
  },
  {
    question: "What happens to my data after the beta?",
    answer:
      "Your data remains yours. You can continue using LPMS at the discounted rate, or export all your data in CSV/PDF format at any time.",
  },
  {
    question: "Can I manage multiple properties?",
    answer:
      "Yes. LPMS is designed for landlords and agents with any number of properties and units. The system scales as your portfolio grows.",
  },
  {
    question: "Is my tenant data secure?",
    answer:
      "Absolutely. All data is encrypted in transit and at rest. We never share tenant data with third parties. You retain full ownership and control.",
  },
];

export const chartBarHeights = [28, 44, 18, 52, 34, 48, 22];
