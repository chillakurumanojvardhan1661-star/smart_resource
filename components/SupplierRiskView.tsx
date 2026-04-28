import React from "react";

const SUPPLIERS = [
  { name: "Global Freight Ltd", rating: "4.8", stability: "98%", delivery: "99%", status: "Reliable" },
  { name: "Oceanic Transport", rating: "4.2", stability: "85%", delivery: "90%", status: "Moderate" },
  { name: "FastLine Logistics", rating: "3.5", stability: "70%", delivery: "82%", status: "Risky" },
  { name: "Apex Supply Co.", rating: "4.9", stability: "99%", delivery: "98%", status: "Reliable" },
  { name: "Horizon Cargo", rating: "4.0", stability: "88%", delivery: "85%", status: "Moderate" },
];

export default function SupplierRiskView() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-[32px] font-bold text-[#111111] leading-tight">Supplier Risk</h1>
        <p className="text-[14px] text-[#6B7280]">Supplier Reliability Engine & Performance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Panel: Overall Score Card */}
        <div className="lg:col-span-4 card-white p-8 flex flex-col justify-center items-center text-center">
          <h2 className="text-[16px] font-bold text-[#111111] mb-2">Network Trust Score</h2>
          <p className="text-[12px] text-[#6B7280] mb-8">Aggregated supplier reliability</p>
          
          <div className="relative w-40 h-40 flex items-center justify-center rounded-full border-8 border-[#F5F5F5]">
            {/* Simple circular progress visualization (static) */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" fill="none" stroke="#E5E7EB" strokeWidth="8" />
              <circle cx="50" cy="50" r="46" fill="none" stroke="#FF6A00" strokeWidth="8" strokeDasharray="289" strokeDashoffset="40" strokeLinecap="round" />
            </svg>
            <div className="flex flex-col items-center">
              <span className="text-[40px] font-black text-[#111111] tracking-tight">86</span>
              <span className="text-[12px] font-bold text-[#6B7280] uppercase">/ 100</span>
            </div>
          </div>

          <div className="mt-8 flex gap-4 w-full">
            <div className="flex-1 p-3 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
              <div className="text-[12px] font-bold text-[#6B7280] uppercase mb-1">Active</div>
              <div className="text-[20px] font-bold text-[#111111]">24</div>
            </div>
            <div className="flex-1 p-3 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
              <div className="text-[12px] font-bold text-[#6B7280] uppercase mb-1">At Risk</div>
              <div className="text-[20px] font-bold text-[#FF6A00]">3</div>
            </div>
          </div>
        </div>

        {/* Right Panel: Supplier Table */}
        <div className="lg:col-span-8 card-white overflow-hidden flex flex-col">
          <div className="p-6 border-b border-[#E5E7EB] flex justify-between items-center bg-[#F9FAFB]">
            <h2 className="text-[16px] font-bold text-[#111111]">Supplier Performance Directory</h2>
            <button className="text-[14px] font-bold text-[#FF6A00]">View All</button>
          </div>
          
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse h-full">
              <thead>
                <tr className="border-b border-[#E5E7EB]">
                  <th className="p-6 text-[12px] font-bold text-[#6B7280] uppercase tracking-wider">Supplier Name</th>
                  <th className="p-6 text-[12px] font-bold text-[#6B7280] uppercase tracking-wider">Rating</th>
                  <th className="p-6 text-[12px] font-bold text-[#6B7280] uppercase tracking-wider">Price Stability</th>
                  <th className="p-6 text-[12px] font-bold text-[#6B7280] uppercase tracking-wider">Delivery Perf.</th>
                  <th className="p-6 text-[12px] font-bold text-[#6B7280] uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {SUPPLIERS.map((supplier, idx) => (
                  <tr key={idx} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors last:border-0">
                    <td className="p-6 text-[14px] font-bold text-[#111111]">{supplier.name}</td>
                    <td className="p-6 text-[14px] font-semibold text-[#111111] flex items-center gap-1">
                      <span className="text-[#FF6A00]">★</span> {supplier.rating}
                    </td>
                    <td className="p-6 text-[14px] font-semibold text-[#111111]">{supplier.stability}</td>
                    <td className="p-6 text-[14px] font-semibold text-[#111111]">{supplier.delivery}</td>
                    <td className="p-6">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[12px] font-bold border
                        ${supplier.status === 'Reliable' ? 'bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]' : 
                          supplier.status === 'Moderate' ? 'bg-[#FEFCE8] text-[#D97706] border-[#FDE68A]' : 
                          'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]'}`}
                      >
                        <span className="text-[10px]">
                          {supplier.status === 'Reliable' ? '🟢' : supplier.status === 'Moderate' ? '🟡' : '🔴'}
                        </span>
                        {supplier.status}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
