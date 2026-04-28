"use client";
import React from "react";

const ROUTE_CITIES = ["Denver", "Santa Fe", "Tulsa", "Dallas", "Atlanta"];
const ACTIVE_INDEX = 2;

export default function TrackingCard() {
  return (
    <div className="card-white flex h-full overflow-hidden">
      {/* Left: Map */}
      <div className="w-[180px] bg-[#F5F5F5] border-r border-[#E5E7EB] flex items-center justify-center p-4">
        <svg viewBox="0 0 160 120" className="w-full h-auto">
          <path d="M20,40 L30,35 L45,32 L60,30 L80,28 L95,30 L110,35 L125,38 L140,45 L142,55 L138,65 L130,72 L118,80 L105,85 L90,82 L75,78 L60,82 L45,85 L30,80 L22,70 L18,55 Z" fill="none" stroke="#FF6A00" strokeWidth="1" opacity="0.2" />
          <path d="M30,58 L55,52 L80,55 L105,60 L130,65" fill="none" stroke="#FF6A00" strokeWidth="2" strokeDasharray="4 2" />
          {[[30,58],[55,52],[80,55],[105,60],[130,65]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r={i===ACTIVE_INDEX?4:2} fill={i<=ACTIVE_INDEX?"#FF6A00":"#D1D5DB"} />
          ))}
        </svg>
      </div>

      {/* Right: Info */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[#111111]">Order ID:</span>
            <span className="text-sm font-medium text-[#6B7280]">#YHJ200322</span>
          </div>
          <span className="bg-[#FF6A00] text-white text-[12px] font-bold px-3 py-1 rounded-lg">In Transit</span>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between mb-6">
          {ROUTE_CITIES.map((city, i) => (
            <div key={city} className="flex flex-col items-center flex-1">
              <span className={`text-[10px] font-bold mb-2 ${i<=ACTIVE_INDEX?"text-[#111111]":"text-[#D1D5DB]"}`}>{city}</span>
              <div className="flex items-center w-full">
                <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${i<=ACTIVE_INDEX?"bg-[#FF6A00]":"bg-[#D1D5DB]"}`} />
                {i < ROUTE_CITIES.length - 1 && (
                  <div className={`h-[1px] w-full ${i<ACTIVE_INDEX?"bg-[#FF6A00]":"bg-[#D1D5DB]"}`} />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E5E7EB]">
          <div>
            <p className="text-[10px] font-bold text-[#6B7280] uppercase mb-1">Current location</p>
            <p className="text-xs font-bold text-[#111111]">Little Rock, Arkansas</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#6B7280] uppercase mb-1">Kilometers left</p>
            <p className="text-xs font-bold text-[#111111]">24 km</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#6B7280] uppercase mb-1">Last stop</p>
            <p className="text-xs font-bold text-[#111111]">2 hours ago, Tulsa</p>
          </div>
        </div>
      </div>
    </div>
  );
}
