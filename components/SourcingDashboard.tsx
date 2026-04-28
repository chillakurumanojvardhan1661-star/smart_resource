"use client";
import React from "react";
import { TrendingUp, ArrowUpRight, AlertCircle, ShoppingCart, Target, ShieldCheck, Zap } from "lucide-react";
import Globe from "./Globe";

export default function SourcingDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-12 gap-6 items-start">
        {/* Left Column: Title + Stats */}
        <div className="col-span-3 space-y-12">
          <div>
            <h1 className="text-[44px] font-bold text-[#111111] leading-tight mb-2">
              Sourcing<br />Command Center
            </h1>
            <p className="text-[#6B7280] text-sm">
              Optimizing your global supply chain.
            </p>
          </div>

          <div className="space-y-6">
            <StatBlock label="ACTIVE ORDERS" value="842" />
            <StatBlock label="SAVINGS ACHIEVED" value="$420K" />
            <StatBlock label="SUPPLIER NETWORK" value="1,240" />
          </div>
        </div>

        {/* Center Column: Globe */}
        <div className="col-span-6 flex justify-center items-center h-[500px]">
          <Globe origins={["China", "India", "Vietnam"]} destination="USA" />
        </div>

        {/* Right Column: Global Overview + Alerts */}
        <div className="col-span-3 space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider">Market Overview</h3>
            <div className="card-white p-6 space-y-4">
              <OverviewItem label="TOP SOURCE" value="Vietnam" sub="42% growth" icon="🇻🇳" />
              <div className="border-t border-[#E5E7EB]" />
              <OverviewItem label="LOWEST COST" value="India" sub="-12% avg" icon="🇮🇳" />
              <div className="border-t border-[#E5E7EB]" />
              <OverviewItem label="RISK INDEX" value="Low" sub="Stable" subColor="text-green-600" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider">Sourcing Alerts</h3>
            <div className="space-y-3">
              <AlertItem 
                type="success"
                title="Best country to source"
                desc="Vietnam offers 15% lower landed costs this month."
              />
              <AlertItem 
                type="warning"
                title="Avoid buying now"
                desc="Port congestion in Shanghai increasing lead times."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Additional Widgets */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4 card-white p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#FF6A00]/10 rounded-xl flex items-center justify-center">
              <ShieldCheck className="text-[#FF6A00]" />
            </div>
            <h3 className="font-bold text-lg">Supplier Risk Panel</h3>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-[#F5F5F5] rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-xs font-bold">S{i}</div>
                  <span className="text-sm font-semibold">Global Logistics Ltd</span>
                </div>
                <span className="text-xs font-bold text-green-600 px-2 py-1 bg-green-50 rounded-lg">TRUSTED</span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-8 card-white p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <Zap className="text-blue-600" />
              </div>
              <h3 className="font-bold text-lg">Optimization Engine Summary</h3>
            </div>
            <button className="text-sm font-bold text-[#FF6A00] hover:underline">Run Analysis</button>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">Route Savings</p>
              <p className="text-2xl font-bold text-[#111111]">$12.4K</p>
            </div>
            <div className="p-6 bg-orange-50/50 rounded-2xl border border-orange-100">
              <p className="text-[10px] font-bold text-[#FF6A00] uppercase tracking-wider mb-1">Tax Rebates</p>
              <p className="text-2xl font-bold text-[#111111]">$5.2K</p>
            </div>
            <div className="p-6 bg-green-50/50 rounded-2xl border border-green-100">
              <p className="text-[10px] font-bold text-green-600 uppercase tracking-wider mb-1">Efficiency</p>
              <p className="text-2xl font-bold text-[#111111]">+18%</p>
            </div>
          </div>
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
          <ShieldCheck size={20} className="text-[#FF6A00]" />
        </div>
      )}
    </div>
  );
}

function AlertItem({ type, title, desc }: { type: "success" | "warning"; title: string; desc: string }) {
  return (
    <div className={`p-4 rounded-2xl border ${type === "success" ? "bg-green-50 border-green-100" : "bg-orange-50 border-orange-100"}`}>
      <div className="flex items-start gap-3">
        <AlertCircle size={18} className={type === "success" ? "text-green-600" : "text-[#FF6A00]"} />
        <div>
          <p className={`text-xs font-bold uppercase tracking-wider ${type === "success" ? "text-green-600" : "text-[#FF6A00]"}`}>{title}</p>
          <p className="text-xs text-[#111111] mt-1 leading-relaxed font-medium">{desc}</p>
        </div>
      </div>
    </div>
  );
}
