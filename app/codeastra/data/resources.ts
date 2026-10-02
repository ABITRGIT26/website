export interface CodeastraResource {
  label: string;
  description: string;
  href: string;
  kind: 'PDF' | 'PPTX';
}

export const CODEASTRA_WHATSAPP_URL = 'https://chat.whatsapp.com/C5L1UYMTh3C2kEQFSeBtN4';

export const codeastraResources: CodeastraResource[] = [
  {
    label: 'CodeAstra 2.0 Rulebook',
    description: 'Eligibility, format, judging criteria, code of conduct and terms & conditions.',
    href: encodeURI('/pdfs/MAIN CODEASTRA 2.0 RULEBOOK_compressed.pdf'),
    kind: 'PDF',
  },
  {
    label: 'Problem Statement Reveal',
    description: 'All twelve problem statements with the full brief for each domain.',
    href: encodeURI('/pdfs/Problem Statement reveal_compressed.pdf'),
    kind: 'PDF',
  },
  {
    label: 'PPT Template',
    description: 'Official pitch deck template for your idea submission.',
    href: encodeURI('/pdfs/Main Codeastra 2.0 PPT.pptx'),
    kind: 'PPTX',
  },
  {
    label: 'SYNERGY Phase 1 Brochure',
    description: 'The complete SYNERGY Phase 1 event brochure.',
    href: encodeURI('/pdfs/SYNERGY PHASE 1 BROCHURE _compressed (1).pdf'),
    kind: 'PDF',
  },
];
