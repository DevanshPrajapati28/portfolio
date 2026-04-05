import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { AppBar, Toolbar, Box, IconButton, Drawer, List, ListItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const navLinks = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'];

const Navbar = () => {
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const logoRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [active, setActive] = useState('Home');

  useEffect(() => {
    gsap.fromTo(logoRef.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' });
    gsap.fromTo(linksRef.current,
      { opacity: 0, y: -15 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.3 }
    );

    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = navLinks.map(l => document.getElementById(l.toLowerCase()));
      sections.forEach((sec, i) => {
        if (sec) {
          const rect = sec.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) setActive(navLinks[i]);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar ref={navRef} elevation={0} sx={{
        background: scrolled ? 'rgba(248,245,240,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(26,26,46,0.08)' : 'none',
        transition: 'all 0.4s ease',
        color: '#1a1a2e',
      }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 6 }, py: 1 }}>
          <Box ref={logoRef} onClick={() => scrollTo('home')} sx={{
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1.5,
          }}>
            <Box sx={{
              width: 38, height: 38, borderRadius: '10px',
              background: 'linear-gradient(135deg, #1a1a2e, #e94560)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Syne', sans-serif", fontWeight: 800, color: 'white', fontSize: '14px',
            }}>DP</Box>
            <Box sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '16px', color: '#1a1a2e' }}>
              Devansh<span style={{ color: '#e94560' }}>.</span>
            </Box>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {navLinks.map((link, i) => (
              <Box key={link} ref={el => linksRef.current[i] = el}
                onClick={() => scrollTo(link)} sx={{
                  px: 2, py: 0.8, cursor: 'pointer',
                  fontFamily: "'Syne', sans-serif", fontWeight: 600,
                  fontSize: '13px', letterSpacing: '0.3px',
                  color: active === link ? '#e94560' : '#1a1a2e',
                  position: 'relative', borderRadius: '8px',
                  transition: 'all 0.3s',
                  '&:hover': { color: '#e94560', background: 'rgba(233,69,96,0.06)' },
                  '&::after': active === link ? {
                    content: '""', position: 'absolute', bottom: '4px', left: '50%',
                    transform: 'translateX(-50%)', width: '4px', height: '4px',
                    borderRadius: '50%', background: '#e94560',
                  } : {},
                }}>{link}</Box>
            ))}
          </Box>

          <IconButton sx={{ display: { xs: 'flex', md: 'none' }, color: '#1a1a2e' }}
            onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 280, background: '#f8f5f0', padding: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Box sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '20px' }}>Menu</Box>
          <IconButton onClick={() => setDrawerOpen(false)}><CloseIcon /></IconButton>
        </Box>
        <List>
          {navLinks.map(link => (
            <ListItem key={link} onClick={() => scrollTo(link)} sx={{
              cursor: 'pointer', py: 1.5,
              fontFamily: "'Syne', sans-serif", fontWeight: 600,
              fontSize: '18px', color: active === link ? '#e94560' : '#1a1a2e',
              '&:hover': { color: '#e94560', pl: 3, transition: 'all 0.3s' },
            }}>{link}</ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
