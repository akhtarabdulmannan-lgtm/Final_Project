import { Info, Mail } from 'lucide-react';

/**
 * Licensing page.
 *
 * This page used to publish a table of eight money-transmitter licence numbers
 * attributed to FinCEN, the FCA, FINTRAC and five US state regulators. Those
 * numbers were invented, and publishing invented regulatory identifiers is the
 * single most serious claim a finance-looking site can make. The table has been
 * removed and replaced with an accurate statement: the project holds no
 * licences because it does not provide the regulated activity.
 *
 * The route is kept rather than deleted so that existing links and the footer's
 * legal column continue to resolve to an explanation instead of a 404.
 */
export default function LicensesPage() {
  return (
    <div className="min-h-screen bg-bg py-12 sm:py-16">
      <div className="container-vx">
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="badge-neutral">Regulatory Position</span>
          <h1>Licensing &amp; Regulatory Status</h1>
          <p className="text-ink-500">
            An accurate statement of what this project is permitted to do, which is: display
            public exchange-rate information.
          </p>
        </div>

        <div className="card p-8 bg-surface space-y-6 max-w-3xl">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-surface-subtle border border-line text-ink flex items-center justify-center flex-shrink-0">
              <Info className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="space-y-2">
              <h2 className="text-[20px] leading-[28px]">No financial licences are held</h2>
              <p className="text-ink-700">
                VectisX is a student coursework project. It does not hold a money transmitter
                licence, a payment institution authorisation, or any other financial services
                permission in any jurisdiction, and it has not applied for one.
              </p>
            </div>
          </div>

          <div className="space-y-3 border-t border-line pt-6">
            <h3 className="text-[18px] leading-[24px]">Why none are needed</h3>
            <p className="text-ink-700">
              Licences of that kind are required to hold customer money, move it between parties,
              or exchange one currency for another on a customer&apos;s behalf. This site does none
              of those things. It reads publicly available reference rates, multiplies a number by
              another number in your browser, and draws a chart. No funds are received, held,
              routed, or settled at any point.
            </p>
          </div>

          <div className="space-y-3 border-t border-line pt-6">
            <h3 className="text-[18px] leading-[24px]">What that means for you</h3>
            <ul className="text-ink-700 space-y-2 list-disc pl-5">
              <li>Figures shown here are informational reference rates, not transaction rates.</li>
              <li>Nothing on this site constitutes financial, tax, or investment advice.</li>
              <li>No account balance, wallet, or transfer can be created here.</li>
              <li>
                Any figure you rely on for a real transaction should be confirmed with the bank or
                broker that will actually execute it.
              </li>
            </ul>
          </div>

          <div className="border-t border-line pt-6 flex items-start gap-3">
            <Mail className="w-5 h-5 text-ink-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-[15px] leading-[24px] text-ink-700">
              Questions about this statement can go to{' '}
              <span className="font-semibold text-ink">akhtarabdulmannan@gmail.com</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
