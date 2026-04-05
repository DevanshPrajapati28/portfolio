import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Box, Typography, Grid, TextField, Button, Paper, Snackbar, Alert, IconButton } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import SendIcon from '@mui/icons-material/Send';
import emailjs from '@emailjs/browser';


gsap.registerPlugin(ScrollTrigger);

// Inline Lottie-like animated SVG for contact section
const ContactAnimation = () => (
  <Box sx={{ position: 'relative', width: '100%', maxWidth: 320, mx: 'auto' }}>
    <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
      {/* Background card */}
      <rect x="20" y="30" width="280" height="200" rx="20" fill="#1a1a2e" opacity="0.05" />
      <rect x="30" y="40" width="260" height="180" rx="16" fill="white" stroke="#e9456020" strokeWidth="1.5" />

      {/* Email icon center */}
      <circle cx="160" cy="105" r="45" fill="#e94560" opacity="0.1" />
      <circle cx="160" cy="105" r="35" fill="#e94560" opacity="0.15" />
      <circle cx="160" cy="105" r="25" fill="#e94560" />

      {/* Envelope shape */}
      <rect x="148" y="97" width="24" height="16" rx="2" fill="white" />
      <path d="M148 99l12 8 12-8" stroke="#e94560" strokeWidth="1.5" fill="none" />

      {/* Floating dots */}
      <circle cx="80" cy="80" r="5" fill="#e94560" opacity="0.6">
        <animate attributeName="cy" values="80;70;80" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="240" cy="130" r="4" fill="#1a1a2e" opacity="0.4">
        <animate attributeName="cy" values="130;120;130" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="100" cy="160" r="3" fill="#f0a500" opacity="0.5">
        <animate attributeName="cy" values="160;150;160" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="220" cy="70" r="6" fill="#e94560" opacity="0.3">
        <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* Text lines */}
      <rect x="100" y="150" width="120" height="6" rx="3" fill="#1a1a2e" opacity="0.1" />
      <rect x="120" y="163" width="80" height="5" rx="2.5" fill="#e94560" opacity="0.2" />

      {/* Signal waves */}
      <path d="M130 105 Q145 90 160 105" stroke="#e94560" strokeWidth="1.5" fill="none" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" repeatCount="indefinite" />
      </path>
      <path d="M115 105 Q138 80 160 105" stroke="#e94560" strokeWidth="1.5" fill="none" opacity="0.2">
        <animate attributeName="opacity" values="0.2;0.6;0.2" dur="1.5s" begin="0.3s" repeatCount="indefinite" />
      </path>
      <path d="M100 105 Q130 68 160 105" stroke="#e94560" strokeWidth="1.5" fill="none" opacity="0.1">
        <animate attributeName="opacity" values="0.1;0.4;0.1" dur="1.5s" begin="0.6s" repeatCount="indefinite" />
      </path>
    </svg>
  </Box>
);

const contactInfo = [
  { icon: <EmailOutlinedIcon />, label: 'Email', value: 'devanshprajapati99@email.com', color: '#e94560' },
  { icon: <PhoneOutlinedIcon />, label: 'Phone', value: '+91 87808 73606', color: '#1a1a2e' },
  { icon: <LocationOnOutlinedIcon />, label: 'Location', value: 'Surat, Gujarat, India', color: '#f0a500' },
];

const socials = [
  { icon: <GitHubIcon />, url: 'https://github.com/DevanshPrajapati28', label: 'GitHub', color: '#1a1a2e' },
  { icon: <LinkedInIcon />, url: 'https://www.linkedin.com/in/devansh-prajapati-180b3a285/', label: 'LinkedIn', color: '#0077b5' },
  // { icon: <TwitterIcon />, url: 'https://twitter.com', label: 'Twitter', color: '#1da1f2' },
];

const Contact = () => {
  console.log("ENV:", import.meta.env);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
      }
    );
    gsap.fromTo(formRef.current,
      { opacity: 0, x: 60 },
      {
        opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.2,
        scrollTrigger: { trigger: formRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
      }
    );
    gsap.fromTo(infoRef.current,
      { opacity: 0, x: -60 },
      {
        opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: infoRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
      }
    );
  }, []);

  const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!formData.name || !formData.email || !formData.message) {
      setSnackbar({ open: true, message: 'Please fill all required fields.', severity: 'error' });
      return;
    }
  
    setSending(true);
  
    emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,  // ❗ replace this
      {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      },
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY    // ❗ replace this
    )
    .then(() => {
      setSending(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSnackbar({ open: true, message: '🎉 Message sent successfully!', severity: 'success' });
    })
    .catch((error) => {
      setSending(false);
      setSnackbar({ open: true, message: '❌ Failed to send message.', severity: 'error' });
      console.error(error);
    });
  };

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px', fontSize: '14px',
      '& fieldset': { borderColor: 'rgba(26,26,46,0.12)' },
      '&:hover fieldset': { borderColor: '#e94560' },
      '&.Mui-focused fieldset': { borderColor: '#e94560' },
    },
    '& .MuiInputLabel-root.Mui-focused': { color: '#e94560' },
  };

  return (
    <section id="contact" ref={sectionRef} style={{
      background: '#ffffff', padding: 'clamp(60px, 8vw, 120px) clamp(24px, 8vw, 120px)',
    }}>
      <Box ref={titleRef} sx={{ textAlign: 'center', mb: 8, opacity: 0 }}>
        <Typography sx={{
          fontFamily: "'Space Mono', monospace", fontSize: '12px',
          color: '#e94560', letterSpacing: '3px', textTransform: 'uppercase', mb: 1,
        }}>Get In Touch</Typography>
        <Typography variant="h2" sx={{ fontSize: 'clamp(28px, 4vw, 48px)', color: '#1a1a2e' }}>
          Let's <span style={{ color: '#e94560' }}>Work Together</span>
        </Typography>
        <Box sx={{ width: 60, height: 3, background: '#e94560', borderRadius: 2, mx: 'auto', mt: 2 }} />
      </Box>

      <Grid container spacing={6} alignItems="flex-start">
        {/* Left */}
        <Grid item xs={12} md={5} ref={infoRef} sx={{ opacity: 0 }}>
          <ContactAnimation />

          <Typography sx={{ color: '#555', lineHeight: 1.8, mt: 3, mb: 4, fontSize: '14px' }}>
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of something great. Drop me a message!
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
            {contactInfo.map((info, i) => (
              <Box key={i} sx={{
                display: 'flex', gap: 2, alignItems: 'center',
                p: 2, borderRadius: '14px', background: '#f8f5f0',
                transition: 'all 0.3s',
                '&:hover': { background: `${info.color}08`, transform: 'translateX(6px)' },
              }}>
                <Box sx={{
                  width: 42, height: 42, borderRadius: '12px',
                  background: `${info.color}15`, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  color: info.color,
                }}>{info.icon}</Box>
                <Box>
                  <Typography sx={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: '#999', letterSpacing: '1px' }}>
                    {info.label.toUpperCase()}
                  </Typography>
                  <Typography sx={{ fontSize: '14px', color: '#1a1a2e', fontWeight: 500 }}>
                    {info.value}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 1.5 }}>
            {socials.map((s, i) => (
              <IconButton key={i} component="a" href={s.url} target="_blank" sx={{
                width: 44, height: 44, borderRadius: '12px',
                background: '#f8f5f0', color: '#1a1a2e',
                transition: 'all 0.3s',
                '&:hover': { background: s.color, color: 'white', transform: 'translateY(-4px)' },
              }}>{s.icon}</IconButton>
            ))}
          </Box>
        </Grid>

        {/* Right - Form */}
        <Grid item xs={12} md={7}>
          <Paper ref={formRef} elevation={0} sx={{
            p: { xs: 3, md: 5 }, borderRadius: '24px',
            border: '1px solid rgba(26,26,46,0.08)',
            opacity: 0,
          }}>
            <Typography sx={{
              fontFamily: "'Syne', sans-serif", fontWeight: 700,
              fontSize: '20px', color: '#1a1a2e', mb: 3,
            }}>Send a Message</Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Your Name *" name="name" value={formData.name}
                    onChange={handleChange} sx={inputStyles} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Email Address *" name="email" type="email"
                    value={formData.email} onChange={handleChange} sx={inputStyles} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Subject" name="subject" value={formData.subject}
                    onChange={handleChange} sx={inputStyles} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth multiline rows={5} label="Message *" name="message"
                    value={formData.message} onChange={handleChange} sx={inputStyles} />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" size="large" fullWidth
                    disabled={sending} endIcon={<SendIcon />}
                    sx={{
                      background: sending ? '#ccc' : 'linear-gradient(135deg, #1a1a2e, #2d2d50)',
                      py: 1.8, borderRadius: '12px',
                      fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '15px',
                      boxShadow: '0 8px 30px rgba(26,26,46,0.2)',
                      transition: 'all 0.3s',
                      '&:hover:not(:disabled)': {
                        background: 'linear-gradient(135deg, #e94560, #c73652)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 40px rgba(233,69,96,0.35)',
                      },
                    }}>
                    {sending ? 'Sending...' : 'Send Message'}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Footer */}
      <Box sx={{ textAlign: 'center', mt: 10, pt: 4, borderTop: '1px solid rgba(26,26,46,0.08)' }}>
        <Typography sx={{
          fontFamily: "'Space Mono', monospace", fontSize: '12px',
          color: '#999', letterSpacing: '1px',
        }}>
          Crafted with by{' '}
          <span style={{ color: '#e94560', fontWeight: 700 }}>Devansh Prajapati</span>
          {' '}· {new Date().getFullYear()}
        </Typography>
      </Box>

      <Snackbar open={snackbar.open} autoHideDuration={5000}
        onClose={() => setSnackbar(p => ({ ...p, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={snackbar.severity} variant="filled" onClose={() => setSnackbar(p => ({ ...p, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </section>
  );
};

export default Contact;
