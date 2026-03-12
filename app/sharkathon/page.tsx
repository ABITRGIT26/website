'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SharkathonNavbar from './components/Navbar';
import SharkathonHero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import WhyParticipate from './components/WhyParticipate';
import EventFormat from './components/EventFormat';
import Prizes from './components/Prizes';
import Judges from './components/Judges';
import Timeline from './components/Timeline';
import Sponsors from './components/Sponsors';
import Registration from './components/Registration';
import FAQ from './components/FAQ';
import SharkathonFooter from './components/Footer';
import BallTransition from './components/BallTransition';

export default function SharkathonPage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const [impactTriggered, setImpactTriggered] = useState(false);
    const [transitionCompleted, setTransitionCompleted] = useState(false);
    
    // Add smooth scrolling for anchor links specifically on this page
    useEffect(() => {
        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a');
            if (!anchor) return;
            const href = anchor.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const element = document.querySelector(href);
                if (element) {
                    window.scrollTo({
                        top: element.getBoundingClientRect().top + window.scrollY - 100, // offset for fixed header
                        behavior: 'smooth'
                    });
                }
            }
        };

        document.addEventListener('click', handleAnchorClick);
        return () => document.removeEventListener('click', handleAnchorClick);
    }, []);

    return (
        <div style={{
            backgroundColor: '#030101',
            color: 'white',
            fontFamily: 'var(--font-inter, Inter, sans-serif)',
            minHeight: '100vh',
            overflowX: 'hidden',
            position: 'relative'
        }}>
            <SharkathonNavbar />
            
            <BallTransition 
                heroRef={heroRef}
                onImpact={(triggered) => setImpactTriggered(triggered)}
                onComplete={(triggered) => setTransitionCompleted(triggered)}
            />

            <motion.main
                animate={impactTriggered ? {
                    x: [0, -5, 5, -3, 3, 0],
                    y: [0, 5, -5, 3, -3, 0]
                } : {}}
                transition={{ duration: 0.4 }}
            >
                <div id="hero" ref={heroRef} style={{ position: 'relative', zIndex: 2 }}>
                    <motion.div
                        animate={{
                            y: impactTriggered ? -80 : 0,
                            filter: impactTriggered ? 'blur(8px)' : 'blur(0px)',
                            opacity: impactTriggered ? 0.3 : 1
                        }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <SharkathonHero />
                    </motion.div>
                </div>
                
                <div style={{ position: 'relative', zIndex: 10, marginTop: '-30px', marginBottom: '30px' }}>
                    <Marquee />
                </div>
                
                <div id="about" style={{ position: 'relative', zIndex: 2 }}>
                    <motion.div
                        initial={{ y: 200, opacity: 0 }}
                        animate={{
                            y: impactTriggered ? 0 : 200,
                            opacity: impactTriggered ? 1 : 0
                        }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <About />
                    </motion.div>
                </div>
                
                <div id="why-participate" style={{ position: 'relative', zIndex: 1}}>
                    <WhyParticipate />
                </div>
                
                <div id="format" style={{ position: 'relative', zIndex: 2}}>
                    <EventFormat />
                </div>
                
                <div id="prizes" style={{ position: 'relative', zIndex: 3}}>
                    <Prizes />
                </div>
                
                <div id="judges">
                    <Judges />
                </div>
                
                <div id="timeline">
                    <Timeline />
                </div>
                
                <div id="sponsors">
                    <Sponsors />
                </div>
                
                <div id="register">
                    <Registration />
                </div>

                <div id="faq">
                    <FAQ />
                </div>
            </motion.main>

            <SharkathonFooter />
        </div>
    );
}
