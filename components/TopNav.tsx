"use client";
import React, { useState } from "react";
import { Search, Bell, Settings, User, Zap, ChevronDown, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

interface TopNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const MAIN_NAV = [
  { id: "Dashboard", label: "Dashboard" },
  { id: "Store", label: "Store", roles: ["Supplier"] },
  { id: "Shipping", label: "Shipping" },
  { id: "Report", label: "Report" },
];

const INSIGHTS_NAV = [
  { id: "Cost Intelligence", label: "Cost Intelligence" },
  { id: "Market Heatmap", label: "Market Heatmap" },
  { id: "Supplier Risk", label: "Supplier Risk" },
  { id: "Optimization Engine", label: "Optimization Engine" },
  { id: "Trade Policy", label: "Trade Policy" },
];

export default function TopNav({ activeTab, onTabChange }: TopNavProps) {
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const filteredMainNav = MAIN_NAV.filter(item => 
    !item.roles || (user && item.roles.includes(user.role))
  );

  return (
    <nav className="h-[72px] bg-white border-b border-[#E5E7EB] sticky top-0 z-50 flex items-center justify-between px-8 font-['Inter']">
      {/* Left: Logo + Nav Items */}
      <div className="flex items-center gap-8">
        {/* Logo */}
        <div className="w-9 h-9 bg-[#FF6A00] rounded-xl flex items-center justify-center shadow-md shadow-orange-100">
          <Zap size={20} className="text-white fill-white" />
        </div>

        {/* Nav Items */}
        <div className="flex items-center gap-1">
          {filteredMainNav.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                activeTab === item.id
                  ? "bg-[#EEEEEE] text-[#111111]"
                  : "text-[#6B7280] hover:text-[#111111] hover:bg-gray-50"
              }`}
            >
              {item.label}
            </button>
          ))}

          {/* Insights Dropdown (Sourcing Company only) */}
          {user?.role === "Sourcing Company" && (
            <div className="relative">
              <button
                onClick={() => setIsInsightsOpen(!isInsightsOpen)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
                  INSIGHTS_NAV.some(i => i.id === activeTab)
                    ? "bg-[#EEEEEE] text-[#111111]"
                    : "text-[#6B7280] hover:text-[#111111] hover:bg-gray-50"
                }`}
              >
                Insights
                <ChevronDown size={14} className={`transition-transform ${isInsightsOpen ? 'rotate-180' : ''}`} />
              </button>

              {isInsightsOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white border border-[#E5E7EB] rounded-2xl shadow-xl py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  {INSIGHTS_NAV.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onTabChange(item.id);
                        setIsInsightsOpen(false);
                      }}
                      className="w-full px-6 py-3 text-left text-sm font-semibold text-[#6B7280] hover:text-[#FF6A00] hover:bg-orange-50 transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right: Search + Icons */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#F5F5F5] border border-[#E5E7EB] w-72 focus-within:border-[#FF6A00] focus-within:bg-white transition-all">
          <Search size={18} className="text-[#9CA3AF]" />
          <input
            placeholder="Search resources..."
            className="bg-transparent text-sm outline-none flex-1 text-[#111111] placeholder-[#9CA3AF] font-medium"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center text-[#6B7280] hover:text-[#FF6A00] hover:border-[#FF6A00] transition-all">
            <Bell size={20} />
          </button>
          
          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-10 h-10 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center text-[#6B7280] hover:border-[#FF6A00] transition-all overflow-hidden"
            >
              {user ? (
                <div className="w-full h-full bg-orange-100 flex items-center justify-center text-[#FF6A00] font-bold text-sm">
                  {user.name.charAt(0)}
                </div>
              ) : (
                <User size={20} />
              )}
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-[#E5E7EB] rounded-2xl shadow-xl py-3 animate-in fade-in slide-in-from-top-2 duration-200">
                {user && (
                  <div className="px-6 py-3 border-b border-[#F5F5F5] mb-2">
                    <p className="text-sm font-bold text-[#111111]">{user.name}</p>
                    <p className="text-xs text-[#6B7280] mt-0.5">{user.email}</p>
                    <div className={`mt-3 inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      user.role === 'Supplier' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                    }`}>
                      {user.role}
                    </div>
                  </div>
                )}
                <button className="w-full px-6 py-2.5 text-left text-sm font-semibold text-[#6B7280] hover:text-[#111111] hover:bg-gray-50 flex items-center gap-3">
                  <Settings size={16} /> Account Settings
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full px-6 py-2.5 text-left text-sm font-semibold text-red-600 hover:bg-red-50 flex items-center gap-3 mt-1"
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
