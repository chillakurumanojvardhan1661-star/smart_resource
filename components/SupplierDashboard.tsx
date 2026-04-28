"use client";
import React from "react";
import { TrendingUp, ArrowUpRight, AlertCircle, Package, Truck, BarChart3, Users, DollarSign } from "lucide-react";
import Globe from "./Globe";

export default function SupplierDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-12 gap-6 items-start">
        {/* Left Column: Title + Stats */}
        <div className="col-span-3 space-y-12">
          <div>
            <h1 className="text-[44px] font-bold text-[#111111] leading-tight mb-2">
              Supplier<br />Control Panel
            </h1>
            <p className="text-[#6B7280] text-sm">
              Managing global sales and operations.
            </p>
          </div>

          <div className="space-y-6">
            <StatBlock label="TOTAL REVENUE" value="$1.28M" />
            <StatBlock label="ORDERS RECEIVED" value="156" />
            <StatBlock label="STOCK AVAILABILITY" value="92%" />
          </div>
        </div>

        {/* Center Column: Globe */}
        <div className="col-span-6 flex justify-center items-center h-[500px]">
          <Globe origins={["Japan"]} destination="Global" />
        </div>

        {/* Right Column: Global Overview + Alerts */}
        <div className="col-span-3 space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider">Sales Analytics</h3>
            <div className="card-white p-6 space-y-4">
              <OverviewItem label="TOP REGION" value="Europe" sub="38% share" icon="🇪🇺" />
              <div className="border-t border-[#E5E7EB]" />
              <OverviewItem label="SUCCESS RATE" value="98.5%" sub="+2.1% MoM" subColor="text-green-600" />
              <div className="border-t border-[#E5E7EB]" />
              <OverviewItem label="RETURN RATE" value="0.8%" sub="Stable" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider">Supplier Alerts</h3>
            <div className="space-y-3">
              <AlertItem 
                type="warning"
                title="Low stock warning"
                desc="Item #XJ-900 (Auto Parts) is below 15% threshold."
              />
              <AlertItem 
                type="success"
                title="High demand region"
                desc="Demand for Electronics in Brazil increased by 25%."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Additional Widgets */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8 card-white p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                <Package className="text-[#FF6A00]" />
              </div>
              <h3 className="font-bold text-lg">Product Listings & Inventory</h3>
            </div>
            <button className="text-sm font-bold text-[#FF6A00] hover:underline">Manage Inventory</button>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {[
              { name: "CPU Units", stock: 120, price: "$450" },
              { name: "GPU Boards", stock: 45, price: "$890" },
              { name: "Power Banks", stock: 890, price: "$25" },
              { name: "USB Hubs", stock: 12, price: "$15" },
            ].map((product) => (
              <div key={product.name} className="p-4 bg-[#F5F5F5] rounded-2xl border border-transparent hover:border-[#E5E7EB] transition-all">
                <p className="text-sm font-bold text-[#111111] mb-1">{product.name}</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Stock</p>
                    <p className={`text-sm font-bold ${product.stock < 20 ? "text-red-600" : "text-green-600"}`}>{product.stock}</p>
                  </div>
                  <p className="text-sm font-bold text-[#FF6A00]">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-4 card-white p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <BarChart3 className="text-blue-600" />
            </div>
            <h3 className="font-bold text-lg">Demand Regions</h3>
          </div>
          <div className="space-y-4">
            {[
              { region: "São Paulo, Brazil", growth: "+25%", color: "text-green-600" },
              { region: "Berlin, Germany", growth: "+12%", color: "text-green-600" },
              { region: "New York, USA", growth: "-3%", color: "text-red-600" },
            ].map((item) => (
              <div key={item.region} className="flex items-center justify-between p-4 bg-[#F5F5F5] rounded-xl">
                <span className="text-sm font-bold text-[#111111]">{item.region}</span>
                <div className="flex items-center gap-1">
                  <TrendingUp size={14} className={item.color} />
                  <span className={`text-xs font-bold ${item.color}`}>{item.growth}</span>
                </div>
              </div>
            ))}
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
          <Truck size={20} className="text-[#FF6A00]" />
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
