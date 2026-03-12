import { events } from '../../data/events';
import { notFound } from 'next/navigation';
import EventDetailClient from './EventDetailClient';

export function generateStaticParams() {
    return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const event = events.find((e) => e.slug === slug);
    return {
        title: event ? event.title : 'Event',
        description: event?.description,
    };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const event = events.find((e) => e.slug === slug);
    if (!event) notFound();
    return <EventDetailClient event={event} />;
}
