"use client";
import React from "react";

function SimpleLineChart({ data, color }: { data: number[]; color: string }) {
  const w = 100, h = 40;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function MetricsPanel() {
  return (
    <div className="card-white p-6 h-full flex flex-col justify-between">
      {/* Top metrics row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <MetricItem label="Load Utilization" value="80%" />
        <MetricItem label="Route Progress" value="65%" />
        <MetricItem label="Fuel Efficiency" value="8.7 mpg" />
      </div>

      {/* Bottom cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#F5F5F5] border border-[#E5E7EB] rounded-xl p-4">
          <div className="text-[12px] font-bold text-[#6B7280] mb-2">Route efficiency</div>
          <div className="flex items-end justify-between">
            <div className="text-3xl font-bold text-[#111111]">94<span className="text-sm ml-0.5">%</span></div>
            <SimpleLineChart data={[60, 68, 72, 78, 85, 88, 92, 94]} color="#22C55E" />
          </div>
        </div>
        <div className="bg-[#F5F5F5] border border-[#E5E7EB] rounded-xl p-4">
          <div className="text-[12px] font-bold text-[#6B7280] mb-2">Return rate</div>
          <div className="flex items-end justify-between">
            <div className="text-3xl font-bold text-[#111111]">12<span className="text-sm ml-0.5">%</span></div>
            <SimpleLineChart data={[20, 18, 22, 16, 14, 15, 13, 12]} color="#EF4444" />
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider mb-1">{label}</p>
      <p className="text-xl font-bold text-[#111111]">{value}</p>
    </div>
  );
}
