'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SmokeIntro  cinematic opening for /codeastra.
 *
 * Inspired by refs/700_F_1666797453…mp4 (black → smoke gathers →
 * "CODEASTRA 2.0" materialises out of haze → hold → veil lifts).
 * Rebuilt in code (no watermarked stock) with:
 *  - GPU-friendly sprite-based volumetric fog (3 depth layers)
 *  - floating dust + rising ember sparks
 *  - anamorphic light streak + breath glow
 *  - per-letter blur/sharpen reveal with shimmer sweep
 *  - film grain, vignette, letterbox, counter + hairline progress
 *  - curtain-lift exit that hands off to the hero
 *
 * Mobile: lighter particle budgets, DPR capped at 1, static grain,
 * shorter runtime, wrapping two-line wordmark and safe-area-aware HUD.
 */
const TITLE_WORDS = ['CODEASTRA', '2.0'];
const DURATION_DESKTOP = 4600;
const DURATION_MOBILE = 3800;

export default function SmokeIntro({ onDone }: { onDone: () => void }) {
  const fogRef = useRef<HTMLCanvasElement>(null);
  const dustRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [isMobile] = useState(
    () =>
      typeof window !== 'undefined' &&
      (window.matchMedia('(max-width: 640px)').matches ||
        window.matchMedia('(pointer: coarse)').matches)
  );
  const doneRef = useRef(false);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const duration = isMobile ? DURATION_MOBILE : DURATION_DESKTOP;
  // HUD geometry adapts so nothing collides on 360px screens
  const padX = isMobile ? 20 : 40;
  const barH = isMobile ? '5vh' : '7vh';

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setLeaving(true);
    window.setTimeout(() => {
      setVisible(false);
      onDone();
    }, 1000);
  };

  // Master timeline + scroll lock + skip + parallax pointer (fine pointers only)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(false);
      onDone();
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const start = performance.now();
    let raf = 0;
    let last = -1;
    const tickCounter = (now: number) => {
      const t = Math.min(1, (now - start) / (duration - 1000));
      // easeInOut for the counter so it feels hand-timed
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const next = Math.round(eased * 100);
      if (next !== last) {
        last = next;
        setCount(next); // one re-render per number change, not per frame
      }
      if (t < 1) raf = requestAnimationFrame(tickCounter);
    };
    raf = requestAnimationFrame(tickCounter);

    const tExit = window.setTimeout(finish, duration);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') finish();
    };
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const onMove = (e: PointerEvent) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener('keydown', onKey);
    if (!coarse) window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      document.body.style.overflow = prev;
      cancelAnimationFrame(raf);
      window.clearTimeout(tExit);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointermove', onMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  // Layer 1  volumetric fog: pre-rendered soft sprites, 3 depths, screen blend
  useEffect(() => {
    const canvas = fogRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mobile = window.matchMedia('(max-width: 640px)').matches ||
      window.matchMedia('(pointer: coarse)').matches;
    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.75);

    // Pre-render one soft smoke sprite (perf: drawImage instead of gradients)
    const sprite = document.createElement('canvas');
    sprite.width = 256;
    sprite.height = 256;
    const sctx = sprite.getContext('2d');
    if (sctx) {
      const g = sctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      g.addColorStop(0, 'rgba(215,215,205,0.55)');
      g.addColorStop(0.35, 'rgba(185,185,175,0.28)');
      g.addColorStop(0.65, 'rgba(140,140,135,0.10)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      sctx.fillStyle = g;
      sctx.fillRect(0, 0, 256, 256);
    }

    type Fog = {
      bx: number; by: number; size: number; depth: number;
      drift: number; bob: number; seed: number; alpha: number;
    };
    let fogs: Fog[] = [];
    const seed = () => {
      const COUNT = mobile ? 26 : 64;
      fogs = Array.from({ length: COUNT }, (_, i) => {
        const depth = i % 3; // 0 far, 1 mid, 2 near
        const base = mobile
          ? depth === 0 ? 160 : depth === 1 ? 250 : 370
          : depth === 0 ? 220 : depth === 1 ? 340 : 520;
        return {
          bx: Math.random(),
          by: 0.5 + (Math.random() - 0.5) * (depth === 2 ? 0.34 : 0.22),
          size: base + Math.random() * (mobile ? 140 : 220),
          depth,
          drift: 0.008 + Math.random() * 0.02 * (depth + 1),
          bob: 8 + Math.random() * 22,
          seed: Math.random() * Math.PI * 2,
          alpha: (depth === 0 ? 0.16 : depth === 1 ? 0.24 : 0.32) + Math.random() * 0.12,
        };
      });
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    seed();
    window.addEventListener('resize', resize);

    const t0 = performance.now();
    const render = (now: number) => {
      const t = (now - t0) / 1000;
      const intro = Math.min(1, t / 1.1); // fog fades in fast, like the clip
      const breathe = 0.85 + Math.sin(t * 0.6) * 0.15;
      const px = mobile ? 0 : (mouse.current.x - 0.5) * 26;
      const py = mobile ? 0 : (mouse.current.y - 0.5) * 16;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'screen';

      // anamorphic centre beam  the "ignition" line from the reference
      const beamA = 0.34 * Math.min(1, t / 0.8) * breathe;
      const beamH = 120 + Math.sin(t * 0.9) * 18;
      const beam = ctx.createLinearGradient(0, 0, w, 0);
      beam.addColorStop(0, 'rgba(255,255,255,0)');
      beam.addColorStop(0.42, `rgba(240,240,230,${beamA * 0.5})`);
      beam.addColorStop(0.5, `rgba(255,255,255,${beamA})`);
      beam.addColorStop(0.58, `rgba(240,240,230,${beamA * 0.5})`);
      beam.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = beam;
      ctx.fillRect(0, h * 0.5 - beamH / 2, w, beamH);

      // lime under-glow, barely there
      const lime = ctx.createRadialGradient(w / 2, h * 0.62, 0, w / 2, h * 0.62, Math.max(w, h) * 0.4);
      lime.addColorStop(0, `rgba(0,71,171,${0.10 * intro * breathe})`);
      lime.addColorStop(1, 'rgba(0,71,171,0)');
      ctx.fillStyle = lime;
      ctx.fillRect(0, 0, w, h);

      for (const f of fogs) {
        const dir = f.seed > Math.PI ? 1 : -1;
        const x =
          (((f.bx + dir * t * f.drift * 0.06) % 1.2 + 1.2) % 1.2 - 0.1) * w +
          px * (f.depth + 1) * 0.5;
        const y =
          f.by * h +
          Math.sin(t * 0.35 + f.seed) * f.bob +
          py * (f.depth + 1) * 0.4;
        const s = f.size * (0.92 + Math.sin(t * 0.5 + f.seed) * 0.08);
        ctx.globalAlpha = f.alpha * intro * breathe;
        ctx.drawImage(sprite, x - s / 2, y - s / 2, s, s);
      }
      ctx.globalAlpha = 1;

      // vignette keeps edges pitch black like the clip
      ctx.globalCompositeOperation = 'source-over';
      const v = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.28, w / 2, h / 2, Math.max(w, h) * 0.72);
      v.addColorStop(0, 'rgba(0,0,0,0)');
      v.addColorStop(1, 'rgba(0,0,0,0.88)');
      ctx.fillStyle = v;
      ctx.fillRect(0, 0, w, h);

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Layer 2  dust motes + ember sparks on their own canvas (crisper, additive)
  useEffect(() => {
    const canvas = dustRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mobile = window.matchMedia('(max-width: 640px)').matches ||
      window.matchMedia('(pointer: coarse)').matches;
    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1 : 2);

    type Mote = { x: number; y: number; r: number; vy: number; vx: number; tw: number; seed: number };
    type Ember = { x: number; y: number; r: number; vy: number; vx: number; life: number; max: number };
    let motes: Mote[] = [];
    let embers: Ember[] = [];

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const moteCount = mobile ? 70 : Math.min(220, Math.floor(w / 7));
      const emberCount = mobile ? 24 : Math.min(70, Math.floor(w / 22));
      motes = Array.from({ length: moteCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.6 + Math.random() * 1.7,
        vy: -0.06 - Math.random() * 0.22,
        vx: (Math.random() - 0.5) * 0.14,
        tw: 0.4 + Math.random() * 1.4,
        seed: Math.random() * Math.PI * 2,
      }));
      embers = Array.from({ length: emberCount }, () => spawnEmber(true));
    };

    const spawnEmber = (anywhere = false): Ember => {
      const max = 240 + Math.random() * 260;
      return {
        x: w * 0.5 + (Math.random() - 0.5) * w * 0.7,
        y: anywhere ? Math.random() * h : h * (0.62 + Math.random() * 0.3),
        r: 0.8 + Math.random() * 1.8,
        vy: -(0.35 + Math.random() * 0.9),
        vx: (Math.random() - 0.5) * 0.5,
        life: anywhere ? Math.random() * max : 0,
        max,
      };
    };

    resize();
    window.addEventListener('resize', resize);
    const t0 = performance.now();

    const render = (now: number) => {
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      for (const m of motes) {
        m.x += m.vx + Math.sin(t * m.tw + m.seed) * 0.08;
        m.y += m.vy;
        if (m.y < -6) { m.y = h + 6; m.x = Math.random() * w; }
        if (m.x < -6) m.x = w + 6;
        if (m.x > w + 6) m.x = -6;
        const a = 0.10 + Math.abs(Math.sin(t * m.tw + m.seed)) * 0.30;
        ctx.beginPath();
        ctx.fillStyle = `rgba(235,235,225,${a.toFixed(3)})`;
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.life += 1;
        e.x += e.vx + Math.sin((t + i) * 2.2) * 0.25;
        e.y += e.vy;
        if (e.life > e.max || e.y < -10) embers[i] = spawnEmber();
        const fade = 1 - e.life / e.max;
        const flicker = 0.55 + Math.abs(Math.sin(t * 6 + i * 1.7)) * 0.45;
        const a = Math.max(0, fade * flicker);
        // core
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,244,220,${(a * 0.9).toFixed(3)})`;
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fill();
        if (!mobile) {
          // halo skipped on mobile  saves a full extra fill pass
          ctx.beginPath();
          ctx.fillStyle = `rgba(255,180,90,${(a * 0.16).toFixed(3)})`;
          ctx.arc(e.x, e.y, e.r * 4.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Global letter index so the stagger flows across both words
  let letterCursor = 0;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Codeastra intro animation"
          onClick={finish}
          initial={false}
          animate={leaving ? { y: '-100%' } : { y: 0 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 2000,
            background: '#000', overflow: 'hidden', cursor: 'pointer',
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation',
          }}
        >
          {/* slow push-in  the whole frame breathes toward the viewer */}
          <motion.div
            initial={{ scale: isMobile ? 1.04 : 1.08 }}
            animate={{ scale: leaving ? 1.02 : 1 }}
            transition={{ duration: isMobile ? 3.8 : 4.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <canvas ref={fogRef} style={{ position: 'absolute', inset: 0 }} aria-hidden="true" />
            <canvas ref={dustRef} style={{ position: 'absolute', inset: 0 }} aria-hidden="true" />

            {/* flash frame at the reveal peak */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.55, 0] }}
              transition={{ duration: 1.1, times: [0, 0.35, 1], delay: 1.5, ease: 'easeOut' }}
              style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.12) 55%, transparent 75%)' }}
              aria-hidden="true"
            />

            {/* centre type */}
            <div
              style={{
                position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', textAlign: 'center',
                padding: '0 20px', userSelect: 'none',
              }}
            >
              <motion.p
                initial={{ opacity: 0, letterSpacing: '0.7em', filter: 'blur(12px)' }}
                animate={{ opacity: 1, letterSpacing: isMobile ? '0.32em' : '0.44em', filter: 'blur(0px)' }}
                transition={{ duration: 1.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: 'var(--font-utility, "JetBrains Mono", monospace)',
                  fontSize: isMobile ? 10 : 12, textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.72)', margin: '0 0 22px',
                  textIndent: isMobile ? '0.32em' : '0.44em', // re-centre tracked type
                }}
              >
                Synergy 2027 presents
              </motion.p>

              {/* halo behind the title */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, delay: 0.9, ease: 'easeOut' }}
                style={{
                  position: 'absolute', top: '50%', left: '50%', width: 'min(88vw, 900px)', height: 300,
                  transform: 'translate(-50%, -50%)',
                  background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.16) 0%, transparent 62%)',
                  filter: 'blur(24px)', pointerEvents: 'none',
                }}
                aria-hidden="true"
              />

              {/* two words that wrap on narrow screens instead of overflowing */}
              <h1
                aria-label="CODEASTRA 2.0"
                style={{
                  position: 'relative', margin: 0, display: 'flex', flexWrap: 'wrap',
                  justifyContent: 'center', columnGap: '0.28em',
                  fontFamily: 'var(--font-display, "Inter Tight", sans-serif)',
                  fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.95,
                  letterSpacing: '-0.02em',
                  fontSize: isMobile ? 'clamp(2.6rem, 15vw, 4.5rem)' : 'clamp(3rem, 11vw, 8.5rem)',
                  color: '#fff',
                  textShadow: '0 0 34px rgba(255,255,255,0.35), 0 0 120px rgba(255,255,255,0.14)',
                }}
              >
                {TITLE_WORDS.map((word) => {
                  const start = letterCursor;
                  letterCursor += word.length + 1; // +1 keeps the pause where the space was
                  return (
                    <span key={word} style={{ display: 'inline-flex' }}>
                      {word.split('').map((ch, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, y: 26, scale: 1.12, filter: 'blur(22px)' }}
                          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                          transition={{ duration: 1.25, delay: 0.7 + (start + i) * 0.055, ease: [0.22, 1, 0.36, 1] }}
                          style={{ display: 'inline-block' }}
                        >
                          {ch}
                        </motion.span>
                      ))}
                    </span>
                  );
                })}
                {/* shimmer sweep across the wordmark */}
                <motion.span
                  aria-hidden="true"
                  initial={{ x: '-130%' }}
                  animate={{ x: '230%' }}
                  transition={{ duration: 1.4, delay: 2.0, ease: [0.4, 0, 0.2, 1] }}
                  style={{
                    position: 'absolute', top: '-6%', bottom: '-6%', width: '38%',
                    background: 'linear-gradient(100deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)',
                    filter: 'blur(6px)', pointerEvents: 'none', mixBlendMode: 'screen',
                  }}
                />
              </h1>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1.1, delay: 1.9, ease: [0.22, 1, 0.36, 1] }}
                style={{ marginTop: 26, display: 'flex', alignItems: 'center', gap: 14 }}
                aria-hidden="true"
              >
                <span style={{ display: 'block', width: 56, height: 1, background: 'rgba(255,255,255,0.4)' }} />
                <span style={{ width: 7, height: 7, background: '#0047AB', transform: 'rotate(45deg)', display: 'block' }} />
                <span style={{ display: 'block', width: 56, height: 1, background: 'rgba(255,255,255,0.4)' }} />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 14, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1, delay: 2.05, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  margin: '18px 0 0', fontWeight: 800, textTransform: 'uppercase',
                  letterSpacing: '0.18em', fontSize: 'clamp(0.72rem, 3.4vw, 1.15rem)', color: 'rgba(244,241,232,0.92)',
                  textIndent: '0.18em', textAlign: 'center',
                }}
              >
                Association of Budding Information Technocrats
              </motion.p>
            </div>

            {/* animated film grain (static on mobile  no repaint cost) */}
            <div
              className={isMobile ? undefined : 'codeastra-grain'}
              aria-hidden="true"
              style={
                isMobile
                  ? {
                      position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.06,
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                    }
                  : undefined
              }
            />
            {/* letterbox bars */}
            <motion.div initial={{ scaleY: 1 }} animate={{ scaleY: leaving ? 0 : 1 }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} style={{ position: 'absolute', top: 0, left: 0, right: 0, height: barH, background: '#000', transformOrigin: 'top' }} aria-hidden="true" />
            <motion.div initial={{ scaleY: 1 }} animate={{ scaleY: leaving ? 0 : 1 }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: barH, background: '#000', transformOrigin: 'bottom' }} aria-hidden="true" />
          </motion.div>

          {/* cinematic HUD frame */}
          <div style={{ position: 'absolute', inset: `calc(${barH} + 14px) 14px 14px`, border: '1px solid rgba(255,255,255,0.10)', pointerEvents: 'none' }} aria-hidden="true" />
          <p style={{ position: 'absolute', top: `calc(${barH} + 24px)`, left: padX + 14, fontFamily: 'var(--font-utility, monospace)', fontSize: isMobile ? 9 : 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
            24H · Offline · RGIT Mumbai
          </p>
          {!isMobile && (
            <p style={{ position: 'absolute', top: `calc(${barH} + 24px)`, right: padX + 14, fontFamily: 'var(--font-utility, monospace)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
              01  Intro
            </p>
          )}

          {/* counter + progress */}
          <div style={{ position: 'absolute', left: padX + 14, bottom: `max(22px, env(safe-area-inset-bottom))`, display: 'flex', alignItems: 'baseline', gap: 12 }}>
            {!isMobile && (
              <span style={{ fontFamily: 'var(--font-utility, monospace)', fontSize: 13, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase' }}>Loading experience</span>
            )}
            <span style={{ fontFamily: 'var(--font-utility, monospace)', fontSize: isMobile ? 20 : 26, fontWeight: 500, color: '#fff', fontVariantNumeric: 'tabular-nums' }}>
              {String(count).padStart(3, '0')}
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); finish(); }}
            style={{
              position: 'absolute', bottom: `max(18px, env(safe-area-inset-bottom))`, right: padX,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.85)',
              fontFamily: 'var(--font-utility, monospace)', fontSize: 11,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              padding: '13px 22px', minHeight: 44, cursor: 'pointer',
            }}
          >
            Skip →
          </button>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'rgba(255,255,255,0.12)' }} aria-hidden="true">
            <div style={{ height: '100%', width: `${count}%`, background: '#0047AB', transition: 'width 120ms linear' }} />
          </div>

          <style jsx global>{`
            .codeastra-grain {
              position: absolute; inset: -100px; pointer-events: none; opacity: 0.09;
              background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
              animation: codeastra-grain 0.9s steps(4) infinite;
            }
            @keyframes codeastra-grain {
              0% { transform: translate(0, 0); }
              25% { transform: translate(-30px, 20px); }
              50% { transform: translate(24px, -28px); }
              75% { transform: translate(-18px, -14px); }
              100% { transform: translate(0, 0); }
            }
            @media (prefers-reduced-motion: reduce) {
              .codeastra-grain { animation: none; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
