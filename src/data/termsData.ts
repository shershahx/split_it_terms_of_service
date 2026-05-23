export interface TermsSection {
  id: string;
  num: number;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  warningCallout?: boolean;
  versions?: { version: string; date: string; current: boolean; description: string; }[];
}

export const TERMS_METADATA = {
  appName: "Split It",
  effectiveDate: "May 23, 2026",
  lastUpdated: "May 23, 2026",
  operator: "Sher Shah",
  contactEmail: "splitit.support@gmail.com",
  contactAddress: "Islamabad, Pakistan"
};

export const termsSections: TermsSection[] = [
  {
    id: "who-may-use-the-service",
    num: 1,
    title: "Who may use the Service",
    paragraphs: [
      "You must be at least 13 years old to use the Service (or the minimum age required in your country). If you are under the age of majority where you live, you represent that your parent or legal guardian has reviewed and agreed to these Terms on your behalf.",
      "You represent and warrant that:"
    ],
    bullets: [
      "you can form a binding contract with us (or have valid parental/guardian consent if required), and",
      "you will comply with these Terms and all applicable laws."
    ]
  },
  {
    id: "accounts-and-security",
    num: 2,
    title: "Accounts and security",
    paragraphs: [
      "Some features may require an account.",
      "You agree to:",
      "You are responsible for all activity that occurs under your account. If you believe your account has been compromised, stop using the Service and contact us at splitit.support@gmail.com."
    ],
    bullets: [
      "provide accurate, current information,",
      "keep your account information up to date, and",
      "maintain the confidentiality of your login credentials."
    ]
  },
  {
    id: "what-the-service-does-and-does-not-do",
    num: 3,
    title: "What the Service does (and does not do)",
    paragraphs: [
      "Split It helps users track shared expenses, calculate balances, and suggest settlements within groups.",
      "Important: Split It is a tracking and calculation tool. We do not provide banking, money transmission, escrow, or payment processing services. Any real-world payments or settlements happen outside the Service and are your responsibility.",
      "You are responsible for verifying expense entries, participants, tax/tip handling, rounding, and settlement outcomes."
    ]
  },
  {
    id: "user-content-and-responsibility",
    num: 4,
    title: "User content and responsibility",
    paragraphs: [
      "The Service may allow you to submit, upload, or store content such as expense details (amount, date, category, notes), participant information, and receipts/images (collectively, \"User Content\").",
      "You retain ownership of your User Content. You are solely responsible for your User Content and represent that you have the necessary rights to provide it.",
      "You agree not to upload, share, or store User Content that:"
    ],
    bullets: [
      "violates law or someone else’s rights (including privacy and intellectual property),",
      "is fraudulent, misleading, or defamatory,",
      "contains malware or attempts to interfere with the Service, or",
      "is obscene, hateful, or harassing."
    ]
  },
  {
    id: "license-to-operate-the-service",
    num: 5,
    title: "License to operate the Service",
    paragraphs: [
      "To operate and improve the Service, you grant us a worldwide, non-exclusive, royalty-free license to host, store, reproduce, process, transmit, and display your User Content only as necessary to provide the Service (for example: syncing across your devices and showing shared expenses to group members).",
      "This license ends when your User Content is deleted from the Service, except:",
    ],
    bullets: [
      "where continued storage is required by law,",
      "where content has been shared with others and they have not deleted it, or",
      "for reasonable backup/archival retention."
    ]
  },
  {
    id: "acceptable-use",
    num: 6,
    title: "Acceptable use",
    paragraphs: [
      "You agree not to:"
    ],
    bullets: [
      "reverse engineer, decompile, or attempt to extract source code from the Service except where prohibited by law,",
      "use the Service to violate any law or regulation,",
      "probe, scan, or test the vulnerability of any system or network,",
      "access the Service through automated means not provided by us, or",
      "interfere with the normal operation of the Service."
    ]
  },
  {
    id: "third-party-services",
    num: 7,
    title: "Third-party services",
    paragraphs: [
      "The Service may rely on third-party services (for example: cloud hosting, analytics, crash reporting, authentication, or app store services).",
      "Your use of third-party services may be governed by their terms and policies. We are not responsible for third-party services and do not control them."
    ]
  },
  {
    id: "privacy",
    num: 8,
    title: "Privacy",
    paragraphs: [
      "Our collection and use of personal information is described in our Privacy Policy (if/when provided). If you need a copy, contact us at splitit.support@gmail.com."
    ]
  },
  {
    id: "data-retention-and-deletion",
    num: 9,
    title: "Data retention and deletion",
    paragraphs: [
      "We may provide tools to export or delete your data. Some information may remain in backups for a limited period.",
      "If you delete your account, shared group data may remain visible to other group members to preserve records unless the group deletes it or applicable law requires removal."
    ]
  },
  {
    id: "intellectual-property",
    num: 10,
    title: "Intellectual property",
    paragraphs: [
      "The Service, including its software, design, text, graphics, logos, and other content (excluding User Content), is owned by Sher Shah or licensors and is protected by intellectual property laws.",
      "You are granted a limited, non-exclusive, non-transferable, revocable license to use the Service for your personal, non-commercial use in accordance with these Terms."
    ]
  },
  {
    id: "feedback",
    num: 11,
    title: "Feedback",
    paragraphs: [
      "If you submit feedback, ideas, or suggestions (\"Feedback\"), you grant us the right to use the Feedback without restriction or compensation to you."
    ]
  },
  {
    id: "suspension-and-termination",
    num: 12,
    title: "Suspension and termination",
    paragraphs: [
      "We may suspend or terminate your access to the Service if we reasonably believe:",
      "You may stop using the Service at any time. You may delete your account where the Service provides that option."
    ],
    bullets: [
      "you violated these Terms,",
      "your use creates risk or potential legal exposure for us or others, or",
      "we are required to do so by law."
    ]
  },
  {
    id: "disclaimers",
    num: 13,
    title: "Disclaimers",
    warningCallout: true,
    paragraphs: [
      "THE SERVICE IS PROVIDED \"AS IS\" AND \"AS AVAILABLE.\" TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.",
      "WE DO NOT WARRANT THAT:",
    ],
    bullets: [
      "THE SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE, OR",
      "ANY CALCULATIONS OR SETTLEMENT SUGGESTIONS WILL BE ACCURATE."
    ]
  },
  {
    id: "limitation-of-liability",
    num: 14,
    title: "Limitation of liability",
    warningCallout: true,
    paragraphs: [
      "TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, OR GOODWILL, ARISING FROM OR RELATED TO YOUR USE OF THE SERVICE.",
      "TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR TOTAL LIABILITY FOR ANY CLAIM RELATED TO THE SERVICE WILL NOT EXCEED USD $100.",
      "Some jurisdictions do not allow certain limitations, so some of the above may not apply to you."
    ]
  },
  {
    id: "indemnity",
    num: 15,
    title: "Indemnity",
    paragraphs: [
      "You agree to indemnify and hold harmless Sher Shah from any claims, liabilities, damages, losses, and expenses (including reasonable attorneys’ fees) arising out of or related to:"
    ],
    bullets: [
      "your use of the Service,",
      "your User Content, or",
      "your violation of these Terms or applicable law."
    ]
  },
  {
    id: "changes-to-the-service-or-terms",
    num: 16,
    title: "Changes to the Service or Terms",
    paragraphs: [
      "We may update the Service and these Terms from time to time. The “Last updated” date shows when changes were made.",
      "By continuing to use the Service after changes take effect, you agree to the updated Terms."
    ]
  },
  {
    id: "governing-law-and-disputes",
    num: 17,
    title: "Governing law and disputes",
    paragraphs: [
      "These Terms are governed by the laws of Pakistan, without regard to conflict-of-laws rules.",
      "Any dispute arising out of or relating to these Terms or the Service will be brought in the courts located in Pakistan, unless applicable law provides otherwise."
    ]
  },
  {
    id: "contact",
    num: 18,
    title: "Contact",
    paragraphs: [
      "Questions about these Terms may be sent to:",
      "Sher Shah",
      "Email: splitit.support@gmail.com",
      "Address: Islamabad, Pakistan"
    ]
  },
  {
    id: "app-store-terms",
    num: 19,
    title: "App store terms",
    paragraphs: [
      "If you download the app from an app store, you acknowledge that:"
    ],
    bullets: [
      "these Terms are between you and Sher Shah, not the store,",
      "the store may have additional rules and refund policies, and",
      "the store is not responsible for the Service, except as required by law."
    ]
  },
  {
    id: "version-history",
    num: 20,
    title: "Version History",
    paragraphs: [
      "Below is the list of versions for our Terms of Service. Earlier versions are provided for historical reference."
    ],
    versions: [
      { version: "1.0", date: "January 15, 2024", current: false, description: "Initial release of Split It Terms of Service." },
      { version: "1.1", date: "July 10, 2025", current: false, description: "Clarified data retention policies regarding deleted accounts and updated third-party service disclaimers." },
      { version: "2.0", date: "May 23, 2026", current: true, description: "Major update to structure and language for clarity, updated operator contact information, and expanded acceptable use policies." }
    ]
  }
];
