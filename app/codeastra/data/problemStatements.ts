/* Temporary problem statements for CodeAstra, sourced from
   `temporary ps/CODEASTRA TEMPORARY PS.docx`. Domain keys match the
   registration form's domain select values. */

export type PSDomainKey = 'web' | 'ai' | 'cloud' | 'cyber';

export interface ProblemStatement {
  id: string;
  domain: PSDomainKey;
  title: string;
  brief: string;
}

export const psDomains: { key: PSDomainKey | 'all'; label: string }[] = [
  { key: 'all', label: 'All domains' },
  { key: 'web', label: 'Web & Product Development' },
  { key: 'ai', label: 'AI & ML' },
  { key: 'cloud', label: 'Cloud Computing & Distributed Systems' },
  { key: 'cyber', label: 'Cybersecurity & Digital Trust' },
];

export const psDomainLabel: Record<PSDomainKey, string> = {
  web: 'Web & Product Development',
  ai: 'AI & ML',
  cloud: 'Cloud Computing & Distributed Systems',
  cyber: 'Cybersecurity & Digital Trust',
};

export const problemStatements: ProblemStatement[] = [
  // Cloud Computing & Distributed Systems
  {
    id: 'cloud-1',
    domain: 'cloud',
    title: 'Intelligent Auto-Scaling for AI Workloads',
    brief:
      'Cloud AI workloads can fluctuate dramatically. Running excessive GPU infrastructure wastes resources, while insufficient resources cause unacceptable latency.',
  },
  {
    id: 'cloud-2',
    domain: 'cloud',
    title: 'Distributed Data Synchronization System',
    brief:
      'Design a system that keeps data synchronized across geographically distributed services while handling network delays, conflicting updates and temporary disconnections.',
  },
  {
    id: 'cloud-3',
    domain: 'cloud',
    title: 'Autonomous Cloud Operations Platform',
    brief:
      'Design an intelligent cloud operations platform that continuously observes infrastructure, detects anomalies, predicts failures and recommends or executes corrective actions.',
  },
  // Cybersecurity & Digital Trust
  {
    id: 'cyber-1',
    domain: 'cyber',
    title: 'Phishing Email/URL Detector',
    brief:
      'A tool/browser extension that analyzes emails or links and flags likely phishing attempts with reasoning.',
  },
  {
    id: 'cyber-2',
    domain: 'cyber',
    title: 'QR Code Safety Scanner',
    brief:
      'Scans QR codes before opening them and warns users if the destination looks malicious.',
  },
  {
    id: 'cyber-3',
    domain: 'cyber',
    title: 'Secure Voting System for College Elections',
    brief:
      'A tamper-evident digital voting prototype for student council elections with audit logging.',
  },
  // AI & ML
  {
    id: 'ai-1',
    domain: 'ai',
    title: 'Crop Disease Detector from Leaf Images',
    brief:
      'Upload a photo of a plant leaf and get a probable disease diagnosis with remedies.',
  },
  {
    id: 'ai-2',
    domain: 'ai',
    title: 'Personal Finance Advisor Chatbot',
    brief:
      'A conversational assistant that analyzes spending patterns from uploaded bank statements/CSV and gives saving tips.',
  },
  {
    id: 'ai-3',
    domain: 'ai',
    title: 'Traffic Congestion Predictor',
    brief:
      'Predicts congestion on common city routes using historical + live data for better commute planning.',
  },
  // Web & Product Development
  {
    id: 'web-1',
    domain: 'web',
    title: 'Blood Donor-Recipient Matching Web Platform',
    brief:
      'A web portal connecting blood donors with recipients/hospitals in real time based on blood group and location.',
  },
  {
    id: 'web-2',
    domain: 'web',
    title: 'Health Outbreak Detection & Alert System',
    brief:
      'Analyse real-time health and public-health data to detect unusual disease patterns early and issue timely alerts about potential outbreaks.',
  },
  {
    id: 'web-3',
    domain: 'web',
    title: 'Event Co-Planning Website for Friend Groups',
    brief:
      'A website where a group can propose event ideas, vote, split costs, and finalize plans without endless group-chat back-and-forth.',
  },
];

export const psById: Record<string, ProblemStatement> = Object.fromEntries(
  problemStatements.map((ps) => [ps.id, ps])
);
