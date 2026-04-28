"use client";
import React from "react";
import { Search, Bell, Settings, User, Zap } from "lucide-react";

const NAV_ITEMS = ["Dashboard", "Inventory", "Shipment", "Cost Intelligence", "Market Heatmap", "Supplier Risk", "Optimization Engine", "Trade Policy", "Customers", "Store", "Report"];

interface TopNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function TopNav({ activeTab, onTabChange }: TopNavProps) {
  return (
    <nav className="h-[72px] bg-white border-b border-[#E5E7EB] sticky top-0 z-50 flex items-center justify-between px-8">
      {/* Left: Logo + Nav Items */}
      <div className="flex items-center gap-10">
        {/* Logo */}
        <div className="w-9 h-9 bg-[#FF6A00] rounded-xl flex items-center justify-center">
          <Zap size={20} className="text-white" />
        </div>

        {/* Nav Items */}
        <div className="flex items-center gap-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => onTabChange(item)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeTab === item
                  ? "bg-[#EEEEEE] text-[#111111]"
                  : "text-[#6B7280] hover:text-[#111111]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Right: Search + Icons */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5F5F5] border border-[#E5E7EB] w-64">
          <Search size={16} className="text-[#6B7280]" />
          <input
            placeholder="Search"
            className="bg-transparent text-sm outline-none flex-1 text-[#111111] placeholder-[#6B7280]"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center text-[#6B7280] hover:text-[#111111]">
            <Bell size={18} />
          </button>
          <button className="w-10 h-10 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center text-[#6B7280] hover:text-[#111111]">
            <Settings size={18} />
          </button>
          <button className="w-10 h-10 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center text-[#6B7280] hover:text-[#111111]">
            <User size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
}
