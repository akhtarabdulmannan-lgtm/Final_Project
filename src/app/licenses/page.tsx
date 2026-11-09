'use client';

import { RevealSection } from '@/components/ui/MotionPrimitives';

export default function LicensesPage() {
  const states = [
    {
      state: 'Federal (FinCEN)',
      agency: 'Financial Crimes Enforcement Network',
      id: 'MSB Registration #310001849204',
    },
    {
      state: 'California',
      agency: 'Department of Financial Protection and Innovation',
      id: 'License #2481',
    },
    {
      state: 'New York',
      agency: 'New York State Department of Financial Services',
      id: 'Money Transmitter License #MT-10492',
    },
    {
      state: 'Texas',
      agency: 'Texas Department of Banking',
      id: 'License #3204',
    },
    {
      state: 'Florida',
      agency: 'Office of Financial Regulation',
      id: 'License #FT-230001',
    },
    {
      state: 'Illinois',
      agency: 'Department of Financial and Professional Regulation',
      id: 'License #MT-0941',
    },
    {
      state: 'United Kingdom',
      agency: 'Financial Conduct Authority (FCA)',
      id: 'Authorized Payment Institution #900481',
    },
    {
      state: 'Canada',
      agency: 'Financial Transactions and Reports Analysis Centre (FINTRAC)',
      id: 'MSB #M20491823',
    },
  ];

  return (
    <div className="min-h-screen bg-page py-12 sm:py-20">
      <div className="container-vx">
        <div className="max-w-3xl mb-12">
          <span className="badge-brand">Regulatory Compliance</span>
          <h1 className="type-h1 text-navy mt-2">
            State &amp; International Regulatory Disclosures
          </h1>
          <p className="type-body text-body mt-3">
            VectisX Financial Inc. operates under strict regulatory supervision across federal, state, and international financial jurisdictions.
          </p>
        </div>

        <RevealSection className="card p-6 bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-page type-caption font-semibold text-caption uppercase border-b border-surface-200">
                  <th className="py-3.5 px-4">Jurisdiction</th>
                  <th className="py-3.5 px-4">Regulatory Authority</th>
                  <th className="py-3.5 px-4">Registration / License Number</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-200 tabular-nums">
                {states.map((s) => (
                  <tr
                    key={s.state}
                    className="hover:bg-page transition-colors duration-150 ease-fintech"
                  >
                    <td className="py-3.5 px-4 font-semibold text-navy">{s.state}</td>
                    <td className="py-3.5 px-4 text-body">{s.agency}</td>
                    <td className="py-3.5 px-4 font-semibold text-navy">{s.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </RevealSection>
      </div>
    </div>
  );
}
