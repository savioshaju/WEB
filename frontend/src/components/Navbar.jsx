import React, { useState } from 'react';
import { Radio, RefreshCw, Menu, X, Activity, Info, Home } from 'lucide-react';

export default function Navbar({
  currentPage,
  onNavigate,
  isConnected,
  onRefresh,
  loading,
  alertCount = 0
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'landing', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Live SOS Feed', icon: Activity, count: alertCount },
    { id: 'about', label: 'About ResQMesh', icon: Info }
  ];

  return (
    <header className="border-b border-emerald-950/80 bg-black/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <button
            onClick={() => handleNav('landing')}
            className="flex items-center gap-3 text-left group transition focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center shadow-md shadow-emerald-500/25 group-hover:scale-105 transition-transform">
              <Radio className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-emerald-400 font-heading">
                  ResQMesh
                </span>
                <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                  v1.0
                </span>
              </div>
              <p className="text-[10px] font-mono text-emerald-600 hidden sm:block">
                Decentralized Emergency Mesh Network
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-semibold transition ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-500/10'
                      : 'text-emerald-500/80 hover:text-emerald-300 hover:bg-zinc-900 border border-transparent'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                  {link.count !== undefined && link.count > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-500 text-black font-bold">
                      {link.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Status & Actions */}
          <div className="flex items-center gap-2.5">
            {/* Stream Status Badge */}
            <div
              className={`flex items-center gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border text-[11px] font-mono font-semibold transition ${
                isConnected
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
              }`}
            >
              <span className="relative flex h-2 w-2">
                {isConnected && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                )}
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    isConnected ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                ></span>
              </span>
              <span className="hidden sm:inline">
                {isConnected ? 'STREAM ACTIVE' : 'CONNECTING...'}
              </span>
              <span className="sm:hidden">
                {isConnected ? 'ONLINE' : 'OFFLINE'}
              </span>
            </div>

            {/* Refresh Button (visible if on Dashboard or available) */}
            {onRefresh && (
              <button
                onClick={onRefresh}
                className="p-1.5 sm:p-2 rounded-lg bg-zinc-950 border border-emerald-900/80 text-emerald-400 hover:text-black hover:bg-emerald-400 transition"
                title="Refresh SOS Data"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                    loading ? 'animate-spin' : ''
                  }`}
                />
              </button>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg bg-zinc-950 border border-emerald-900 text-emerald-400 hover:text-emerald-200 transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-emerald-950 bg-black/95 px-4 pt-2 pb-4 space-y-1 font-mono">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40'
                    : 'text-emerald-500 hover:text-emerald-300 hover:bg-zinc-900 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </div>
                {link.count !== undefined && link.count > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500 text-black font-bold">
                    {link.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
