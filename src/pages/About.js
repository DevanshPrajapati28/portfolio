import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Box, Typography, Grid, Paper } from '@mui/material';
import Lottie from 'lottie-react';

gsap.registerPlugin(ScrollTrigger);

// Inline coding Lottie animation data (simplified for bundle)
const codingAnimation = {
  v: '5.7.4', fr: 30, ip: 0, op: 90, w: 400, h: 400,
  nm: 'Coding', ddd: 0, assets: [],
  layers: [
    {
      ddd: 0, ind: 1, ty: 4, nm: 'Code', sr: 1, ks: {
        o: { a: 1, k: [{ t: 0, s: [100] }, { t: 45, s: [70] }, { t: 90, s: [100] }] },
        r: { a: 1, k: [{ t: 0, s: [0] }, { t: 45, s: [5] }, { t: 90, s: [0] }] },
        p: { a: 1, k: [{ t: 0, s: [200, 200, 0] }, { t: 45, s: [200, 190, 0] }, { t: 90, s: [200, 200, 0] }] },
        s: { a: 1, k: [{ t: 0, s: [100, 100, 100] }, { t: 45, s: [105, 105, 100] }, { t: 90, s: [100, 100, 100] }] },
      },
      ao: 0, shapes: [
        {
          ty: 'gr', nm: 'Screen', it: [
            { ty: 'rc', d: 1, s: { a: 0, k: [260, 180] }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: 12 } },
            { ty: 'fl', c: { a: 0, k: [0.1, 0.1, 0.18, 1] }, o: { a: 0, k: 100 } },
            { ty: 'tr', p: { a: 0, k: [200, 200] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
          ]
        }
      ],
      ip: 0, op: 90, st: 0, bm: 0
    }
  ]
};

const stats = [
  { number: '3+', label: 'Years Experience', icon: '⚡' },
  { number: '10+', label: 'Projects Completed', icon: '🚀' },
  { number: '10+', label: 'Happy Clients', icon: '✨' },
  { number: '5+', label: 'Open Source', icon: '🔥' },
];

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const statsRef = useRef([]);
  const imageRef = useRef(null);
  const lottieRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
        }
      );

      // Text paragraphs
      gsap.fromTo(textRef.current?.children ? Array.from(textRef.current.children) : [],
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: textRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      );

      // Stats counters
      statsRef.current.forEach((stat, i) => {
        if (!stat) return;
        gsap.fromTo(stat,
          { opacity: 0, y: 40, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.6,
            delay: i * 0.1, ease: 'back.out(1.5)',
            scrollTrigger: { trigger: stat, start: 'top 85%', toggleActions: 'play none none reverse' }
          }
        );
      });

      // Lottie container
      gsap.fromTo(lottieRef.current,
        { opacity: 0, scale: 0.8, rotation: -5 },
        {
          opacity: 1, scale: 1, rotation: 0, duration: 1, ease: 'back.out(1.3)',
          scrollTrigger: { trigger: lottieRef.current, start: 'top 75%', toggleActions: 'play none none reverse' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} style={{ background: '#ffffff', padding: 'clamp(60px, 8vw, 120px) clamp(24px, 8vw, 120px)' }}>
      <Grid container spacing={8} alignItems="center">
        {/* Left: Visual */}
        <Grid item xs={12} md={5}>
          <Box ref={lottieRef} sx={{ position: 'relative' }}>
            {/* Decorative background */}
            <Box sx={{
              position: 'absolute', top: -20, left: -20, right: 20, bottom: -20,
              borderRadius: '24px', background: 'linear-gradient(135deg, #1a1a2e08, #e9456010)',
              border: '1px solid rgba(233,69,96,0.1)',
            }} />

            {/* Lottie coding animation */}
            <Box sx={{
              position: 'relative', borderRadius: '20px', overflow: 'hidden',
              background: '#1a1a2e', p: 2,
              boxShadow: '0 30px 80px rgba(26,26,46,0.2)',
            }}>
              {/* Fake browser bar */}
              <Box sx={{ display: 'flex', gap: 0.8, mb: 2, alignItems: 'center' }}>
                {['#e94560', '#f0a500', '#22c55e'].map((c, i) => (
                  <Box key={i} sx={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                ))}
                <Box sx={{ flex: 1, height: 24, borderRadius: '6px', background: '#ffffff10', mx: 1 }} />
              </Box>

              {/* Code lines animation */}
              <Box sx={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', lineHeight: 2 }}>
                {[
                  { color: '#e94560', text: 'const developer = {' },
                  { color: '#f0a500', text: '  name: "Devansh Prajapati",' },
                  { color: '#22c55e', text: '  stack: ["MERN", "TypeScript"],' },
                  { color: '#60a5fa', text: '  passion: "Building the web",' },
                  { color: '#a78bfa', text: '  coffee: Infinity,' },
                  { color: '#e94560', text: '};' },
                ].map((line, i) => (
                  <Box key={i} sx={{
                    color: line.color, opacity: 0,
                    animation: `fadeIn 0.3s ${0.5 + i * 0.15}s forwards`,
                    '@keyframes fadeIn': { to: { opacity: 1 } },
                  }}>{line.text}</Box>
                ))}
              </Box>

              {/* Cursor blink */}
              <Box sx={{
                display: 'inline-block', width: '8px', height: '16px',
                background: '#e94560', ml: 0.5, mt: 0.5,
                animation: 'blink 1s step-end infinite',
                '@keyframes blink': { '50%': { opacity: 0 } },
              }} />
            </Box>

            {/* Experience badge */}
            <Box sx={{
              position: 'absolute', bottom: -15, right: -15,
              background: '#e94560', color: 'white', borderRadius: '16px',
              p: '12px 20px', boxShadow: '0 10px 30px rgba(233,69,96,0.4)',
            }}>
              <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '24px', lineHeight: 1 }}>3+</Typography>
              <Typography sx={{ fontSize: '11px', opacity: 0.9, fontFamily: "'Space Mono', monospace" }}>Years Exp</Typography>
            </Box>
          </Box>
        </Grid>

        {/* Right: Content */}
        <Grid item xs={12} md={7}>
          <Box ref={titleRef} sx={{ opacity: 0, mb: 4 }}>
            <Typography sx={{
              fontFamily: "'Space Mono', monospace", fontSize: '12px',
              color: '#e94560', letterSpacing: '3px', textTransform: 'uppercase', mb: 1,
            }}>About Me</Typography>
            <Typography variant="h2" sx={{ fontSize: 'clamp(28px, 4vw, 48px)', color: '#1a1a2e', lineHeight: 1.15 }}>
              Turning Ideas Into<br />
              <span style={{ color: '#e94560' }}>Digital Reality</span>
            </Typography>
          </Box>

          <Box ref={textRef}>
            <Typography sx={{ color: '#555577', lineHeight: 1.8, mb: 2.5, fontSize: '15px' }}>
              Hey! I'm Devansh — a full-stack software developer based in India, obsessed with building
              fast, beautiful web applications. I specialize in the MERN stack and love working at the
              intersection of design and engineering.
            </Typography>
            <Typography sx={{ color: '#555577', lineHeight: 1.8, mb: 2.5, fontSize: '15px' }}>
              From crafting pixel-perfect UIs with React & Material UI to architecting robust backend
              systems with Node.js & MongoDB — I bring ideas to life with clean, maintainable code.
            </Typography>
            <Typography sx={{ color: '#555577', lineHeight: 1.8, fontSize: '15px' }}>
              When I'm not coding, you'll find me exploring new frameworks, contributing to open source,
              or brewing the perfect cup of coffee ☕.
            </Typography>
          </Box>

          {/* Stats */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mt: 5 }}>
            {stats.map((stat, i) => (
              <Paper key={i} ref={el => statsRef.current[i] = el} elevation={0} sx={{
                p: 2.5, borderRadius: '16px', opacity: 0,
                border: '1px solid rgba(26,26,46,0.08)',
                background: i % 2 === 0 ? '#f8f5f0' : 'white',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 15px 40px rgba(26,26,46,0.1)',
                  borderColor: '#e94560',
                },
              }}>
                <Typography sx={{ fontSize: '24px', mb: 0.5 }}>{stat.icon}</Typography>
                <Typography sx={{
                  fontFamily: "'Syne', sans-serif", fontWeight: 800,
                  fontSize: '32px', color: '#1a1a2e', lineHeight: 1,
                }}>{stat.number}</Typography>
                <Typography sx={{ fontSize: '12px', color: '#999', fontFamily: "'Space Mono', monospace", mt: 0.5 }}>
                  {stat.label}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Grid>
      </Grid>
    </section>
  );
};

export default About;
