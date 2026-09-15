'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Stroke, evaluateSealGesture } from '../../interaction/sealRecognition';

export type SealState = 'RESTING' | 'ACTIVE' | 'SEALED';

interface Scene01TheSealProps {
  onSealBroken?: () => void;
}

export const Scene01TheSeal: React.FC<Scene01TheSealProps> = ({ onSealBroken }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [sealState, setSealState] = useState<SealState>('RESTING');
  const [isFlaring, setIsFlaring] = useState<boolean>(false);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [resonanceProgress, setResonanceProgress] = useState<number>(0);
  const [isPointerDown, setIsPointerDown] = useState<boolean>(false);
  const [feedbackText, setFeedbackText] = useState<string>('HOLD & INSCRIBE TO BREAK THE BINDING');

  // Render glowing antique gold strokes on canvas
  const renderStrokes = useCallback(
    (ctx: CanvasRenderingContext2D, currentStrokes: Stroke[], isComplete: boolean) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      for (const stroke of currentStrokes) {
        if (stroke.points.length < 2) continue;

        // Outer auric corona glow
        ctx.shadowColor = isComplete ? '#ffdea2' : '#e5c27d';
        ctx.shadowBlur = isComplete ? 26 : 14;
        ctx.strokeStyle = isComplete ? '#ffdea2' : '#a8894a';
        ctx.lineWidth = isComplete ? 4.5 : 3.2;

        ctx.beginPath();
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        for (let i = 1; i < stroke.points.length; i++) {
          ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
        }
        ctx.stroke();

        // Inner radiant core
        ctx.shadowBlur = 0;
        ctx.strokeStyle = isComplete ? '#ffffff' : '#ffdea2';
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }
    },
    []
  );

  const getCanvasCoords = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const triggerUnseal = useCallback(() => {
    setSealState('SEALED');
    setResonanceProgress(100);
    setIsFlaring(true);
    setFeedbackText('THE SEAL IS BROKEN. CODEX UNBOUND.');

    setTimeout(() => {
      setIsFlaring(false);
    }, 850);

    if (onSealBroken) {
      setTimeout(() => {
        onSealBroken();
      }, 1400);
    }
  }, [onSealBroken]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (sealState === 'SEALED') return;
    try {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // Ignored
    }

    setIsPointerDown(true);
    if (sealState === 'RESTING') {
      setSealState('ACTIVE');
      setFeedbackText('INSCRIBING THE SACRED GLYPH');
    }

    const { x, y } = getCanvasCoords(e);
    const newStroke: Stroke = { points: [{ x, y, time: performance.now() }] };
    setStrokes((prev) => [...prev, newStroke]);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isPointerDown || sealState === 'SEALED') return;
    const { x, y } = getCanvasCoords(e);

    setStrokes((prev) => {
      if (prev.length === 0) return prev;
      const copy = [...prev];
      const last = copy[copy.length - 1];
      copy[copy.length - 1] = {
        ...last,
        points: [...last.points, { x, y, time: performance.now() }],
      };

      const canvas = canvasRef.current;
      if (canvas) {
        const evalResult = evaluateSealGesture(copy, canvas.width, canvas.height);
        setResonanceProgress(Math.round(evalResult.progress * 100));

        if (evalResult.matched) {
          triggerUnseal();
        }
      }
      return copy;
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignored
    }
    setIsPointerDown(false);

    if (sealState !== 'SEALED') {
      const canvas = canvasRef.current;
      if (canvas) {
        const evalResult = evaluateSealGesture(strokes, canvas.width, canvas.height);
        if (evalResult.matched) {
          triggerUnseal();
        } else if (strokes.length > 0 && resonanceProgress < 40) {
          setFeedbackText('CONTINUE THE GESTURE TO BREAK THE SEAL');
        }
      }
    }
  };

  const handleReset = () => {
    setStrokes([]);
    setResonanceProgress(0);
    setSealState('RESTING');
    setFeedbackText('HOLD & INSCRIBE TO BREAK THE BINDING');
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  // Sync canvas context on state change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      renderStrokes(ctx, strokes, sealState === 'SEALED');
    }
  }, [strokes, sealState, renderStrokes]);

  // Set internal resolution matching element coordinates
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = 360;
    canvas.height = 360;
  }, []);

  return (
    <section id="scene-01-the-seal" className="scene-container">
      {/* Background Solar Corona Aura Bleed */}
      <div
        className="animate-corona"
        style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: isFlaring ? 'translate(-50%, -50%) scale(1.15)' : 'translate(-50%, -50%) scale(1)',
          width: '650px',
          height: '650px',
          borderRadius: '50%',
          filter: 'blur(130px)',
          pointerEvents: 'none',
          zIndex: 0,
          backgroundColor: isFlaring
            ? 'rgba(255, 222, 162, 0.45)'
            : sealState === 'SEALED'
            ? 'rgba(229, 194, 125, 0.26)'
            : sealState === 'ACTIVE'
            ? 'rgba(168, 137, 74, 0.18)'
            : 'rgba(168, 137, 74, 0.08)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Subtle Overhead Golden Ray Shaft */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1px',
          height: '220px',
          background: 'linear-gradient(to bottom, rgba(168, 137, 74, 0.35), transparent)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* 1. Header Architectural Epigraph */}
      <header className="scene-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span
            style={{
              width: '5px',
              height: '5px',
              transform: 'rotate(45deg)',
              backgroundColor: 'var(--color-antique-gold)',
            }}
          />
          <span
            className="font-ui"
            style={{
              fontSize: '11px',
              letterSpacing: '0.3em',
              color: 'var(--color-antique-gold)',
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            RITUS SACRAMENTUM
          </span>
          <span
            style={{
              width: '5px',
              height: '5px',
              transform: 'rotate(45deg)',
              backgroundColor: 'var(--color-antique-gold)',
            }}
          />
        </div>

        <h1
          className="scene-title"
          style={{
            textShadow:
              sealState === 'SEALED'
                ? '0 0 35px rgba(229, 194, 125, 0.6), 0 0 70px rgba(168, 137, 74, 0.3)'
                : '0 0 25px rgba(168, 137, 74, 0.25)',
          }}
        >
          DRAW THE SEAL.
        </h1>

        <div
          className="font-ui"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '10px',
            letterSpacing: '0.22em',
            color: 'var(--color-smoke-grey)',
            textTransform: 'uppercase',
          }}
        >
          <span>CODEX BASALTIS</span>
          <span style={{ color: 'var(--color-antique-gold)' }}>•</span>
          <span>LIBER PRIMUS</span>
        </div>
      </header>

      {/* 2. Central Monolithic Reliquary: The Tome (Increased Visual Dominance ~20%) */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          transform: isFlaring ? 'scale(1.03)' : 'scale(1)',
          filter: isFlaring ? 'brightness(1.22) drop-shadow(0 0 35px rgba(229, 194, 125, 0.7))' : 'none',
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease',
        }}
      >
        <div className="scene-book-box">
          {/* Inner relative container explicitly sized for Next.js Image fill */}
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {/* Book Closed Layer (Resting) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                transition: 'opacity 1s ease-out',
                opacity: sealState === 'SEALED' ? 0 : 1,
              }}
            >
              <Image
                src="/images/book_closed.png"
                alt="Ancient imperial basalt tome bound in dark obsidian leather and antique gold filigree"
                fill
                sizes="(max-width: 640px) 230px, 285px"
                style={{ objectFit: 'contain', padding: '0.75rem' }}
                priority
              />
            </div>

            {/* Book Open Page Layer (Illuminated when unsealed or actively drawing) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                transition: 'opacity 1s ease-out',
                opacity: sealState === 'SEALED' ? 1 : sealState === 'ACTIVE' ? 0.35 : 0,
                pointerEvents: 'none',
              }}
            >
              <Image
                src="/images/book_symbol_page.png"
                alt="Ancient book opened to reveal glowing sacred geometry glyph"
                fill
                sizes="(max-width: 640px) 230px, 285px"
                style={{ objectFit: 'contain', padding: '0.75rem' }}
              />
            </div>

            {/* Inscriptional Epigraph on Base of Book */}
            <div
              style={{
                position: 'absolute',
                bottom: '0.65rem',
                left: 0,
                right: 0,
                textAlign: 'center',
                pointerEvents: 'none',
                zIndex: 5,
              }}
            >
              <span
                className="font-cinematic"
                style={{
                  display: 'block',
                  fontSize: '11px',
                  letterSpacing: '0.22em',
                  color: 'rgba(232, 224, 207, 0.85)',
                  textTransform: 'uppercase',
                }}
              >
                CLAUDITUR IN AETERNUM
              </span>
              <span
                className="font-ui"
                style={{
                  display: 'block',
                  fontSize: '8px',
                  letterSpacing: '0.28em',
                  color: 'rgba(168, 137, 74, 0.7)',
                  textTransform: 'uppercase',
                  marginTop: '1px',
                }}
              >
                CLAVIS OBSIDIANA
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Sacred Geometry Ritual Mandala & Interactive Drawing Canvas */}
      <div style={{ position: 'relative', zIndex: 12, width: '100%', maxWidth: '380px', textAlign: 'center' }}>
        <div className={`scene-ritual-area ${sealState === 'RESTING' ? 'seal-dormant-pulse' : ''} ${isFlaring ? 'seal-flaring' : ''}`}>
          {/* Sacred Geometry SVG Guides with Enhanced Dormant Visibility */}
          <svg
            viewBox="0 0 360 360"
            fill="none"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              color: 'var(--color-antique-gold)',
            }}
          >
            {/* Concentric rings */}
            <circle cx="180" cy="180" r="170" stroke="currentColor" strokeWidth="0.75" strokeOpacity={sealState === 'RESTING' ? 0.42 : 0.55} />
            <circle cx="180" cy="180" r="158" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 6" strokeOpacity={sealState === 'RESTING' ? 0.45 : 0.6} />
            <circle
              cx="180"
              cy="180"
              r="125"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeOpacity={sealState === 'SEALED' ? 0.9 : sealState === 'RESTING' ? 0.52 : 0.7}
              style={{ transition: 'stroke-opacity 0.7s ease-out' }}
            />
            {/* Dynamic Gold Resonance Progress Arc */}
            <circle
              cx="180"
              cy="180"
              r="125"
              fill="none"
              stroke="#e5c27d"
              strokeWidth={sealState === 'SEALED' ? 3.5 : 2.5}
              strokeDasharray="785.4"
              strokeDashoffset={785.4 - (785.4 * resonanceProgress) / 100}
              strokeLinecap="round"
              style={{
                transformOrigin: 'center',
                transform: 'rotate(-90deg)',
                transition: 'stroke-dashoffset 0.12s ease-out',
                filter: resonanceProgress > 0 ? 'drop-shadow(0 0 10px rgba(229,194,125,0.85))' : 'none',
              }}
            />
            <circle cx="180" cy="180" r="82" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 6" strokeOpacity={sealState === 'RESTING' ? 0.42 : 0.55} />
            <circle cx="180" cy="180" r="44" stroke="currentColor" strokeWidth="0.75" strokeOpacity={sealState === 'RESTING' ? 0.65 : 0.85} />

            {/* Classical Axial Crosshairs */}
            <g stroke="currentColor" strokeWidth="0.5" strokeOpacity={sealState === 'RESTING' ? 0.48 : 0.65}>
              <line x1="180" y1="8" x2="180" y2="38" />
              <line x1="180" y1="322" x2="180" y2="352" />
              <line x1="8" y1="180" x2="38" y2="180" />
              <line x1="322" y1="180" x2="352" y2="180" />
            </g>

            {/* Sacred Inscribed Geometric Rhombus & Hexagram */}
            <g fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity={sealState === 'RESTING' ? 0.38 : 0.55}>
              <polygon points="180,55 290,120 290,240 180,305 70,240 70,120" />
              <polygon points="180,65 280,235 80,235" />
              <polygon points="180,295 80,125 280,125" />
            </g>

            {/* Cardinal Roman Numerals */}
            <g
              fill="#e5c27d"
              fontFamily="'Cormorant Garamond', Georgia, serif"
              fontSize="13"
              fontWeight="600"
              letterSpacing="2"
              textAnchor="middle"
              opacity={sealState === 'RESTING' ? 0.88 : 1}
            >
              <text x="180" y="30">XII</text>
              <text x="342" y="185">III</text>
              <text x="180" y="344">VI</text>
              <text x="20" y="185">IX</text>
            </g>
          </svg>

          {/* Interactive Ritual Canvas (scoped strictly to circular glyph area to prevent mobile scroll trap) */}
          <canvas
            ref={canvasRef}
            className="ritual-canvas"
            style={{
              width: '80%',
              height: '80%',
              top: '10%',
              left: '10%',
              borderRadius: '50%',
              pointerEvents: sealState === 'SEALED' ? 'none' : 'auto',
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          />

          {/* Center Lock Core Icon */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              zIndex: 15,
            }}
          >
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor:
                  sealState === 'SEALED'
                    ? 'rgba(229, 194, 125, 0.28)'
                    : 'rgba(11, 10, 8, 0.92)',
                border:
                  sealState === 'SEALED'
                    ? '1px solid #ffdea2'
                    : '1px solid rgba(168, 137, 74, 0.55)',
                boxShadow:
                  sealState === 'SEALED'
                    ? '0 0 30px rgba(229, 194, 125, 0.5)'
                    : '0 0 14px rgba(168, 137, 74, 0.18)',
                transition: 'all 0.5s ease-out',
              }}
            >
              {sealState === 'SEALED' ? (
                <svg
                  style={{ width: '22px', height: '22px', color: '#ffdea2' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                  />
                </svg>
              ) : (
                <svg
                  style={{ width: '22px', height: '22px', color: '#a8894a' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Inscription Directive & Status Bar */}
        <div style={{ marginTop: '0.65rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
          {/* Directive Text */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                width: '4px',
                height: '4px',
                transform: 'rotate(45deg)',
                backgroundColor: 'var(--color-antique-gold)',
                opacity: sealState === 'SEALED' ? 1 : 0.6,
              }}
            />
            <p
              className="font-ui"
              style={{
                fontSize: '11px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: sealState === 'SEALED' ? '#ffdea2' : '#e8e0cf',
                margin: 0,
              }}
            >
              {feedbackText}
            </p>
            <span
              style={{
                width: '4px',
                height: '4px',
                transform: 'rotate(45deg)',
                backgroundColor: 'var(--color-antique-gold)',
                opacity: sealState === 'SEALED' ? 1 : 0.6,
              }}
            />
          </div>

          {/* Stele Progress Rail */}
          <div className="status-rail font-ui">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-antique-gold)',
                }}
              />
              <span
                style={{
                  fontSize: '9px',
                  letterSpacing: '0.18em',
                  color: 'var(--color-smoke-grey)',
                  textTransform: 'uppercase',
                }}
              >
                RESONANCE
              </span>
            </div>

            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${resonanceProgress}%` }} />
            </div>

            <span
              style={{
                fontSize: '10px',
                fontFamily: 'monospace',
                color: 'var(--color-luminous-gold)',
                letterSpacing: '0.1em',
              }}
            >
              {resonanceProgress.toFixed(1)}%
            </span>

            {strokes.length > 0 && sealState !== 'SEALED' && (
              <button
                onClick={handleReset}
                style={{
                  marginLeft: '0.5rem',
                  padding: '1px 5px',
                  fontSize: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--color-smoke-grey)',
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(168, 137, 74, 0.3)',
                  cursor: 'pointer',
                }}
              >
                Reset
              </button>
            )}
          </div>

          {/* Aesthetic Cadence Indicator — Faint Subtle Whisper */}
          <span
            className="font-ui"
            style={{
              fontSize: '8px',
              letterSpacing: '0.32em',
              color: 'rgba(168, 137, 74, 0.28)',
              textTransform: 'uppercase',
              marginTop: '2px',
              userSelect: 'none',
            }}
          >
            HARMONIC STASIS • 432 HZ CADENCE
          </span>

          {/* Seamless Atmospheric Continuation into Void upon Unseal */}
          {sealState === 'SEALED' && (
            <div
              style={{
                marginTop: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                animation: 'fadeIn 1.4s ease-out',
              }}
            >
              <p
                className="font-cinematic"
                style={{
                  fontSize: '14px',
                  color: 'rgba(232, 224, 207, 0.6)',
                  letterSpacing: '0.14em',
                  margin: 0,
                  fontStyle: 'italic',
                }}
              >
                “The binding fractures. Reality awakens before the Architect.”
              </p>
              <div
                style={{
                  width: '1px',
                  height: '35px',
                  background: 'linear-gradient(to bottom, rgba(168, 137, 74, 0.45), transparent)',
                  marginTop: '0.25rem',
                }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
