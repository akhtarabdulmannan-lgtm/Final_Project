'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ChevronDown, ArrowRight, Globe, User, LogOut, Bell } from 'lucide-react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { personalNav, businessNav } from '@/data/navigation';
import { useStickyHeader } from '@/hooks';
import { useLiveRates } from '@/hooks/useLiveRates';
import { NavItem, UserMode } from '@/types';
import { getSupabaseClient } from '@/lib/supabase';
import BrandLogo from '@/components/ui/BrandLogo';
import { LiveTimestamp } from '@/components/ui/MotionPrimitives';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [mode, setMode] = useState<UserMode>('personal');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [authUser, setAuthUser] = useState<SupabaseUser | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const isSticky = useStickyHeader(20);
  const { lastUpdated } = useLiveRates('USD');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const nav = mode === 'personal' ? personalNav : businessNav;

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    supabase.auth.getUser().then(({ data }) => {
      setAuthUser(data.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleSignOut = async () => {
    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUserMenuOpen(false);
    setMobileOpen(false);
    router.refresh();
  };

  const displayName =
    (authUser?.user_metadata?.full_name as string | undefined) ||
    (authUser?.user_metadata?.company_name as string | undefined) ||
    authUser?.email?.split('@')[0] ||
    'Account';

  const isNavItemActive = (item: NavItem) => {
    if (!pathname) return false;
    if (pathname === item.href || pathname.startsWith(`${item.href}/`)) return true;
    if (item.children?.some((c) => pathname === c.href || pathname.startsWith(`${c.href}/`))) return true;
    return false;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-surface-200 transition-transform duration-200 ease-fintech ${
          isSticky ? '-translate-y-11' : 'translate-y-0'
        }`}
      >
        {/* Top utility row — 44px height; slides up & hides over 200ms on scroll */}
        <div
          className={`h-11 border-b border-surface-200 bg-page transition-opacity duration-200 ease-fintech ${
            isSticky ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="container-vx h-full flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className="flex items-center gap-0.5 rounded-full bg-white border border-surface-200 p-0.5"
                role="tablist"
                aria-label="Account mode"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'personal'}
                  onClick={() => setMode('personal')}
                  className={`min-h-[34px] rounded-full px-3 py-1 type-caption font-semibold transition-colors duration-150 ease-fintech ${
                    mode === 'personal'
                      ? 'bg-primary-pale text-primary border border-primary-border'
                      : 'text-caption hover:text-navy border border-transparent'
                  }`}
                >
                  Personal
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'business'}
                  onClick={() => setMode('business')}
                  className={`min-h-[34px] rounded-full px-3 py-1 type-caption font-semibold transition-colors duration-150 ease-fintech ${
                    mode === 'business'
                      ? 'bg-primary-pale text-primary border border-primary-border'
                      : 'text-caption hover:text-navy border border-transparent'
                  }`}
                >
                  Business
                </button>
              </div>

              <div className="hidden md:flex items-center">
                <LiveTimestamp timestamp={lastUpdated ?? undefined} />
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1 type-caption text-caption">
              <Link
                href="/help"
                className="inline-flex items-center min-h-[44px] px-2.5 hover:text-primary transition-colors duration-150 ease-fintech"
              >
                Help
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center min-h-[44px] px-2.5 hover:text-primary transition-colors duration-150 ease-fintech"
              >
                Blog
              </Link>
              <span className="text-surface-300" aria-hidden="true">
                |
              </span>
              <Link
                href="/contact"
                aria-label="Language and regional offices (English)"
                className="inline-flex items-center gap-1 min-h-[44px] px-2.5 hover:text-primary transition-colors duration-150 ease-fintech"
              >
                <Globe className="w-3.5 h-3.5" aria-hidden="true" /> EN
              </Link>
            </div>
          </div>
        </div>

        {/* Main navigation row */}
        <div className="container-vx">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="inline-flex items-center min-h-[44px] shrink-0 transition-opacity duration-150 ease-fintech hover:opacity-90 rounded-lg"
              aria-label="VectisX Home"
            >
              <BrandLogo variant="light" size="md" />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef} aria-label="Primary">
              {nav.map((item) => {
                const isActive = isNavItemActive(item) || activeDropdown === item.label;
                return (
                  <div key={item.label} className="relative">
                    {item.children ? (
                      <button
                        type="button"
                        aria-expanded={activeDropdown === item.label}
                        onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                        className={`inline-flex items-center gap-1 min-h-[44px] px-3.5 py-2 text-sm font-medium rounded-xl border transition-colors duration-150 ease-fintech ${
                          isActive
                            ? 'text-primary bg-primary-pale border-primary-border font-semibold'
                            : 'text-body border-transparent hover:text-primary hover:bg-page'
                        }`}
                      >
                        {item.label}
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-150 ease-fintech ${
                            activeDropdown === item.label ? 'rotate-180' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={`inline-flex items-center min-h-[44px] px-3.5 py-2 text-sm font-medium rounded-xl border transition-colors duration-150 ease-fintech ${
                          isActive
                            ? 'text-primary bg-primary-pale border-primary-border font-semibold'
                            : 'text-body border-transparent hover:text-primary hover:bg-page'
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}

                    {/* Dropdown */}
                    {item.children && activeDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-1.5 w-72 rounded-2xl bg-white border border-surface-200 p-2 z-50">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-start gap-3 min-h-[44px] p-3 rounded-xl hover:bg-primary-pale transition-colors duration-150 ease-fintech group"
                          >
                            <div className="flex-1">
                              <div className="text-sm font-semibold text-navy group-hover:text-primary transition-colors duration-150 ease-fintech">
                                {child.label}
                              </div>
                              {child.description && (
                                <div className="type-caption text-caption mt-0.5">{child.description}</div>
                              )}
                            </div>
                            <ArrowRight
                              className="w-4 h-4 text-caption group-hover:text-primary mt-0.5 transition-colors duration-150 ease-fintech"
                              aria-hidden="true"
                            />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {authUser ? (
                <div className="relative hidden sm:block" ref={userMenuRef}>
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen((v) => !v)}
                    className="inline-flex items-center gap-2 min-h-[44px] rounded-xl border border-surface-300 bg-white px-3.5 py-2 type-caption font-semibold text-navy hover:border-primary transition-colors duration-150 ease-fintech"
                  >
                    <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-[11px] font-semibold uppercase">
                      {displayName.slice(0, 1)}
                    </span>
                    <span className="max-w-[140px] truncate">{displayName}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-caption" aria-hidden="true" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-white border border-surface-200 p-2 z-50">
                      <div className="px-3 py-2 border-b border-surface-200">
                        <div className="type-caption font-semibold text-navy truncate">{displayName}</div>
                        <div className="text-[12px] text-caption truncate">{authUser.email}</div>
                      </div>
                      <Link
                        href="/alerts"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 min-h-[44px] px-3 py-2 type-caption font-medium text-body hover:bg-primary-pale hover:text-primary rounded-xl mt-1"
                      >
                        <Bell className="w-3.5 h-3.5" aria-hidden="true" /> My Rate Alerts
                      </Link>
                      <Link
                        href="/rates"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 min-h-[44px] px-3 py-2 type-caption font-medium text-body hover:bg-primary-pale hover:text-primary rounded-xl"
                      >
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" /> Live Rate Tables
                      </Link>
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 min-h-[44px] px-3 py-2 type-caption font-medium text-loss-text hover:bg-loss-bg rounded-xl mt-1"
                      >
                        <LogOut className="w-3.5 h-3.5" aria-hidden="true" /> Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link href="/login" className="hidden sm:inline-flex btn-secondary btn-sm">
                    <User className="w-4 h-4" aria-hidden="true" /> Log in
                  </Link>
                  <Link href="/register" className="hidden sm:inline-flex btn-primary btn-sm">
                    Register
                  </Link>
                </>
              )}
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="lg:hidden inline-flex items-center justify-center min-h-[44px] min-w-[44px] p-2.5 rounded-xl border border-transparent hover:bg-page hover:border-surface-200 transition-colors duration-150 ease-fintech"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6 text-navy" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-navy/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white border-l border-surface-200 overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-surface-200">
              <Link
                href="/"
                className="inline-flex items-center min-h-[44px] shrink-0"
                onClick={() => setMobileOpen(false)}
                aria-label="VectisX Home"
              >
                <BrandLogo variant="light" size="sm" />
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] p-2.5 rounded-xl text-navy hover:bg-page"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Mode toggle mobile */}
            <div className="p-4 border-b border-surface-200 bg-page space-y-3">
              <div className="flex rounded-full bg-white border border-surface-200 p-1">
                <button
                  type="button"
                  onClick={() => setMode('personal')}
                  className={`flex-1 min-h-[44px] rounded-full py-2 text-sm font-semibold transition-colors duration-150 ease-fintech ${
                    mode === 'personal'
                      ? 'bg-primary-pale text-primary border border-primary-border'
                      : 'text-caption border border-transparent'
                  }`}
                >
                  Personal
                </button>
                <button
                  type="button"
                  onClick={() => setMode('business')}
                  className={`flex-1 min-h-[44px] rounded-full py-2 text-sm font-semibold transition-colors duration-150 ease-fintech ${
                    mode === 'business'
                      ? 'bg-primary-pale text-primary border border-primary-border'
                      : 'text-caption border border-transparent'
                  }`}
                >
                  Business
                </button>
              </div>
              <LiveTimestamp timestamp={lastUpdated ?? undefined} />
            </div>

            {/* Mobile nav links */}
            <nav className="p-4 space-y-1" aria-label="Mobile navigation">
              {nav.map((item) => (
                <MobileNavItem
                  key={item.label}
                  item={item}
                  isActive={isNavItemActive(item)}
                  onClose={() => setMobileOpen(false)}
                />
              ))}
            </nav>

            {/* Mobile CTA */}
            <div className="p-4 border-t border-surface-200 space-y-2">
              {authUser ? (
                <>
                  <div className="px-3 py-2.5 rounded-xl bg-page border border-surface-200 type-caption">
                    <div className="font-semibold text-navy truncate">{displayName}</div>
                    <div className="text-caption truncate">{authUser.email}</div>
                  </div>
                  <button type="button" onClick={handleSignOut} className="btn-secondary w-full justify-center">
                    <LogOut className="w-4 h-4" aria-hidden="true" /> Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/register" className="btn-primary w-full justify-center" onClick={() => setMobileOpen(false)}>
                    Register Free
                  </Link>
                  <Link href="/login" className="btn-secondary w-full justify-center" onClick={() => setMobileOpen(false)}>
                    Log in
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Spacer matching 44px utility row + 64px main nav = 108px */}
      <div className="h-[108px]" />
    </>
  );
}

function MobileNavItem({
  item,
  isActive,
  onClose,
}: {
  item: NavItem;
  isActive: boolean;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);

  if (!item.children) {
    return (
      <Link
        href={item.href}
        onClick={onClose}
        className={`flex items-center min-h-[44px] px-4 py-3 text-base font-medium rounded-xl border transition-colors duration-150 ease-fintech ${
          isActive
            ? 'text-primary bg-primary-pale border-primary-border font-semibold'
            : 'text-navy border-transparent hover:text-primary hover:bg-page'
        }`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-between w-full min-h-[44px] px-4 py-3 text-base font-medium rounded-xl border transition-colors duration-150 ease-fintech ${
          isActive
            ? 'text-primary bg-primary-pale border-primary-border font-semibold'
            : 'text-navy border-transparent hover:text-primary hover:bg-page'
        }`}
      >
        {item.label}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-150 ease-fintech ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div className="ml-4 space-y-1 pt-1 pb-2">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={onClose}
              className="flex items-center min-h-[44px] px-4 py-2 text-sm text-body hover:text-primary hover:bg-primary-pale rounded-xl transition-colors duration-150 ease-fintech"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
