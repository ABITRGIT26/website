import { NextResponse } from 'next/server';

/* Cyberflare registrations → Sheety (Google Sheets), same pattern as CodeAstra.
   Set SHEETY_CYBERFLARE_URL in .env.local to a Sheety endpoint whose first-row
   headers match the keys sent below. Falls back to logging + ok:true when not
   configured so the form still works in preview/dev. Auth: SHEETY_TOKEN. */
const SHEETY_URL =
  process.env.SHEETY_CYBERFLARE_URL ??
  'https://api.sheety.co/9fba8132d84abe7b9489c869e54c1e5b/cyberflare/sheet1';

export async function POST(request: Request) {
  try {
    const f = await request.json();

    const row = {
      email: f.email ?? '',
      fullName: f.fullName ?? '',
      phone: f.phone ?? '',
      experience: f.experience ?? '',
      course: f.course ?? '',
      department: f.department ?? '',
      year: f.year ?? '',
      regId: f.regId ?? '',
      submittedAt: new Date().toISOString(),
    };

    const token = process.env.SHEETY_TOKEN;

    if (!SHEETY_URL || !token) {
      console.log('Cyberflare registration (not synced to Sheets — set SHEETY_CYBERFLARE_URL + SHEETY_TOKEN):', row);
      return NextResponse.json({ ok: true, synced: false });
    }

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
      console.error('Sheety error (cyberflare):', response.status, detail);
      return NextResponse.json({ error: 'Failed to save registration' }, { status: 502 });
    }

    return NextResponse.json({ ok: true, synced: true });
  } catch (error) {
    console.error('API Error (cyberflare):', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
