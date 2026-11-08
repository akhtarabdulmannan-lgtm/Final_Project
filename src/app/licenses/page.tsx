'use client';

export default function LicensesPage() {
  const states = [
    { state: 'Federal (FinCEN)', agency: 'Financial Crimes Enforcement Network', id: 'MSB Registration #310001849204' },
    { state: 'California', agency: 'Department of Financial Protection and Innovation', id: 'License #2481' },
    { state: 'New York', agency: 'New York State Department of Financial Services', id: 'Money Transmitter License #MT-10492' },
    { state: 'Texas', agency: 'Texas Department of Banking', id: 'License #3204' },
    { state: 'Florida', agency: 'Office of Financial Regulation', id: 'License #FT-230001' },
    { state: 'Illinois', agency: 'Department of Financial and Professional Regulation', id: 'License #MT-0941' },
    { state: 'United Kingdom', agency: 'Financial Conduct Authority (FCA)', id: 'Authorized Payment Institution #900481' },
    { state: 'Canada', agency: 'Financial Transactions and Reports Analysis Centre (FINTRAC)', id: 'MSB #M20491823' },
  ];

  return (
    <div className="min-h-screen bg-surface-50 py-12 sm:py-20">
      <div className="container-vx">
        <div className="max-w-3xl mb-12">
          <span className="badge-brand">Regulatory Compliance</span>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-surface-900 mt-2">
            State & International Money Transmitter Licenses
          </h1>
          <p className="text-surface-600 text-base mt-3 leading-relaxed">
            VectisX Financial Inc. operates under strict regulatory supervision and holds authorized money transmission licenses across federal, state, and international banking jurisdictions.
          </p>
        </div>

        <div className="card p-6 bg-white overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-surface-50 text-surface-500 uppercase border-b border-surface-200">
                <th className="py-3 px-4 font-bold">Jurisdiction</th>
                <th className="py-3 px-4 font-bold">Regulatory Authority</th>
                <th className="py-3 px-4 font-bold font-mono">License Number</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {states.map((s, i) => (
                <tr key={i} className="hover:bg-surface-50">
                  <td className="py-3 px-4 font-bold text-surface-900">{s.state}</td>
                  <td className="py-3 px-4 text-surface-600">{s.agency}</td>
                  <td className="py-3 px-4 font-mono font-bold text-brand-600">{s.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
