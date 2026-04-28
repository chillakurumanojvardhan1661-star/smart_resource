import React from "react";

export default function OptimizationEngineView() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-[32px] font-bold text-[#111111] leading-tight">Optimization Engine</h1>
        <p className="text-[14px] text-[#6B7280]">Budget & Allocation Intelligence</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Panel: Inputs */}
        <div className="lg:col-span-4 card-white p-8">
          <h2 className="text-[18px] font-bold text-[#111111] mb-6">Optimization Parameters</h2>
          
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold text-[#6B7280] uppercase tracking-wider">Total Budget</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280] font-semibold">$</span>
                <input type="text" className="input w-full pl-8" defaultValue="5,000,000" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold text-[#6B7280] uppercase tracking-wider">Target Demand (Units)</label>
              <input type="text" className="input w-full" defaultValue="85,000" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold text-[#6B7280] uppercase tracking-wider">Supplier Scope</label>
              <select className="input w-full appearance-none bg-white">
                <option>All Qualified Suppliers (Tier 1 & 2)</option>
                <option>Tier 1 Only</option>
                <option>Low Risk Only</option>
              </select>
            </div>
            
            <div className="pt-4 border-t border-[#E5E7EB]">
              <button className="btn-primary w-full">Run Optimization</button>
            </div>
          </div>
        </div>

        {/* Right Panel: Output & Visuals */}
        <div className="lg:col-span-8 space-y-6 flex flex-col">
          {/* Top metric row */}
          <div className="grid grid-cols-2 gap-6">
            <div className="card-white p-6 flex flex-col justify-center">
              <span className="text-[12px] font-bold text-[#6B7280] uppercase tracking-wider mb-2">Estimated Total Cost</span>
              <span className="text-[32px] font-black text-[#111111] tracking-tight">$4,850,200</span>
              <span className="text-[14px] font-semibold text-[#FF6A00] mt-2">Within Budget</span>
            </div>
            <div className="p-6 flex flex-col justify-center bg-[#FF6A00] rounded-xl">
              <span className="text-[12px] font-bold text-white uppercase tracking-wider mb-2 opacity-90">Savings vs Standard Allocation</span>
              <span className="text-[32px] font-black text-white tracking-tight">$425,000</span>
              <span className="text-[14px] font-semibold text-white mt-2 opacity-90">↓ 8.5% Cost Reduction</span>
            </div>
          </div>

          {/* Allocation Distribution */}
          <div className="card-white p-8 flex-1 flex flex-col">
            <h2 className="text-[16px] font-bold text-[#111111] mb-6">Recommended Purchase Distribution</h2>
            
            <div className="space-y-6 flex-1 flex flex-col justify-center">
              {/* Distribution Bar 1 */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[14px] font-bold text-[#111111]">Global Freight Ltd</span>
                  <div className="text-right">
                    <span className="text-[14px] font-bold text-[#111111]">45%</span>
                    <span className="text-[12px] text-[#6B7280] ml-2">(38,250 units)</span>
                  </div>
                </div>
                <div className="h-4 w-full bg-[#F5F5F5] rounded-full overflow-hidden border border-[#E5E7EB]">
                  <div className="h-full bg-[#FF6A00] w-[45%] rounded-full border-r border-[#FF6A00]"></div>
                </div>
              </div>

              {/* Distribution Bar 2 */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[14px] font-bold text-[#111111]">Apex Supply Co.</span>
                  <div className="text-right">
                    <span className="text-[14px] font-bold text-[#111111]">35%</span>
                    <span className="text-[12px] text-[#6B7280] ml-2">(29,750 units)</span>
                  </div>
                </div>
                <div className="h-4 w-full bg-[#F5F5F5] rounded-full overflow-hidden border border-[#E5E7EB]">
                  <div className="h-full bg-[#111111] w-[35%] rounded-full border-r border-[#111111]"></div>
                </div>
              </div>

              {/* Distribution Bar 3 */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[14px] font-bold text-[#111111]">Oceanic Transport</span>
                  <div className="text-right">
                    <span className="text-[14px] font-bold text-[#111111]">20%</span>
                    <span className="text-[12px] text-[#6B7280] ml-2">(17,000 units)</span>
                  </div>
                </div>
                <div className="h-4 w-full bg-[#F5F5F5] rounded-full overflow-hidden border border-[#E5E7EB]">
                  <div className="h-full bg-[#6B7280] w-[20%] rounded-full border-r border-[#6B7280]"></div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
