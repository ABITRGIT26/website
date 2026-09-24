'use client';

import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

/**
 * BreachTransition CODEASTRA's answer to Sharkathon's ping-pong ball.
 *
 * A lightsaber (white core, electric-blue plasma) ignites mid-fall and stabs
 * through a dreamy starfield as you scroll, trailing plasma sparks and speed
 * lines. It strikes the grid screen kick, elliptical shockwaves, emissive
 * ground cracks, directional debris bursts into sparkles, and detonates
 * into a dark electric flood carrying the message "YOU ARE NOW GOING
 * BEYOND." beneath twinkling stars while embers rise then lifts
 * to reveal the next section.
 * Brutalist bones, luxurious finish.
 */

type Star = {
    x: number;
    y: number;
    r: number;
    phase: number;
    speed: number;
    cross: boolean;
    tint: string;
};

type Mote = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    max: number;
    size: number;
    shade: string;
    cross: boolean;
    rise: boolean;
};

function getThemeText(): string {
    if (typeof document === 'undefined') return '#101010';
    return getComputedStyle(document.documentElement).getPropertyValue('--cb-text').trim() || '#101010';
}

const SPARKLES: { top: string; left: string; size: number; delay: string; dark: boolean }[] = [
    { top: '30%', left: '24%', size: 22, delay: '0s', dark: false },
    { top: '26%', left: '68%', size: 16, delay: '0.7s', dark: false },
    { top: '38%', left: '78%', size: 26, delay: '1.3s', dark: true },
    { top: '62%', left: '20%', size: 18, delay: '0.4s', dark: true },
    { top: '70%', left: '72%', size: 22, delay: '1.8s', dark: false },
    { top: '66%', left: '32%', size: 13, delay: '1.1s', dark: false },
    { top: '24%', left: '46%', size: 14, delay: '2s', dark: true },
    { top: '74%', left: '52%', size: 16, delay: '0.9s', dark: true },
];

function Sparkle({ top, left, size, delay, dark }: { top: string; left: string; size: number; delay: string; dark: boolean }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className="breach-sparkle"
            aria-hidden="true"
            style={{
                position: 'absolute',
                top,
                left,
                width: size,
                height: size,
                color: dark ? 'var(--cb-text)' : '#FFFFFF',
                animationDelay: delay,
                filter: dark ? 'none' : 'drop-shadow(0 0 6px rgba(255,255,255,0.9))',
            }}
        >
            <path
                d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"
                fill="currentColor"
            />
        </svg>
    );
}

export default function BreachTransition({
    heroRef,
    onImpact,
    onComplete,
    onStrike,
}: {
    heroRef: React.RefObject<HTMLDivElement | null>;
    onImpact: (triggered: boolean) => void;
    onComplete: (triggered: boolean) => void;
    onStrike: (triggered: boolean) => void;
}) {
    const [impactY, setImpactY] = useState(0);
    const [reduced, setReduced] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const burstRef = useRef<(x: number, y: number) => void>(() => {});

    useEffect(() => {
        setImpactY(window.innerHeight * 0.42);
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setReduced(true);
            onImpact(true);
            onComplete(true);
        } else if (window.scrollY > window.innerHeight * 0.55) {
            // Deep-link / restored scroll: start already breached.
            onImpact(true);
            onComplete(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });

    // Falling saber: steadies from a slight tilt into a vertical stab
    const squareY = useTransform(scrollYProgress, [0, 0.35], [-180, impactY]);
    const squareRotate = useTransform(scrollYProgress, [0, 0.4], [-16, 0]);
    // Detonation: hold, punch, then flood the viewport
    const squareScale = useTransform(
        scrollYProgress,
        [0, 0.38, 0.46, 0.6, 0.75],
        [1, 1, 1.35, 22, 70]
    );
    // Detonation handoff: bright saber dissolves into a dark electric flood,
    // fully gone before the anchor scales past ~5x (cheap release later)
    const bladeFade = useTransform(scrollYProgress, [0.44, 0.48], [1, 0]);
    const floodOpacity = useTransform(scrollYProgress, [0.46, 0.56], [0, 1]);
    const squareOpacity = useTransform(scrollYProgress, [0.84, 0.92], [1, 0]);

    // Ignition: bare hilt falls in, blade snaps out of the emitter mid-fall
    const bladeGrow = useTransform(scrollYProgress, [0.02, 0.15], [0.05, 1]);
    const igniteFlash = useTransform(scrollYProgress, [0.02, 0.07, 0.14, 0.22], [0, 1, 0.9, 0]);

    // Speed lines lag the fall slightly, stretching the sense of velocity
    const streakY1 = useTransform(squareY, (v) => v * 0.88);
    const streakY2 = useTransform(squareY, (v) => v * 0.93);
    const streakY3 = useTransform(squareY, (v) => v * 0.97);
    const streakOpacity = useTransform(scrollYProgress, [0, 0.06, 0.3, 0.4], [0, 0.85, 0.85, 0]);

    // Ground cracks spider out from the strike point on impact
    const crackDraw = useTransform(scrollYProgress, [0.35, 0.47], [0, 1]);
    const crackOpacity = useTransform(scrollYProgress, [0.35, 0.42, 0.55, 0.62], [0, 1, 1, 0]);

    // Spark trail vanishes as the saber strikes
    const trailOpacity = useTransform(scrollYProgress, [0, 0.3, 0.36, 0.44], [0, 0.9, 0.9, 0]);

    // Square shockwave rings on impact
    const rippleScale = useTransform(scrollYProgress, [0.3, 0.42, 0.54], [0, 14, 26]);
    const rippleOpacity = useTransform(scrollYProgress, [0.3, 0.42, 0.54], [0, 1, 0]);
    const ripple2Scale = useTransform(scrollYProgress, [0.34, 0.46, 0.58], [0, 10, 20]);
    const ripple2Opacity = useTransform(scrollYProgress, [0.34, 0.46, 0.58], [0, 0.8, 0]);

    // Dreamy starfield presence follows the fall, releases with the veil
    const starsOpacity = useTransform(scrollYProgress, [0, 0.12, 0.8, 0.9], [0, 1, 1, 0]);

    // Impact flash frame
    const flashOpacity = useTransform(scrollYProgress, [0.44, 0.5, 0.6], [0, 0.85, 0]);

    // Flood message: rises with coverage, single sequenced release (no overlapping fades)
    const messageOpacity = useTransform(
        scrollYProgress,
        [0.52, 0.6, 0.76, 0.86],
        [0, 1, 1, 0]
    );
    const messageScale = useTransform(scrollYProgress, [0.52, 0.62], [0.94, 1]);

    const [blasted, setBlasted] = useState(false);
    const [struck, setStruck] = useState(false);
    // Calm parks the infinite flicker loops while saber visuals are invisible
    const [calm, setCalm] = useState(true);

    // Seeded impact cracks: full-radial shatter with short branches, like struck glass
    const cracks = useMemo(() => {
        let seed = 11;
        const rand = () => {
            seed = (seed * 16807) % 2147483647;
            return (seed - 1) / 2147483646;
        };
        const C = 260;
        const out: string[] = [];
        for (let i = 0; i < 8; i++) {
            let a = (i / 8) * Math.PI * 2 + (rand() - 0.5) * 0.5;
            let x = C;
            let y = C;
            let d = `M ${x} ${y}`;
            const segs = 3 + Math.floor(rand() * 2);
            let bx = 0;
            let by = 0;
            let ba = 0;
            for (let s = 0; s < segs; s++) {
                const step = 42 + rand() * 48;
                x += Math.cos(a) * step;
                y += Math.sin(a) * step;
                d += ` L ${x.toFixed(0)} ${y.toFixed(0)}`;
                if (s === 1) {
                    bx = x;
                    by = y;
                    ba = a + (rand() < 0.5 ? 0.8 : -0.8);
                }
                a += (rand() - 0.5) * 0.9;
            }
            out.push(d);
            // Short branch off the middle of two cracks
            if ((i === 1 || i === 4) && bx !== 0) {
                let d2 = `M ${bx.toFixed(0)} ${by.toFixed(0)}`;
                let qx = bx;
                let qy = by;
                let qa = ba;
                for (let s = 0; s < 2; s++) {
                    const step = 30 + rand() * 36;
                    qx += Math.cos(qa) * step;
                    qy += Math.sin(qa) * step;
                    d2 += ` L ${qx.toFixed(0)} ${qy.toFixed(0)}`;
                    qa += (rand() - 0.5) * 0.8;
                }
                out.push(d2);
            }
        }
        return out;
    }, []);

    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        // Park infinite loops while the saber visuals are invisible
        const shouldCalm = latest < 0.02 || latest > 0.55;
        if (shouldCalm && !calm) setCalm(true);
        else if (!shouldCalm && calm) setCalm(false);
        // Sharp screen kick the instant the tip makes contact
        if (latest >= 0.35 && !struck) {
            setStruck(true);
            onStrike(true);
        } else if (latest < 0.3 && struck) {
            setStruck(false);
            onStrike(false);
        }
        // Flip the page into its post-breach state once the flood covers all
        if (latest >= 0.6 && !blasted) {
            setBlasted(true);
            burstRef.current(window.innerWidth / 2, impactY || window.innerHeight * 0.42);
            onImpact(true);
            onComplete(true);
        } else if (latest < 0.55 && blasted) {
            setBlasted(false);
            onImpact(false);
            onComplete(false);
        }
    });

    // Dreamy starfield canvas: gentle twinkle + impact sparkle burst
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let raf = 0;
        let w = 0;
        let h = 0;
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        let stars: Star[] = [];
        let motes: Mote[] = [];

        const seed = () => {
            const count = Math.min(170, Math.floor((w * h) / 9000));
            const txt = getThemeText();
            const tints = [txt, txt, '#1A1A18', '#1A1A18', '#0047AB', '#35AFFF'];
            stars = Array.from({ length: count }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                r: 0.6 + Math.random() * 1.6,
                phase: Math.random() * Math.PI * 2,
                speed: 0.5 + Math.random() * 1.6,
                cross: Math.random() < 0.12,
                tint: tints[Math.floor(Math.random() * tints.length)],
            }));
        };

        const resize = () => {
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = Math.floor(w * dpr);
            canvas.height = Math.floor(h * dpr);
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            seed();
        };
        resize();
        window.addEventListener('resize', resize);

        burstRef.current = (x: number, y: number) => {
            // Impact plume: fast fine sparks thrown UP and OUT, a few flat skimmers
            for (let i = 0; i < 110; i++) {
                const flat = Math.random() < 0.18;
                const th = flat
                    ? (Math.random() < 0.5 ? -1 : 1) * (1.25 + Math.random() * 0.2)
                    : (Math.random() - 0.5) * 2.2;
                const speed = flat ? 5 + Math.random() * 5 : 2.5 + Math.random() * 6;
                const max = 40 + Math.random() * 50;
                const sr = Math.random();
                motes.push({
                    x: x + (Math.random() - 0.5) * 60,
                    y,
                    vx: Math.sin(th) * speed,
                    vy: -Math.cos(th) * speed,
                    life: 0,
                    max,
                    size: 0.8 + Math.random() * 1.4,
                    shade: sr < 0.25 ? getThemeText() : sr < 0.65 ? '#35AFFF' : '#FFFFFF',
                    cross: Math.random() < 0.12,
                    rise: false,
                });
            }
            // Embers: slow risers that drift up through the flood message
            for (let i = 0; i < 26; i++) {
                motes.push({
                    x: x + (Math.random() - 0.5) * 160,
                    y: y + (Math.random() - 0.5) * 40,
                    vx: (Math.random() - 0.5) * 0.6,
                    vy: -(0.4 + Math.random() * 1.1),
                    life: 0,
                    max: 200 + Math.random() * 120,
                    size: 0.8 + Math.random() * 1.4,
                    shade: Math.random() < 0.5 ? '#FFFFFF' : '#35AFFF',
                    cross: Math.random() < 0.15,
                    rise: true,
                });
            }
        };

        const render = (now: number) => {
            raf = requestAnimationFrame(render);
            if (document.hidden) return;
            const progress = scrollYProgress.get();
            if ((progress < 0.015 || progress > 0.95) && motes.length === 0) return;

            const t = now / 1000;
            ctx.clearRect(0, 0, w, h);

            for (const s of stars) {
                const a = 0.2 + 0.55 * Math.abs(Math.sin(t * s.speed + s.phase));
                // Parallax: nearer (bigger) stars drift against the fall
                let sy = (s.y - progress * 60 * s.r) % h;
                if (sy < 0) sy += h;
                ctx.globalAlpha = a;
                ctx.fillStyle = s.tint;
                if (s.cross) {
                    const arm = s.r * 3.2;
                    ctx.fillRect(s.x - arm, sy - 0.7, arm * 2, 1.4);
                    ctx.fillRect(s.x - 0.7, sy - arm, 1.4, arm * 2);
                } else {
                    ctx.beginPath();
                    ctx.arc(s.x, sy, s.r, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            motes = motes.filter((m) => m.life < m.max);
            for (const m of motes) {
                m.life += 1;
                if (m.rise) {
                    // Buoyant ember with a gentle sway
                    m.vy -= 0.004;
                    m.vx *= 0.995;
                    m.x += m.vx + Math.sin(m.life * 0.06) * 0.4;
                    m.y += m.vy;
                } else {
                    // Debris arcs out and falls
                    m.vx *= 0.985;
                    m.vy = m.vy * 0.985 + 0.08;
                    m.x += m.vx;
                    m.y += m.vy;
                }
                const fade = 1 - m.life / m.max;
                ctx.globalAlpha = Math.max(0, fade);
                if (m.cross) {
                    const arm = m.size * 2.6;
                    ctx.fillStyle = m.shade;
                    ctx.fillRect(m.x - arm, m.y - 0.8, arm * 2, 1.6);
                    ctx.fillRect(m.x - 0.8, m.y - arm, 1.6, arm * 2);
                } else if (m.rise) {
                    ctx.fillStyle = m.shade;
                    ctx.fillRect(m.x, m.y, m.size, m.size);
                } else {
                    // Velocity-stretched spark streak
                    ctx.strokeStyle = m.shade;
                    ctx.lineWidth = m.size;
                    ctx.beginPath();
                    ctx.moveTo(m.x, m.y);
                    ctx.lineTo(m.x - m.vx * 2.2, m.y - m.vy * 2.2);
                    ctx.stroke();
                }
            }
            ctx.globalAlpha = 1;
        };
        raf = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
            burstRef.current = () => {};
        };
    }, [scrollYProgress]);

    if (reduced || impactY === 0) return null;

    return (
        <div
            aria-hidden="true"
            style={{
                position: 'fixed',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 9999,
                overflow: 'hidden',
            }}
        >
            {/* Dreamy starfield */}
            <motion.div style={{ position: 'absolute', inset: 0, opacity: starsOpacity }}>
                <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
            </motion.div>

            {/* Shockwave rings squashed to read as striking a floor */}
            <motion.div
                style={{
                    position: 'absolute',
                    left: 'calc(50% - 60px)',
                    top: impactY - 60,
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    border: '4px solid #35AFFF',
                    scale: rippleScale,
                    scaleY: 0.55,
                    opacity: rippleOpacity,
                    willChange: 'transform, opacity',
                }}
            />
            <motion.div
                style={{
                    position: 'absolute',
                    left: 'calc(50% - 60px)',
                    top: impactY - 60,
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    border: '2px solid var(--cb-text)',
                    scale: ripple2Scale,
                    scaleY: 0.55,
                    opacity: ripple2Opacity,
                    willChange: 'transform, opacity',
                }}
            />

            {/* Emissive ground cracks shattering out from the strike point */}
            <svg
                viewBox="0 0 520 520"
                aria-hidden="true"
                style={{ position: 'absolute', left: 'calc(50% - 260px)', top: impactY - 260, width: 520, height: 520 }}
            >
                <g style={{ filter: 'blur(4px)' }}>
                    {cracks.map((d, i) => (
                        <motion.path
                            key={`g${i}`}
                            d={d}
                            fill="none"
                            stroke="#35AFFF"
                            strokeWidth={5}
                            strokeLinecap="round"
                            style={{ pathLength: crackDraw, opacity: crackOpacity }}
                        />
                    ))}
                </g>
                {cracks.map((d, i) => (
                    <motion.path
                        key={`c${i}`}
                        d={d}
                        fill="none"
                        stroke="#DFF2FF"
                        strokeWidth={2}
                        strokeLinecap="round"
                        style={{ pathLength: crackDraw, opacity: crackOpacity }}
                    />
                ))}
            </svg>
            {/* Hot core flash hiding the crack convergence point */}
            <motion.div
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    left: 'calc(50% - 45px)',
                    top: impactY - 45,
                    width: 90,
                    height: 90,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #FFFFFF 0%, rgba(53,175,255,0.85) 40%, transparent 70%)',
                    opacity: crackOpacity,
                    willChange: 'opacity',
                }}
            />

            {/* Plasma spark trail */}
            {[0, 1, 2, 3, 4, 5].map((i) => {
                const s = 10 - i;
                const white = i % 2 === 0;
                return (
                    <motion.div
                        key={i}
                        style={{
                            position: 'absolute',
                            left: `calc(50% - ${s / 2}px)`,
                            top: -330 - i * 26,
                            y: squareY,
                            opacity: trailOpacity,
                            width: s,
                            height: s,
                            borderRadius: '50%',
                            background: white ? '#FFFFFF' : '#35AFFF',
                            boxShadow: white
                                ? '0 0 10px rgba(255,255,255,0.9)'
                                : '0 0 12px rgba(53,175,255,0.9)',
                            willChange: 'transform, opacity',
                        }}
                    />
                );
            })}

            {/* The falling lightsaber white core, electric-blue plasma, tip down */}
            <motion.div
                style={{
                    position: 'absolute',
                    left: 'calc(50% - 60px)',
                    top: -120,
                    y: squareY,
                    rotate: squareRotate,
                    scale: squareScale,
                    opacity: squareOpacity,
                    width: 120,
                    height: 120,
                    willChange: 'transform, opacity',
                    transformOrigin: 'center center',
                }}
            >
                {/* Dark electric flood takes over as the saber detonates */}
                <motion.div
                    style={{
                        position: 'absolute',
                        inset: -12,
                        borderRadius: 28,
                        background:
                            'linear-gradient(160deg, #0058DE 0%, #003FA8 55%, #002E7D 100%)',
                        opacity: floodOpacity,
                        willChange: 'opacity',
                    }}
                />
                {/* Bright saber visuals dissolve on impact */}
                <motion.div style={{ position: 'absolute', inset: 0, opacity: bladeFade, willChange: 'opacity' }}>
                {/* Speed lines lagging the fall */}
                {[
                    { dx: -38, top: -420, h: 150, w: 3, y: streakY1 },
                    { dx: 34, top: -500, h: 210, w: 2, y: streakY2 },
                    { dx: -8, top: -460, h: 175, w: 2, y: streakY3 },
                ].map((s, i) => (
                    <motion.div
                        key={i}
                        style={{
                            position: 'absolute',
                            left: `calc(50% + ${s.dx}px)`,
                            top: s.top,
                            width: s.w,
                            height: s.h,
                            y: s.y,
                            opacity: streakOpacity,
                            background: 'linear-gradient(to bottom, transparent, rgba(53,175,255,0.55))',
                            borderRadius: 2,
                            willChange: 'transform, opacity',
                        }}
                    />
                ))}
                {/* Ignition flash at the emitter as the blade snaps out */}
                <motion.div
                    style={{
                        position: 'absolute',
                        left: 60 - 16,
                        top: -156,
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, #FFFFFF 0%, rgba(53,175,255,0.9) 45%, transparent 70%)',
                        filter: 'blur(4px)',
                        opacity: igniteFlash,
                        willChange: 'opacity',
                    }}
                />
                {/* Blade grows out of the emitter mid-fall */}
                <motion.div
                    style={{
                        position: 'absolute', left: 0, right: 0, top: -140, height: 260,
                        scaleY: bladeGrow, transformOrigin: '50% 0%',
                        willChange: 'transform',
                    }}
                >
                {/* Plasma halo */}
                <motion.div
                    animate={calm ? { opacity: 0.75 } : { opacity: [0.75, 0.55, 0.75] }}
                    transition={{ duration: 0.24, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                        position: 'absolute',
                        left: 60 - 23,
                        top: 0,
                        width: 46,
                        height: 260,
                        borderRadius: 23,
                        background: '#35AFFF',
                        filter: 'blur(16px)',
                    }}
                />
                {/* Outer blade */}
                <div
                    style={{
                        position: 'absolute',
                        left: 60 - 11,
                        top: 0,
                        width: 22,
                        height: 260,
                        borderRadius: '11px 11px 14px 14px',
                        background:
                            'linear-gradient(to bottom, #9BDCFF 0%, #35AFFF 60%, #1E90FF 100%)',
                        boxShadow:
                            '0 0 18px rgba(53,175,255,0.9), 0 0 46px rgba(53,175,255,0.55)',
                    }}
                />
                {/* White core */}
                <motion.div
                    animate={calm ? { opacity: 1 } : { opacity: [1, 0.82, 1] }}
                    transition={{ duration: 0.19, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                        position: 'absolute',
                        left: 60 - 4.5,
                        top: 2,
                        width: 9,
                        height: 256,
                        borderRadius: '5px 5px 8px 8px',
                        background: '#FFFFFF',
                        boxShadow:
                            '0 0 10px rgba(255,255,255,1), 0 0 26px rgba(255,255,255,0.8)',
                    }}
                />
                {/* Heat shimmer sweeping down the blade */}
                <div
                    style={{
                        position: 'absolute',
                        left: 60 - 11,
                        top: 0,
                        width: 22,
                        height: 260,
                        borderRadius: '11px 11px 14px 14px',
                        overflow: 'hidden',
                    }}
                >
                    <motion.div
                        animate={calm ? { y: -80 } : { y: [-80, 280] }}
                        transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                        style={{
                            position: 'absolute', left: 0, top: 0, width: 22, height: 64,
                            background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.5), transparent)',
                            mixBlendMode: 'screen',
                        }}
                    />
                </div>
                </motion.div>
                {/* Hilt */}
                <div
                    style={{
                        position: 'absolute',
                        left: 60 - 13,
                        top: -220,
                        width: 26,
                        height: 80,
                        borderRadius: '6px 6px 3px 3px',
                        background:
                            'linear-gradient(90deg, #050505 0%, #3d3d3d 28%, #6f6f6f 50%, #2b2b2b 72%, #000000 100%)',
                        boxShadow: '0 0 14px rgba(0,0,0,0.6)',
                    }}
                >
                    <div
                        style={{
                            position: 'absolute', left: 0, right: 0, top: 16, height: 5,
                            background: 'linear-gradient(90deg, #8a8a8a, #e8e8e8, #8a8a8a)',
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute', left: 9, top: 30, width: 8, height: 12,
                            borderRadius: 2, background: '#35AFFF',
                            boxShadow: '0 0 8px rgba(53,175,255,0.9)',
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute', left: 0, right: 0, top: 50, height: 5,
                            background: 'linear-gradient(90deg, #8a8a8a, #e8e8e8, #8a8a8a)',
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute', left: 6, top: 70, width: 14, height: 12,
                            background: '#111111', borderRadius: 2,
                        }}
                    />
                </div>
                {/* Pommel cap */}
                <div
                    style={{
                        position: 'absolute', left: 60 - 10, top: -228,
                        width: 20, height: 8, borderRadius: 4,
                        background: 'linear-gradient(90deg, #222222, #888888, #222222)',
                    }}
                />
                </motion.div>
            </motion.div>

            {/* Impact flash frame */}
            <motion.div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: '#FFFDF4',
                    opacity: flashOpacity,
                    willChange: 'opacity',
                }}
            />

            {/* Flood message on the dark electric flood */}
            <motion.div
                style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: '0 24px',
                    opacity: messageOpacity,
                    scale: messageScale,
                    willChange: 'transform, opacity',
                }}
            >
                {/* soft aura so the message glows on the flood */}
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: 'min(92vw, 880px)',
                        height: 420,
                        transform: 'translate(-50%, -50%)',
                        background:
                            'radial-gradient(closest-side, rgba(255,255,255,0.55), transparent)',
                        pointerEvents: 'none',
                    }}
                />
                {SPARKLES.map((s, i) => (
                    <Sparkle key={i} {...s} />
                ))}
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
                    <span aria-hidden="true" style={{ display: 'block', width: 56, height: 1, background: 'var(--cb-accent-text)' }} />
                    <p
                        style={{
                            fontFamily: 'var(--font-utility, monospace)',
                            fontSize: 13,
                            fontWeight: 500,
                            letterSpacing: '0.42em',
                            textIndent: '0.42em',
                            textTransform: 'uppercase',
                            color: 'var(--cb-accent-text)',
                            margin: 0,
                        }}
                    >
                        You are now
                    </p>
                    <span aria-hidden="true" style={{ display: 'block', width: 56, height: 1, background: 'var(--cb-accent-text)' }} />
                </div>
                <p
                    style={{
                        position: 'relative',
                        fontFamily: 'var(--font-display, "Inter Tight", sans-serif)',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        lineHeight: 0.9,
                        letterSpacing: '-0.02em',
                        fontSize: 'clamp(3rem, 11vw, 9rem)',
                        color: 'var(--cb-accent-text)',
                        margin: 0,
                    }}
                >
                    Going
                    <br />
                    Beyond.
                </p>
                <p
                    style={{
                        position: 'relative',
                        marginTop: 22,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        fontFamily: 'var(--font-utility, monospace)',
                        fontSize: 11,
                        letterSpacing: '0.22em',
                        textTransform: 'uppercase',
                        color: 'var(--cb-accent-text)',
                    }}
                >
                    
                    Codeastra
                </p>
            </motion.div>

            <style jsx global>{`
                @keyframes breach-sparkle-twinkle {
                    0%, 100% { opacity: 0.15; transform: scale(0.7) rotate(0deg); }
                    50% { opacity: 1; transform: scale(1.15) rotate(20deg); }
                }
                .breach-sparkle { animation: breach-sparkle-twinkle 2.6s ease-in-out infinite; }
                @media (prefers-reduced-motion: reduce) {
                    .breach-sparkle { animation: none; }
                }
            `}</style>
        </div>
    );
}
