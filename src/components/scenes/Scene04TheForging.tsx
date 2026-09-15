'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

interface Scene04TheForgingProps {
  isActive?: boolean;
}

export const Scene04TheForging: React.FC<Scene04TheForgingProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) {
            ticking = false;
            return;
          }
          const rect = containerRef.current.getBoundingClientRect();
          const totalDistance = rect.height - window.innerHeight;
          if (totalDistance > 0) {
            const current = -rect.top;
            const progress = Math.max(0, Math.min(1, current / totalDistance));
            setScrollProgress(progress);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 3-Keyframe Timeline (Stone Levitation -> Energy Portal -> Architect Reconstitution)
  // Keyframe 1: forging_01_stone (Establish hold 0.00 -> 0.22, fade out 0.22 -> 0.38)
  const plate1Opacity = Math.max(0, Math.min(1.0, 1 - Math.max(0, (scrollProgress - 0.22) / 0.16)));
  
  // Keyframe 2: forging_02_energy (Enter 0.22 -> 0.38, Register Hold 0.38 -> 0.48, fade out 0.48 -> 0.64)
  const plate2Opacity = scrollProgress < 0.48
    ? Math.max(0, Math.min(0.98, (scrollProgress - 0.22) / 0.16))
    : Math.max(0, Math.min(0.98, 1 - (scrollProgress - 0.48) / 0.16));

  // Keyframe 3: forging_03_architect (Enter 0.48 -> 0.64, Contemplation Hold 0.64 -> 0.82, yield to transition 0.82 -> 0.94)
  const plate3Opacity = scrollProgress > 0.82
    ? Math.max(0, Math.min(0.98, 1 - (scrollProgress - 0.82) / 0.12))
    : Math.max(0, Math.min(0.98, (scrollProgress - 0.48) / 0.16));

  // Keyframe 4 / Transition Plate: transition_04_05 (Enter 0.80 -> 0.92, Hold 0.92 -> 1.00)
  const transitionOpacity = Math.max(0, Math.min(1.0, (scrollProgress - 0.80) / 0.12));

  // Continuous Camera Movement (Forward Dolly & Elevation)
  const cameraScale = 1.0 + scrollProgress * 0.08;
  const cameraTranslateY = scrollProgress * -30;
  const cameraTranslateX = Math.sin(scrollProgress * Math.PI) * -8;

  // Transition bridge hand-off settles cleanly to next scene entry pose (scale 1.0, translate 0)
  const bridgeFactor = Math.max(0, Math.min(1, (scrollProgress - 0.80) / 0.20));
  const transTranslateX = cameraTranslateX * 0.3 * (1 - bridgeFactor);
  const transTranslateY = cameraTranslateY * 0.65 * (1 - bridgeFactor);
  const transScale = 1.0 + (cameraScale * 1.04 - 1.0) * (1 - bridgeFactor);

  // Canonical Narration Reveal (Reveal 0.54 -> 0.66, Stable Reading Hold 0.66 -> 0.84, Soft Exit 0.84 -> 0.92)
  const baseQuote = Math.min(1, Math.max(0, (scrollProgress - 0.54) / 0.12));
  const quoteOpacity = scrollProgress > 0.84
    ? Math.max(0, baseQuote * (1 - (scrollProgress - 0.84) / 0.08))
    : baseQuote;
  const quoteTranslateY = (1 - Math.min(1, Math.max(0, (scrollProgress - 0.54) / 0.12))) * 18;

  return (
    <section
      id="scene-04-the-forging"
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '360vh',
        backgroundColor: '#050505',
      }}
    >
      {/* Sticky Cinematic Viewport Canvas */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          backgroundColor: '#050505',
        }}
      >
        {/* Layer 0: Subtle Lateral Vignette (Keeps top/bottom edges clear for continuous scroll) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 75% 120% at 50% 50%, transparent 55%, rgba(5, 5, 5, 0.4) 100%)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        {/* Keyframe 1: forging_01_stone (Levitating Basalt Blocks along Vector Tracks) */}
        <div
          style={{
            position: 'absolute',
            inset: '-5% -4% -5% -4%',
            opacity: plate1Opacity,
            transform: `translate3d(${cameraTranslateX}px, ${cameraTranslateY}px, 0) scale(${cameraScale})`,
            transition: 'opacity 0.15s ease-out',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        >
          <Image
            src="/images/forging_01_stone.jpeg"
            alt="Basalt blocks levitating along mathematical lines"
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center 40%',
              filter: 'brightness(0.96) contrast(1.06)',
            }}
            priority
          />
        </div>

        {/* Keyframe 2: forging_02_energy (Dimensional Amber Portal Inception) */}
        <div
          style={{
            position: 'absolute',
            inset: '-5% -4% -5% -4%',
            opacity: plate2Opacity,
            transform: `translate3d(${cameraTranslateX * 0.7}px, ${cameraTranslateY * 0.85}px, 0) scale(${cameraScale * 1.02})`,
            transition: 'opacity 0.15s ease-out',
            zIndex: 3,
            pointerEvents: 'none',
            backgroundColor: '#050505',
          }}
        >
          <Image
            src="/images/forging_02_energy.jpeg"
            alt="Concentric amber dimensional portal unfurling with reverse-entropy light"
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              filter: 'brightness(0.98) contrast(1.08)',
            }}
          />
        </div>

        {/* Keyframe 3: forging_03_architect (The Architect Reconstituting the Empire) */}
        <div
          style={{
            position: 'absolute',
            inset: '-5% -4% -5% -4%',
            opacity: plate3Opacity,
            transform: `translate3d(${cameraTranslateX * 0.4}px, ${cameraTranslateY * 0.7}px, 0) scale(${cameraScale * 1.04})`,
            transition: 'opacity 0.15s ease-out',
            zIndex: 4,
            pointerEvents: 'none',
            backgroundColor: '#050505',
          }}
        >
          <Image
            src="/images/forging_03_architect.jpeg"
            alt="The Architect commanding mass reconstruction with elevated palm"
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center 35%',
              filter: 'brightness(0.97) contrast(1.08)',
            }}
          />
        </div>

        {/* Keyframe 4 / Transition Plate: transition_04_05 (The Sovereign Pathway to the Law) */}
        <div
          style={{
            position: 'absolute',
            inset: '-5% -4% -5% -4%',
            opacity: transitionOpacity,
            transform: `translate3d(${transTranslateX}px, ${transTranslateY}px, 0) scale(${transScale})`,
            transition: 'opacity 0.15s ease-out',
            zIndex: 5,
            pointerEvents: 'none',
          }}
        >
          <Image
            src="/images/transition_04_05.jpeg"
            alt="Cinematic transition bridge from The Forging to The Law"
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center 40%',
              filter: 'brightness(0.96) contrast(1.06)',
            }}
          />
        </div>


        {/* Layer 7: Canonical Inscribed Narration & Act Marker */}
        <div
          className="scene-02-narration"
          style={{
            opacity: quoteOpacity,
            transform: `translate3d(0, ${quoteTranslateY}px, 0)`,
            transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
            zIndex: 20,
          }}
        >
          {/* Act Badge Marker */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.8rem' }}>
            <span
              style={{
                width: '4px',
                height: '4px',
                transform: 'rotate(45deg)',
                backgroundColor: 'var(--color-antique-gold)',
              }}
            />
            <span
              className="font-ui"
              style={{
                fontSize: '9.5px',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'var(--color-antique-gold)',
                fontWeight: 600,
              }}
            >
              ACT IV // THE FORGING
            </span>
            <span
              style={{
                width: '28px',
                height: '1px',
                backgroundColor: 'rgba(168, 137, 74, 0.35)',
              }}
            />
          </div>

          {/* Canonical Statement */}
          <h2
            className="font-cinematic"
            style={{
              fontSize: 'clamp(1.52rem, 2.7vw, 2.35rem)',
              color: 'var(--color-warm-ivory)',
              lineHeight: 1.28,
              letterSpacing: '0.025em',
              fontWeight: 400,
              margin: 0,
              textShadow: '0 4px 25px rgba(0, 0, 0, 0.95), 0 0 18px rgba(229, 194, 125, 0.10)',
            }}
          >
            “He did not inherit power.
            <br />
            He understood it.”
          </h2>
        </div>
      </div>
    </section>
  );
};
