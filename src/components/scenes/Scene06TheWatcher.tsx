'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

interface Scene06TheWatcherProps {
  isActive?: boolean;
}

export const Scene06TheWatcher: React.FC<Scene06TheWatcherProps> = () => {
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

  // 3-Keyframe Timeline (Empire Rise/Fall -> Decayed Thrones -> The Eternal Watcher)
  // Keyframe 1: watcher_01_empire (Establish hold 0.00 -> 0.22, fade out 0.22 -> 0.38)
  const plate1Opacity = Math.max(0, Math.min(1.0, 1 - Math.max(0, (scrollProgress - 0.22) / 0.16)));
  
  // Keyframe 2: watcher_02_decay (Enter 0.22 -> 0.38, Register Hold 0.38 -> 0.48, fade out 0.48 -> 0.64)
  const plate2Opacity = scrollProgress < 0.48
    ? Math.max(0, Math.min(0.98, (scrollProgress - 0.22) / 0.16))
    : Math.max(0, Math.min(0.98, 1 - (scrollProgress - 0.48) / 0.16));

  // Keyframe 3: watcher_03_watcher (Enter 0.48 -> 0.64, Contemplation Hold 0.64 -> 0.82, yield to transition 0.82 -> 0.94)
  const plate3Opacity = scrollProgress > 0.82
    ? Math.max(0, Math.min(0.98, 1 - (scrollProgress - 0.82) / 0.12))
    : Math.max(0, Math.min(0.98, (scrollProgress - 0.48) / 0.16));

  // Keyframe 4 / Transition Plate: transition_06_07 (Enter 0.82 -> 0.94, Hold 0.94 -> 1.00)
  const transitionOpacity = Math.max(0, Math.min(1.0, (scrollProgress - 0.82) / 0.12));

  // Time-Lapse Background Camera Drift
  const cameraScale = 1.0 + scrollProgress * 0.06;
  const bgTranslateY = scrollProgress * -35;
  const bgTranslateX = Math.sin(scrollProgress * Math.PI) * -12;

  // Seamless Scene Bridge: Ease transition plate transforms to neutral (scale 1.0, translate 0,0) at scrollProgress = 1.0
  // to achieve identical visual continuity with Scene 07 Frame 01
  const bridgeFactor = Math.max(0, Math.min(1, (scrollProgress - 0.82) / 0.18));
  const transTranslateX = bgTranslateX * 0.3 * (1 - bridgeFactor);
  const transTranslateY = bgTranslateY * 0.65 * (1 - bridgeFactor);
  const transScale = 1.0 + (cameraScale * 1.03 - 1.0) * (1 - bridgeFactor);

  // Staged 4-Verse Sequential Reveals (Culminating in unified 4-line hold 0.80 -> 0.88, then soft exit 0.88 -> 0.96)
  const verseExit = scrollProgress > 0.88 ? Math.max(0, 1 - (scrollProgress - 0.88) / 0.08) : 1;
  // Verse 1: "Names disappeared." (Fades in 0.36 -> 0.46)
  const v1 = Math.min(1, Math.max(0, (scrollProgress - 0.36) / 0.10)) * verseExit;
  // Verse 2: "Thrones fell." (Fades in 0.48 -> 0.58)
  const v2 = Math.min(1, Math.max(0, (scrollProgress - 0.48) / 0.10)) * verseExit;
  // Verse 3: "Cities returned to the earth." (Fades in 0.60 -> 0.70)
  const v3 = Math.min(1, Math.max(0, (scrollProgress - 0.60) / 0.10)) * verseExit;
  // Verse 4: "But he remained." (Reaches full opacity 0.72 -> 0.80, then holds together with all verses)
  const v4 = Math.min(1, Math.max(0, (scrollProgress - 0.72) / 0.08)) * verseExit;

  return (
    <section
      id="scene-06-the-watcher"
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '400vh',
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

        {/* Keyframe 1: watcher_01_empire (Epochs of Civilizations) */}
        <div
          style={{
            position: 'absolute',
            inset: '-5% -4% -5% -4%',
            opacity: plate1Opacity,
            transform: `translate3d(${bgTranslateX}px, ${bgTranslateY}px, 0) scale(${cameraScale})`,
            transition: 'opacity 0.15s ease-out',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        >
          <Image
            className="plate-watcher-01"
            src="/images/watcher_01_empire.jpeg"
            alt="Mortal empires rising across the horizon of centuries"
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
              filter: 'brightness(0.96) contrast(1.06)',
            }}
            priority
          />
        </div>

        {/* Keyframe 2: watcher_02_decay (Basalt Weathering & Ash) */}
        <div
          style={{
            position: 'absolute',
            inset: '-5% -4% -5% -4%',
            opacity: plate2Opacity,
            transform: `translate3d(${bgTranslateX * 0.7}px, ${bgTranslateY * 0.85}px, 0) scale(${cameraScale * 1.02})`,
            transition: 'opacity 0.15s ease-out',
            zIndex: 3,
            pointerEvents: 'none',
            backgroundColor: '#050505',
          }}
        >
          <Image
            className="plate-watcher-02"
            src="/images/watcher_02_decay.jpeg"
            alt="Thrones decaying into dust beneath ancient suns"
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
              filter: 'brightness(0.98) contrast(1.08)',
            }}
          />
        </div>

        {/* Keyframe 3: watcher_03_watcher (The Architect Immovable on the Promontory) */}
        <div
          style={{
            position: 'absolute',
            inset: '-5% -4% -5% -4%',
            opacity: plate3Opacity,
            transform: `translate3d(${bgTranslateX * 0.4}px, ${bgTranslateY * 0.7}px, 0) scale(${cameraScale * 1.03})`,
            transition: 'opacity 0.15s ease-out',
            zIndex: 4,
            pointerEvents: 'none',
            backgroundColor: '#050505',
          }}
        >
          <Image
            src="/images/watcher_03_watcher.jpeg"
            alt="The Architect standing immovable upon the obsidian cliff watching eternity"
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center 35%',
              filter: 'brightness(0.97) contrast(1.08)',
            }}
          />
        </div>

        {/* Keyframe 4 / Transition Plate: transition_06_07 (Descent to the Sanctum) */}
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
            src="/images/transition_06_07.jpeg"
            alt="Cinematic transition bridge from The Watcher to The Throne"
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center 35%',
              filter: 'brightness(0.96) contrast(1.08)',
            }}
          />
        </div>

        {/* Layer 6: Staged 4-Verse Canonical Stelae (Lower-Left Carved Alignment) */}
        <div
          className="scene-02-narration"
          style={{
            zIndex: 20,
            pointerEvents: 'none',
          }}
        >
          {/* Act Badge Marker */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.2rem', opacity: v1 }}>
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
              ACT VI // THE WATCHER
            </span>
            <span
              style={{
                width: '28px',
                height: '1px',
                backgroundColor: 'rgba(168, 137, 74, 0.35)',
              }}
            />
          </div>

          {/* Staged Verses */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {/* Verse 1 */}
            <p
              className="font-cinematic"
              style={{
                fontSize: 'clamp(1.4rem, 2.4vw, 2.1rem)',
                color: 'var(--color-warm-ivory)',
                opacity: v1,
                transform: `translate3d(0, ${(1 - v1) * 15}px, 0)`,
                transition: 'opacity 0.25s ease-out, transform 0.25s ease-out',
                margin: 0,
                fontWeight: 400,
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.95)',
              }}
            >
              Names disappeared.
            </p>

            {/* Verse 2 */}
            <p
              className="font-cinematic"
              style={{
                fontSize: 'clamp(1.4rem, 2.4vw, 2.1rem)',
                color: 'var(--color-warm-ivory)',
                opacity: v2,
                transform: `translate3d(0, ${(1 - v2) * 15}px, 0)`,
                transition: 'opacity 0.25s ease-out, transform 0.25s ease-out',
                margin: 0,
                fontWeight: 400,
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.95)',
              }}
            >
              Thrones fell.
            </p>

            {/* Verse 3 */}
            <p
              className="font-cinematic"
              style={{
                fontSize: 'clamp(1.4rem, 2.4vw, 2.1rem)',
                color: 'var(--color-warm-ivory)',
                opacity: v3,
                transform: `translate3d(0, ${(1 - v3) * 15}px, 0)`,
                transition: 'opacity 0.25s ease-out, transform 0.25s ease-out',
                margin: 0,
                fontWeight: 400,
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.95)',
              }}
            >
              Cities returned to the earth.
            </p>

            {/* Verse 4: Inlaid Gold Climax */}
            <div
              style={{
                marginTop: '0.4rem',
                opacity: v4,
                transform: `translate3d(0, ${(1 - v4) * 15}px, 0)`,
                transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
              }}
            >
              <h2
                className="font-cinematic"
                style={{
                  fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)',
                  color: 'var(--color-luminous-gold)',
                  margin: 0,
                  fontWeight: 400,
                  letterSpacing: '0.04em',
                  textShadow: '0 4px 25px rgba(0, 0, 0, 0.95), 0 0 25px rgba(229, 194, 125, 0.25)',
                }}
              >
                But he remained.
              </h2>
              <div
                style={{
                  marginTop: '0.5rem',
                  height: '1px',
                  width: '180px',
                  background: 'linear-gradient(90deg, var(--color-antique-gold), transparent)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
