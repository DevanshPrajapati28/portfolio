import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Box, Typography, Grid, Paper, LinearProgress } from '@mui/material';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'Frontend',
    icon: '🎨',
    color: '#e94560',
    skills: [
      { name: 'React.js', level: 92 },
      { name: 'TypeScript', level: 85 },
      { name: 'Material UI', level: 90 },
      { name: 'Three.js / WebGL', level: 72 },
      { name: 'CSS / GSAP', level: 88 },
    ],
  },
  {
    title: 'Backend',
    icon: '⚙️',
    color: '#1a1a2e',
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'Express.js', level: 90 },
      { name: 'REST APIs', level: 92 },
      { name: 'GraphQL', level: 75 },
      { name: 'Socket.io', level: 78 },
    ],
  },
  {
    title: 'Database & DevOps',
    icon: '🗄️',
    color: '#f0a500',
    skills: [
      { name: 'MongoDB', level: 87 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'Redis', level: 68 },
      { name: 'Docker', level: 72 },
      { name: 'AWS / Cloud', level: 65 },
    ],
  },
];

const tools = ['Git', 'VS Code', 'Figma', 'Postman', 'Firebase', 'Vercel', 'Netlify', 'Jest'];

const SkillCard = ({ category, index }) => {
  const cardRef = useRef(null);
  const barsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 60, rotateX: -15 },
      {
        opacity: 1, y: 0, rotateX: 0, duration: 0.8,
        delay: index * 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: cardRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
      }
    );

    barsRef.current.forEach((bar, i) => {
      if (!bar) return;
      const fill = bar.querySelector('.bar-fill');
      if (!fill) return;
      gsap.fromTo(fill,
        { width: '0%' },
        {
          width: `${category.skills[i].level}%`, duration: 1.2,
          delay: index * 0.15 + i * 0.1 + 0.4,
          ease: 'power2.out',
          scrollTrigger: { trigger: cardRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      );
    });
  }, [category, index]);

  return (
    <Paper ref={cardRef} elevation={0} sx={{
      p: 3.5, borderRadius: '20px', opacity: 0,
      border: '1px solid rgba(26,26,46,0.08)',
      background: 'white',
      transition: 'all 0.4s ease',
      transformStyle: 'preserve-3d',
      '&:hover': {
        transform: 'translateY(-8px) rotateY(2deg)',
        boxShadow: `0 25px 60px ${category.color}20`,
        borderColor: category.color + '40',
      },
    }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Box sx={{
          width: 48, height: 48, borderRadius: '14px',
          background: `${category.color}15`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '22px',
        }}>{category.icon}</Box>
        <Box>
          <Typography sx={{
            fontFamily: "'Syne', sans-serif", fontWeight: 700,
            fontSize: '18px', color: '#1a1a2e',
          }}>{category.title}</Typography>
          <Box sx={{ display: 'flex', gap: 0.5, mt: 0.3 }}>
            {category.skills.map((_, i) => (
              <Box key={i} sx={{
                width: 4, height: 4, borderRadius: '50%',
                background: i < 3 ? category.color : `${category.color}40`,
              }} />
            ))}
          </Box>
        </Box>
      </Box>

      {/* Skills */}
      {category.skills.map((skill, i) => (
        <Box key={skill.name} ref={el => barsRef.current[i] = el} sx={{ mb: 2.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
            <Typography sx={{ fontSize: '13px', fontWeight: 500, color: '#1a1a2e' }}>
              {skill.name}
            </Typography>
            <Typography sx={{
              fontFamily: "'Space Mono', monospace", fontSize: '11px',
              color: category.color, fontWeight: 700,
            }}>
              {skill.level}%
            </Typography>
          </Box>
          <Box sx={{
            height: '6px', background: `${category.color}15`,
            borderRadius: '3px', overflow: 'hidden',
          }}>
            <Box className="bar-fill" sx={{
              height: '100%', width: '0%',
              background: `linear-gradient(90deg, ${category.color}, ${category.color}aa)`,
              borderRadius: '3px',
            }} />
          </Box>
        </Box>
      ))}
    </Paper>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const toolsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
      }
    );

    toolsRef.current.forEach((tool, i) => {
      if (!tool) return;
      gsap.fromTo(tool,
        { opacity: 0, scale: 0.7, rotation: -10 },
        {
          opacity: 1, scale: 1, rotation: 0, duration: 0.5,
          delay: i * 0.06, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: tool, start: 'top 90%', toggleActions: 'play none none reverse' }
        }
      );
    });
  }, []);

  return (
    <section id="skills" ref={sectionRef} style={{
      background: '#f8f5f0', padding: 'clamp(60px, 8vw, 120px) clamp(24px, 8vw, 120px)',
    }}>
      {/* Title */}
      <Box ref={titleRef} sx={{ textAlign: 'center', mb: 8, opacity: 0 }}>
        <Typography sx={{
          fontFamily: "'Space Mono', monospace", fontSize: '12px',
          color: '#e94560', letterSpacing: '3px', textTransform: 'uppercase', mb: 1,
        }}>Technical Skills</Typography>
        <Typography variant="h2" sx={{ fontSize: 'clamp(28px, 4vw, 48px)', color: '#1a1a2e' }}>
          My Tech <span style={{ color: '#e94560' }}>Arsenal</span>
        </Typography>
        <Box sx={{ width: 60, height: 3, background: '#e94560', borderRadius: 2, mx: 'auto', mt: 2 }} />
      </Box>

      {/* Skill cards */}
      <Grid container spacing={3} sx={{ mb: 8 }}>
        {skillCategories.map((cat, i) => (
          <Grid item xs={12} md={4} key={cat.title}>
            <SkillCard category={cat} index={i} />
          </Grid>
        ))}
      </Grid>

      {/* Tools section */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography sx={{
          fontFamily: "'Space Mono', monospace", fontSize: '11px',
          color: '#999', letterSpacing: '3px', textTransform: 'uppercase', mb: 3,
        }}>Tools & Technologies</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'center' }}>
          {tools.map((tool, i) => (
            <Box key={tool} ref={el => toolsRef.current[i] = el} sx={{
              opacity: 0, px: 2.5, py: 1, borderRadius: '50px',
              background: 'white', border: '1px solid rgba(26,26,46,0.1)',
              fontFamily: "'Space Mono', monospace", fontSize: '12px', color: '#1a1a2e',
              cursor: 'default', transition: 'all 0.3s',
              '&:hover': {
                background: '#1a1a2e', color: 'white',
                transform: 'translateY(-3px)',
                boxShadow: '0 8px 20px rgba(26,26,46,0.2)',
              },
            }}>{tool}</Box>
          ))}
        </Box>
      </Box>
    </section>
  );
};

export default Skills;
