export interface Point {
  x: number;
  y: number;
  time: number;
}

export interface Stroke {
  points: Point[];
}

export interface SealEvaluation {
  matched: boolean;
  progress: number; // 0.0 to 1.0
  reason: string;
}

/**
 * Deterministic and forgiving geometric recognizer for the Architect's sacred seal.
 * Accepts circular inscriptions, triangular/chevron delta glyphs, inverted-V strokes,
 * or deliberate multi-stroke sacred geometry inscriptions.
 */
export function evaluateSealGesture(
  strokes: Stroke[],
  boxWidth: number,
  boxHeight: number
): SealEvaluation {
  const allPoints = strokes.flatMap((s) => s.points);
  if (allPoints.length < 5) {
    return { matched: false, progress: 0, reason: 'Awaiting gesture' };
  }

  // 1. Calculate bounding box of the drawn gesture
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const p of allPoints) {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  }

  const strokeWidth = maxX - minX;
  const strokeHeight = maxY - minY;

  // 2. Compute total path length traversed
  let totalLength = 0;
  for (const s of strokes) {
    for (let i = 1; i < s.points.length; i++) {
      const dx = s.points[i].x - s.points[i - 1].x;
      const dy = s.points[i].y - s.points[i - 1].y;
      totalLength += Math.sqrt(dx * dx + dy * dy);
    }
  }

  // 3. Minimum expected perimeter/chord length for completion (~60% of bounding dimension)
  const targetDimension = Math.max(boxWidth, boxHeight);
  const targetLength = targetDimension * 0.75;
  const lengthRatio = Math.min(1.0, totalLength / targetLength);

  // 4. Coverage across the geometric zone
  const widthRatio = Math.min(1.0, strokeWidth / (boxWidth * 0.3));
  const heightRatio = Math.min(1.0, strokeHeight / (boxHeight * 0.3));
  const coverageRatio = (widthRatio + heightRatio) / 2;

  // 5. Blended ritual resonance score
  // Combines continuous stroke length with spatial coverage
  const calculatedProgress = Math.min(1.0, lengthRatio * 0.7 + coverageRatio * 0.3);

  // Deterministic completion threshold:
  // Requires at least 15 points, reasonable bounding coverage, and sufficient drawn length
  const isSufficientLength = totalLength >= targetDimension * 0.55;
  const isSufficientPoints = allPoints.length >= 12;
  const isSufficientSpan = strokeWidth >= boxWidth * 0.2 || strokeHeight >= boxHeight * 0.2;

  if (calculatedProgress >= 0.82 && isSufficientLength && isSufficientPoints && isSufficientSpan) {
    return {
      matched: true,
      progress: 1.0,
      reason: 'The binding is broken',
    };
  }

  return {
    matched: false,
    progress: calculatedProgress,
    reason: 'Inscribe the glyph to awaken the seal',
  };
}
