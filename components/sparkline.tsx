/** Tiny decorative SVG sparkline — one gold curve, no axes. */
export function Sparkline({
  className = "",
  seed = 0,
}: {
  className?: string;
  seed?: number;
}) {
  // Four pre-baked paths so each card shows a slightly different shape.
  const paths = [
    "M0,42 C18,40 28,34 40,30 C52,26 62,22 74,18 C86,14 96,10 110,6 C120,4 128,3 140,2",
    "M0,44 C14,42 24,30 36,26 C48,22 58,24 72,20 C84,16 96,10 108,8 C120,6 130,4 140,2",
    "M0,46 C16,44 24,32 38,28 C50,24 60,30 72,22 C84,18 94,12 108,8 C122,4 132,3 140,2",
    "M0,40 C16,38 28,34 42,28 C52,24 62,22 76,18 C90,14 100,10 112,6 C122,4 132,3 140,2",
  ];
  const d = paths[seed % paths.length];
  return (
    <svg
      viewBox="0 0 140 48"
      className={className}
      fill="none"
      stroke="#c5973e"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d={d} />
    </svg>
  );
}
