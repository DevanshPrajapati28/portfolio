import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Box, Typography, Grid, Paper, Chip } from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  // {
  //   type: 'work',
  //   title: 'Senior Full Stack Developer',
  //   company: 'TechNova Solutions',
  //   period: '2023 – Present',
  //   description: 'Leading development of scalable MERN applications serving 100K+ users. Architecting microservices, mentoring junior developers, and driving technical decisions.',
  //   tech: ['React', 'Node.js', 'MongoDB', 'Docker', 'AWS'],
  //   color: '#e94560',
  // },
  {
    type: 'work',
    title: 'Full Stack Developer',
    company: 'LogicMinds',
    period: '2026',
    description: 'Built and maintained multiple client-facing web applications. Implemented real-time features with Socket.io, optimized database queries, improved page load time by 40%.',
    tech: ['React', 'Express.js', 'PostgreSQL', 'Redis'],
    color: '#1a1a2e',
  },
  {
    type: 'work',
    title: 'Freelancer Developer',
    company: 'Surat',
    period: '2021 – 2022',
    description: 'Developed responsive Freelace websites with React and Material UI.',
    tech: ['React', 'Material UI', 'JavaScript', 'CSS'],
    color: '#f0a500',
  },
  {
    type: 'education',
    title: 'B.Tech in Information Technology',
    company: 'A.D.Patel Institute of Technology',
    period: '2023 – 2027',
    description: 'Graduated with distinction. Specialized in web technologies and software engineering. Active member of coding club and tech fest organizer.',
    tech: ['Data Structures', 'Algorithms', 'DBMS', 'Networks'],
    color: '#7c3aed',
  },
];

const achievements = [
  { icon: '🏆', title: 'Hackathon Winner', desc: 'Smart India Hackathon 2023 — 1st Place nationally' },
  { icon: '⭐', title: 'Open Source', desc: '500+ GitHub stars across repositories' },
  { icon: '📝', title: 'Tech Blogger', desc: '10K+ monthly readers on dev.to' },
  { icon: '🎓', title: 'Certified', desc: 'AWS Solutions Architect — Associate' },
];

const TimelineItem = ({ exp, index, isLast }) => {
  const itemRef = useRef(null);
  const lineRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(itemRef.current,
      { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
      {
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: itemRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
      }
    );
    gsap.fromTo(dotRef.current,
      { scale: 0 },
      {
        scale: 1, duration: 0.4, ease: 'back.out(2)',
        scrollTrigger: { trigger: dotRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
      }
    );
    if (!isLast && lineRef.current) {
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1, duration: 0.6, ease: 'power2.out', transformOrigin: 'top',
          scrollTrigger: { trigger: lineRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      );
    }
  }, [index, isLast]);

  const Icon = exp.type === 'work' ? WorkOutlineIcon : SchoolOutlinedIcon;

  return (
    <Box sx={{ display: 'flex', gap: 3, mb: isLast ? 0 : 4, opacity: 0 }} ref={itemRef}>
      {/* Timeline axis */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '48px' }}>
        <Box ref={dotRef} sx={{
          width: 48, height: 48, borderRadius: '14px', flexShrink: 0,
          background: `${exp.color}15`, border: `2px solid ${exp.color}40`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          scale: '0',
        }}>
          <Icon sx={{ color: exp.color, fontSize: '20px' }} />
        </Box>
        {!isLast && (
          <Box ref={lineRef} sx={{
            width: '2px', flex: 1, minHeight: '40px', mt: 1,
            background: `linear-gradient(to bottom, ${exp.color}40, transparent)`,
            transformOrigin: 'top', scaleY: 0,
          }} />
        )}
      </Box>

      {/* Content */}
      <Paper elevation={0} sx={{
        flex: 1, p: 3, borderRadius: '16px',
        border: '1px solid rgba(26,26,46,0.08)',
        background: 'white',
        transition: 'all 0.3s',
        '&:hover': {
          transform: 'translateX(6px)',
          boxShadow: `0 10px 30px ${exp.color}15`,
          borderColor: `${exp.color}30`,
        },
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1 }}>
          <Box>
            <Typography sx={{
              fontFamily: "'Syne', sans-serif", fontWeight: 700,
              fontSize: '16px', color: '#1a1a2e',
            }}>{exp.title}</Typography>
            <Typography sx={{ color: exp.color, fontSize: '13px', fontWeight: 600, mt: 0.3 }}>
              {exp.company}
            </Typography>
          </Box>
          <Chip label={exp.period} size="small" sx={{
            background: `${exp.color}12`, color: exp.color,
            fontFamily: "'Space Mono', monospace", fontSize: '10px', fontWeight: 700,
            border: `1px solid ${exp.color}25`,
          }} />
        </Box>

        <Typography sx={{ color: '#666', fontSize: '13px', lineHeight: 1.7, mt: 1.5 }}>
          {exp.description}
        </Typography>

        <Box sx={{ display: 'flex', gap: 0.8, mt: 2, flexWrap: 'wrap' }}>
          {exp.tech.map(t => (
            <Chip key={t} label={t} size="small" sx={{
              background: 'rgba(26,26,46,0.06)', color: '#555',
              fontSize: '10px', fontFamily: "'Space Mono', monospace",
            }} />
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

const Experience = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const achRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
      }
    );

    achRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.6,
          delay: i * 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' }
        }
      );
    });
  }, []);

  return (
    <section id="experience" ref={sectionRef} style={{
      background: '#f8f5f0', padding: 'clamp(60px, 8vw, 120px) clamp(24px, 8vw, 120px)',
    }}>
      <Box ref={titleRef} sx={{ textAlign: 'center', mb: 8, opacity: 0 }}>
        <Typography sx={{
          fontFamily: "'Space Mono', monospace", fontSize: '12px',
          color: '#e94560', letterSpacing: '3px', textTransform: 'uppercase', mb: 1,
        }}>Journey</Typography>
        <Typography variant="h2" sx={{ fontSize: 'clamp(28px, 4vw, 48px)', color: '#1a1a2e' }}>
          Experience & <span style={{ color: '#e94560' }}>Education</span>
        </Typography>
        <Box sx={{ width: 60, height: 3, background: '#e94560', borderRadius: 2, mx: 'auto', mt: 2 }} />
      </Box>

      <Grid container spacing={6}>
        {/* Timeline */}
        <Grid item xs={12} lg={7}>
          <Box>
            {experiences.map((exp, i) => (
              <TimelineItem key={i} exp={exp} index={i} isLast={i === experiences.length - 1} />
            ))}
          </Box>
        </Grid>

        {/* Achievements */}
        <Grid item xs={12} lg={5}>
          <Typography sx={{
            fontFamily: "'Space Mono', monospace", fontSize: '11px',
            color: '#999', letterSpacing: '3px', textTransform: 'uppercase', mb: 3,
          }}>Highlights</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {achievements.map((ach, i) => (
              <Paper key={i} ref={el => achRef.current[i] = el} elevation={0} sx={{
                p: 2.5, borderRadius: '16px', opacity: 0,
                border: '1px solid rgba(26,26,46,0.08)',
                background: 'white',
                display: 'flex', gap: 2, alignItems: 'flex-start',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateX(8px)',
                  boxShadow: '0 10px 30px rgba(26,26,46,0.1)',
                  borderColor: '#e94560',
                },
              }}>
                <Box sx={{
                  width: 44, height: 44, borderRadius: '12px',
                  background: 'rgba(26,26,46,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px', flexShrink: 0,
                }}>{ach.icon}</Box>
                <Box>
                  <Typography sx={{
                    fontFamily: "'Syne', sans-serif", fontWeight: 700,
                    fontSize: '15px', color: '#1a1a2e',
                  }}>{ach.title}</Typography>
                  <Typography sx={{ fontSize: '13px', color: '#777', mt: 0.3 }}>{ach.desc}</Typography>
                </Box>
              </Paper>
            ))}
          </Box>

          {/* Fun stats */}
          <Box sx={{ mt: 4, p: 3, borderRadius: '20px', background: 'linear-gradient(135deg, #1a1a2e, #2d2d50)' }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', fontFamily: "'Space Mono', monospace", letterSpacing: '2px', mb: 2 }}>
              QUICK FACTS
            </Typography>
            {[
              { label: 'Commits this year', value: '1,240+' },
              { label: 'Coffee cups/week', value: '14 ☕' },
              { label: 'Bugs squashed', value: '∞' },
              { label: 'Stack Overflow saves', value: '500+' },
            ].map((fact, i) => (
              <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>{fact.label}</Typography>
                <Typography sx={{ color: '#e94560', fontFamily: "'Space Mono', monospace", fontSize: '12px', fontWeight: 700 }}>{fact.value}</Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </section>
  );
};

export default Experience;
