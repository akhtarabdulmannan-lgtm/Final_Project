import { useState, useRef, useEffect } from 'react';
import Link from '@/router/Link';
import { Menu, X, ChevronDown, ArrowRight, Globe, User, Zap } from 'lucide-react';
import { personalNav, businessNav } from '@/data/navigation';
import { useStickyHeader } from '@/hooks';
import { NavItem, UserMode } from '@/types';

export default function Header() {
  const [mode, setMode] = useState<UserMode>('personal');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [topBarFocused, setTopBarFocused] = useState(false);
  const isSticky = useStickyHeader(24);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const nav = mode === 'personal' ? personalNav : businessNav;

  const hideTopUtilityRow = isSticky && !topBarFocused;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        {/* Inner shell translates up cleanly by 44px over 200ms on scroll so top utility row hides smoothly */}
        <div
          className={`pointer-events-auto bg-surface border-b border-line transition-transform duration-200 ease-fintech ${
            hideTopUtilityRow ? '-translate-y-11' : 'translate-y-0'
          }`}
        >
          {/* Top utility row (44px high, fades opacity over 200ms while sliding up) */}
          <div
            onFocus={() => setTopBarFocused(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setTopBarFocused(false);
              }
            }}
            aria-hidden={hideTopUtilityRow}
            className={`h-11 border-b border-line bg-surface-subtle transition-opacity duration-200 ease-fintech ${
              hideTopUtilityRow ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <div className="container-vx h-full flex items-center justify-between gap-2">
              <div
                role="group"
                aria-label="Account mode"
                className="flex items-center gap-1"
              >
                <button
                  type="button"
                  onClick={() => setMode('personal')}
                  aria-pressed={mode === 'personal'}
                  className={`rounded-lg px-3 min-h-[44px] text-[13px] leading-[18px] font-medium transition-colors duration-150 ease-fintech ${
                    mode === 'personal'
                      ? 'text-ink bg-surface border border-line'
                      : 'text-ink-500 hover:text-ink'
                  }`}
                >
                  Personal
                </button>
                <button
                  type="button"
                  onClick={() => setMode('business')}
                  aria-pressed={mode === 'business'}
                  className={`rounded-lg px-3 min-h-[44px] text-[13px] leading-[18px] font-medium transition-colors duration-150 ease-fintech ${
                    mode === 'business'
                      ? 'text-ink bg-surface border border-line'
                      : 'text-ink-500 hover:text-ink'
                  }`}
                >
                  Business
                </button>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-[13px] leading-[18px] text-ink-500">
                <Link
                  href="/help"
                  tabIndex={hideTopUtilityRow ? -1 : 0}
                  className="px-3 min-h-[44px] inline-flex items-center hover:text-ink transition-colors duration-150"
                >
                  Help
                </Link>
                <Link
                  href="/blog"
                  tabIndex={hideTopUtilityRow ? -1 : 0}
                  className="px-3 min-h-[44px] inline-flex items-center hover:text-ink transition-colors duration-150"
                >
                  Blog
                </Link>
                <span className="text-line-strong" aria-hidden="true">|</span>
                <Link
                  href="/contact"
                  tabIndex={hideTopUtilityRow ? -1 : 0}
                  aria-label="Language and regional support"
                  className="px-3 min-h-[44px] inline-flex items-center gap-1.5 hover:text-ink transition-colors duration-150"
                >
                  <Globe className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>EN</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Main nav (64px height) */}
          <div className="container-vx">
            <div className="flex items-center justify-between h-16">
              {/* Brand Wordmark */}
              <Link
                href="/"
                aria-label="VectisX Home"
                className="flex items-center gap-2.5 min-h-[44px] pr-2 group"
              >
                <div className="w-9 h-9 rounded-xl bg-primary text-primary-fg flex items-center justify-center">
                  <Zap className="w-4 h-4" aria-hidden="true" />
                </div>
                <span className="text-[20px] leading-[24px] font-heading font-semibold tracking-tight text-ink">
                  VectisX
                </span>
              </Link>

              {/* Desktop nav */}
              <nav aria-label="Primary" className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
                {nav.map((item) => (
                  <div key={item.label} className="relative">
                    {item.children ? (
                      <button
                        type="button"
                        aria-expanded={activeDropdown === item.label}
                        aria-haspopup="menu"
                        onClick={() =>
                          setActiveDropdown(activeDropdown === item.label ? null : item.label)
                        }
                        className={`flex items-center gap-1.5 px-3.5 min-h-[44px] text-[15px] font-medium rounded-xl transition-colors duration-150 ease-fintech ${
                          activeDropdown === item.label
                            ? 'text-ink bg-surface-subtle'
                            : 'text-ink-700 hover:text-ink hover:bg-surface-subtle'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          aria-hidden="true"
                          className={`w-4 h-4 transition-transform duration-200 ease-fintech ${
                            activeDropdown === item.label ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className="inline-flex items-center px-3.5 min-h-[44px] text-[15px] font-medium text-ink-700 hover:text-ink hover:bg-surface-subtle rounded-xl transition-colors duration-150 ease-fintech"
                      >
                        {item.label}
                      </Link>
                    )}

                    {/* Dropdown */}
                    {item.children && activeDropdown === item.label && (
                      <div
                        role="menu"
                        className="absolute top-full left-0 mt-1.5 w-72 rounded-2xl bg-surface border border-line p-2"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            role="menuitem"
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-start gap-3 p-3 min-h-[44px] rounded-xl hover:bg-surface-subtle transition-colors duration-150 group"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="text-[14px] leading-[20px] font-medium text-ink">
                                {child.label}
                              </div>
                              {child.description && (
                                <div className="text-caption text-ink-500 mt-0.5">
                                  {child.description}
                                </div>
                              )}
                            </div>
                            <ArrowRight
                              aria-hidden="true"
                              className="w-4 h-4 text-ink-500 group-hover:text-ink mt-0.5 flex-shrink-0 transition-colors duration-150"
                            />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Right actions */}
              <div className="flex items-center gap-2">
                <Link href="/login" className="hidden sm:inline-flex btn-ghost">
                  <User className="w-4 h-4" aria-hidden="true" />
                  <span>Log in</span>
                </Link>
                <Link href="/register" className="hidden sm:inline-flex btn-primary btn-sm">
                  Register
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileOpen(true)}
                  className="lg:hidden min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-xl hover:bg-surface-subtle transition-colors duration-150"
                  aria-label="Open navigation menu"
                  aria-expanded={mobileOpen}
                >
                  <Menu className="w-6 h-6 text-ink" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[60] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div
            className="absolute inset-0 bg-ink/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-surface border-l border-line overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-line">
              <Link
                href="/"
                className="flex items-center gap-2.5 min-h-[44px]"
                onClick={() => setMobileOpen(false)}
              >
                <div className="w-8 h-8 rounded-xl bg-primary text-primary-fg flex items-center justify-center">
                  <Zap className="w-4 h-4" aria-hidden="true" />
                </div>
                <span className="text-[18px] font-heading font-semibold text-ink">
                  VectisX
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation menu"
                className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-xl hover:bg-surface-subtle"
              >
                <X className="w-5 h-5 text-ink" aria-hidden="true" />
              </button>
            </div>

            {/* Mode toggle mobile */}
            <div className="p-4 border-b border-line">
              <div className="flex rounded-xl bg-surface-subtle p-1 gap-1">
                <button
                  type="button"
                  onClick={() => setMode('personal')}
                  aria-pressed={mode === 'personal'}
                  className={`flex-1 rounded-lg min-h-[44px] text-[14px] font-medium transition-colors duration-150 ${
                    mode === 'personal' ? 'bg-surface text-ink border border-line' : 'text-ink-500'
                  }`}
                >
                  Personal
                </button>
                <button
                  type="button"
                  onClick={() => setMode('business')}
                  aria-pressed={mode === 'business'}
                  className={`flex-1 rounded-lg min-h-[44px] text-[14px] font-medium transition-colors duration-150 ${
                    mode === 'business' ? 'bg-surface text-ink border border-line' : 'text-ink-500'
                  }`}
                >
                  Business
                </button>
              </div>
            </div>

            {/* Mobile nav links */}
            <nav aria-label="Mobile" className="p-4 space-y-1">
              {nav.map((item) => (
                <MobileNavItem
                  key={item.label}
                  item={item}
                  onClose={() => setMobileOpen(false)}
                />
              ))}
            </nav>

            {/* Mobile CTA */}
            <div className="p-4 border-t border-line space-y-2">
              <Link
                href="/register"
                className="btn-primary w-full justify-center"
                onClick={() => setMobileOpen(false)}
              >
                Register Free
              </Link>
              <Link
                href="/login"
                className="btn-secondary w-full justify-center"
                onClick={() => setMobileOpen(false)}
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Spacer matching fixed header total height (44px + 64px = 108px) */}
      <div className="h-[108px]" aria-hidden="true" />
    </>
  );
}

function MobileNavItem({
  item,
  onClose,
}: {
  item: NavItem;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);

  if (!item.children) {
    return (
      <Link
        href={item.href}
        onClick={onClose}
        className="flex items-center px-4 min-h-[44px] text-[15px] font-medium text-ink-700 hover:text-ink hover:bg-surface-subtle rounded-xl transition-colors duration-150"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex items-center justify-between w-full px-4 min-h-[44px] text-[15px] font-medium text-ink-700 hover:text-ink hover:bg-surface-subtle rounded-xl transition-colors duration-150"
      >
        <span>{item.label}</span>
        <ChevronDown
          aria-hidden="true"
          className={`w-4 h-4 transition-transform duration-200 ease-fintech ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="ml-4 space-y-1 pb-2">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={onClose}
              className="flex items-center px-4 min-h-[44px] text-[14px] text-ink-500 hover:text-ink rounded-lg transition-colors duration-150"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
