import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Loader = () => {
  const loaderRef = useRef(null);
  const progressRef = useRef(null);
  const textRef = useRef(null);
  const percentRef = useRef(null);
  const dotsRef = useRef([]);
  const circleRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate dots in orbit
    dotsRef.current.forEach((dot, i) => {
      if (!dot) return;
      gsap.to(dot, {
        rotation: 360,
        duration: 2 + i * 0.3,
        repeat: -1,
        ease: 'none',
        transformOrigin: `0px ${50 + i * 15}px`,
      });
    });

    // Progress bar fill
    tl.to(progressRef.current, {
      width: '100%',
      duration: 2.8,
      ease: 'power2.inOut',
    }, 0);

    // Counter
    let count = { val: 0 };
    tl.to(count, {
      val: 100,
      duration: 2.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (percentRef.current) {
          percentRef.current.textContent = Math.floor(count.val) + '%';
        }
      },
    }, 0);

    // Text reveal
    tl.fromTo(textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      0.3
    );

    // Pulse the circle
    gsap.to(circleRef.current, {
      scale: 1.1,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    return () => { tl.kill(); };
  }, []);

  const orbits = [60, 80, 100];
  const colors = ['#e94560', '#1a1a2e', '#f0a500'];

  return (
    <div ref={loaderRef} style={{
      position: 'fixed', inset: 0,
      background: 'linear-gradient(135deg, #f8f5f0 0%, #ede8e0 50%, #e8e2d8 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      zIndex: 9999,
    }}>
      {/* Geometric background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.06 }}>
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: `${200 + i * 80}px`, height: `${200 + i * 80}px`,
            border: '1px solid #1a1a2e',
            borderRadius: '50%',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            animation: `spin ${8 + i * 2}s linear infinite`,
          }} />
        ))}
      </div>

      <style>{`
        @keyframes spin { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
        @keyframes orbit0 { from { transform: rotate(0deg) translateX(60px); } to { transform: rotate(360deg) translateX(60px); } }
        @keyframes orbit1 { from { transform: rotate(120deg) translateX(80px); } to { transform: rotate(480deg) translateX(80px); } }
        @keyframes orbit2 { from { transform: rotate(240deg) translateX(100px); } to { transform: rotate(600deg) translateX(100px); } }
      `}</style>

      {/* Main orbit system */}
      <div style={{ position: 'relative', width: '240px', height: '240px', marginBottom: '48px' }}>
        {/* Center circle */}
        <div ref={circleRef} style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70px', height: '70px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #1a1a2e, #e94560)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 40px rgba(233,69,96,0.4)',
        }}>
          <span style={{ color: 'white', fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '18px' }}>DP</span>
        </div>

        {/* Orbit rings */}
        {orbits.map((r, i) => (
          <div key={i} style={{
            position: 'absolute', top: '50%', left: '50%',
            width: `${r * 2}px`, height: `${r * 2}px`,
            marginLeft: `-${r}px`, marginTop: `-${r}px`,
            borderRadius: '50%',
            border: `1px dashed ${colors[i]}44`,
          }} />
        ))}

        {/* Orbiting dots */}
        {orbits.map((r, i) => (
          <div key={i} style={{
            position: 'absolute', top: '50%', left: '50%',
            width: '12px', height: '12px',
            marginLeft: '-6px', marginTop: '-6px',
            borderRadius: '50%',
            background: colors[i],
            animation: `orbit${i} ${2 + i * 0.7}s linear infinite`,
            boxShadow: `0 0 10px ${colors[i]}88`,
          }} />
        ))}
      </div>

      {/* Name */}
      <div ref={textRef} style={{ opacity: 0, textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: '28px', color: '#1a1a2e', letterSpacing: '-0.5px',
          marginBottom: '4px',
        }}>DEVANSH PRAJAPATI</h1>
        <p style={{
          fontFamily: "'Space Mono', monospace", fontSize: '11px',
          color: '#e94560', letterSpacing: '4px', textTransform: 'uppercase',
        }}>Software Developer</p>
      </div>

      {/* Progress */}
      <div style={{ width: '280px', textAlign: 'center' }}>
        <div style={{
          width: '100%', height: '2px',
          background: '#1a1a2e18',
          borderRadius: '2px', overflow: 'hidden',
          marginBottom: '12px',
        }}>
          <div ref={progressRef} style={{
            height: '100%', width: '0%',
            background: 'linear-gradient(90deg, #1a1a2e, #e94560)',
            borderRadius: '2px',
          }} />
        </div>
        <span ref={percentRef} style={{
          fontFamily: "'Space Mono', monospace", fontSize: '12px',
          color: '#1a1a2e88', letterSpacing: '2px',
        }}>0%</span>
      </div>
    </div>
  );
};

export default Loader;
