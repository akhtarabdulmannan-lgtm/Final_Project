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
    <div className="min-h-screen bg-bg py-12 sm:py-16">
      <div className="container-vx">
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="badge-neutral">Regulatory Compliance</span>
          <h1>State &amp; International Money Transmitter Licenses</h1>
          <p className="text-ink-500">
            VectisX Financial Inc. operates under strict regulatory supervision and holds authorized money transmission licenses across federal, state, and international banking jurisdictions.
          </p>
        </div>

        <div className="card p-0 bg-surface overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-subtle text-caption text-ink-500 uppercase border-b border-line">
                  <th className="py-3.5 px-6 font-medium">Jurisdiction</th>
                  <th className="py-3.5 px-6 font-medium">Regulatory Authority</th>
                  <th className="py-3.5 px-6 font-medium">License Number</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line tabular-nums">
                {states.map((s) => (
                  <tr key={s.state} className="hover:bg-surface-subtle/60">
                    <td className="py-3.5 px-6 font-semibold text-ink">{s.state}</td>
                    <td className="py-3.5 px-6 text-ink-700">{s.agency}</td>
                    <td className="py-3.5 px-6 font-medium text-ink">{s.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
