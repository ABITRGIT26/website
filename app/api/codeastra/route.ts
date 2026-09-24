import { NextResponse } from 'next/server';
import { psById } from '@/app/codeastra/data/problemStatements';

/* CodeAstra registrations → Sheety (Google Sheets).
   IMPORTANT: the first-row headers in sheet1 must match the keys sent
   below (Sheety matches POST keys to header names, case-insensitively).
   Auth comes from SHEETY_TOKEN in .env.local. */
const SHEETY_URL =
  process.env.SHEETY_CODEASTRA_URL ??
  'https://api.sheety.co/9fba8132d84abe7b9489c869e54c1e5b/codeAstra/sheet1';

const DOMAIN_LABELS: Record<string, string> = {
  web: 'Web & Product Development',
  ai: 'AI & ML',
  cloud: 'Cloud Computing & Distributed Systems',
  cyber: 'Cybersecurity & Digital Trust',
};

export async function POST(request: Request) {
  try {
    const token = process.env.SHEETY_TOKEN;
    if (!token) {
      return NextResponse.json({ error: 'SHEETY_TOKEN is not configured' }, { status: 500 });
    }

    const f = await request.json();

    const row = {
      teamName: f.teamName ?? '',
      teamSize: f.teamSize ?? '',
      domain: DOMAIN_LABELS[f.domain] ?? f.domain ?? '',
      problemStatement: (f.psId && psById[f.psId]?.title) || '',
      email: f.email ?? '',
      phone: f.phone ?? '',
      college: f.collegeName ?? '',
      year: f.engYear ?? '',
      teamLead: f.teamLead ?? '',
      member2: f.member2 ?? '',
      member3: f.member3 ?? '',
      member4: f.member4 ?? '',
      ideaTitle: f.ideaTitle ?? '',
      ideaProblem: f.ideaProblem ?? '',
      ideaApproach: f.ideaApproach ?? '',
      techStack: f.ideaTech ?? '',
      pitchDeck: f.pitchDeck ?? '',
      referral: f.referral ?? '',
      motivation: f.additionalInfo ?? '',
      notes: f.extraNote ?? '',
      teamId: f.teamId ?? '',
      submittedAt: new Date().toISOString(),
    };

    const response = await fetch(SHEETY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ sheet1: row }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error('Sheety error:', response.status, detail);
      return NextResponse.json({ error: 'Failed to save registration' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
