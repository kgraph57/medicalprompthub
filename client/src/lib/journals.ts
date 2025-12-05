export interface Journal {
  id: string;
  title: string;
  publisher: string;
  impactFactor: number;
  category: string[];
  acceptanceRate?: string;
  reviewSpeed?: string;
  openAccess: boolean;
  url: string;
  guidelinesUrl: string;
  requirements: {
    wordCount: string;
    abstract: string;
    figures: string;
    references: string;
  };
}

export const journals: Journal[] = [
  {
    id: "nejm",
    title: "The New England Journal of Medicine",
    publisher: "Massachusetts Medical Society",
    impactFactor: 158.5,
    category: ["General Medicine"],
    acceptanceRate: "< 5%",
    reviewSpeed: "4-8 weeks",
    openAccess: false,
    url: "https://www.nejm.org/",
    guidelinesUrl: "https://www.nejm.org/author-center/new-manuscripts",
    requirements: {
      wordCount: "2,700 words (Original Article)",
      abstract: "250 words",
      figures: "Max 5",
      references: "Max 40"
    }
  },
  {
    id: "lancet",
    title: "The Lancet",
    publisher: "Elsevier",
    impactFactor: 168.9,
    category: ["General Medicine"],
    acceptanceRate: "< 5%",
    reviewSpeed: "4-8 weeks",
    openAccess: false,
    url: "https://www.thelancet.com/",
    guidelinesUrl: "https://www.thelancet.com/lancet/information-for-authors",
    requirements: {
      wordCount: "3,000 words",
      abstract: "Structured, 300 words",
      figures: "Max 5",
      references: "Max 30"
    }
  },
  {
    id: "bmj-case-reports",
    title: "BMJ Case Reports",
    publisher: "BMJ",
    impactFactor: 0.9,
    category: ["Case Reports", "General Medicine"],
    acceptanceRate: "40%",
    reviewSpeed: "2-4 weeks",
    openAccess: true,
    url: "https://casereports.bmj.com/",
    guidelinesUrl: "https://casereports.bmj.com/pages/authors/",
    requirements: {
      wordCount: "1,500 words",
      abstract: "Unstructured, 150 words",
      figures: "Max 4",
      references: "Max 15"
    }
  },
  {
    id: "j-med-case-reports",
    title: "Journal of Medical Case Reports",
    publisher: "BMC",
    impactFactor: 0.8,
    category: ["Case Reports", "General Medicine"],
    acceptanceRate: "35%",
    reviewSpeed: "6-8 weeks",
    openAccess: true,
    url: "https://jmedicalcasereports.biomedcentral.com/",
    guidelinesUrl: "https://jmedicalcasereports.biomedcentral.com/submission-guidelines",
    requirements: {
      wordCount: "No strict limit",
      abstract: "350 words",
      figures: "Unlimited",
      references: "Unlimited"
    }
  },
  {
    id: "cureus",
    title: "Cureus",
    publisher: "Springer Nature",
    impactFactor: 1.2,
    category: ["General Medicine", "Specialty Medicine"],
    acceptanceRate: "50%",
    reviewSpeed: "1-2 weeks",
    openAccess: true,
    url: "https://www.cureus.com/",
    guidelinesUrl: "https://www.cureus.com/author_guide",
    requirements: {
      wordCount: "No strict limit",
      abstract: "Structured",
      figures: "Unlimited",
      references: "Minimum 5"
    }
  },
  {
    id: "internal-medicine",
    title: "Internal Medicine",
    publisher: "The Japanese Society of Internal Medicine",
    impactFactor: 1.3,
    category: ["Internal Medicine", "General Medicine"],
    acceptanceRate: "20-30%",
    reviewSpeed: "4-6 weeks",
    openAccess: true,
    url: "https://www.naika.or.jp/imonline/",
    guidelinesUrl: "https://www.naika.or.jp/imonline/submit/",
    requirements: {
      wordCount: "2,500 words (Case Report)",
      abstract: "200 words",
      figures: "Max 4",
      references: "Max 20"
    }
  }
];
