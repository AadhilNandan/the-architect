'use client';

import React, { useState } from 'react';
import { Scene01TheSeal } from '../components/scenes/Scene01TheSeal';
import { Scene02TheFracture } from '../components/scenes/Scene02TheFracture';
import { Scene03TheAwakening } from '../components/scenes/Scene03TheAwakening';
import { Scene04TheForging } from '../components/scenes/Scene04TheForging';
import { Scene05TheLaw } from '../components/scenes/Scene05TheLaw';
import { Scene06TheWatcher } from '../components/scenes/Scene06TheWatcher';
import { Scene07TheThrone } from '../components/scenes/Scene07TheThrone';

export default function Home() {
  const [sealUnlocked, setSealUnlocked] = useState<boolean>(false);

  const handleSealBroken = () => {
    setSealUnlocked(true);
  };

  return (
    <main className="relative w-full min-h-screen bg-[#050505] text-[#e8e0cf] selection:bg-[#a8894a]/30 selection:text-[#e8e0cf]">
      {/* SCENE 01 — THE SEAL */}
      <Scene01TheSeal onSealBroken={handleSealBroken} />

      {/* SCENE 02 — THE FRACTURE */}
      <Scene02TheFracture isUnsealed={sealUnlocked} />

      {/* SCENE 03 — THE AWAKENING */}
      <Scene03TheAwakening />

      {/* SCENE 04 — THE FORGING */}
      <Scene04TheForging />

      {/* SCENE 05 — THE LAW */}
      <Scene05TheLaw />

      {/* SCENE 06 — THE WATCHER */}
      <Scene06TheWatcher />

      {/* SCENE 07 — THE THRONE & COMMUNION */}
      <Scene07TheThrone />
    </main>
  );
}

