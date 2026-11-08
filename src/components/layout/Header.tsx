'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, ArrowRight, Globe, User, Zap } from 'lucide-react';
import { personalNav, businessNav } from '@/data/navigation';
import { useStickyHeader } from '@/hooks';
import { NavItem, UserMode } from '@/types';

export default function Header() {
  const [mode, setMode] = useState<UserMode>('personal');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const isSticky = useStickyHeader();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const nav = mode === 'personal' ? personalNav : businessNav;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSticky ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-surface-200' : 'bg-white'
      }`}>
        {/* Top bar - mode toggle */}
        <div className="border-b border-surface-100">
          <div className="container-vx flex items-center justify-between py-1.5">
            <div className="flex items-center gap-1 rounded-full bg-surface-100 p-0.5">
              <button
                onClick={() => setMode('personal')}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 ${
                  mode === 'personal'
                    ? 'bg-white text-brand-500 shadow-sm'
                    : 'text-surface-500 hover:text-surface-700'
                }`}
              >
                Personal
              </button>
              <button
                onClick={() => setMode('business')}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 ${
                  mode === 'business'
                    ? 'bg-white text-brand-500 shadow-sm'
                    : 'text-surface-500 hover:text-surface-700'
                }`}
              >
                Business
              </button>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-xs text-surface-500">
              <Link href="/help" className="hover:text-brand-500 transition-colors">Help</Link>
              <Link href="/blog" className="hover:text-brand-500 transition-colors">Blog</Link>
              <span className="text-surface-300">|</span>
              <Link href="/contact" className="hover:text-brand-500 transition-colors flex items-center gap-1">
                <Globe className="w-3 h-3" /> EN
              </Link>
            </div>
          </div>
        </div>

        {/* Main nav */}
        <div className="container-vx">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:shadow-brand-500/40 transition-shadow">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-heading font-extrabold text-brand-900">
                Vectis<span className="text-brand-500">X</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
              {nav.map((item) => (
                <div key={item.label} className="relative">
                  {item.children ? (
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeDropdown === item.label
                          ? 'text-brand-500 bg-brand-50'
                          : 'text-surface-700 hover:text-brand-500 hover:bg-surface-50'
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        activeDropdown === item.label ? 'rotate-180' : ''
                      }`} />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="px-3 py-2 text-sm font-medium text-surface-700 hover:text-brand-500 hover:bg-surface-50 rounded-lg transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Dropdown */}
                  {item.children && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 w-72 rounded-2xl bg-white border border-surface-200 shadow-xl shadow-surface-900/10 p-2 animate-scale-in origin-top-left">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-surface-50 transition-colors group"
                        >
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-surface-900 group-hover:text-brand-500 transition-colors">
                              {child.label}
                            </div>
                            {child.description && (
                              <div className="text-xs text-surface-500 mt-0.5">{child.description}</div>
                            )}
                          </div>
                          <ArrowRight className="w-4 h-4 text-surface-300 group-hover:text-brand-500 mt-0.5 transition-colors" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <Link href="/login" className="hidden sm:flex btn-ghost text-sm">
                <User className="w-4 h-4" /> Log in
              </Link>
              <Link href="/register" className="hidden sm:flex btn-primary btn-sm">
                Register
              </Link>
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-surface-100 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6 text-surface-700" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl animate-slide-in-right overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-surface-100">
              <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-heading font-extrabold text-brand-900">
                  Vectis<span className="text-brand-500">X</span>
                </span>
              </Link>
              <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg hover:bg-surface-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mode toggle mobile */}
            <div className="p-4 border-b border-surface-100">
              <div className="flex rounded-full bg-surface-100 p-1">
                <button
                  onClick={() => setMode('personal')}
                  className={`flex-1 rounded-full py-2 text-sm font-medium transition-all ${
                    mode === 'personal' ? 'bg-white text-brand-500 shadow-sm' : 'text-surface-500'
                  }`}
                >
                  Personal
                </button>
                <button
                  onClick={() => setMode('business')}
                  className={`flex-1 rounded-full py-2 text-sm font-medium transition-all ${
                    mode === 'business' ? 'bg-white text-brand-500 shadow-sm' : 'text-surface-500'
                  }`}
                >
                  Business
                </button>
              </div>
            </div>

            {/* Mobile nav links */}
            <nav className="p-4 space-y-1">
              {nav.map((item, i) => (
                <MobileNavItem key={item.label} item={item} index={i} onClose={() => setMobileOpen(false)} />
              ))}
            </nav>

            {/* Mobile CTA */}
            <div className="p-4 border-t border-surface-100 space-y-2">
              <Link href="/register" className="btn-primary w-full justify-center" onClick={() => setMobileOpen(false)}>
                Register Free
              </Link>
              <Link href="/login" className="btn-secondary w-full justify-center" onClick={() => setMobileOpen(false)}>
                Log in
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Spacer */}
      <div className="h-[106px]" />
    </>
  );
}

function MobileNavItem({ item, index, onClose }: { item: NavItem; index: number; onClose: () => void }) {
  const [open, setOpen] = useState(false);

  if (!item.children) {
    return (
      <Link
        href={item.href}
        onClick={onClose}
        className="block px-4 py-3 text-base font-medium text-surface-800 hover:text-brand-500 hover:bg-surface-50 rounded-xl transition-colors"
        style={{ animationDelay: `${index * 50}ms` }}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-4 py-3 text-base font-medium text-surface-800 hover:text-brand-500 hover:bg-surface-50 rounded-xl transition-colors"
      >
        {item.label}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="ml-4 space-y-1 pb-2">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={onClose}
              className="block px-4 py-2 text-sm text-surface-600 hover:text-brand-500 rounded-lg transition-colors"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
