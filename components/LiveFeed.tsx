"use client";

import { useEffect, useState, useRef } from "react";
import { Terminal, Activity, Wifi, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const EVENT_TYPES = [
  { icon: <Wifi size={12} />, color: "text-blue-400", prefix: "CONN" },
  { icon: <Activity size={12} />, color: "text-green-400", prefix: "DATA" },
  { icon: <ShieldCheck size={12} />, color: "text-purple-400", prefix: "SEC" },
  { icon: <Terminal size={12} />, color: "text-yellow-400", prefix: "SYS" },
];

const RAW_MESSAGES = [
  "Synchronizing global supply chain nodes...",
  "Retrieving real-time freight indices from Baltic Exchange...",
  "Analyzing geopolitical risk metrics in South China Sea...",
  "Calculating carbon footprint for multimodal route...",
  "Verifying export compliance for restricted HS codes...",
  "Updating port congestion status: Shanghai, Ningbo, Singapore...",
  "Predicting demand volatility for electronic components...",
  "Refreshing currency exchange rates: USD/CNY, EUR/USD...",
  "Scanning tariff schedules for Section 301 updates...",
  "Aggregating container spot rates for FEU 40ft...",
  "Fetching weather-induced delay probabilities...",
  "Neural network optimizing route efficiency...",
  "Validating carrier reliability scores...",
  "Executing Monte Carlo simulation for lead time variance..."
];

export default function LiveFeed() {
  const [logs, setLogs] = useState<{ id: number; text: string; type: typeof EVENT_TYPES[0]; timestamp: string }[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    const addMessage = () => {
      const type = EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)];
      const text = RAW_MESSAGES[Math.floor(Math.random() * RAW_MESSAGES.length)];
      const timestamp = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      
      const newEntry = { id: nextId.current++, text, type, timestamp };
      setLogs(prev => [newEntry, ...prev].slice(0, 8));
    };

    const interval = setInterval(addMessage, 2000);
    addMessage(); // Add first one immediately

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass rounded-3xl p-6 h-full flex flex-col border-white/5">
      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <Terminal size={18} className="text-blue-400" />
          <h3 className="font-bold text-sm uppercase tracking-widest">Neural Intel Feed</h3>
        </div>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
        </div>
      </div>
      
      <div className="flex-1 space-y-3 font-mono text-[11px] overflow-hidden">
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-start gap-2 border-l-2 border-white/5 pl-2 py-1"
            >
              <span className="text-gray-500">[{log.timestamp}]</span>
              <span className={`${log.type.color} font-bold`}>{log.type.prefix}</span>
              <span className="text-gray-300 leading-relaxed">{log.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between text-[10px] text-gray-500">
          <span>UPTIME: 144:12:05</span>
          <span className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            LIVE CONNECTION
          </span>
        </div>
      </div>
    </div>
  );
}
