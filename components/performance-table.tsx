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
    <div>
      <div className="overflow-x-auto rounded-xl border border-line bg-white">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="bg-cream-dark/40 text-left text-[11px] uppercase tracking-[0.15em] text-secondary">
              <th className="px-5 py-4 font-medium">Zeitraum</th>
              <th className="px-5 py-4 font-medium">Rendite</th>
              <th className="px-5 py-4 font-medium">p.a.</th>
              <th className="px-5 py-4 font-medium">Max. Rückgang</th>
              <th className="border-l border-line px-5 py-4 font-medium">
                {benchLabel}
              </th>
              <th className="px-5 py-4 font-medium">p.a.</th>
              <th className="px-5 py-4 font-medium">Max. Rückgang</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((r) => (
              <tr key={r.period}>
                <td className="px-5 py-4 font-serif text-navy">{r.period}</td>
                <td className={`px-5 py-4 tabular-nums font-medium ${returnClass(r.strat.return)}`}>
                  {r.strat.return}
                </td>
                <td className={`px-5 py-4 tabular-nums ${returnClass(r.strat.pa)}`}>
                  {r.strat.pa}
                </td>
                <td className="px-5 py-4 tabular-nums text-redbrown">
                  {r.strat.maxDd}
                </td>
                <td className={`border-l border-line px-5 py-4 tabular-nums ${returnClass(r.bench.return)}`}>
                  {r.bench.return}
                </td>
                <td className={`px-5 py-4 tabular-nums ${returnClass(r.bench.pa)}`}>
                  {r.bench.pa}
                </td>
                <td className="px-5 py-4 tabular-nums text-redbrown">
                  {r.bench.maxDd}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && (
        <p className="mt-5 rounded-lg border border-gold/30 bg-gold/5 px-5 py-4 text-sm leading-relaxed text-ink/80">
          {note}
        </p>
      )}
    </div>
  );
}
