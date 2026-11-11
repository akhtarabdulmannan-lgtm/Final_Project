import { useState } from 'react';
import { Download, ArrowLeftRight } from 'lucide-react';
import { currencies } from '@/data/currencies';
import { formatRate } from '@/lib/rates';
import { useRateHistory } from '@/lib/fx/useHistory';
import RateErrorNotice from '@/components/feedback/RateErrorNotice';
import { useLiveRates } from '@/lib/fx/RateProvider';
import { wait } from '@/lib/utils';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import ActionButton from '@/components/ui/ActionButton';
import { ChartSkeleton } from '@/components/ui/Skeleton';

export default function HistoricalRatesPage() {
  const fx = useLiveRates();
  const [fromCode, setFromCode] = useState('USD');
  const [toCode, setToCode] = useState('EUR');
  const [selectedDays, setSelectedDays] = useState(90);
  const [swapCount, setSwapCount] = useState(0);

  const history = useRateHistory(fromCode, toCode, selectedDays);
  const chartData = history.points;

  const currentRate = fx.rate(fromCode, toCode);

  // Derived from the request, never a parallel flag: a cached response resolves
  // without painting a loading state, which stranded the old flag and froze
  // the chart on its skeleton forever.
  const isLoading = history.status === 'loading';

  const updateWithSkeleton = (fn: () => void) => {
    fn();
  };

  const handleInvert = () => {
    setSwapCount((c) => c + 1);
    updateWithSkeleton(() => {
      setFromCode(toCode);
      setToCode(fromCode);
    });
  };

  const handleDownloadCsv = async () => {
    // Excel is the usual destination for these files, and it renders an ISO
    // date like 2026-11-10 as "########" unless the cell is quoted or written
    // in a locale-explicit form. Quoting every date plus a UTF-8 BOM keeps the
    // dates readable in Excel, Sheets and LibreOffice alike.
    const rows = chartData.map(
      (item) =>
        `"${item.date}",${formatRate(item.rate)},"${formatRate(100 * item.rate)}","${formatRate(1 / item.rate)}"`,
    );
    const csv = [
      `"Date","1 ${fromCode} in ${toCode}","100 ${fromCode} in ${toCode}","1 ${toCode} in ${fromCode}"`,
      ...rows,
    ].join('\r\n');

    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vectisx-${fromCode}-${toCode}-${selectedDays}d.csv`;
    link.click();
    URL.revokeObjectURL(url);
    await wait(250);
  };

  return (
    <div className="min-h-screen bg-bg py-10 sm:py-16">
      <div className="container-vx">
        <div className="mb-8 space-y-2">
          <span className="badge-neutral">Archive Intelligence</span>
          <h1>Historical Currency Exchange Rates</h1>
          <p className="text-ink-500">
            Access reliable historical FX closing prices, monthly averages, and volatility data dating back to 1998.
          </p>
        </div>

        {/* Controls */}
        <div className="card p-6 bg-surface mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label htmlFor="hist-from" className="block mb-1.5">
                From Currency
              </label>
              <select
                id="hist-from"
                value={fromCode}
                onChange={(e) => updateWithSkeleton(() => setFromCode(e.target.value))}
                className="select-field text-[14px] font-medium"
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} - {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="hist-to" className="block mb-1.5">
                To Currency
              </label>
              <select
                id="hist-to"
                value={toCode}
                onChange={(e) => updateWithSkeleton(() => setToCode(e.target.value))}
                className="select-field text-[14px] font-medium"
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} - {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="hist-horizon" className="block mb-1.5">
                Time Horizon
              </label>
              <select
                id="hist-horizon"
                value={selectedDays}
                onChange={(e) => updateWithSkeleton(() => setSelectedDays(Number(e.target.value)))}
                className="select-field text-[14px] font-medium"
              >
                <option value={30}>Last 30 Days</option>
                <option value={90}>Last 90 Days</option>
                <option value={180}>Last 6 Months</option>
                <option value={365}>Last 1 Year</option>
                <option value={1825}>Last 5 Years</option>
                <option value={3650}>Last 10 Years</option>
              </select>
            </div>

            <button
              type="button"
              onClick={handleInvert}
              className="btn-secondary w-full justify-center"
            >
              <ArrowLeftRight
                aria-hidden="true"
                className="w-4 h-4 transition-transform duration-200 ease-fintech"
                style={{ transform: `rotate(${swapCount * 180}deg)` }}
              />
              <span>Invert Currency Pair</span>
            </button>
          </div>
        </div>

        {/* Chart View */}
        <div className="mb-8">
          {isLoading ? (
            <ChartSkeleton />
          ) : history.status === 'error' ? (
            <RateErrorNotice error={history.error} onRetry={history.reload} />
          ) : (
            <div className="card p-6 bg-surface">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-line gap-4">
                <div>
                  <span className="text-caption text-ink-500 font-medium uppercase">
                    Historical Closing Rate
                  </span>
                  <div className="text-[24px] leading-[32px] font-heading font-semibold text-ink mt-1 tabular-nums">
                    1 {fromCode} = {formatRate(currentRate)} {toCode}
                  </div>
                </div>
                <ActionButton
                  variant="secondary"
                  onAction={handleDownloadCsv}
                  successLabel="Downloaded CSV"
                  className="btn-sm self-start sm:self-auto"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Download className="w-4 h-4" aria-hidden="true" />
                    <span>Download Historical CSV</span>
                  </span>
                </ActionButton>
              </div>

              <div className="h-80 w-full pt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E1E5EC" />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: '#4B5565', fontSize: 12, fontFamily: 'var(--font-inter)' }}
                      tickFormatter={(d) => d.slice(5)}
                    />
                    <YAxis
                      domain={['auto', 'auto']}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: '#4B5565', fontSize: 12, fontFamily: 'var(--font-inter)' }}
                      tickFormatter={(v) => formatRate(v)}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#111418',
                        borderRadius: '12px',
                        border: '1px solid #282E38',
                        color: '#FFFFFF',
                        fontSize: '13px',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                      formatter={(v: number) => [`${formatRate(v)} ${toCode}`, 'Rate']}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Line type="monotone" dataKey="rate" stroke="#111418" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>

        {/* Historical Table */}
        <div className="card p-6 bg-surface">
          <h3 className="mb-1">Daily Closing Rates Ledger</h3>
          <p className="text-caption text-ink-500 mb-4">
            Showing the 15 most recent of {chartData.length} published rates.
            The ECB publishes on business days only, so a 90-day window contains roughly 65
            rates — weekends and holidays are absent rather than filled in.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-subtle text-caption font-medium text-ink-500 uppercase border-b border-line">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Daily Rate</th>
                  <th className="py-3 px-4">100 {fromCode} in {toCode}</th>
                  <th className="py-3 px-4">Inverse Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line tabular-nums">
                {chartData.slice(-15).reverse().map((item) => (
                  <tr key={item.date} className="hover:bg-surface-subtle/60">
                    <td className="py-3 px-4 font-medium text-ink">{item.date}</td>
                    <td className="py-3 px-4 font-semibold text-ink">{formatRate(item.rate)}</td>
                    <td className="py-3 px-4 text-ink-700">
                      {formatRate(100 * item.rate)} {toCode}
                    </td>
                    <td className="py-3 px-4 text-ink-500">
                      {formatRate(1 / item.rate)} {fromCode}
                    </td>
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
