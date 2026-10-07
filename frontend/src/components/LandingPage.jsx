import React from 'react';
import {
  ArrowRight,
  Activity,
  Share2,
  MapPin,
  HeartPulse,
  Database,
  WifiOff,
  ChevronRight,
  Radio
} from 'lucide-react';

export default function LandingPage({
  onNavigate,
  metrics,
  recentMessages = [],
  isConnected
}) {
  return (
    <div className="space-y-12 py-6">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-zinc-950/80 border border-emerald-900/60 p-6 sm:p-10 lg:p-12">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Off-Grid Emergency Mesh System</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-300 tracking-tight leading-tight">
            Decentralized SOS Alerts When Cellular Networks Fail.
          </h1>

          <p className="text-sm sm:text-base text-emerald-200/80 leading-relaxed font-sans">
            ResQMesh enables victims and emergency responders to communicate during natural disasters, power outages, and infrastructure breakdowns. Distress beacons propagate peer-to-peer across ad-hoc mesh devices until reaching rescue command.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 font-mono">
            <button
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm shadow-lg shadow-emerald-500/20 transition hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>View Live SOS Feed</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('about')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-emerald-400 border border-emerald-900 font-semibold text-sm transition"
            >
              <span>How It Works</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Quick Glance Status Bar */}
        <div className="mt-10 pt-6 border-t border-emerald-950/80 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
          <div className="bg-black/60 p-3.5 rounded-xl border border-emerald-950">
            <p className="text-[11px] text-emerald-600 uppercase">Active Alerts</p>
            <p className="text-2xl font-black text-emerald-400 mt-0.5">{metrics.total}</p>
          </div>
          <div className="bg-black/60 p-3.5 rounded-xl border border-emerald-950">
            <p className="text-[11px] text-red-500/90 uppercase">Critical Priority</p>
            <p className="text-2xl font-black text-red-400 mt-0.5">{metrics.critical}</p>
          </div>
          <div className="bg-black/60 p-3.5 rounded-xl border border-emerald-950">
            <p className="text-[11px] text-amber-500/90 uppercase">Medical Needs</p>
            <p className="text-2xl font-black text-amber-400 mt-0.5">{metrics.medical}</p>
          </div>
          <div className="bg-black/60 p-3.5 rounded-xl border border-emerald-950">
            <p className="text-[11px] text-emerald-600 uppercase">System Sync</p>
            <p className="text-sm font-bold text-emerald-300 mt-1.5 flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              {isConnected ? 'Real-Time' : 'Reconnecting'}
            </p>
          </div>
        </div>
      </section>

      {/* How the Mesh Works */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-emerald-950 pb-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-300 tracking-tight">
              How ResQMesh Operates
            </h2>
            <p className="text-xs sm:text-sm text-emerald-600 font-mono mt-1">
              End-to-end beacon forwarding without centralized cellular or Wi-Fi infrastructure
            </p>
          </div>
          <button
            onClick={() => onNavigate('about')}
            className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            Read Technical Spec <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-sans">
          <div className="bg-zinc-950/70 border border-emerald-900/60 rounded-xl p-5 relative">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs mb-3 border border-emerald-500/20">
              01
            </div>
            <h3 className="font-bold text-emerald-200 text-sm mb-1.5 flex items-center gap-2">
              <WifiOff className="w-4 h-4 text-emerald-400" /> Distress Trigger
            </h3>
            <p className="text-xs text-emerald-400/70 leading-relaxed">
              A stranded individual triggers an SOS via the ResQMesh mobile client with emergency type, GPS coordinates, and victim count.
            </p>
          </div>

          <div className="bg-zinc-950/70 border border-emerald-900/60 rounded-xl p-5 relative">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs mb-3 border border-emerald-500/20">
              02
            </div>
            <h3 className="font-bold text-emerald-200 text-sm mb-1.5 flex items-center gap-2">
              <Share2 className="w-4 h-4 text-emerald-400" /> Multi-Hop Relays
            </h3>
            <p className="text-xs text-emerald-400/70 leading-relaxed">
              Nearby mobile devices and stationary mesh relay repeaters pick up the radio packet and forward it across the mesh zone.
            </p>
          </div>

          <div className="bg-zinc-950/70 border border-emerald-900/60 rounded-xl p-5 relative">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs mb-3 border border-emerald-500/20">
              03
            </div>
            <h3 className="font-bold text-emerald-200 text-sm mb-1.5 flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-400" /> Gateway Ingestion
            </h3>
            <p className="text-xs text-emerald-400/70 leading-relaxed">
              Once any mesh node touches a boundary gateway with satellite or uplink coverage, the packet is pushed into MongoDB Atlas.
            </p>
          </div>

          <div className="bg-zinc-950/70 border border-emerald-900/60 rounded-xl p-5 relative">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs mb-3 border border-emerald-500/20">
              04
            </div>
            <h3 className="font-bold text-emerald-200 text-sm mb-1.5 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" /> First Responder Hub
            </h3>
            <p className="text-xs text-emerald-400/70 leading-relaxed">
              This dashboard broadcasts the distress beacon in real time, enabling rescue teams to prioritize and resolve situations.
            </p>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-emerald-300 tracking-tight border-b border-emerald-950 pb-3">
          Key System Capabilities
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-zinc-950/90 border border-emerald-900/60 rounded-xl p-5">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 w-fit mb-3 border border-emerald-500/20">
              <WifiOff className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-emerald-200 text-sm mb-1">
              Zero Cellular Dependency
            </h3>
            <p className="text-xs text-emerald-400/70 leading-relaxed font-sans">
              Operates completely independently of commercial cellular towers, fiber backbones, and standard internet access during disaster scenarios.
            </p>
          </div>

          <div className="bg-zinc-950/90 border border-emerald-900/60 rounded-xl p-5">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 w-fit mb-3 border border-emerald-500/20">
              <Share2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-emerald-200 text-sm mb-1">
              Multi-Hop Propagation
            </h3>
            <p className="text-xs text-emerald-400/70 leading-relaxed font-sans">
              Built-in Time-To-Live (TTL) and hop-counter tracking prevent packet loops while maximizing geographic broadcast radius.
            </p>
          </div>

          <div className="bg-zinc-950/90 border border-emerald-900/60 rounded-xl p-5">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 w-fit mb-3 border border-emerald-500/20">
              <HeartPulse className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-emerald-200 text-sm mb-1">
              Automated Triage Prioritization
            </h3>
            <p className="text-xs text-emerald-400/70 leading-relaxed font-sans">
              Distinguishes critical medical needs, trapped persons, fires, and missing persons so emergency teams can allocate assets effectively.
            </p>
          </div>

          <div className="bg-zinc-950/90 border border-emerald-900/60 rounded-xl p-5">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 w-fit mb-3 border border-emerald-500/20">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-emerald-200 text-sm mb-1">
              Precise Geo-Targeting
            </h3>
            <p className="text-xs text-emerald-400/70 leading-relaxed font-sans">
              Transmits high-precision GPS coordinates embedded directly in lightweight beacon payloads for pinpoint field rescue operations.
            </p>
          </div>

          <div className="bg-zinc-950/90 border border-emerald-900/60 rounded-xl p-5">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 w-fit mb-3 border border-emerald-500/20">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-emerald-200 text-sm mb-1">
              Live WebSocket Synchronization
            </h3>
            <p className="text-xs text-emerald-400/70 leading-relaxed font-sans">
              New beacons appearing anywhere in the network are pushed to dispatch screens instantaneously without requiring manual page reloads.
            </p>
          </div>

          <div className="bg-zinc-950/90 border border-emerald-900/60 rounded-xl p-5">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 w-fit mb-3 border border-emerald-500/20">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-emerald-200 text-sm mb-1">
              Persistent Audit Logging
            </h3>
            <p className="text-xs text-emerald-400/70 leading-relaxed font-sans">
              All signals and status transitions (active, acknowledged, resolved) are archived securely for after-action disaster assessments.
            </p>
          </div>
        </div>
      </section>

      {/* Recent Activity Quick Preview if messages exist */}
      {recentMessages.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-emerald-950 pb-3">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-emerald-300">
                Recent Incoming SOS Signals
              </h2>
              <p className="text-xs text-emerald-600 font-mono">
                Latest beacons recorded in the system
              </p>
            </div>
            <button
              onClick={() => onNavigate('dashboard')}
              className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              See All ({metrics.total}) <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
            {recentMessages.slice(0, 2).map((msg) => (
              <div
                key={msg.messageId}
                className="bg-zinc-950/80 border border-emerald-900/60 rounded-xl p-4 flex flex-col justify-between gap-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        msg.priority === 'CRITICAL'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {msg.priority || 'CRITICAL'}
                    </span>
                    <span className="text-emerald-200 font-semibold font-sans">
                      {msg.emergencyType ? msg.emergencyType.replace('_', ' ') : 'SOS ALERT'}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-600">
                    STATUS: {msg.status || 'ACTIVE'}
                  </span>
                </div>

                {msg.description && (
                  <p className="text-emerald-300/80 line-clamp-2 font-sans text-xs">
                    {msg.description}
                  </p>
                )}

                <div className="flex items-center justify-between text-[11px] text-emerald-600 pt-2 border-t border-emerald-950">
                  <span>Hops: {msg.hopCount || 0}</span>
                  <span>{msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString() : 'Recent'}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Bottom CTA Banner */}
      <section className="bg-gradient-to-r from-emerald-950/60 via-zinc-950 to-emerald-950/60 border border-emerald-900/80 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
        <div>
          <h3 className="text-lg font-bold text-emerald-300 font-sans">
            Ready to inspect emergency signals?
          </h3>
          <p className="text-xs text-emerald-500 mt-1">
            Access the real-time operational rescue dashboard for active triage and dispatch.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-4 py-2 rounded-lg bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 transition"
          >
            Launch Live Dashboard
          </button>
          <button
            onClick={() => onNavigate('about')}
            className="px-4 py-2 rounded-lg bg-zinc-900 text-emerald-400 border border-emerald-900 hover:bg-zinc-800 text-xs font-semibold transition"
          >
            About Protocol
          </button>
        </div>
      </section>
    </div>
  );
}
