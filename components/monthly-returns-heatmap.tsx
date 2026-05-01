interface MonthlyRow {
  month: string;
  strategy: number | null;
  benchmark: number | null;
}

interface Props {
  monthly: MonthlyRow[];
}

const MONTHS = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];

/** Reshape the long monthly_returns list into year × month grid +
 * compute a per-year Total (compounded) of the strategy column. */
function buildGrid(monthly: MonthlyRow[]) {
  const byYear: Record<number, (number | null)[]> = {};
  for (const r of monthly) {
    const [yStr, mStr] = r.month.split("-");
    const y = Number(yStr);
    const m = Number(mStr) - 1;
    if (!byYear[y]) byYear[y] = Array.from({ length: 12 }, () => null);
    byYear[y][m] = r.strategy;
  }
  const years = Object.keys(byYear).map(Number).sort((a, b) => a - b);
  const rows = years.map((y) => {
    const months = byYear[y];
    let yearMul = 1;
    let any = false;
    for (const v of months) {
      if (v != null) {
        yearMul *= 1 + v / 100;
        any = true;
      }
    }
    const total = any ? (yearMul - 1) * 100 : null;
    return { year: y, months, total };
  });
  return rows;
}

/** Map a return value to a Tailwind background class.
 * Cap the saturation so a +20% month doesn't render almost-black —
 * we want green/red at three intensities. */
function cellClasses(v: number | null): string {
  if (v == null) {
    return "bg-cream-dark/30 text-muted";
  }
  const abs = Math.abs(v);
  if (v > 0) {
    if (abs >= 5) return "bg-emerald-200 text-emerald-900";
    if (abs >= 2) return "bg-emerald-100 text-emerald-900";
    return "bg-emerald-50 text-emerald-900";
  }
  if (v < 0) {
    if (abs >= 5) return "bg-rose-200 text-rose-900";
    if (abs >= 2) return "bg-rose-100 text-rose-900";
    return "bg-rose-50 text-rose-900";
  }
  return "bg-cream-dark/40 text-ink";
}

function fmt(v: number | null): string {
  if (v == null) return "";
  const sign = v > 0 ? "+" : "";
  return `${sign}${v.toFixed(1)}`;
}

export function MonthlyReturnsHeatmap({ monthly }: Props) {
  const rows = buildGrid(monthly);
  return (
    <div className="w-full max-w-full overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-[12px] tabular-nums sm:text-[13px]">
        <thead>
          <tr className="text-[10px] uppercase tracking-[0.15em] text-muted">
            <th className="px-2 py-2 text-left font-medium">Jahr</th>
            {MONTHS.map((m) => (
              <th key={m} className="px-1 py-2 text-right font-medium">
                {m}
              </th>
            ))}
            <th className="px-2 py-2 text-right font-medium">Jahr</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.year}>
              <td className="px-2 py-1 font-serif text-navy">{r.year}</td>
              {r.months.map((v, i) => (
                <td
                  key={i}
                  className={
                    "px-1 py-1 text-right " + cellClasses(v)
                  }
                  title={
                    v == null
                      ? `${MONTHS[i]} ${r.year} — keine Daten`
                      : `${MONTHS[i]} ${r.year}: ${fmt(v)}%`
                  }
                >
                  {fmt(v)}
                </td>
              ))}
              <td
                className={
                  "px-2 py-1 text-right font-medium " +
                  cellClasses(r.total)
                }
              >
                {r.total == null ? "" : `${r.total >= 0 ? "+" : ""}${r.total.toFixed(1)}%`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
