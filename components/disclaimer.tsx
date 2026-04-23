/** Canonical legal disclaimer used across the site (footer + /impressum
 * + /datenschutz + /agb). Keep this as the single source of truth so
 * the four surfaces can't drift apart. When legal counsel updates the
 * wording, only this file changes. */

/** The disclaimer as an array of paragraphs — rendered differently per
 * context (footer squeezes everything into one block; the legal pages
 * break it into paragraphs for readability). */
export const DISCLAIMER_PARAGRAPHS: readonly string[] = [
  "aktienpost.ch ist ein Informationsdienst der OWITA AG und bietet keine Anlageberatung und keine Anlagevermittlung. Die bereitgestellten Signale, Analysen und Informationen sind auf die von der OWITA AG entwickelten, zu einem grossen Teil automatisierten Handelsstrategien abgestimmt. Diese Informationen beziehen sich weder auf die persönlichen Anlageziele noch die finanzielle Situation oder besonderen Bedürfnisse eines spezifischen Empfängers. Eine Anlageentscheidung sollte keinesfalls ausschliesslich auf diese Informationen gestützt sein.",
  "Die bereitgestellten Informationen stellen keine Aufforderung zum Kauf oder Verkauf von Wertpapieren dar und beinhalten keine Garantie hinsichtlich der weiteren Marktentwicklung oder der Entwicklung bestimmter Papiere. Die bereitgestellten Informationen ersetzen insbesondere nicht die eigene Recherche sowie die eigenverantwortliche Reflektion und Entscheidung durch den Leser.",
  "Die dargestellten Backtests und Performancekennzahlen basieren auf historischen Daten und sind rückwirkend berechnet. Die Wertentwicklung in der Vergangenheit ist kein Indikator für zukünftige Ergebnisse. Backtest-Resultate unterliegen Survivorship Bias.",
  "Anlageentscheide sollten stets im Portfoliokontext getroffen werden und Ihre persönliche Situation, Risikobereitschaft und Risikofähigkeit berücksichtigen. Jede Entscheidung, Geschäfte zu tätigen oder nicht zu tätigen, wird eigenverantwortlich getroffen. Wir empfehlen, gegebenenfalls einen Anlage-, Steuer- oder Rechtsberater zu konsultieren.",
  "aktienpost.ch untersteht keiner prudentiellen Aufsicht. Die OWITA AG behält sich das Recht vor, die Handelsstrategien jederzeit und ohne vorhergehende Ankündigung weiterzuentwickeln. Die dadurch wiedergegebenen Informationen und Meinungen können sich jederzeit ändern.",
] as const;

/** Single flat paragraph (paragraphs joined with a space). Use in the
 * footer where we want one dense block of legalese. */
export const DISCLAIMER_TEXT: string = DISCLAIMER_PARAGRAPHS.join(" ");

/** Paragraph-broken disclaimer for the dedicated legal pages. */
export function DisclaimerParagraphs({
  className = "mt-4",
}: {
  /** Applied to each <p>. Defaults match the legal pages' spacing. */
  className?: string;
}) {
  return (
    <>
      {DISCLAIMER_PARAGRAPHS.map((p, i) => (
        <p key={i} className={className}>
          {p}
        </p>
      ))}
    </>
  );
}
