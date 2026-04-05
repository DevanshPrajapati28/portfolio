import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Box, Typography, Grid, Chip, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'AI-Powered Real Estate Valuation System',
    category: 'Full Stack / AI',
    description: 'An intelligent real estate valuation system that predicts property prices using machine learning based on multiple property features.',
    longDesc: 'This project leverages machine learning techniques to estimate real estate prices by analyzing key factors such as location, size, amenities, and market trends. AI-based valuation systems use structured data and predictive models to generate accurate property price estimates, helping users make informed decisions in the real estate market.',
    tech: ['Python', 'Streamlit', 'Machine Learning', 'Scikit-learn', 'Pandas', 'NumPy', 'Flask/Node.js'],
    github: 'https://github.com/DevanshPrajapati28/AI-Powered-Real-Estate-Valuation',
    demo: '',
    gradient: 'linear-gradient(135deg, #0f2027, #203a43)',
    accent: '#00adb5',
    emoji: '🏡',
    year: '2026',
  },
  {
    id: 2,
    title: 'Wholesale Marketplace Web Application',
    category: 'Full Stack',
    description: 'A full-stack wholesale platform designed to manage bulk orders, customer inquiries, and product listings through a responsive web interface.',
    longDesc: 'Built using the MERN stack, this application focuses on creating a scalable wholesale business solution. It includes features like dynamic product display, contact and inquiry forms, and RESTful API integration between frontend and backend. The project is currently under development, with planned deployment using Vercel for the frontend and Render for the backend, along with custom domain integration.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    github: 'https://github.com/DevanshPrajapati28/whole-sale',
    demo: '',
    gradient: 'linear-gradient(135deg, #1a1a2e, #16213e)',
    accent: '#e94560',
    emoji: '🛒',
    year: '2025',
  },
  {
    id: 3,
    title: 'AI Virtual Calculator using Hand Gestures',
    category: 'AI / Computer Vision',
    description: 'A gesture-controlled virtual calculator that allows users to perform calculations using hand movements without any physical input devices.',
    longDesc: 'This project leverages computer vision and AI to create a touchless calculator controlled entirely through hand gestures. Using MediaPipe for real-time hand tracking and OpenCV for video processing, the system detects finger movements and interprets gestures such as pinch for input actions.',
    tech: ['Python', 'OpenCV', 'MediaPipe', 'NumPy', 'Computer Vision'],
    github: 'https://github.com/DevanshPrajapati28/calculator',
    demo: 'https://www.linkedin.com/posts/devansh-prajapati-180b3a285_opencv-mediapipe-python-activity-7369607700952821760-05Nn',
    gradient: 'linear-gradient(135deg, #0f2027, #2c5364)',
    accent: '#00d4ff',
    emoji: '✋',
    year: '2025',
  },
  {
    id: 4,
    title: 'Gesture-Controlled Dino Game (Computer Vision)',
    category: 'AI / Computer Vision',
    description: 'A computer vision-based system that allows users to play the Chrome Dino game using hand gestures instead of a keyboard.',
    longDesc: 'This project uses computer vision and real-time hand tracking to control the classic Chrome Dino game through gestures. Built with OpenCV and MediaPipe, the system captures live video from a webcam, detects hand landmarks, and interprets gestures such as finger movements or hand poses to trigger game actions like jumping.',
    tech: ['Python', 'OpenCV', 'MediaPipe', 'NumPy', 'Computer Vision'],
    github: 'https://github.com/DevanshPrajapati28/dino-game',
    demo: 'https://www.linkedin.com/posts/devansh-prajapati-180b3a285_dinogame-videoproject-opencv-activity-7365269444463407105-NNMb',
    gradient: 'linear-gradient(135deg, #1f4037, #99f2c8)',
    accent: '#00ffab',
    emoji: '🎮',
    year: '2025',
  },
  {
    id: 5,
    title: 'Personal Budget Tracker (FinTech App)',
    category: 'Full Stack',
    description: 'A client-focused budget management application that helps users track expenses, manage income, and analyze financial habits effectively.',
    longDesc: 'This FinTech application is designed to provide users with a simple and efficient way to manage their personal finances. It allows users to record transactions, categorize expenses, and monitor their budget in real time.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    github: 'https://github.com/DevanshPrajapati28/budget-visual-companion',
    demo: 'https://www.linkedin.com/posts/devansh-prajapati-180b3a285_clientproject-budgetapp-fintech-activity-7331292841362587649-gnsR',
    gradient: 'linear-gradient(135deg, #134e5e, #71b280)',
    accent: '#00c853',
    emoji: '💰',
    year: '2025',
  },
  {
    id: 6,
    title: 'Paavan Setu – Career Guidance Platform',
    category: 'Full Stack',
    description: 'A fully deployed career guidance platform that helps students explore career paths, book counseling sessions, and connect with experts.',
    longDesc: 'Paavan Setu is a production-ready web application designed to guide students in making informed career decisions. The platform provides structured information about various career paths, allows users to submit inquiries and book counseling sessions. Built using the MERN stack, deployed on Vercel and Render with GoDaddy domain.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Vercel', 'Render'],
    github: 'https://github.com/DevanshPrajapati28/paavansetu-frontend',
    demo: 'https://www.paavansetu.com/',
    gradient: 'linear-gradient(135deg, #0f2027, #2c5364)',
    accent: '#4facfe',
    emoji: '🎓',
    year: '2026',
  },
];

// ─── Individual flip card ────────────────────────────────────────────────────
const FlipCard = ({ project, index }) => {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef(null);
  const innerRef = useRef(null);
  const glowRef = useRef(null);

  // Scroll-triggered entrance
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 60, scale: 0.92 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        delay: (index % 3) * 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [index]);

  // 3-D tilt on mouse move (front face only)
  const handleMouseMove = (e) => {
    if (flipped) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(cardRef.current, {
      rotateY: x * 14,
      rotateX: -y * 14,
      transformPerspective: 900,
      duration: 0.35,
      ease: 'power2.out',
    });

    // move glow with cursor
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        x: x * 40,
        y: y * 40,
        duration: 0.35,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    if (flipped) return;
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    });
    if (glowRef.current) {
      gsap.to(glowRef.current, { x: 0, y: 0, duration: 0.5, ease: 'power2.out' });
    }
  };

  // Hover scale pulse
  const handleMouseEnter = () => {
    if (flipped) return;
    gsap.to(cardRef.current, { scale: 1.03, duration: 0.3, ease: 'power2.out' });
  };

  const handleMouseLeaveScale = () => {
    gsap.to(cardRef.current, { scale: 1, duration: 0.4, ease: 'power2.inOut' });
  };

  // Flip
  const handleFlip = () => {
    gsap.to(innerRef.current, {
      rotationY: flipped ? 0 : 180,
      duration: 0.7,
      ease: 'power2.inOut',
    });
    // Small bounce on the wrapper
    gsap.fromTo(
      cardRef.current,
      { scale: 1 },
      { scale: 0.96, duration: 0.1, yoyo: true, repeat: 1 }
    );
    setFlipped(!flipped);
  };

  return (
    <Box
      ref={cardRef}
      sx={{ height: '320px', perspective: '1200px', cursor: 'pointer', opacity: 0 }}
      onClick={handleFlip}
      onMouseMove={handleMouseMove}
      onMouseLeave={(e) => { handleMouseLeave(e); handleMouseLeaveScale(e); }}
      onMouseEnter={handleMouseEnter}
    >
      <Box
        ref={innerRef}
        sx={{ width: '100%', height: '100%', transformStyle: 'preserve-3d', position: 'relative' }}
      >
        {/* ── Front ── */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderRadius: '20px',
            overflow: 'hidden',
            background: project.gradient,
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 15px 40px rgba(0,0,0,0.2)',
            transition: 'box-shadow 0.3s',
            '&:hover': { boxShadow: `0 25px 60px rgba(0,0,0,0.35), 0 0 40px ${project.accent}33` },
          }}
        >
          {/* Animated glow blob */}
          <Box
            ref={glowRef}
            sx={{
              position: 'absolute',
              width: 180,
              height: 180,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${project.accent}55 0%, transparent 70%)`,
              top: '10%',
              left: '30%',
              pointerEvents: 'none',
              filter: 'blur(20px)',
            }}
          />

          {/* Top row */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
            <Box>
              <Typography
                sx={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '10px',
                  color: `${project.accent}cc`,
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  mb: 0.5,
                }}
              >
                {project.category}
              </Typography>
              <Typography sx={{ fontSize: '28px' }}>{project.emoji}</Typography>
            </Box>
            <Chip
              label={project.year}
              size="small"
              sx={{
                background: 'rgba(255,255,255,0.15)',
                color: 'white',
                fontFamily: "'Space Mono', monospace",
                fontSize: '10px',
              }}
            />
          </Box>

          {/* Bottom row */}
          <Box sx={{ position: 'relative' }}>
            <Typography
              sx={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: '22px',
                color: 'white',
                mb: 1,
              }}
            >
              {project.title}
            </Typography>
            <Typography sx={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
              {project.description}
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.8, mt: 2, flexWrap: 'wrap' }}>
              {project.tech.slice(0, 3).map((t) => (
                <Chip
                  key={t}
                  label={t}
                  size="small"
                  sx={{
                    background: 'rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: '10px',
                    fontFamily: "'Space Mono', monospace",
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Flip hint */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 16,
              right: 16,
              fontFamily: "'Space Mono', monospace",
              fontSize: '9px',
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '1px',
            }}
          >
            CLICK TO FLIP →
          </Box>

          {/* Decorative circles */}
          <Box
            sx={{
              position: 'absolute',
              top: -30,
              right: -30,
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -20,
              left: -20,
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.04)',
            }}
          />
        </Box>

        {/* ── Back ── */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: '20px',
            overflow: 'hidden',
            background: 'white',
            p: 3,
            border: '1px solid rgba(26,26,46,0.1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
          }}
        >
          {/* Accent top bar */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: `linear-gradient(90deg, ${project.accent}, transparent)`,
            }}
          />

          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '10px',
                  background: project.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                }}
              >
                {project.emoji}
              </Box>
              <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '18px', color: '#1a1a2e' }}>
                {project.title}
              </Typography>
            </Box>

            <Typography sx={{ fontSize: '13px', color: '#555577', lineHeight: 1.7, mb: 2 }}>
              {project.longDesc}
            </Typography>

            <Box sx={{ display: 'flex', gap: 0.6, flexWrap: 'wrap' }}>
              {project.tech.map((t) => (
                <Chip
                  key={t}
                  label={t}
                  size="small"
                  sx={{
                    background: 'rgba(26,26,46,0.06)',
                    color: '#1a1a2e',
                    fontSize: '10px',
                    fontFamily: "'Space Mono', monospace",
                  }}
                />
              ))}
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Button
              startIcon={<GitHubIcon />}
              variant="outlined"
              size="small"
              href={project.github}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              sx={{
                flex: 1,
                borderColor: '#1a1a2e',
                color: '#1a1a2e',
                fontFamily: "'Syne', sans-serif",
                fontWeight: 600,
                fontSize: '12px',
                borderRadius: '8px',
                '&:hover': { background: '#1a1a2e', color: 'white' },
              }}
            >
              GitHub
            </Button>
            <Button
              startIcon={<OpenInNewIcon />}
              variant="contained"
              size="small"
              href={project.demo || project.github}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              sx={{
                flex: 1,
                background: '#e94560',
                fontFamily: "'Syne', sans-serif",
                fontWeight: 600,
                fontSize: '12px',
                borderRadius: '8px',
                '&:hover': { background: '#c73652' },
              }}
            >
              Live Demo
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

// ─── Floating background orb (subtle, matches existing dark theme) ───────────
const FloatingOrb = ({ color, size, top, left, delay }) => {
  const orbRef = useRef(null);

  useEffect(() => {
    gsap.to(orbRef.current, {
      y: -30,
      x: 15,
      duration: 4 + delay,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay,
    });
  }, [delay]);

  return (
    <Box
      ref={orbRef}
      sx={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`,
        top,
        left,
        pointerEvents: 'none',
        filter: 'blur(40px)',
        zIndex: 0,
      }}
    />
  );
};

// ─── Main section ────────────────────────────────────────────────────────────
const Projects = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const eyebrowRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    // Eyebrow letter-by-letter stagger
    const eyebrowEl = eyebrowRef.current;
    if (eyebrowEl) {
      const text = eyebrowEl.textContent;
      eyebrowEl.innerHTML = text
        .split('')
        .map((ch) => `<span style="display:inline-block;opacity:0;transform:translateY(10px)">${ch === ' ' ? '&nbsp;' : ch}</span>`)
        .join('');

      gsap.to(eyebrowEl.querySelectorAll('span'), {
        opacity: 1,
        y: 0,
        stagger: 0.04,
        duration: 0.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: eyebrowEl,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    }

    // Title slide-up
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Animated underline draw
    gsap.fromTo(
      lineRef.current,
      { width: 0 },
      {
        width: 60,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: lineRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Subtitle fade
    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Continuous subtle pulse on the accent line
    gsap.to(lineRef.current, {
      scaleX: 1.15,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      transformOrigin: 'left center',
    });
  }, []);

  return (
    <section
        id="projects"
        ref={sectionRef}
        style={{
          background: '#ffffff',
          padding: 'clamp(60px, 8vw, 120px) clamp(24px, 8vw, 120px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Floating background orbs — very subtle, fits the white bg */}
        <FloatingOrb color="#e94560" size="300px" top="5%" left="80%" delay={0} />
        <FloatingOrb color="#00adb5" size="250px" top="60%" left="-5%" delay={1.5} />
        <FloatingOrb color="#4facfe" size="200px" top="40%" left="50%" delay={2.5} />

        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 8, position: 'relative', zIndex: 1 }}>
          <Typography
            ref={eyebrowRef}
            sx={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '12px',
              color: '#e94560',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              mb: 1,
            }}
          >
            Portfolio
          </Typography>

          <Typography
            ref={titleRef}
            variant="h2"
            sx={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              color: '#1a1a2e',
              opacity: 0,
            }}
          >
            Featured <span style={{ color: '#e94560' }}>Projects</span>
          </Typography>

          <Typography
            ref={subtitleRef}
            sx={{
              color: '#777',
              mt: 1.5,
              fontSize: '14px',
              fontFamily: "'Space Mono', monospace",
              opacity: 0,
            }}
          >
            Click any card to reveal details
          </Typography>

          <Box
            ref={lineRef}
            sx={{
              height: 3,
              background: '#e94560',
              borderRadius: 2,
              mx: 'auto',
              mt: 2,
              width: 0,
            }}
          />
        </Box>

        {/* Grid */}
        <Grid container spacing={3} sx={{ position: 'relative', zIndex: 1 }}>
          {projects.map((project, i) => (
            <Grid item xs={12} sm={6} lg={4} key={project.id}>
              <FlipCard project={project} index={i} />
            </Grid>
          ))}
        </Grid>
      </section>
  );
};

export default Projects;