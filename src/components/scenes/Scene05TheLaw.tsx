'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

interface Scene05TheLawProps {
  isActive?: boolean;
}

export const Scene05TheLaw: React.FC<Scene05TheLawProps> = () => {
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

  // 3-Keyframe Timeline (Monument Perspective -> Standing Sovereign -> Basalt Judgment)
  // Keyframe 1: law_01_monument (Establish hold 0.00 -> 0.22, fade out 0.22 -> 0.38)
  const plate1Opacity = Math.max(0, Math.min(1.0, 1 - Math.max(0, (scrollProgress - 0.22) / 0.16)));
  
  // Keyframe 2: law_02_standing (Enter 0.22 -> 0.38, Register Hold 0.38 -> 0.48, fade out 0.48 -> 0.64)
  const plate2Opacity = scrollProgress < 0.48
    ? Math.max(0, Math.min(0.98, (scrollProgress - 0.22) / 0.16))
    : Math.max(0, Math.min(0.98, 1 - (scrollProgress - 0.48) / 0.16));

  // Keyframe 3: law_03_judgement (Enter 0.48 -> 0.64, Contemplation Hold 0.64 -> 0.82, yield to transition 0.82 -> 0.94)
  const plate3Opacity = scrollProgress > 0.82
    ? Math.max(0, Math.min(0.98, 1 - (scrollProgress - 0.82) / 0.12))
    : Math.max(0, Math.min(0.98, (scrollProgress - 0.48) / 0.16));

  // Keyframe 4 / Transition Plate: transition_05_06 (Enter 0.80 -> 0.92, Hold 0.92 -> 1.00)
  const transitionOpacity = Math.max(0, Math.min(1.0, (scrollProgress - 0.80) / 0.12));

  // Monumental Dolly Out Camera Movement (Scale 1.08 -> 0.98, commanding expanse)
  const cameraScale = 1.06 - scrollProgress * 0.08;
  const cameraTranslateY = scrollProgress * -25;
  const cameraTranslateX = Math.sin(scrollProgress * Math.PI) * 6;

  // Seamless Scene Bridge: Ease transition plate transforms to neutral (scale 1.0, translate 0,0) at scrollProgress = 1.0
  // to achieve identical visual continuity with Scene 06 Frame 01
  const bridgeFactor = Math.max(0, Math.min(1, (scrollProgress - 0.80) / 0.20));
  const transTranslateX = cameraTranslateX * 0.3 * (1 - bridgeFactor);
  const transTranslateY = cameraTranslateY * 0.65 * (1 - bridgeFactor);
  const transScale = 1.0 + (cameraScale * 1.04 - 1.0) * (1 - bridgeFactor);

  // Decree Carving Mask Reveal (Reveal 0.46 -> 0.62, Monumental Reading Hold 0.62 -> 0.84, Soft Exit 0.84 -> 0.92)
  const baseDecree = Math.min(1, Math.max(0, (scrollProgress - 0.46) / 0.16));
  const decreeReveal = scrollProgress > 0.84
    ? Math.max(0, baseDecree * (1 - (scrollProgress - 0.84) / 0.08))
    : baseDecree;

  return (
    <section
      id="scene-05-the-law"
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '380vh',
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

        {/* Keyframe 1: law_01_monument (The Reconstructed Monumental Basilica) */}
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
            className="plate-law-01"
            src="/images/law_01_monument.jpeg"
            alt="Monumental reconstructed Roman basilica standing eternal"
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
              filter: 'brightness(0.96) contrast(1.06)',
            }}
            priority
          />
        </div>

        {/* Keyframe 2: law_02_standing (The Monolithic Sovereign at the Threshold) */}
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
            className="plate-law-02"
            src="/images/law_02_standing.jpeg"
            alt="The Architect standing monolithic in black armor at the basilica portal"
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
              filter: 'brightness(0.98) contrast(1.08)',
            }}
          />
        </div>

        {/* Keyframe 3: law_03_judgement (The Eternal Basalt Court) */}
        <div
          style={{
            position: 'absolute',
            inset: '-5% -4% -5% -4%',
            opacity: plate3Opacity,
            transform: `translate3d(${cameraTranslateX * 0.4}px, ${cameraTranslateY * 0.7}px, 0) scale(${cameraScale * 1.03})`,
            transition: 'opacity 0.15s ease-out',
            zIndex: 4,
            pointerEvents: 'none',
            backgroundColor: '#050505',
          }}
        >
          <Image
            className="plate-law-03"
            src="/images/law_03_judgement.jpeg"
            alt="The eternal basalt court under golden twilight"
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
              filter: 'brightness(0.97) contrast(1.08)',
            }}
          />
        </div>

        {/* Keyframe 4 / Transition Plate: transition_05_06 (The Passage of Epochs to the Watcher) */}
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
            src="/images/transition_05_06.jpeg"
            alt="Cinematic transition bridge from The Law to The Watcher"
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center 40%',
              filter: 'brightness(0.96) contrast(1.06)',
            }}
          />
        </div>

        {/* Layer 4: Central Monumental Decree Inscription */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0 2rem',
            zIndex: 20,
            pointerEvents: 'none',
            opacity: decreeReveal,
            transform: `translate3d(0, ${(1 - decreeReveal) * 20}px, 0)`,
            transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
          }}
        >
          {/* Act Badge Marker */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.2rem' }}>
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
                fontSize: '10px',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: 'var(--color-antique-gold)',
                fontWeight: 600,
              }}
            >
              ACT V // THE LAW
            </span>
            <span
              style={{
                width: '32px',
                height: '1px',
                backgroundColor: 'rgba(168, 137, 74, 0.4)',
              }}
            />
          </div>

          {/* Monumental Sovereign Decree (All-Caps Imperial Inscription) */}
          <h2
            className="font-cinematic"
            style={{
              fontSize: 'clamp(1.8rem, 3.8vw, 3.4rem)',
              color: 'var(--color-warm-ivory)',
              lineHeight: 1.15,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 400,
              maxWidth: '960px',
              margin: 0,
              textShadow: '0 4px 30px rgba(0, 0, 0, 0.98), 0 0 30px rgba(229, 194, 125, 0.22)',
            }}
          >
            Do Not Destroy
            <br />
            <span style={{ color: 'var(--color-luminous-gold)' }}>What You Cannot Rebuild.</span>
          </h2>
        </div>
      </div>
    </section>
  );
};
