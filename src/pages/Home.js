import React, { useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Torus, Sphere, Box, MeshDistortMaterial, OrbitControls, Stars } from '@react-three/drei';
import { gsap } from 'gsap';
import { Box as MuiBox, Typography, Button, Chip } from '@mui/material';
import * as THREE from 'three';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CodeIcon from '@mui/icons-material/Code';

// 3D floating geometric shapes
function FloatingGeometry() {
  const mesh1 = useRef();
  const mesh2 = useRef();
  const mesh3 = useRef();
  const mesh4 = useRef();
  const mesh5 = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (mesh1.current) { mesh1.current.rotation.x = t * 0.3; mesh1.current.rotation.y = t * 0.2; }
    if (mesh2.current) { mesh2.current.rotation.x = -t * 0.2; mesh2.current.rotation.z = t * 0.3; }
    if (mesh3.current) { mesh3.current.rotation.y = t * 0.4; mesh3.current.rotation.x = t * 0.1; }
    if (mesh4.current) { mesh4.current.rotation.x = t * 0.15; mesh4.current.rotation.y = -t * 0.3; }
    if (mesh5.current) { mesh5.current.rotation.z = t * 0.2; mesh5.current.rotation.x = t * 0.25; }
  });

  return (
    <>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={mesh1} position={[3.5, 1, -2]}>
          <torusGeometry args={[0.7, 0.25, 16, 60]} />
          <meshStandardMaterial color="#e94560" wireframe opacity={0.7} transparent />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.8} floatIntensity={1.5}>
        <mesh ref={mesh2} position={[-3.5, -0.5, -1]}>
          <octahedronGeometry args={[0.8]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh ref={mesh3} position={[2.5, -2, -3]}>
          <icosahedronGeometry args={[0.6]} />
          <MeshDistortMaterial color="#f0a500" distort={0.4} speed={2} roughness={0.3} />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={1} floatIntensity={1.2}>
        <mesh ref={mesh4} position={[-2, 2.5, -2]}>
          <dodecahedronGeometry args={[0.55]} />
          <meshStandardMaterial color="#e94560" metalness={0.5} roughness={0.3} wireframe />
        </mesh>
      </Float>

      {/* <Float speed={1.3} rotationIntensity={0.6} floatIntensity={2}>
        <mesh ref={mesh5} position={[0, 3, -4]}>
          <torusKnotGeometry args={[0.4, 0.12, 100, 16]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.1} />
        </mesh>
      </Float> */}

      {/* Grid plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]}>
        <planeGeometry args={[30, 30, 30, 30]} />
        <meshStandardMaterial color="#1a1a2e" wireframe opacity={0.08} transparent />
      </mesh>
    </>
  );
}

function ParticleField() {
  const points = useRef();
  const count = 200;

  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (points.current) points.current.rotation.y = clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#e94560" transparent opacity={0.5} />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-3, 3, 2]} intensity={1} color="#e94560" />
      <pointLight position={[3, -2, 2]} intensity={0.8} color="#1a1a2e" />
      <FloatingGeometry />
      <ParticleField />
    </>
  );
}

const Home = () => {
  const contentRef = useRef(null);
  const taglineRef = useRef(null);
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const socialRef = useRef(null);
  const scrollRef = useRef(null);
  const chipRefs = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(taglineRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .fromTo(nameRef.current, { opacity: 0, y: 40, skewX: -3 }, { opacity: 1, y: 0, skewX: 0, duration: 0.9, ease: 'power4.out' }, '-=0.3')
      .fromTo(roleRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .fromTo(descRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .fromTo(chipRefs.current, { opacity: 0, scale: 0.8, y: 10 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'back.out(1.7)' }, '-=0.2')
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2')
      .fromTo(socialRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3');

    // Scroll arrow bounce
    gsap.to(scrollRef.current, { y: 8, duration: 0.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  }, []);

  const tags = ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript', 'Three.js'];

  return (
    <section id="home" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', background: '#f8f5f0' }}>
      {/* 3D Canvas Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 6], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient overlays */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse at 20% 50%, rgba(248,245,240,0.85) 30%, transparent 70%)' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to right, rgba(248,245,240,0.95) 40%, rgba(248,245,240,0.1) 100%)' }} />

      {/* Content */}
      <div ref={contentRef} style={{
        position: 'relative', zIndex: 2,
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        padding: '0 clamp(24px, 8vw, 120px)',
        paddingTop: '80px',
      }}>
        <MuiBox sx={{ maxWidth: '620px' }}>
          {/* Tagline */}
          <MuiBox ref={taglineRef} sx={{
            display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, opacity: 0,
          }}>
            <MuiBox sx={{ width: 32, height: 2, background: '#e94560' }} />
            <Typography sx={{
              fontFamily: "'Space Mono', monospace", fontSize: '12px',
              color: '#e94560', letterSpacing: '3px', textTransform: 'uppercase',
            }}>
              Full Stack Developer
            </Typography>
          </MuiBox>

          {/* Name */}
          <Typography ref={nameRef} variant="h1" sx={{
            fontSize: 'clamp(42px, 6vw, 80px)',
            lineHeight: 1.05, mb: 2, opacity: 0,
            color: '#1a1a2e',
          }}>
            Devansh<br />
            <span style={{ color: '#e94560', WebkitTextStroke: '2px #e94560', WebkitTextFillColor: 'transparent' }}>
              Prajapati
            </span>
          </Typography>

          {/* Role */}
          <Typography ref={roleRef} sx={{
            fontSize: 'clamp(16px, 2vw, 20px)', color: '#555577',
            mb: 2.5, fontWeight: 400, opacity: 0,
            fontFamily: "'DM Sans', sans-serif",
          }}>
            I craft{' '}
            <span style={{ color: '#1a1a2e', fontWeight: 600 }}>scalable web applications</span>{' '}
            with clean code, beautiful UI, and seamless user experiences.
          </Typography>

          {/* Description */}
          <Typography ref={descRef} sx={{
            fontSize: '14px', color: '#777799', mb: 3, opacity: 0,
            lineHeight: 1.7, maxWidth: '480px',
          }}>
            Passionate about building products that live at the intersection of design and engineering.
            MERN Stack specialist with a love for 3D interfaces and creative coding.
          </Typography>

          {/* Tech chips */}
          <MuiBox sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
            {tags.map((tag, i) => (
              <Chip key={tag} ref={el => chipRefs.current[i] = el} label={tag}
                sx={{
                  opacity: 0, fontFamily: "'Space Mono', monospace", fontSize: '11px',
                  background: i % 2 === 0 ? 'rgba(26,26,46,0.08)' : 'rgba(233,69,96,0.08)',
                  color: i % 2 === 0 ? '#1a1a2e' : '#e94560',
                  border: `1px solid ${i % 2 === 0 ? 'rgba(26,26,46,0.15)' : 'rgba(233,69,96,0.15)'}`,
                  fontWeight: 400,
                  '&:hover': { background: i % 2 === 0 ? 'rgba(26,26,46,0.15)' : 'rgba(233,69,96,0.15)' },
                }} />
            ))}
          </MuiBox>

          {/* CTA */}
          <MuiBox ref={ctaRef} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 5, opacity: 0 }}>
            <Button variant="contained" size="large"
              onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
              sx={{
                background: 'linear-gradient(135deg, #1a1a2e, #2d2d50)',
                px: 4, py: 1.5, borderRadius: '10px',
                fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '14px',
                boxShadow: '0 8px 30px rgba(26,26,46,0.25)',
                '&:hover': { background: 'linear-gradient(135deg, #e94560, #c73652)', transform: 'translateY(-2px)', boxShadow: '0 12px 35px rgba(233,69,96,0.35)' },
                transition: 'all 0.3s ease',
              }}>
              View Projects →
            </Button>
            <Button variant="outlined" size="large"
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              sx={{
                borderColor: '#1a1a2e', color: '#1a1a2e', px: 4, py: 1.5, borderRadius: '10px',
                fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '14px',
                '&:hover': { borderColor: '#e94560', color: '#e94560', background: 'rgba(233,69,96,0.05)' },
                transition: 'all 0.3s ease',
              }}>
              Let's Talk
            </Button>
          </MuiBox>

          {/* Social */}
          <MuiBox ref={socialRef} sx={{ display: 'flex', alignItems: 'center', gap: 2, opacity: 0 }}>
            <Typography sx={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', color: '#999', letterSpacing: '2px' }}>
              FIND ME ON
            </Typography>
            {[
              { icon: <GitHubIcon fontSize="small" />, url: 'https://github.com/DevanshPrajapati28' },
              { icon: <LinkedInIcon fontSize="small" />, url: 'https://www.linkedin.com/in/devansh-prajapati-180b3a285/' },
              { icon: <CodeIcon fontSize="small" />, url: 'https://leetcode.com/u/PkNuGSduog/' },
            ].map((item, i) => (
              <MuiBox key={i} component="a" href={item.url} target="_blank"
                sx={{
                  width: 36, height: 36, borderRadius: '10px',
                  background: 'rgba(26,26,46,0.08)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  color: '#1a1a2e', textDecoration: 'none',
                  transition: 'all 0.3s',
                  '&:hover': { background: '#1a1a2e', color: 'white', transform: 'translateY(-3px)' },
                }}>{item.icon}</MuiBox>
            ))}
          </MuiBox>
        </MuiBox>
      </div>

      {/* Scroll indicator */}
      <MuiBox ref={scrollRef} sx={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5,
        cursor: 'pointer',
        opacity: 0,
        animation: 'fadeIn 1s 2s forwards',
      }} onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>
        <style>{`@keyframes fadeIn { to { opacity: 1; } }`}</style>
        <Typography sx={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: '#999', letterSpacing: '2px' }}>
          SCROLL
        </Typography>
        <KeyboardArrowDownIcon sx={{ color: '#e94560', fontSize: '20px' }} />
      </MuiBox>
    </section>
  );
};

export default Home;
