import React from 'react';
import {
  Radio,
  AlertTriangle,
  Flame,
  UserX,
  Crosshair,
  Users,
  MapPin,
  Clock,
  CheckCircle2,
  Search,
  Activity,
  HeartPulse,
  Share2,
  Database
} from 'lucide-react';

export default function Dashboard({
  metrics,
  filteredMessages,
  filterPriority,
  setFilterPriority,
  searchQuery,
  setSearchQuery,
  onStatusChange,
  error
}) {
  const getEmergencyIcon = (type) => {
    switch (type) {
      case 'MEDICAL':
        return <HeartPulse className="w-5 h-5 text-emerald-400" />;
      case 'FIRE':
        return <Flame className="w-5 h-5 text-orange-400" />;
      case 'TRAPPED':
        return <Crosshair className="w-5 h-5 text-amber-400" />;
      case 'MISSING_PERSON':
        return <UserX className="w-5 h-5 text-purple-400" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-6 py-4">
      {/* Error Notice */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/40 p-4 rounded-xl text-red-400 text-sm flex items-center gap-2 font-mono">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-950/90 border border-emerald-900/60 hover:border-emerald-500/40 rounded-xl p-5 flex items-center justify-between transition">
          <div>
            <p className="text-xs font-mono text-emerald-600 uppercase tracking-wider">
              Total Saved SOS Alerts
            </p>
            <p className="text-3xl font-black text-emerald-400 mt-1 font-heading">
              {metrics.total}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Database className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-zinc-950/90 border border-emerald-900/60 hover:border-emerald-500/40 rounded-xl p-5 flex items-center justify-between transition">
          <div>
            <p className="text-xs font-mono text-emerald-600 uppercase tracking-wider">
              Critical Priority
            </p>
            <p className="text-3xl font-black text-red-500 mt-1 font-heading">
              {metrics.critical}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
            <Activity className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-zinc-950/90 border border-emerald-900/60 hover:border-emerald-500/40 rounded-xl p-5 flex items-center justify-between transition">
          <div>
            <p className="text-xs font-mono text-emerald-600 uppercase tracking-wider">
              Medical Emergencies
            </p>
            <p className="text-3xl font-black text-amber-400 mt-1 font-heading">
              {metrics.medical}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <HeartPulse className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-zinc-950/90 border border-emerald-900/60 hover:border-emerald-500/40 rounded-xl p-5 flex items-center justify-between transition">
          <div>
            <p className="text-xs font-mono text-emerald-600 uppercase tracking-wider">
              People Affected
            </p>
            <p className="text-3xl font-black text-emerald-300 mt-1 font-heading">
              {metrics.peopleCount}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-zinc-950 border border-emerald-900/80 p-3 rounded-xl">
        <div className="flex flex-wrap items-center gap-2">
          {['ALL', 'CRITICAL', 'HIGH', 'NORMAL'].map((p) => (
            <button
              key={p}
              onClick={() => setFilterPriority(p)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                filterPriority === p
                  ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/30'
                  : 'bg-zinc-900 text-emerald-500 hover:text-emerald-300 hover:bg-zinc-800'
              }`}
            >
              {p === 'ALL' ? 'ALL ALERTS' : p}
            </button>
          ))}
        </div>

        <div className="relative flex-1 sm:max-w-xs">
          <Search className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by ID, type, description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black border border-emerald-900/80 rounded-lg pl-9 pr-4 py-1.5 text-xs text-emerald-200 placeholder-emerald-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono transition"
          />
        </div>
      </div>

      {/* SOS Cards Feed */}
      <main className="space-y-4">
        {filteredMessages.length === 0 ? (
          <div className="text-center py-16 px-4 bg-zinc-950/60 border border-dashed border-emerald-900/60 rounded-2xl text-emerald-700 font-mono">
            <Radio className="w-12 h-12 mx-auto mb-3 opacity-30 text-emerald-500" />
            <h3 className="text-lg font-semibold text-emerald-400">
              NO SOS MESSAGES RECEIVED
            </h3>
            <p className="text-xs text-emerald-600 mt-1">
              Active beacons broadcasted over the mesh gateway will appear here in real time.
            </p>
          </div>
        ) : (
          filteredMessages.map((msg) => (
            <div
              key={msg.messageId}
              className={`bg-zinc-950/90 border rounded-xl p-5 transition hover:border-emerald-500/50 ${
                msg.priority === 'CRITICAL'
                  ? 'border-l-4 border-l-red-500 border-zinc-900'
                  : msg.priority === 'HIGH'
                  ? 'border-l-4 border-l-orange-500 border-zinc-900'
                  : 'border-l-4 border-l-emerald-500 border-zinc-900'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  {getEmergencyIcon(msg.emergencyType)}
                  <span className="font-bold text-lg text-emerald-300">
                    {msg.emergencyType ? msg.emergencyType.replace('_', ' ') : 'EMERGENCY'}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono font-extrabold tracking-wider uppercase ${
                      msg.priority === 'CRITICAL'
                        ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                        : msg.priority === 'HIGH'
                        ? 'bg-orange-500/10 text-orange-400 border border-orange-500/30'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {msg.priority || 'CRITICAL'}
                  </span>
                </div>

                <div className="flex items-center gap-2 font-mono">
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-emerald-950 text-xs font-semibold text-emerald-400">
                    STATUS: {msg.status || 'ACTIVE'}
                  </span>
                  {msg.status !== 'RESOLVED' && (
                    <button
                      onClick={() => onStatusChange(msg.messageId, 'RESOLVED')}
                      className="flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 border border-emerald-500/40 hover:border-emerald-500 text-emerald-400 hover:text-black text-xs font-bold transition"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Resolve
                    </button>
                  )}
                </div>
              </div>

              {msg.description && (
                <p className="text-sm text-emerald-100 mb-3 bg-black/60 p-3 rounded-lg border border-emerald-950 font-sans">
                  {msg.description}
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 py-3 border-y border-dashed border-emerald-950 text-xs text-emerald-500 font-mono">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>
                    Lat: <strong className="text-emerald-200">{Number(msg.latitude || 0).toFixed(5)}</strong>, Lng: <strong className="text-emerald-200">{Number(msg.longitude || 0).toFixed(5)}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>
                    People: <strong className="text-emerald-200">{msg.peopleCount}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <HeartPulse className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>
                    Medical: <strong className="text-emerald-200">{msg.medicalRequired ? 'YES' : 'NO'}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>
                    Mesh Hops: <strong className="text-emerald-200">{msg.hopCount || 0}</strong> (TTL: {msg.ttl || 10})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>
                    {msg.timestamp ? new Date(msg.timestamp).toLocaleString() : 'N/A'}
                  </span>
                </div>
              </div>

              <div className="mt-2 text-[10px] font-mono text-emerald-700">
                UUID: {msg.messageId}
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
