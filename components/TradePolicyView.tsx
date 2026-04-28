import React, { useState } from "react";

export default function TradePolicyView() {
  const [selectedCountry, setSelectedCountry] = useState("China");

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-[32px] font-bold text-[#111111] leading-tight">Trade Policy</h1>
          <p className="text-[14px] text-[#6B7280]">Import/Export Intelligence & Compliance</p>
        </div>
        
        {/* Country Selector */}
        <div className="w-64">
          <label className="text-[12px] font-bold text-[#6B7280] uppercase tracking-wider block mb-2">Target Market</label>
          <div className="relative">
            <select 
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="input w-full appearance-none bg-white font-bold text-[#111111]"
            >
              <option value="China">China</option>
              <option value="United States">United States</option>
              <option value="European Union">European Union</option>
              <option value="India">India</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#6B7280]">
              ▼
            </div>
          </div>
        </div>
      </div>

      {/* Alert System */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] flex items-start gap-4">
          <div className="text-[24px]">✅</div>
          <div>
            <h3 className="text-[14px] font-bold text-[#059669] mb-1">Best time to buy</h3>
            <p className="text-[14px] text-[#047857]">Tariffs on electronics are temporarily reduced by 5% until end of Q3. Optimal procurement window.</p>
          </div>
        </div>
        <div className="p-4 rounded-xl border border-[#FECACA] bg-[#FEF2F2] flex items-start gap-4">
          <div className="text-[24px]">⚠️</div>
          <div>
            <h3 className="text-[14px] font-bold text-[#DC2626] mb-1">Avoid trade now</h3>
            <p className="text-[14px] text-[#B91C1C]">Pending regulatory changes in agricultural imports may cause customs delays of up to 14 days.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Tariffs Panel */}
        <div className="card-white p-6">
          <h2 className="text-[16px] font-bold text-[#111111] mb-6 flex items-center gap-2">
            <span className="text-[#FF6A00] text-[18px]">💰</span> Tariffs & Duties
          </h2>
          <div className="space-y-4">
            <div className="pb-4 border-b border-[#E5E7EB]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[14px] font-bold text-[#111111]">Electronics</span>
                <span className="text-[14px] font-bold text-[#FF6A00]">12.5%</span>
              </div>
              <p className="text-[12px] text-[#6B7280]">Standard import duty</p>
            </div>
            <div className="pb-4 border-b border-[#E5E7EB]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[14px] font-bold text-[#111111]">Raw Materials</span>
                <span className="text-[14px] font-bold text-[#111111]">2.0%</span>
              </div>
              <p className="text-[12px] text-[#6B7280]">Subsidized rate active</p>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[14px] font-bold text-[#111111]">Automotive Parts</span>
                <span className="text-[14px] font-bold text-[#FF6A00]">25.0%</span>
              </div>
              <p className="text-[12px] text-[#6B7280]">High tariff zone</p>
            </div>
          </div>
        </div>

        {/* Restrictions Panel */}
        <div className="card-white p-6">
          <h2 className="text-[16px] font-bold text-[#111111] mb-6 flex items-center gap-2">
            <span className="text-[#FF6A00] text-[18px]">🛑</span> Restrictions & Compliance
          </h2>
          <div className="space-y-4">
            <div className="p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl">
              <span className="inline-block px-2 py-1 bg-[#111111] text-white text-[10px] font-bold uppercase rounded mb-2">License Required</span>
              <h4 className="text-[14px] font-bold text-[#111111]">Medical Equipment</h4>
              <p className="text-[12px] text-[#6B7280] mt-1">Class II and III devices require pre-market approval.</p>
            </div>
            <div className="p-3 bg-[#FEF2F2] border border-[#FECACA] rounded-xl">
              <span className="inline-block px-2 py-1 bg-[#DC2626] text-white text-[10px] font-bold uppercase rounded mb-2">Active Ban</span>
              <h4 className="text-[14px] font-bold text-[#DC2626]">Specific Tech Components</h4>
              <p className="text-[12px] text-[#B91C1C] mt-1">Export ban in effect for high-end microprocessors.</p>
            </div>
          </div>
        </div>

        {/* Seasonal Trends Panel */}
        <div className="card-white p-6">
          <h2 className="text-[16px] font-bold text-[#111111] mb-6 flex items-center gap-2">
            <span className="text-[#FF6A00] text-[18px]">📊</span> Seasonal Trends
          </h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-[14px] font-bold text-[#111111]">Q3 Logistics Demand</span>
                <span className="text-[14px] font-bold text-[#FF6A00]">High</span>
              </div>
              <div className="flex h-12 items-end gap-1">
                <div className="bg-[#E5E7EB] flex-1 h-[40%] rounded-t-sm"></div>
                <div className="bg-[#E5E7EB] flex-1 h-[60%] rounded-t-sm"></div>
                <div className="bg-[#FF6A00] flex-1 h-[90%] rounded-t-sm relative">
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-bold">Now</span>
                </div>
                <div className="bg-[#111111] flex-1 h-[100%] rounded-t-sm"></div>
                <div className="bg-[#E5E7EB] flex-1 h-[80%] rounded-t-sm"></div>
                <div className="bg-[#E5E7EB] flex-1 h-[50%] rounded-t-sm"></div>
              </div>
              <p className="text-[12px] text-[#6B7280] mt-3">Peak shipping season approaching. Expect 15% rate increases in coming weeks.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
