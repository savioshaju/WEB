import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import AboutPage from './components/AboutPage';

const rawApiUrl = (
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
).trim();

// Normalize API_BASE_URL so it reliably ends with /api (even if entered without /api)
const API_BASE_URL = rawApiUrl.replace(/\/+$/, '').endsWith('/api')
  ? rawApiUrl.replace(/\/+$/, '')
  : `${rawApiUrl.replace(/\/+$/, '')}/api`;

const getWsUrl = () => {
  if (import.meta.env.VITE_WS_URL) {
    return import.meta.env.VITE_WS_URL;
  }
  if (rawApiUrl) {
    return rawApiUrl
      .replace(/^http:/i, 'ws:')
      .replace(/^https:/i, 'wss:')
      .replace(/\/api\/?$/i, '')
      .replace(/\/+$/, '');
  }
  return 'ws://localhost:5000';
};

const WS_URL = getWsUrl();

const getInitialPage = () => {
  const hash = window.location.hash.replace('#', '').toLowerCase();
  if (hash === 'dashboard' || hash === 'feed') return 'dashboard';
  if (hash === 'about') return 'about';
  return 'landing';
};

export default function App() {
  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [filterPriority, setFilterPriority] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sync route with hash
  const navigateTo = useCallback((page) => {
    setCurrentPage(page);
    window.location.hash = page === 'landing' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'dashboard' || hash === 'feed') {
        setCurrentPage('dashboard');
      } else if (hash === 'about') {
        setCurrentPage('about');
      } else {
        setCurrentPage('landing');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Fetch initial SOS messages from Express & MongoDB Atlas Backend API
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/sos`);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      const data = await res.json();

      if (data.status === 'success') {
        setMessages(data.messages || []);
        setError(null);
      }
    } catch (err) {
      console.error('Failed to fetch SOS messages:', err);
      setError(`Cannot connect to ResQMesh Backend Server (${API_BASE_URL})`);
    } finally {
      setLoading(false);
    }
  };

  // Real-time WebSocket connection to Backend Server
  useEffect(() => {
    fetchMessages();

    let ws = null;
    let reconnectTimer = null;

    const connectWebSocket = () => {
      ws = new WebSocket(WS_URL);

      ws.onopen = () => {
        console.log('[Dashboard] WebSocket connected.');
        setIsConnected(true);
      };

      ws.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);

          if (payload.type === 'NEW_SOS' && payload.data) {
            const newSOS = payload.data;
            setMessages((prev) => {
              if (prev.some((m) => m.messageId === newSOS.messageId)) {
                return prev;
              }
              return [newSOS, ...prev];
            });
          } else if (payload.type === 'STATUS_UPDATE' && payload.data) {
            const updated = payload.data;
            setMessages((prev) =>
              prev.map((m) => (m.messageId === updated.messageId ? updated : m))
            );
          }
        } catch (err) {
          console.error('[Dashboard] Error parsing WebSocket message:', err);
        }
      };

      ws.onclose = () => {
        setIsConnected(false);
        reconnectTimer = setTimeout(connectWebSocket, 3000);
      };

      ws.onerror = (err) => {
        console.error('[Dashboard] WebSocket error:', err);
        ws.close();
      };
    };

    connectWebSocket();

    return () => {
      if (ws) ws.close();
      if (reconnectTimer) clearTimeout(reconnectTimer);
    };
  }, []);

  // Update status (ACKNOWLEDGED / RESOLVED)
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_BASE_URL}/sos/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.status === 'success') {
        setMessages((prev) =>
          prev.map((m) => (m.messageId === id ? data.data : m))
        );
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  // Metrics computation
  const metrics = useMemo(() => {
    const total = messages.length;
    const critical = messages.filter((m) => m.priority === 'CRITICAL').length;
    const medical = messages.filter((m) => m.medicalRequired).length;
    const peopleCount = messages.reduce((acc, m) => acc + (m.peopleCount || 1), 0);

    return { total, critical, medical, peopleCount };
  }, [messages]);

  // Filtering
  const filteredMessages = useMemo(() => {
    return messages.filter((m) => {
      const matchesPriority =
        filterPriority === 'ALL' || m.priority === filterPriority;
      const search = searchQuery.toLowerCase();
      const matchesSearch =
        (m.messageId && m.messageId.toLowerCase().includes(search)) ||
        (m.emergencyType && m.emergencyType.toLowerCase().includes(search)) ||
        (m.description && m.description.toLowerCase().includes(search));

      return matchesPriority && matchesSearch;
    });
  }, [messages, filterPriority, searchQuery]);

  return (
    <div className="min-h-screen bg-black text-emerald-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      {/* Top Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        isConnected={isConnected}
        onRefresh={fetchMessages}
        loading={loading}
        alertCount={messages.length}
      />

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {currentPage === 'landing' && (
          <LandingPage
            onNavigate={navigateTo}
            metrics={metrics}
            recentMessages={messages}
            isConnected={isConnected}
          />
        )}

        {currentPage === 'dashboard' && (
          <Dashboard
            messages={messages}
            metrics={metrics}
            filteredMessages={filteredMessages}
            filterPriority={filterPriority}
            setFilterPriority={setFilterPriority}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onStatusChange={handleStatusChange}
            error={error}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={navigateTo} />
        )}
      </main>

      {/* Clean Global Footer */}
      <footer className="border-t border-emerald-950/80 bg-black/90 py-6 text-xs font-mono text-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-emerald-400">ResQMesh</span>
            <span>—</span>
            <span>Decentralized Emergency Mesh Communication</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateTo('landing')}
              className="hover:text-emerald-300 transition"
            >
              Home
            </button>
            <button
              onClick={() => navigateTo('dashboard')}
              className="hover:text-emerald-300 transition"
            >
              Live Feed
            </button>
            <button
              onClick={() => navigateTo('about')}
              className="hover:text-emerald-300 transition"
            >
              About
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
