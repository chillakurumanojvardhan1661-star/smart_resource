import React from "react";
import Globe from "./Globe";

export default function MarketHeatmapView() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-[32px] font-bold text-[#111111] leading-tight">Market Heatmap</h1>
        <p className="text-[14px] text-[#6B7280]">Global Demand & Supply Visualization</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch min-h-[600px]">
        {/* Left Panel: Globe Visualization */}
        <div className="lg:col-span-8 card-white relative overflow-hidden flex items-center justify-center bg-[#F5F5F5]">
          <div className="absolute inset-0">
            <Globe />
          </div>
          {/* Overlay Markers for simulation, assuming 3D markers might be too complex or if Globe doesn't support them yet */}
          <div className="absolute top-6 left-6 flex gap-4 z-10">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#E5E7EB] shadow-sm">
              <span className="text-[14px]">🔥</span>
              <span className="text-[12px] font-bold text-[#111111]">Sell Zones (High Demand)</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#E5E7EB] shadow-sm">
              <span className="text-[14px]">📦</span>
              <span className="text-[12px] font-bold text-[#111111]">Buy Zones (Oversupply)</span>
            </div>
          </div>
        </div>

        {/* Right Panel: Side Panel Metrics */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="card-white p-6 flex-1">
            <h2 className="text-[18px] font-bold text-[#111111] mb-6">Regional Metrics</h2>
            
            <div className="space-y-6">
              <div className="p-4 border border-[#E5E7EB] rounded-xl bg-[#F9FAFB]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[14px] font-bold text-[#111111]">Western Europe</h3>
                  <span className="text-[12px] font-bold text-white bg-[#FF6A00] px-2 py-1 rounded-md">🔥 SELL</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-[12px] font-bold text-[#6B7280] mb-1 uppercase tracking-wider">
                      <span>Demand Index</span>
                      <span className="text-[#111111]">92/100</span>
                    </div>
                    <div className="h-2 w-full bg-[#E5E7EB] rounded-full overflow-hidden">
                      <div className="h-full bg-[#FF6A00] w-[92%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[12px] font-bold text-[#6B7280] mb-1 uppercase tracking-wider">
                      <span>Supply Index</span>
                      <span className="text-[#111111]">34/100</span>
                    </div>
                    <div className="h-2 w-full bg-[#E5E7EB] rounded-full overflow-hidden">
                      <div className="h-full bg-[#111111] w-[34%]"></div>
                    </div>
                  </div>
                  <div className="pt-2 mt-2 border-t border-[#E5E7EB] flex justify-between items-center">
                    <span className="text-[12px] font-bold text-[#6B7280] uppercase tracking-wider">Opp. Score</span>
                    <span className="text-[16px] font-black text-[#FF6A00]">8.9</span>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-[#E5E7EB] rounded-xl bg-[#F9FAFB]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[14px] font-bold text-[#111111]">Southeast Asia</h3>
                  <span className="text-[12px] font-bold text-[#111111] bg-[#E5E7EB] px-2 py-1 rounded-md">📦 BUY</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-[12px] font-bold text-[#6B7280] mb-1 uppercase tracking-wider">
                      <span>Demand Index</span>
                      <span className="text-[#111111]">41/100</span>
                    </div>
                    <div className="h-2 w-full bg-[#E5E7EB] rounded-full overflow-hidden">
                      <div className="h-full bg-[#FF6A00] w-[41%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[12px] font-bold text-[#6B7280] mb-1 uppercase tracking-wider">
                      <span>Supply Index</span>
                      <span className="text-[#111111]">88/100</span>
                    </div>
                    <div className="h-2 w-full bg-[#E5E7EB] rounded-full overflow-hidden">
                      <div className="h-full bg-[#111111] w-[88%]"></div>
                    </div>
                  </div>
                  <div className="pt-2 mt-2 border-t border-[#E5E7EB] flex justify-between items-center">
                    <span className="text-[12px] font-bold text-[#6B7280] uppercase tracking-wider">Opp. Score</span>
                    <span className="text-[16px] font-black text-[#FF6A00]">9.4</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
