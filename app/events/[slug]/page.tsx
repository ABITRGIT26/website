import type { Metadata } from 'next';
import { events } from '../../data/events';
import { notFound } from 'next/navigation';
import EventDetailClient from './EventDetailClient';

const SITE_URL = 'https://rgitabit.in';

export function generateStaticParams() {
    return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const event = events.find((e) => e.slug === slug);
    if (!event) return { title: 'Event Not Found' };
    const url = `${SITE_URL}/events/${event.slug}`;
    return {
        title: event.title,
        description: event.description,
        alternates: { canonical: url },
        openGraph: {
            type: 'article',
            url,
            siteName: 'ABIT · RGIT Mumbai',
            title: `${event.title} | ABIT RGIT`,
            description: event.description,
            images: [{ url: event.image, alt: event.title }],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${event.title} | ABIT RGIT`,
            description: event.description,
            images: [event.image],
        },
    };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const event = events.find((e) => e.slug === slug);
    if (!event) notFound();
    return <EventDetailClient event={event} />;
}
