import React from 'react';
import {
  Radio,
  ArrowRight,
  Shield,
  Share2,
  AlertTriangle,
  WifiOff,
  FileText,
  Server,
  Smartphone,
  Cpu,
  MapPin
} from 'lucide-react';

export default function AboutPage({ onNavigate }) {
  return (
    <div className="space-y-10 py-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="border-b border-emerald-950 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-3">
          <Radio className="w-3.5 h-3.5" />
          <span>System Architecture & Overview</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-300 tracking-tight">
          About ResQMesh
        </h1>
        <p className="text-sm sm:text-base text-emerald-400/80 mt-2 font-sans max-w-3xl leading-relaxed">
          An open, resilient emergency distress communication network designed to operate when power grids, cell towers, and internet backbones fail.
        </p>
      </div>

      {/* The Core Problem & Our Mission */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-950/80 border border-emerald-900/60 rounded-xl p-6 space-y-3">
          <div className="flex items-center gap-2.5 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
            <WifiOff className="w-4 h-4" />
            <span>The Critical Challenge</span>
          </div>
          <h2 className="text-lg font-bold text-emerald-200">
            The Infrastructure Fragility Gap
          </h2>
          <p className="text-xs sm:text-sm text-emerald-400/70 leading-relaxed font-sans">
            In major natural disasters like earthquakes, cyclones, and flash floods, traditional communication networks collapse rapidly. Cellular base stations lose generator fuel, fiber backbones sever, and cell phone towers become overloaded. Survivors often have working smartphones with battery life remaining, yet have zero connectivity to call for help.
          </p>
        </div>

        <div className="bg-zinc-950/80 border border-emerald-900/60 rounded-xl p-6 space-y-3">
          <div className="flex items-center gap-2.5 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Shield className="w-4 h-4" />
            <span>The ResQMesh Mission</span>
          </div>
          <h2 className="text-lg font-bold text-emerald-200">
            Decentralized Life-Saving Relays
          </h2>
          <p className="text-xs sm:text-sm text-emerald-400/70 leading-relaxed font-sans">
            ResQMesh eliminates reliance on centralized infrastructure. By utilizing lightweight wireless peer-to-peer mesh protocols, every Android device or field node becomes an autonomous repeater. Packets jump from device to device across the affected zone until reaching an edge gateway connected to emergency responders.
          </p>
        </div>
      </section>

      {/* How the Protocol Works */}
      <section className="bg-zinc-950/90 border border-emerald-900/70 rounded-2xl p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-emerald-300">
            How The Mesh Protocol Operates
          </h2>
          <p className="text-xs text-emerald-600 font-mono mt-1">
            Hop-by-hop packet propagation with flood suppression
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="bg-black/60 border border-emerald-950 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Smartphone className="w-4 h-4" />
              <span>1. Offline Beaconing</span>
            </div>
            <p className="text-emerald-400/70 font-sans leading-relaxed text-xs">
              When a user triggers an emergency alert, the mobile application bundles GPS coordinates, victim headcount, medical condition flags, and situation notes into a compact binary or JSON payload.
            </p>
          </div>

          <div className="bg-black/60 border border-emerald-950 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Share2 className="w-4 h-4" />
              <span>2. Multi-Hop Forwarding</span>
            </div>
            <p className="text-emerald-400/70 font-sans leading-relaxed text-xs">
              Surrounding devices within radio range receive the beacon. If the packet has remaining Time-To-Live (TTL) and has not been seen before (deduplication via UUID), it is immediately rebroadcast.
            </p>
          </div>

          <div className="bg-black/60 border border-emerald-950 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Server className="w-4 h-4" />
              <span>3. Gateway Ingestion</span>
            </div>
            <p className="text-emerald-400/70 font-sans leading-relaxed text-xs">
              When any relay node touches a perimeter unit with uplink access (satellite terminal, rescue vehicle Wi-Fi, or surviving broadband), the alert is pushed to the central MongoDB Atlas and WebSocket bus.
            </p>
          </div>
        </div>

        {/* Packet Specification Sample */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs font-mono text-emerald-500">
            <span className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> SOS Packet Schema (Sample)
            </span>
            <span>JSON Payload</span>
          </div>
          <div className="bg-black rounded-xl p-4 border border-emerald-950 font-mono text-[11px] sm:text-xs text-emerald-300 overflow-x-auto leading-relaxed">
            <pre>{`{
  "messageId": "sos_9f81a7b2-4d1e-42c9",
  "emergencyType": "MEDICAL",       // MEDICAL | FIRE | TRAPPED | MISSING_PERSON
  "priority": "CRITICAL",          // CRITICAL | HIGH | NORMAL
  "latitude": 12.971598,
  "longitude": 77.594566,
  "peopleCount": 3,
  "medicalRequired": true,
  "description": "Building partial collapse, 1 injured with fractured leg",
  "hopCount": 4,                   // Number of mesh hops traversed
  "ttl": 10,                       // Loop prevention counter
  "status": "ACTIVE",              // ACTIVE | ACKNOWLEDGED | RESOLVED
  "timestamp": 1775556200000
}`}</pre>
          </div>
        </div>
      </section>

      {/* Primary Use Cases */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-emerald-300 border-b border-emerald-950 pb-3">
          Primary Deployment Scenarios
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans">
          <div className="bg-zinc-950/80 border border-emerald-900/60 rounded-xl p-5 space-y-2">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 w-fit">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-emerald-200 text-sm">Disaster Zones</h3>
            <p className="text-xs text-emerald-400/70 leading-relaxed">
              Floods, hurricanes, earthquakes, and forest fires where base stations are physically damaged or submerged.
            </p>
          </div>

          <div className="bg-zinc-950/80 border border-emerald-900/60 rounded-xl p-5 space-y-2">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 w-fit">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-emerald-200 text-sm">Wilderness SAR</h3>
            <p className="text-xs text-emerald-400/70 leading-relaxed">
              Search and rescue operations in remote mountains, dense forests, canyons, and deep trails with zero cell reception.
            </p>
          </div>

          <div className="bg-zinc-950/80 border border-emerald-900/60 rounded-xl p-5 space-y-2">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 w-fit">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-emerald-200 text-sm">Offshore & Remote Sites</h3>
            <p className="text-xs text-emerald-400/70 leading-relaxed">
              Mining operations, maritime vessels near coastlines, rural agriculture, and infrastructure inspections.
            </p>
          </div>
        </div>
      </section>

      {/* System Stack Summary */}
      <section className="bg-zinc-950/70 border border-emerald-900/60 rounded-xl p-6 font-mono text-xs space-y-3">
        <h3 className="font-bold text-emerald-300 text-sm uppercase tracking-wider">
          ResQMesh Technical Stack
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-emerald-400/80">
          <div className="bg-black/60 p-3 rounded-lg border border-emerald-950">
            <div className="text-emerald-500 text-[10px] uppercase">Client Node</div>
            <div className="text-emerald-200 font-bold mt-0.5">Android Mesh App</div>
            <div className="text-[10px] text-emerald-600 mt-1">P2P Radio / Relay Engine</div>
          </div>
          <div className="bg-black/60 p-3 rounded-lg border border-emerald-950">
            <div className="text-emerald-500 text-[10px] uppercase">Storage & Sync</div>
            <div className="text-emerald-200 font-bold mt-0.5">MongoDB Atlas</div>
            <div className="text-[10px] text-emerald-600 mt-1">Change Streams for Real-Time</div>
          </div>
          <div className="bg-black/60 p-3 rounded-lg border border-emerald-950">
            <div className="text-emerald-500 text-[10px] uppercase">Backend Gateway</div>
            <div className="text-emerald-200 font-bold mt-0.5">Node.js + Express</div>
            <div className="text-[10px] text-emerald-600 mt-1">WebSocket Live Broadcasting</div>
          </div>
          <div className="bg-black/60 p-3 rounded-lg border border-emerald-950">
            <div className="text-emerald-500 text-[10px] uppercase">Command Interface</div>
            <div className="text-emerald-200 font-bold mt-0.5">React + Vite</div>
            <div className="text-[10px] text-emerald-600 mt-1">Tailwind CSS + Lucide</div>
          </div>
        </div>
      </section>

      {/* Navigation CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-emerald-950 font-mono">
        <button
          onClick={() => onNavigate('landing')}
          className="text-xs text-emerald-500 hover:text-emerald-300 transition"
        >
          ← Back to Landing Page
        </button>

        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition"
        >
          <span>Open Live SOS Dashboard</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
