'use client';

import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import type { Project } from '../data/projects';

interface ProjectCardProps {
    project: Project;
    index?: number;
}

const categoryColors: Record<string, string> = {
    web: '#FFFFFF',
    mobile: '#8B5CF6',
    ai: '#10B981',
    iot: '#F59E0B',
    other: '#64748B',
};

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
    const color = categoryColors[project.category] || '#FFFFFF';
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -4, borderColor: '#FF6A00', boxShadow: '0 10px 30px rgba(255, 106, 0, 0.15)' }}
            style={{
                background: '#111111',
                border: '1px solid rgba(255, 106, 0, 0.2)',
                borderRadius: '20px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                transition: 'all 0.3s ease',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
            }}
        >
            {/* Glow accent */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                opacity: 0.6,
            }} />

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                <div>
                    <div style={{
                        display: 'inline-block',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: `${color}18`,
                        border: `1px solid ${color}33`,
                        color: color,
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        marginBottom: '8px',
                    }}>
                        {project.category}
                    </div>
                    <h3 style={{
                        fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
                        fontSize: '20px',
                        fontWeight: 700,
                        color: 'white',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.2,
                    }}>
                        {project.title}
                    </h3>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                width: 36,
                                height: 36,
                                borderRadius: '10px',
                                background: 'rgba(255,255,255,0.06)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'rgba(255,255,255,0.6)',
                                transition: 'all 0.2s ease',
                                textDecoration: 'none',
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.color = 'white';
                                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)';
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)';
                                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                            }}
                            aria-label="GitHub"
                        >
                            <Github size={16} />
                        </a>
                    )}
                    {project.demo && (
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                width: 36,
                                height: 36,
                                borderRadius: '10px',
                                background: 'rgba(255, 106, 0, 0.12)',
                                border: '1px solid rgba(255, 106, 0, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#FF6A00',
                                transition: 'all 0.2s ease',
                                textDecoration: 'none',
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.background = 'rgba(255, 106, 0, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.background = 'rgba(255, 106, 0, 0.12)';
                            }}
                            aria-label="Live Demo"
                        >
                            <ExternalLink size={16} />
                        </a>
                    )}
                </div>
            </div>

            {/* Description */}
            <p style={{
                color: 'rgba(255,255,255,0.55)',
                fontSize: '14px',
                lineHeight: 1.7,
                flex: 1,
            }}>
                {project.description}
            </p>

            {/* Tech stack */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {project.tech.map((tech) => (
                    <span
                        key={tech}
                        style={{
                            padding: '4px 12px',
                            borderRadius: '6px',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            color: 'rgba(255,255,255,0.6)',
                            fontSize: '12px',
                            fontWeight: 500,
                        }}
                    >
                        {tech}
                    </span>
                ))}
            </div>

            {/* Team */}
            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px' }}>
                Built by {project.team.join(', ')}
            </div>
        </motion.div>
    );
}
