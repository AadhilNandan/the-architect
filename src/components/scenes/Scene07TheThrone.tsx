'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

interface Scene07TheThroneProps {
  isActive?: boolean;
}

export const Scene07TheThrone: React.FC<Scene07TheThroneProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Conversational Steps:
  // 0: Name ("Who are you?")
  // 1: Age ("How many years have you walked this world?")
  // 2: Location ("Where do you stand?")
  // 3: Email ("And where may I reach you?")
  // 4: Grievance ("So... tell me. How can I help?")
  // 5: Success ("THE ARCHITECT HAS HEARD YOU.")
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [stepError, setStepError] = useState<string>('');

  const DEFAULT_PROMPTS = [
    '“Who are you?”',
    '“How many years have you walked this world?”',
    '“Where do you stand?”',
    '“And where may I reach you?”',
    '“So... tell me. How can I help?”',
  ];

  const DEFAULT_SUBTITLES = [
    'Declare your name to the Sovereign.',
    'State your mortal span upon the earth.',
    'Name the city, realm, or territory from which you speak.',
    'Establish the conduit through which his counsel returns.',
    'Speak freely. What has fallen, or what empire do you seek to restore?',
  ];

  const [architectPrompts, setArchitectPrompts] = useState<string[]>(DEFAULT_PROMPTS);
  const [architectSubtitles] = useState<string[]>(DEFAULT_SUBTITLES);
  const [isPondering, setIsPondering] = useState<boolean>(false);

  // Step 4 Grievance Consultation
  const [grievanceExchanges, setGrievanceExchanges] = useState<Array<{ role: 'user' | 'model'; text: string }>>([]);
  const [isConsulting, setIsConsulting] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    location: '',
    email: '',
    grievance: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

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

  // 3-Keyframe Timeline (Approach -> Column Reveal -> The Enthroned Sovereign)
  // Keyframe 1: throne_01_approach (Establish hold 0.00 -> 0.22, fade out 0.22 -> 0.38)
  const plate1Opacity = Math.max(0, Math.min(1.0, 1 - Math.max(0, (scrollProgress - 0.22) / 0.16)));
  
  // Keyframe 2: throne_02_reveal (Enter 0.22 -> 0.38, Register Hold 0.38 -> 0.48, fade out 0.48 -> 0.62)
  const plate2Opacity = scrollProgress < 0.48
    ? Math.max(0, Math.min(0.98, (scrollProgress - 0.22) / 0.16))
    : Math.max(0, Math.min(0.98, 1 - (scrollProgress - 0.48) / 0.14));

  // Keyframe 3: throne_03_communion (Enter 0.48 -> 0.62, Solo Contemplation Reveal 0.62 -> 0.70, continues through sanctum)
  const plate3Opacity = Math.max(0, Math.min(0.98, (scrollProgress - 0.48) / 0.14));

  // Subterranean Descent Camera Motion
  const cameraScale = 1.0 + scrollProgress * 0.05;
  const cameraTranslateY = scrollProgress * -25;

  // Communion Slab Elevation (Clear contemplative hold for Architect first 0.62 -> 0.70, rises 0.70 -> 0.82, stable rest 0.82 -> 1.00)
  const slabProgress = Math.min(1, Math.max(0, (scrollProgress - 0.70) / 0.12));
  const slabTranslateY = (1 - slabProgress) * 50;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (stepError) setStepError('');
  };

  const validateCurrentStep = (): boolean => {
    setStepError('');
    if (currentStep === 0) {
      if (!formData.name.trim() || formData.name.trim().length < 2) {
        setStepError('Declare your name before the Sovereign.');
        return false;
      }
    } else if (currentStep === 1) {
      const ageNum = parseInt(formData.age.trim(), 10);
      if (!formData.age.trim() || isNaN(ageNum) || ageNum <= 0 || ageNum > 150) {
        setStepError('Enter your earthly years (between 1 and 150).');
        return false;
      }
    } else if (currentStep === 2) {
      if (!formData.location.trim() || formData.location.trim().length < 2) {
        setStepError('Declare where you stand in this world.');
        return false;
      }
    } else if (currentStep === 3) {
      const emailTrim = formData.email.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailTrim || !emailRegex.test(emailTrim)) {
        setStepError('Provide a valid email conduit for the Architect’s response.');
        return false;
      }
    } else if (currentStep === 4) {
      if (!formData.grievance.trim() || formData.grievance.trim().length < 3) {
        setStepError('Describe what has shattered or what you seek to rebuild.');
        return false;
      }
    }
    return true;
  };

  const fetchArchitectPersona = async (userMsg: string, nextStep: number, currentForm: typeof formData) => {
    setIsPondering(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          step: nextStep,
          formData: currentForm,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          setArchitectPrompts((prev) => {
            const next = [...prev];
            next[nextStep] = `“${data.reply.replace(/^“|”$/g, '')}”`;
            return next;
          });
        }
      }
    } catch {
      // Retain canonical fallback without interrupting traveler
    } finally {
      setIsPondering(false);
    }
  };

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      setStepError('');
      const nextStep = Math.min(currentStep + 1, 4);
      const latestValue =
        currentStep === 0
          ? formData.name
          : currentStep === 1
          ? formData.age
          : currentStep === 2
          ? formData.location
          : formData.email;

      setCurrentStep(nextStep);
      fetchArchitectPersona(latestValue, nextStep, formData);
    }
  };

  const handlePrevStep = () => {
    setStepError('');
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentStep < 4) {
      e.preventDefault();
      handleNextStep();
    }
  };

  const setVowPrompt = (vowText: string) => {
    setFormData((prev) => ({
      ...prev,
      grievance: prev.grievance ? `${prev.grievance} ${vowText}` : vowText,
    }));
    if (stepError) setStepError('');
  };

  const handleConsultArchitect = async () => {
    const textToConsult = formData.grievance.trim();
    if (!textToConsult) {
      setStepError('Describe what has shattered before seeking counsel.');
      return;
    }

    setIsConsulting(true);
    setStepError('');

    const nextExchanges = [...grievanceExchanges, { role: 'user' as const, text: textToConsult }];
    setGrievanceExchanges(nextExchanges);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToConsult,
          step: 4,
          formData,
          history: nextExchanges,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          setGrievanceExchanges((prev) => [
            ...prev,
            { role: 'model', text: data.reply.replace(/^“|”$/g, '') },
          ]);
        }
      } else {
        setGrievanceExchanges((prev) => [
          ...prev,
          { role: 'model', text: 'Then the boundary between the structures has failed. Your request has been understood.' },
        ]);
      }
    } catch {
      setGrievanceExchanges((prev) => [
        ...prev,
        { role: 'model', text: 'The foundation registers the fracture. Proceed to transmit your decree.' },
      ]);
    } finally {
      setIsConsulting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to transmit to the Throne');
      }

      setSubmitStatus('success');
      setCurrentStep(5);
    } catch (err: unknown) {
      setSubmitStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'An ancient disturbance occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      age: '',
      location: '',
      email: '',
      grievance: '',
    });
    setArchitectPrompts(DEFAULT_PROMPTS);
    setGrievanceExchanges([]);
    setCurrentStep(0);
    setSubmitStatus('idle');
    setErrorMessage('');
    setStepError('');
  };

  return (
    <section
      id="scene-07-the-throne"
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '420vh',
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
        {/* Layer 0: Subtle Lateral Vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 75% 120% at 50% 50%, transparent 55%, rgba(5, 5, 5, 0.4) 100%)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        {/* Keyframe 1: throne_01_approach (Subterranean Threshold Descent) */}
        <div
          style={{
            position: 'absolute',
            inset: '-5% -4% -5% -4%',
            opacity: plate1Opacity,
            transform: `translate3d(0, ${cameraTranslateY}px, 0) scale(${cameraScale})`,
            zIndex: 2,
            pointerEvents: 'none',
          }}
        >
          <Image
            src="/images/throne_01_approach.jpeg"
            alt="Approaching the subterranean obsidian sanctum"
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center 35%',
              filter: 'brightness(0.96) contrast(1.08)',
            }}
            priority
          />
        </div>

        {/* Keyframe 2: throne_02_reveal (Basalt Colonnades Flanking the Throne) */}
        <div
          style={{
            position: 'absolute',
            inset: '-5% -4% -5% -4%',
            opacity: plate2Opacity,
            transform: `translate3d(0, ${cameraTranslateY * 0.85}px, 0) scale(${cameraScale * 1.02})`,
            zIndex: 3,
            pointerEvents: 'none',
            backgroundColor: '#050505',
          }}
        >
          <Image
            src="/images/throne_02_reveal.jpeg"
            alt="Massive carved basalt columns framing the imperial throne chamber"
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              filter: 'brightness(0.98) contrast(1.08)',
            }}
          />
        </div>

        {/* Keyframe 3: throne_03_communion (The Seated Sovereign Looms on the Throne) */}
        <div
          style={{
            position: 'absolute',
            inset: '-5% -4% -5% -4%',
            opacity: plate3Opacity,
            transform: `translate3d(0, ${cameraTranslateY * 0.7}px, 0) scale(${cameraScale * 1.03})`,
            zIndex: 4,
            pointerEvents: 'none',
            backgroundColor: '#050505',
          }}
        >
          <Image
            className="plate-throne-03"
            src="/images/throne_03_communion.jpeg"
            alt="The Architect seated upon the monumental throne flanked by gold lion finials"
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
              filter: 'brightness(0.97) contrast(1.10)',
            }}
          />
          {/* Subtle throne halo lighting */}
          <div
            style={{
              position: 'absolute',
              top: '15%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '480px',
              height: '480px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(229, 194, 125, 0.15) 0%, transparent 70%)',
              filter: 'blur(35px)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Bottom Atmospheric Shade to maintain text legibility while preserving throne presence */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(5, 5, 5, 0.95) 0%, rgba(5, 5, 5, 0.75) 42%, transparent 75%)',
            opacity: slabProgress,
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />

        {/* Layer 7: The Communion Slab — Cinematic Conversational Interface with The Architect */}
        <div
          style={{
            position: 'absolute',
            bottom: '3.5%',
            left: '50%',
            transform: `translate3d(-50%, ${slabTranslateY}px, 0)`,
            width: '92%',
            maxWidth: '640px',
            opacity: slabProgress,
            pointerEvents: slabProgress > 0.4 ? 'auto' : 'none',
            zIndex: 20,
          }}
        >
          {/* Monolithic Smoked Glass Slab Vessel */}
          <div
            className="smoked-glass-elevated slab-inner-container"
            style={{
              padding: 'clamp(1.1rem, 2.8vw, 1.85rem)',
              backgroundColor: 'rgba(8, 7, 6, 0.90)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(168, 137, 74, 0.28)',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.95), inset 0 1px 0 rgba(229, 194, 125, 0.14)',
              boxSizing: 'border-box',
              width: '100%',
              minWidth: 0,
            }}
          >
            {/* Header: Restrained Imperial Sanctum Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid rgba(168, 137, 74, 0.18)',
                marginBottom: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                <div
                  style={{
                    width: '14px',
                    height: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(168, 137, 74, 0.12)',
                    border: '1px solid rgba(168, 137, 74, 0.35)',
                    transform: 'rotate(45deg)',
                  }}
                >
                  <span style={{ transform: 'rotate(-45deg)', fontSize: '9px', color: 'var(--color-antique-gold)' }}>☩</span>
                </div>
                <span
                  className="font-ui"
                  style={{
                    fontSize: '9.5px',
                    letterSpacing: '0.24em',
                    textTransform: 'uppercase',
                    color: 'var(--color-antique-gold)',
                    fontWeight: 600,
                  }}
                >
                  COMMUNIO // THE ARCHITECT{isPondering ? ' • RESONATING...' : ''}
                </span>
              </div>

              {/* Step indicator */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                {[0, 1, 2, 3, 4].map((stepIdx) => (
                  <span
                    key={stepIdx}
                    style={{
                      width: stepIdx === currentStep ? '16px' : '4px',
                      height: '4px',
                      backgroundColor:
                        stepIdx <= currentStep
                          ? 'var(--color-antique-gold)'
                          : 'rgba(168, 137, 74, 0.2)',
                      boxShadow:
                        stepIdx === currentStep ? '0 0 6px var(--color-antique-gold)' : 'none',
                      transition: 'all 0.25s ease-out',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Restrained Conversation History (Chronicle of Answered Stelae) */}
            {currentStep > 0 && currentStep <= 4 && (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.4rem 0.85rem',
                  marginBottom: '1rem',
                  paddingBottom: '0.75rem',
                  borderBottom: '1px solid rgba(168, 137, 74, 0.12)',
                }}
              >
                {formData.name && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(0)}
                    title="Click to edit name"
                    className="font-ui"
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      color: 'var(--color-smoke-grey)',
                      fontSize: '10px',
                      letterSpacing: '0.12em',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                    }}
                  >
                    <span style={{ color: 'var(--color-antique-gold)', fontSize: '8.5px', textTransform: 'uppercase' }}>PETITIONER:</span>
                    <span style={{ color: 'var(--color-warm-ivory)', borderBottom: '1px dotted rgba(168,137,74,0.4)' }}>{formData.name}</span>
                  </button>
                )}

                {currentStep > 1 && formData.age && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    title="Click to edit age"
                    className="font-ui"
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      color: 'var(--color-smoke-grey)',
                      fontSize: '10px',
                      letterSpacing: '0.12em',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                    }}
                  >
                    <span style={{ color: 'var(--color-antique-gold)', fontSize: '8.5px', textTransform: 'uppercase' }}>CYCLES:</span>
                    <span style={{ color: 'var(--color-warm-ivory)', borderBottom: '1px dotted rgba(168,137,74,0.4)' }}>{formData.age}</span>
                  </button>
                )}

                {currentStep > 2 && formData.location && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    title="Click to edit realm"
                    className="font-ui"
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      color: 'var(--color-smoke-grey)',
                      fontSize: '10px',
                      letterSpacing: '0.12em',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                    }}
                  >
                    <span style={{ color: 'var(--color-antique-gold)', fontSize: '8.5px', textTransform: 'uppercase' }}>REALM:</span>
                    <span style={{ color: 'var(--color-warm-ivory)', borderBottom: '1px dotted rgba(168,137,74,0.4)' }}>{formData.location}</span>
                  </button>
                )}

                {currentStep > 3 && formData.email && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    title="Click to edit conduit"
                    className="font-ui"
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      color: 'var(--color-smoke-grey)',
                      fontSize: '10px',
                      letterSpacing: '0.12em',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                    }}
                  >
                    <span style={{ color: 'var(--color-antique-gold)', fontSize: '8.5px', textTransform: 'uppercase' }}>CONDUIT:</span>
                    <span style={{ color: 'var(--color-warm-ivory)', borderBottom: '1px dotted rgba(168,137,74,0.4)' }}>{formData.email}</span>
                  </button>
                )}
              </div>
            )}

            {/* Error Banner */}
            {(stepError || (submitStatus === 'error' && errorMessage)) && (
              <div
                style={{
                  padding: '0.5rem 0.75rem',
                  backgroundColor: 'rgba(180, 40, 40, 0.12)',
                  border: '1px solid rgba(220, 60, 60, 0.35)',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span style={{ color: '#ff8888', fontSize: '12px' }}>⚠</span>
                <p className="font-ui" style={{ fontSize: '11px', color: '#ffcccc', margin: 0 }}>
                  {stepError || errorMessage}
                </p>
              </div>
            )}

            {/* Step 0: Name ("Who are you?") */}
            {currentStep === 0 && (
              <div>
                <div style={{ marginBottom: '1.1rem' }}>
                  <h3
                    className="font-cinematic"
                    style={{
                      fontSize: 'clamp(1.5rem, 2.6vw, 2.15rem)',
                      color: 'var(--color-warm-ivory)',
                      margin: 0,
                      fontWeight: 400,
                      lineHeight: 1.25,
                      textShadow: '0 2px 20px rgba(0, 0, 0, 0.9)',
                    }}
                  >
                    {architectPrompts[0]}
                  </h3>
                  <p
                    className="font-ui"
                    style={{
                      fontSize: '10px',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--color-antique-gold)',
                      marginTop: '0.35rem',
                      marginBottom: 0,
                    }}
                  >
                    Declare your name to the Sovereign.
                  </p>
                </div>

                <div className="slab-step0-row">
                  <input
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter your name..."
                    className="font-ui"
                    style={{
                      flex: 1,
                      minWidth: 0,
                      boxSizing: 'border-box',
                      padding: '0.65rem 0.85rem',
                      backgroundColor: 'rgba(14, 13, 11, 0.85)',
                      border: '1px solid rgba(168, 137, 74, 0.35)',
                      color: 'var(--color-warm-ivory)',
                      fontSize: '16px',
                      outline: 'none',
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="font-ui"
                    style={{
                      padding: '0.65rem 1.25rem',
                      backgroundColor: 'var(--color-antique-gold)',
                      border: '1px solid var(--color-luminous-gold)',
                      color: '#050505',
                      fontSize: '10.5px',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(168, 137, 74, 0.25)',
                      whiteSpace: 'nowrap',
                      boxSizing: 'border-box',
                      maxWidth: '100%',
                    }}
                  >
                    CONTINUE →
                  </button>
                </div>
              </div>
            )}

            {/* Step 1: Age ("How many years have you walked this world?") */}
            {currentStep === 1 && (
              <div>
                <div style={{ marginBottom: '1.1rem' }}>
                  <h3
                    className="font-cinematic"
                    style={{
                      fontSize: 'clamp(1.5rem, 2.6vw, 2.15rem)',
                      color: 'var(--color-warm-ivory)',
                      margin: 0,
                      fontWeight: 400,
                      lineHeight: 1.25,
                      textShadow: '0 2px 20px rgba(0, 0, 0, 0.9)',
                    }}
                  >
                    {architectPrompts[1]}
                  </h3>
                  <p
                    className="font-ui"
                    style={{
                      fontSize: '10px',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--color-antique-gold)',
                      marginTop: '0.35rem',
                      marginBottom: 0,
                    }}
                  >
                    State your mortal span upon the earth.
                  </p>
                </div>

                <div className="slab-nav-step-container">
                  <input
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                    type="number"
                    name="age"
                    min="1"
                    max="150"
                    value={formData.age}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter your age (e.g. 28)..."
                    className="font-ui slab-nav-input"
                    style={{
                      flex: 1,
                      minWidth: 0,
                      boxSizing: 'border-box',
                      padding: '0.65rem 0.85rem',
                      backgroundColor: 'rgba(14, 13, 11, 0.85)',
                      border: '1px solid rgba(168, 137, 74, 0.35)',
                      color: 'var(--color-warm-ivory)',
                      fontSize: '16px',
                      outline: 'none',
                    }}
                  />
                  <div className="slab-nav-btn-group">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="font-ui slab-btn-prev"
                      style={{
                        padding: '0.65rem 0.9rem',
                        backgroundColor: 'transparent',
                        border: '1px solid rgba(168, 137, 74, 0.25)',
                        color: 'var(--color-smoke-grey)',
                        fontSize: '10px',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        boxSizing: 'border-box',
                      }}
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="font-ui slab-btn-continue"
                      style={{
                        padding: '0.65rem 1.25rem',
                        backgroundColor: 'var(--color-antique-gold)',
                        border: '1px solid var(--color-luminous-gold)',
                        color: '#050505',
                        fontSize: '10.5px',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(168, 137, 74, 0.25)',
                        whiteSpace: 'nowrap',
                        boxSizing: 'border-box',
                      }}
                    >
                      CONTINUE →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Location ("Where do you stand?") */}
            {currentStep === 2 && (
              <div>
                <div style={{ marginBottom: '1.1rem' }}>
                  <h3
                    className="font-cinematic"
                    style={{
                      fontSize: 'clamp(1.5rem, 2.6vw, 2.15rem)',
                      color: 'var(--color-warm-ivory)',
                      margin: 0,
                      fontWeight: 400,
                      lineHeight: 1.25,
                      textShadow: '0 2px 20px rgba(0, 0, 0, 0.9)',
                    }}
                  >
                    {architectPrompts[2]}
                  </h3>
                  <p
                    className="font-ui"
                    style={{
                      fontSize: '10px',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--color-antique-gold)',
                      marginTop: '0.35rem',
                      marginBottom: 0,
                    }}
                  >
                    Name the city, realm, or territory from which you speak.
                  </p>
                </div>

                <div className="slab-nav-step-container">
                  <input
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter your city, land, or realm..."
                    className="font-ui slab-nav-input"
                    style={{
                      flex: 1,
                      minWidth: 0,
                      boxSizing: 'border-box',
                      padding: '0.65rem 0.85rem',
                      backgroundColor: 'rgba(14, 13, 11, 0.85)',
                      border: '1px solid rgba(168, 137, 74, 0.35)',
                      color: 'var(--color-warm-ivory)',
                      fontSize: '16px',
                      outline: 'none',
                    }}
                  />
                  <div className="slab-nav-btn-group">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="font-ui slab-btn-prev"
                      style={{
                        padding: '0.65rem 0.9rem',
                        backgroundColor: 'transparent',
                        border: '1px solid rgba(168, 137, 74, 0.25)',
                        color: 'var(--color-smoke-grey)',
                        fontSize: '10px',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        boxSizing: 'border-box',
                      }}
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="font-ui slab-btn-continue"
                      style={{
                        padding: '0.65rem 1.25rem',
                        backgroundColor: 'var(--color-antique-gold)',
                        border: '1px solid var(--color-luminous-gold)',
                        color: '#050505',
                        fontSize: '10.5px',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(168, 137, 74, 0.25)',
                        whiteSpace: 'nowrap',
                        boxSizing: 'border-box',
                      }}
                    >
                      CONTINUE →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Email ("And where may I reach you?") */}
            {currentStep === 3 && (
              <div>
                <div style={{ marginBottom: '1.1rem' }}>
                  <h3
                    className="font-cinematic"
                    style={{
                      fontSize: 'clamp(1.5rem, 2.6vw, 2.15rem)',
                      color: 'var(--color-warm-ivory)',
                      margin: 0,
                      fontWeight: 400,
                      lineHeight: 1.25,
                      textShadow: '0 2px 20px rgba(0, 0, 0, 0.9)',
                    }}
                  >
                    {architectPrompts[3]}
                  </h3>
                  <p
                    className="font-ui"
                    style={{
                      fontSize: '10px',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--color-antique-gold)',
                      marginTop: '0.35rem',
                      marginBottom: 0,
                    }}
                  >
                    Establish the conduit through which his counsel returns.
                  </p>
                </div>

                <div className="slab-nav-step-container">
                  <input
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="your.email@domain.com"
                    className="font-ui slab-nav-input"
                    style={{
                      flex: 1,
                      minWidth: 0,
                      boxSizing: 'border-box',
                      padding: '0.65rem 0.85rem',
                      backgroundColor: 'rgba(14, 13, 11, 0.85)',
                      border: '1px solid rgba(168, 137, 74, 0.35)',
                      color: 'var(--color-warm-ivory)',
                      fontSize: '16px',
                      outline: 'none',
                    }}
                  />
                  <div className="slab-nav-btn-group">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="font-ui slab-btn-prev"
                      style={{
                        padding: '0.65rem 0.9rem',
                        backgroundColor: 'transparent',
                        border: '1px solid rgba(168, 137, 74, 0.25)',
                        color: 'var(--color-smoke-grey)',
                        fontSize: '10px',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        boxSizing: 'border-box',
                      }}
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="font-ui slab-btn-continue"
                      style={{
                        padding: '0.65rem 1.25rem',
                        backgroundColor: 'var(--color-antique-gold)',
                        border: '1px solid var(--color-luminous-gold)',
                        color: '#050505',
                        fontSize: '10.5px',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(168, 137, 74, 0.25)',
                        whiteSpace: 'nowrap',
                        boxSizing: 'border-box',
                      }}
                    >
                      CONTINUE →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Grievance ("So... tell me. How can I help?") */}
            {currentStep === 4 && (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '0.9rem' }}>
                  <h3
                    className="font-cinematic"
                    style={{
                      fontSize: 'clamp(1.5rem, 2.6vw, 2.15rem)',
                      color: 'var(--color-warm-ivory)',
                      margin: 0,
                      fontWeight: 400,
                      lineHeight: 1.25,
                      textShadow: '0 2px 20px rgba(0, 0, 0, 0.9)',
                    }}
                  >
                    {architectPrompts[4]}
                  </h3>
                  <p
                    className="font-ui"
                    style={{
                      fontSize: '10px',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--color-antique-gold)',
                      marginTop: '0.35rem',
                      marginBottom: 0,
                    }}
                  >
                    {architectSubtitles[4]}
                  </p>
                </div>

                {/* Conversational Exchanges with The Architect */}
                {grievanceExchanges.length > 0 && (
                  <div
                    style={{
                      maxHeight: '130px',
                      overflowY: 'auto',
                      marginBottom: '0.85rem',
                      padding: '0.65rem 0.85rem',
                      backgroundColor: 'rgba(10, 9, 8, 0.75)',
                      border: '1px solid rgba(168, 137, 74, 0.22)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.55rem',
                    }}
                  >
                    {grievanceExchanges.map((msg, idx) => (
                      <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                        <span
                          className="font-ui"
                          style={{
                            fontSize: '8.5px',
                            letterSpacing: '0.16em',
                            textTransform: 'uppercase',
                            color: msg.role === 'user' ? 'var(--color-antique-gold)' : 'var(--color-luminous-gold)',
                            fontWeight: 600,
                          }}
                        >
                          {msg.role === 'user' ? (formData.name || 'PETITIONER') : 'THE ARCHITECT'}
                        </span>
                        <p
                          className={msg.role === 'user' ? 'font-ui' : 'font-cinematic'}
                          style={{
                            fontSize: msg.role === 'user' ? '12px' : '14px',
                            color: msg.role === 'user' ? 'var(--color-warm-ivory)' : '#ffdea2',
                            margin: 0,
                            fontStyle: msg.role === 'model' ? 'italic' : 'normal',
                            lineHeight: 1.35,
                          }}
                        >
                          {msg.text}
                        </p>
                      </div>
                    ))}
                    {isConsulting && (
                      <div className="font-ui" style={{ fontSize: '9px', letterSpacing: '0.15em', color: 'var(--color-luminous-gold)', fontStyle: 'italic' }}>
                        THE ARCHITECT IS WEIGHING THE FRACTURE...
                      </div>
                    )}
                  </div>
                )}

                {/* Subtitle Vow Prompts (Quick Inscriptions) */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.75rem' }}>
                  {[
                    'The foundation of my work has begun to crack.',
                    'The spires collapsed under unexpected weight.',
                    'I seek the mandate to restore what has fallen.',
                  ].map((vow, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setVowPrompt(vow)}
                      className="font-ui"
                      style={{
                        padding: '0.25rem 0.55rem',
                        backgroundColor: 'rgba(28, 26, 22, 0.75)',
                        border: '1px solid rgba(168, 137, 74, 0.22)',
                        color: 'var(--color-warm-ivory)',
                        fontSize: '9px',
                        letterSpacing: '0.12em',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      “{vow.slice(0, 32)}...”
                    </button>
                  ))}
                </div>

                {/* Large Inscription Area */}
                <textarea
                  ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                  name="grievance"
                  rows={4}
                  value={formData.grievance}
                  onChange={handleInputChange}
                  placeholder="Describe what has shattered, what injustice or collapse you face, and what needs to be reconstituted..."
                  className="font-ui"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: 'rgba(14, 13, 11, 0.85)',
                    border: '1px solid rgba(168, 137, 74, 0.35)',
                    color: 'var(--color-warm-ivory)',
                    fontSize: '16px',
                    lineHeight: 1.5,
                    outline: 'none',
                    resize: 'vertical',
                    marginBottom: '0.9rem',
                  }}
                />

                <div className="slab-step4-actions">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="font-ui slab-step4-btn"
                    style={{
                      padding: '0.65rem 1rem',
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(168, 137, 74, 0.25)',
                      color: 'var(--color-smoke-grey)',
                      fontSize: '10px',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                    }}
                  >
                    ← REVISE CONDUIT
                  </button>

                  <div className="slab-step4-right-group">
                    <button
                      type="button"
                      onClick={handleConsultArchitect}
                      disabled={isConsulting || !formData.grievance.trim()}
                      className="font-ui slab-step4-btn"
                      style={{
                        padding: '0.65rem 1.1rem',
                        backgroundColor: 'rgba(168, 137, 74, 0.12)',
                        border: '1px solid rgba(168, 137, 74, 0.45)',
                        color: 'var(--color-warm-ivory)',
                        fontSize: '10px',
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        cursor: isConsulting || !formData.grievance.trim() ? 'not-allowed' : 'pointer',
                        opacity: isConsulting || !formData.grievance.trim() ? 0.45 : 1,
                        transition: 'all 0.2s ease-out',
                      }}
                    >
                      {isConsulting ? 'CONSULTING...' : 'SPEAK WITH ARCHITECT'}
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="font-ui slab-step4-btn"
                      style={{
                        padding: '0.7rem 1.6rem',
                        backgroundColor: 'var(--color-antique-gold)',
                        border: '1px solid var(--color-luminous-gold)',
                        color: '#050505',
                        fontSize: '11px',
                        letterSpacing: '0.22em',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        opacity: isSubmitting ? 0.65 : 1,
                        boxShadow: '0 4px 20px rgba(168, 137, 74, 0.35)',
                        transition: 'all 0.2s ease-out',
                      }}
                    >
                      {isSubmitting ? 'TRANSMITTING DECREE...' : 'SEND TO THE ARCHITECT'}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Step 5: Success State */}
            {currentStep === 5 && (
              <div style={{ textAlign: 'center', padding: '0.85rem 0.5rem' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    margin: '0 auto 1rem auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(168, 137, 74, 0.15)',
                    border: '1px solid var(--color-antique-gold)',
                    transform: 'rotate(45deg)',
                  }}
                >
                  <span style={{ transform: 'rotate(-45deg)', fontSize: '14px', color: 'var(--color-antique-gold)' }}>☩</span>
                </div>

                <h3
                  className="font-cinematic"
                  style={{
                    fontSize: 'clamp(1.65rem, 3.2vw, 2.45rem)',
                    color: 'var(--color-luminous-gold)',
                    letterSpacing: '0.06em',
                    margin: '0 0 0.5rem 0',
                    lineHeight: 1.2,
                    textTransform: 'uppercase',
                    textShadow: '0 0 25px rgba(229, 194, 125, 0.3)',
                  }}
                >
                  THE ARCHITECT HAS HEARD YOU.
                </h3>

                <p
                  className="font-cinematic"
                  style={{
                    fontSize: '1.2rem',
                    color: 'var(--color-warm-ivory)',
                    fontStyle: 'italic',
                    margin: '0 0 1rem 0',
                    lineHeight: 1.35,
                  }}
                >
                  Your request has been recorded into the foundation.
                </p>

                <p
                  className="font-ui"
                  style={{
                    fontSize: '10px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--color-smoke-grey)',
                    margin: '0 0 1.5rem 0',
                  }}
                >
                  Watch the horizon. What is broken shall be measured.
                </p>

                <button
                  type="button"
                  onClick={handleReset}
                  className="font-ui"
                  style={{
                    padding: '0.55rem 1.2rem',
                    backgroundColor: 'transparent',
                    border: '1px solid rgba(168, 137, 74, 0.35)',
                    color: 'var(--color-antique-gold)',
                    fontSize: '9.5px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  INSCRIBE ANOTHER DECREE
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
