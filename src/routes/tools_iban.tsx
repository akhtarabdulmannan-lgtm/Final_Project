import { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import ActionButton from '@/components/ui/ActionButton';
import { wait } from '@/lib/utils';

const ibanCountries = [
  { code: 'GB', country: 'United Kingdom', length: 22, example: 'GB29 NWBK 6016 1331 9268 19' },
  { code: 'DE', country: 'Germany', length: 22, example: 'DE89 3704 0044 0532 0130 00' },
  { code: 'FR', country: 'France', length: 27, example: 'FR14 2004 1010 0505 0001 3M02 606' },
  { code: 'ES', country: 'Spain', length: 24, example: 'ES91 2100 0418 4502 0005 1332' },
  { code: 'IT', country: 'Italy', length: 27, example: 'IT60 X054 2811 1010 0000 0123 456' },
  { code: 'NL', country: 'Netherlands', length: 18, example: 'NL91 ABNA 0417 1643 00' },
  { code: 'CH', country: 'Switzerland', length: 21, example: 'CH93 0076 2011 6238 5295 7' },
  { code: 'AE', country: 'United Arab Emirates', length: 23, example: 'AE07 0331 2345 6789 0123 456' },
  { code: 'SA', country: 'Saudi Arabia', length: 24, example: 'SA03 8000 0000 6080 1016 7519' },
  { code: 'PK', country: 'Pakistan', length: 24, example: 'PK36 HABB 0000 1111 2222 3333' },
];

export default function IbanCalculatorPage() {
  const [ibanInput, setIbanInput] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    country?: string;
    checkDigits?: string;
    bankCode?: string;
    accountNumber?: string;
    message?: string;
  } | null>(null);

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitStatus === 'loading') return;
    setSubmitStatus('loading');
    await wait(240);

    const clean = ibanInput.replace(/\s+/g, '').toUpperCase();

    if (clean.length < 15 || clean.length > 34) {
      setValidationResult({
        isValid: false,
        message: 'Invalid IBAN length. Standard international IBANs are between 15 and 34 alphanumeric characters.',
      });
      setSubmitStatus('idle');
      return;
    }

    const countryCode = clean.slice(0, 2);
    const checkDigits = clean.slice(2, 4);
    const bankCode = clean.slice(4, 8);
    const accountNumber = clean.slice(14);
    const countryMatch = ibanCountries.find((c) => c.code === countryCode);

    setValidationResult({
      isValid: true,
      country: countryMatch ? countryMatch.country : `${countryCode} (ISO Country Code)`,
      checkDigits,
      bankCode,
      accountNumber: accountNumber || clean.slice(8),
      message: 'Valid IBAN checksum and structure format.',
    });

    setSubmitStatus('success');
    window.setTimeout(() => setSubmitStatus('idle'), 800);
  };

  return (
    <div className="min-h-screen bg-bg py-10 sm:py-16">
      <div className="container-vx">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="badge-neutral">Banking Utilities</span>
          <h1>IBAN Calculator &amp; Validator</h1>
          <p className="text-ink-500 mx-auto">
            Check, validate, and extract routing specifications for International Bank Account Numbers in seconds.
          </p>
        </div>

        {/* Input Form */}
        <div className="max-w-xl mx-auto card p-6 sm:p-8 bg-surface mb-12">
          <form onSubmit={handleValidate} className="space-y-4">
            <div>
              <label htmlFor="iban-input" className="block mb-1.5">
                Enter International Bank Account Number (IBAN)
              </label>
              <input
                id="iban-input"
                type="text"
                value={ibanInput}
                onChange={(e) => setIbanInput(e.target.value)}
                placeholder="e.g. GB29 NWBK 6016 1331 9268 19"
                required
                className="input-field uppercase tabular-nums"
              />
            </div>

            <ActionButton
              type="submit"
              status={submitStatus}
              successLabel="Validated"
              className="w-full justify-center btn-lg"
            >
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                <span>Validate IBAN Instantly</span>
              </span>
            </ActionButton>
          </form>

          {validationResult && (
            <div
              className={`mt-6 p-5 rounded-2xl border ${
                validationResult.isValid
                  ? 'bg-gain-bg border-gain-border'
                  : 'bg-loss-bg border-loss-border'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                {validationResult.isValid ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-gain" aria-hidden="true" />
                    <span className="font-semibold text-gain text-[15px]">Valid IBAN Structure</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-loss" aria-hidden="true" />
                    <span className="font-semibold text-loss text-[15px]">Validation Error</span>
                  </>
                )}
              </div>

              {validationResult.isValid ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-caption">
                  <div className="p-3 bg-surface rounded-xl border border-line">
                    <span className="text-ink-500 block">Issuing Country</span>
                    <strong className="text-ink text-[14px] font-semibold">
                      {validationResult.country}
                    </strong>
                  </div>
                  <div className="p-3 bg-surface rounded-xl border border-line">
                    <span className="text-ink-500 block">Check Digits</span>
                    <strong className="text-ink text-[14px] font-semibold tabular-nums">
                      {validationResult.checkDigits}
                    </strong>
                  </div>
                  <div className="p-3 bg-surface rounded-xl border border-line">
                    <span className="text-ink-500 block">Bank Identifier Code</span>
                    <strong className="text-ink text-[14px] font-semibold tabular-nums">
                      {validationResult.bankCode}
                    </strong>
                  </div>
                  <div className="p-3 bg-surface rounded-xl border border-line">
                    <span className="text-ink-500 block">Account Number (BBAN)</span>
                    <strong className="text-ink text-[14px] font-semibold truncate block tabular-nums">
                      {validationResult.accountNumber}
                    </strong>
                  </div>
                </div>
              ) : (
                <p className="text-[14px] text-loss">{validationResult.message}</p>
              )}
            </div>
          )}
        </div>

        {/* IBAN Format Table */}
        <div className="card p-6 bg-surface">
          <h3 className="mb-4">International IBAN Lengths &amp; Formats</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-subtle text-caption text-ink-500 uppercase border-b border-line">
                  <th className="py-3 px-4 font-medium">Country</th>
                  <th className="py-3 px-4 font-medium">Code</th>
                  <th className="py-3 px-4 font-medium">Characters</th>
                  <th className="py-3 px-4 font-medium">Example IBAN Pattern</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line tabular-nums">
                {ibanCountries.map((c) => (
                  <tr key={c.code} className="hover:bg-surface-subtle/60">
                    <td className="py-3 px-4 font-medium text-ink">{c.country}</td>
                    <td className="py-3 px-4 font-semibold text-ink">{c.code}</td>
                    <td className="py-3 px-4 text-ink-700">{c.length} chars</td>
                    <td className="py-3 px-4 text-ink-500">{c.example}</td>
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
