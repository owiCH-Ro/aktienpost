import type { PerformanceRow } from "@/data/strategies";

function isPositive(s: string) {
  return s.startsWith("+");
}
function isNegative(s: string) {
  return s.startsWith("-");
}
function returnClass(v: string) {
  if (isPositive(v)) return "text-navy";
  if (isNegative(v)) return "text-redbrown";
  return "text-ink";
}

export function PerformanceTable({
  rows,
  benchLabel,
  note,
}: {
  rows: PerformanceRow[];
  benchLabel: string;
  note?: string;
}) {
  return (
    <div className="w-full max-w-full">
      <div className="relative w-full max-w-full overflow-x-auto rounded-xl border border-line bg-white">
        <table className="w-full min-w-[720px] text-[13px] sm:text-sm">
          <thead>
            <tr className="bg-cream-dark/40 text-left text-[10px] uppercase tracking-[0.15em] text-secondary sm:text-[11px]">
              <th className="px-3 py-3 font-medium sm:px-5 sm:py-4">Zeitraum</th>
              <th className="px-3 py-3 font-medium sm:px-5 sm:py-4">Rendite</th>
              <th className="px-3 py-3 font-medium sm:px-5 sm:py-4">p.a.</th>
              <th className="px-3 py-3 font-medium sm:px-5 sm:py-4">Max. Rückgang</th>
              <th className="border-l border-line px-3 py-3 font-medium sm:px-5 sm:py-4">
                {benchLabel}
              </th>
              <th className="px-3 py-3 font-medium sm:px-5 sm:py-4">p.a.</th>
              <th className="px-3 py-3 font-medium sm:px-5 sm:py-4">Max. Rückgang</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((r) => (
              <tr key={r.period}>
                <td className="px-3 py-3 font-serif text-navy sm:px-5 sm:py-4">{r.period}</td>
                <td className={`px-3 py-3 font-medium tabular-nums sm:px-5 sm:py-4 ${returnClass(r.strat.return)}`}>
                  {r.strat.return}
                </td>
                <td className={`px-3 py-3 tabular-nums sm:px-5 sm:py-4 ${returnClass(r.strat.pa)}`}>
                  {r.strat.pa}
                </td>
                <td className="px-3 py-3 tabular-nums text-redbrown sm:px-5 sm:py-4">
                  {r.strat.maxDd}
                </td>
                <td className={`border-l border-line px-3 py-3 tabular-nums sm:px-5 sm:py-4 ${returnClass(r.bench.return)}`}>
                  {r.bench.return}
                </td>
                <td className={`px-3 py-3 tabular-nums sm:px-5 sm:py-4 ${returnClass(r.bench.pa)}`}>
                  {r.bench.pa}
                </td>
                <td className="px-3 py-3 tabular-nums text-redbrown sm:px-5 sm:py-4">
                  {r.bench.maxDd}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile-only swipe hint — hidden on screens where the table fits. */}
      <p className="mt-2 text-center text-[11px] text-muted sm:hidden">
        ← horizontal scrollen →
      </p>
      {note && (
        <p className="mt-5 rounded-lg border border-gold/30 bg-gold/5 px-4 py-3 text-[14px] leading-relaxed text-ink/80 sm:px-5 sm:py-4 sm:text-sm">
          {note}
        </p>
      )}
    </div>
  );
}
