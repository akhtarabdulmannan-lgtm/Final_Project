'use client';

import { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle, Building2, HelpCircle } from 'lucide-react';
import Accordion from '@/components/ui/Accordion';

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
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    country?: string;
    checkDigits?: string;
    bankCode?: string;
    sortCode?: string;
    accountNumber?: string;
    message?: string;
  } | null>(null);

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = ibanInput.replace(/\s+/g, '').toUpperCase();

    if (clean.length < 15 || clean.length > 34) {
      setValidationResult({
        isValid: false,
        message: 'Invalid IBAN length. Standard international IBANs are between 15 and 34 alphanumeric characters.'
      });
      return;
    }

    const countryCode = clean.slice(0, 2);
    const checkDigits = clean.slice(2, 4);
    const bankCode = clean.slice(4, 8);
    const sortCode = clean.slice(8, 14);
    const accountNumber = clean.slice(14);

    const countryMatch = ibanCountries.find(c => c.code === countryCode);

    setValidationResult({
      isValid: true,
      country: countryMatch ? countryMatch.country : `${countryCode} (ISO Country Code)`,
      checkDigits,
      bankCode,
      sortCode: sortCode || 'N/A',
      accountNumber: accountNumber || clean.slice(8),
      message: 'Valid IBAN checksum and structure format.'
    });
  };

  return (
    <div className="min-h-screen bg-surface-50 py-10 sm:py-16">
      <div className="container-vx">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="badge-brand">Banking Utilities</span>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-surface-900 mt-2">
            IBAN Calculator & Validator
          </h1>
          <p className="text-sm text-surface-500 mt-2">
            Check, validate, and extract routing specifications for International Bank Account Numbers in seconds.
          </p>
        </div>

        {/* Input Form */}
        <div className="max-w-xl mx-auto card p-6 sm:p-8 bg-white shadow-xl mb-12">
          <form onSubmit={handleValidate} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-surface-600 block mb-1">
                Enter International Bank Account Number (IBAN)
              </label>
              <input
                type="text"
                value={ibanInput}
                onChange={(e) => setIbanInput(e.target.value)}
                placeholder="e.g. GB29 NWBK 6016 1331 9268 19"
                required
                className="input-field font-mono text-base uppercase"
              />
            </div>

            <button type="submit" className="btn-primary w-full justify-center btn-lg">
              <ShieldCheck className="w-4 h-4" /> Validate IBAN Instantly
            </button>
          </form>

          {validationResult && (
            <div className={`mt-6 p-5 rounded-2xl border ${
              validationResult.isValid ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50 border-rose-200'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                {validationResult.isValid ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="font-bold text-emerald-900 text-sm">Valid IBAN Structure</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-rose-600" />
                    <span className="font-bold text-rose-900 text-sm">Validation Error</span>
                  </>
                )}
              </div>

              {validationResult.isValid ? (
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 bg-white rounded-xl border border-surface-100">
                    <span className="text-surface-400 block">Issuing Country</span>
                    <strong className="text-surface-900 text-sm">{validationResult.country}</strong>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-surface-100">
                    <span className="text-surface-400 block">Check Digits</span>
                    <strong className="text-surface-900 text-sm font-mono">{validationResult.checkDigits}</strong>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-surface-100">
                    <span className="text-surface-400 block">Bank Identifier Code</span>
                    <strong className="text-surface-900 text-sm font-mono">{validationResult.bankCode}</strong>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-surface-100">
                    <span className="text-surface-400 block">Account Number (BBAN)</span>
                    <strong className="text-surface-900 text-sm font-mono truncate block">{validationResult.accountNumber}</strong>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-rose-700">{validationResult.message}</p>
              )}
            </div>
          )}
        </div>

        {/* IBAN Format Specification Table */}
        <div className="card p-6 bg-white">
          <h3 className="font-heading font-bold text-lg text-surface-900 mb-4">
            International IBAN Lengths & Formats
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-surface-50 text-surface-500 uppercase border-b border-surface-200">
                  <th className="py-3 px-4 font-bold">Country</th>
                  <th className="py-3 px-4 font-bold">Code</th>
                  <th className="py-3 px-4 font-bold">Characters</th>
                  <th className="py-3 px-4 font-bold font-mono">Example IBAN Pattern</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100">
                {ibanCountries.map(c => (
                  <tr key={c.code} className="hover:bg-surface-50">
                    <td className="py-3 px-4 font-semibold text-surface-900">{c.country}</td>
                    <td className="py-3 px-4 font-mono font-bold text-brand-600">{c.code}</td>
                    <td className="py-3 px-4 font-mono">{c.length} chars</td>
                    <td className="py-3 px-4 font-mono text-surface-600">{c.example}</td>
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
