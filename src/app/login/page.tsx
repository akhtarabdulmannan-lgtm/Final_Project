'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Zap, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-surface-50 py-12 sm:py-20 flex items-center justify-center">
      <div className="container-vx max-w-md w-full">
        <div className="card p-8 bg-white shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center mx-auto text-white">
              <Zap className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold font-heading text-surface-900">Welcome Back</h1>
            <p className="text-xs text-surface-500">Sign in to your VectisX multi-currency account.</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); alert('Demo environment: signed in successfully!'); }} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-surface-600 block mb-1">Email Address</label>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="you@domain.com" 
                className="input-field text-sm" 
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-surface-600">Password</label>
                <a href="#" className="text-xs text-brand-500 hover:underline">Forgot?</a>
              </div>
              <input 
                type="password" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••••••" 
                className="input-field text-sm" 
              />
            </div>
            <button type="submit" className="btn-primary w-full justify-center btn-lg">
              Sign In
            </button>
          </form>

          <div className="text-center text-xs text-surface-500 pt-2 border-t border-surface-100">
            Don't have an account yet?{' '}
            <Link href="/register" className="font-bold text-brand-500 hover:underline">
              Register free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
