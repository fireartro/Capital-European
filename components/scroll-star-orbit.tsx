"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

type StarPoint = {
  x: number;
  y: number;
  scale?: number;
  rotate?: number;
};

const stableNumber = (value: number) => Math.round(value * 1000) / 1000;

const orbitFormation: StarPoint[] = Array.from({ length: 12 }, (_, index) => {
  const angle = (index / 12) * Math.PI * 2 - Math.PI / 2;
  return {
    x: stableNumber(160 + Math.cos(angle) * 132),
    y: stableNumber(160 + Math.sin(angle) * 132),
    scale: index % 4 === 0 ? 1.25 : index % 3 === 0 ? .75 : 1,
    rotate: index * 30
  };
});

const waveFormation: StarPoint[] = Array.from({ length: 12 }, (_, index) => ({
  x: 20 + index * 26,
  y: stableNumber(158 + Math.sin((index / 11) * Math.PI * 2) * 62),
  scale: index % 3 === 0 ? 1.25 : .82,
  rotate: index % 2 ? -18 : 18
}));

const gridFormation: StarPoint[] = Array.from({ length: 12 }, (_, index) => ({
  x: 70 + (index % 4) * 60,
  y: 80 + Math.floor(index / 4) * 78,
  scale: index === 5 || index === 6 ? 1.3 : .82,
  rotate: index % 2 ? 45 : 0
}));

const spiralFormation: StarPoint[] = Array.from({ length: 12 }, (_, index) => {
  const angle = index * .82;
  const radius = 24 + index * 10;
  return {
    x: stableNumber(160 + Math.cos(angle) * radius),
    y: stableNumber(160 + Math.sin(angle) * radius),
    scale: stableNumber(.7 + index * .045),
    rotate: index * 22
  };
});

const questionFormation: StarPoint[] = [
  { x: 236, y: 58 }, { x: 264, y: 42 }, { x: 292, y: 50 }, { x: 306, y: 75 },
  { x: 300, y: 104 }, { x: 278, y: 124 }, { x: 256, y: 144 }, { x: 250, y: 174 },
  { x: 250, y: 204 }, { x: 250, y: 250, scale: 1.35 }, { x: 230, y: 250, scale: .65 },
  { x: 270, y: 250, scale: .65 }
];

const checkFormation: StarPoint[] = [
  { x: 216, y: 155 }, { x: 230, y: 174 }, { x: 245, y: 191 }, { x: 260, y: 208 },
  { x: 276, y: 186 }, { x: 288, y: 163 }, { x: 300, y: 140 }, { x: 312, y: 116 },
  { x: 230, y: 120, scale: .7 }, { x: 260, y: 105, scale: .7 },
  { x: 290, y: 92, scale: .7 }, { x: 312, y: 76, scale: .7 }
];

const processFormation: StarPoint[] = [
  { x: 232, y: 48 }, { x: 258, y: 48 }, { x: 284, y: 48 },
  { x: 284, y: 76 }, { x: 284, y: 104 }, { x: 258, y: 104 },
  { x: 232, y: 104 }, { x: 232, y: 132 }, { x: 232, y: 160 },
  { x: 258, y: 160 }, { x: 284, y: 160 }, { x: 306, y: 188, scale: 1.2 }
];

const documentFormation: StarPoint[] = [
  { x: 228, y: 48 }, { x: 254, y: 48 }, { x: 280, y: 48 }, { x: 302, y: 70 },
  { x: 302, y: 100 }, { x: 302, y: 130 }, { x: 302, y: 160 }, { x: 276, y: 184 },
  { x: 248, y: 184 }, { x: 228, y: 160 }, { x: 228, y: 122 }, { x: 228, y: 84 }
];

const scatterFormation: StarPoint[] = [
  { x: -35, y: 35 }, { x: 354, y: 18 }, { x: 42, y: 338 }, { x: 330, y: 300 },
  { x: 12, y: 180 }, { x: 355, y: 160 }, { x: 90, y: -24 }, { x: 248, y: 350 },
  { x: -20, y: 275 }, { x: 305, y: -12 }, { x: 145, y: 360 }, { x: 370, y: 235 }
];

const formations = [orbitFormation, waveFormation, gridFormation, spiralFormation, checkFormation, processFormation];
const stagePath = [
  { x: 0, y: 28, scale: .96, turn: 0 },
  { x: -26, y: 45, scale: .7, turn: 8 },
  { x: -44, y: 63, scale: .66, turn: -7 },
  { x: -32, y: 38, scale: .69, turn: 9 },
  { x: -12, y: 66, scale: .64, turn: -5 },
  { x: 4, y: 48, scale: .68, turn: 6 },
  { x: 8, y: 38, scale: .66, turn: -4 },
  { x: 6, y: 56, scale: .66, turn: 3 }
] as const;

function getFormation(sectionId: string | undefined, index: number) {
  if (sectionId?.includes("intrebari")) return questionFormation;
  if (sectionId?.includes("proces")) return processFormation;
  if (sectionId?.includes("calculator")) return checkFormation;
  if (sectionId?.includes("evaluare") || sectionId?.includes("externalizare")) return documentFormation;
  return formations[Math.min(index, formations.length - 1)];
}

export function ScrollStarOrbit({ sectionIds }: { sectionIds: readonly string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState<"settled" | "scatter" | "assemble">("settled");
  const activeIndexRef = useRef(0);
  const pendingIndexRef = useRef(0);
  const moveTimerRef = useRef<number | undefined>(undefined);
  const settleTimerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    let frame = 0;

    const transitionToSection = (nextIndex: number) => {
      if (nextIndex === pendingIndexRef.current) return;
      pendingIndexRef.current = nextIndex;
      window.clearTimeout(moveTimerRef.current);
      window.clearTimeout(settleTimerRef.current);
      setPhase("scatter");

      moveTimerRef.current = window.setTimeout(() => {
        activeIndexRef.current = nextIndex;
        setActiveIndex(nextIndex);
        setPhase("assemble");
        settleTimerRef.current = window.setTimeout(() => setPhase("settled"), 900);
      }, 280);
    };

    const updateTargetSection = () => {
      frame = 0;
      const viewportAnchor = window.innerHeight * .42;
      let nextIndex = 0;

      sectionIds.forEach((id, index) => {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= viewportAnchor) {
          nextIndex = index;
        }
      });

      if (nextIndex !== activeIndexRef.current || nextIndex !== pendingIndexRef.current) {
        transitionToSection(nextIndex);
      }
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateTargetSection);
    };

    frame = window.requestAnimationFrame(updateTargetSection);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
      window.clearTimeout(moveTimerRef.current);
      window.clearTimeout(settleTimerRef.current);
    };
  }, [sectionIds]);

  const stage = stagePath[Math.min(activeIndex, stagePath.length - 1)];
  const formation = phase === "scatter"
    ? scatterFormation
    : getFormation(sectionIds[activeIndex], activeIndex);
  const stageStyle = {
    "--stage-x": `${stage.x}px`,
    "--stage-y": `${stage.y}vh`,
    "--stage-scale": `${stage.scale}`,
    "--stage-turn": `${stage.turn}deg`
  } as CSSProperties;

  return (
    <div
      className={`scroll-star-orbit section-${activeIndex} phase-${phase}`}
      style={stageStyle}
      aria-hidden="true"
    >
      <div className="scroll-star-rings"><i /><i /><i /></div>
      {formation.map((point, index) => (
        <span
          className="scroll-star-node"
          key={index}
          style={{
            "--star-x": `${point.x}px`,
            "--star-y": `${point.y}px`,
            "--star-scale": `${point.scale ?? 1}`,
            "--star-rotate": `${point.rotate ?? 0}deg`,
            transitionDelay: `${index * 22}ms`
          } as CSSProperties}
        >
          <span className="scroll-star-glyph">★</span>
        </span>
      ))}
    </div>
  );
}
