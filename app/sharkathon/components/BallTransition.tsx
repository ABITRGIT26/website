'use client';

import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function BallTransition({
    heroRef,
    onImpact,
    onComplete
}: {
    heroRef: React.RefObject<HTMLDivElement | null>;
    onImpact: (triggered: boolean) => void;
    onComplete: (triggered: boolean) => void;
}) {
    const [dropHeight, setDropHeight] = useState(0);

    useEffect(() => {
        setDropHeight(window.innerHeight / 2);
    }, []);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const ballY = useTransform(scrollYProgress, [0, 0.4], [-200, dropHeight]);
    const ballScale = useTransform(scrollYProgress, [0, 0.4, 0.5, 0.7, 0.85], [1, 1, 1.2, 30, 200]);
    const ballOpacity = useTransform(scrollYProgress, [0.75, 0.85], [1, 0]);
    
    // Words on the ball fade out as it grows to avoid stretching text
    const textOpacity = useTransform(scrollYProgress, [0.4, 0.5], [1, 0]);

    // Ripple effect on impact (starts around 0.4)
    const rippleScale = useTransform(scrollYProgress, [0.35, 0.45, 0.55], [0, 15, 25]);
    const rippleOpacity = useTransform(scrollYProgress, [0.35, 0.45, 0.55], [0, 1, 0]);

    const [blasted, setBlasted] = useState(false);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        // Trigger the section reveal when the blast starts covering the screen
        if (latest >= 0.65 && !blasted) {
            setBlasted(true);
            onImpact(true);
            onComplete(true);
        } else if (latest < 0.6 && blasted) {
            setBlasted(false);
            onImpact(false);
            onComplete(false);
        }
    });

    if (dropHeight === 0) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            pointerEvents: 'none',
            zIndex: 9999,
            overflow: 'hidden'
        }}>
            {/* Ripple Wave */}
            <motion.div
                style={{
                    position: 'absolute',
                    left: 'calc(50% - 50px)',
                    top: `calc(${dropHeight}px - 50px)`,
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    border: '4px solid rgba(255, 107, 44, 0.8)',
                    boxShadow: '0 0 30px rgba(255, 107, 44, 0.6), inset 0 0 20px rgba(255, 107, 44, 0.6)',
                    scale: rippleScale,
                    opacity: rippleOpacity,
                    willChange: 'transform, opacity'
                }}
            />

            {/* Glowing Orange Ping Pong Ball */}
            <motion.div
                style={{
                    position: 'absolute',
                    left: 'calc(50% - 60px)',
                    top: 0,
                    y: ballY,
                    scale: ballScale,
                    opacity: ballOpacity,
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 35% 35%, #FFA87A 0%, #FF6A00 40%, #A32800 100%)',
                    boxShadow: '0 15px 40px rgba(255, 106, 0, 0.6), inset -10px -10px 30px rgba(0,0,0,0.6), inset 5px 5px 15px rgba(255,255,255,0.7)',
                    willChange: 'transform, opacity',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    transformOrigin: 'center center'
                }}
            >
                {/* Ping Pong Ball Texture (Noise) */}
                <div style={{
                    position: 'absolute', inset: 0, borderRadius: '50%',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
                    pointerEvents: 'none',
                    mixBlendMode: 'overlay'
                }} />

                {/* Marty Supreme Text on Ball */}
                <motion.div style={{
                    opacity: textOpacity,
                    color: '#FFE8D6', // Using a light warm tint so it contrasts against the bright orange
                    fontFamily: 'var(--font-inter, Inter, sans-serif)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: 'rotate(-5deg) translateY(-2px)', // Slight rotation like a real rolling ball
                    willChange: 'opacity',
                    position: 'relative',
                    zIndex: 2,
                    textShadow: '0 1px 3px rgba(0,0,0,0.5)' // Extra pop for the orange background
                }}>
                    <div style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em', lineHeight: 1.2 }}>MARTY</div>
                    <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', lineHeight: 1.2 }}>SUPREME</div>
                    <div style={{ fontSize: '10px', letterSpacing: '4px', margin: '3px 0', display: 'flex', gap: '3px'}}>
                        <span>★</span><span>★</span><span>★</span>
                    </div>
                    <div style={{ fontSize: '7px', fontWeight: 500, letterSpacing: '0.05em' }}>MADE IN AMERICA</div>
                </motion.div>
            </motion.div>
        </div>
    );
}
