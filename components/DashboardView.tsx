"use client";
import React from "react";
import { TrendingUp, ArrowUpRight, AlertCircle } from "lucide-react";
import Globe from "./Globe";

interface DashboardViewProps {
  selectedOrigins: string[];
  destinationCountry: string;
}

export default function DashboardView({ selectedOrigins, destinationCountry }: DashboardViewProps) {
  return (
    <div className="grid grid-cols-12 gap-6 items-start py-8">
      {/* Left Column: Title + Stats (3 columns) */}
      <div className="col-span-3 space-y-12">
        <div>
          <h1 className="text-[48px] font-bold text-[#111111] leading-tight mb-2">
            Global Trade<br />Command Center
          </h1>
          <p className="text-[#6B7280] text-sm">
            Real-time insights. Smarter decisions.
          </p>
        </div>

        {/* Stat Blocks */}
        <div className="space-y-6">
          <StatBlock label="ACTIVE SHIPMENTS" value="1,240" />
          <StatBlock label="COUNTRIES COVERED" value="156" />
          <StatBlock label="TRADE VOLUME" value="$2.48B" />
        </div>
      </div>

      {/* Center Column: Globe (6 columns) */}
      <div className="col-span-6 flex justify-center items-center h-[500px]">
        <Globe origins={selectedOrigins} destination={destinationCountry} />
      </div>

      {/* Right Column: Global Overview (3 columns) */}
      <div className="col-span-3 space-y-4">
        <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider mb-4">Global Overview</h3>
        
        <div className="card-white p-6 space-y-4">
          <OverviewItem label="TOP ORIGIN" value="China" sub="32%" icon="🇨🇳" />
          <div className="border-t border-[#E5E7EB]" />
          <OverviewItem label="TOP DESTINATION" value="USA" sub="28%" icon="🇺🇸" />
          <div className="border-t border-[#E5E7EB]" />
          <OverviewItem label="ON-TIME DELIVERY" value="94%" sub="+5%" subColor="text-green-600" />
        </div>
      </div>
    </div>
  );
}

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l-4 border-[#FF6A00] pl-4 py-1">
      <p className="text-[12px] font-bold text-[#6B7280] uppercase tracking-wider mb-1">{label}</p>
      <div className="flex items-center gap-2">
        <span className="text-3xl font-bold text-[#111111]">{value}</span>
        <TrendingUp size={16} className="text-[#FF6A00]" />
      </div>
    </div>
  );
}

function OverviewItem({ label, value, sub, icon, subColor }: { label: string; value: string; sub: string; icon?: string; subColor?: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">{label}</p>
        <p className="text-xl font-bold text-[#111111]">{value}</p>
        <p className={`text-xs font-semibold ${subColor || "text-[#6B7280]"}`}>{sub}</p>
      </div>
      {icon && (
        <div className="w-10 h-10 bg-[#F5F5F5] rounded-lg flex items-center justify-center text-xl">
          {icon}
        </div>
      )}
      {!icon && (
        <div className="w-10 h-10 bg-[#F5F5F5] rounded-full flex items-center justify-center">
          <AlertCircle size={20} className="text-[#FF6A00]" />
        </div>
      )}
    </div>
  );
}
