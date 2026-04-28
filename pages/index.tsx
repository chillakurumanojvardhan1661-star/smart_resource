"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopNav from "../components/TopNav";
import DashboardView from "../components/DashboardView";
import ShipmentView from "../components/ShipmentView";
import TrackingCard from "../components/TrackingCard";
import MetricsPanel from "../components/MetricsPanel";
import CostIntelligenceView from "../components/CostIntelligenceView";
import MarketHeatmapView from "../components/MarketHeatmapView";
import SupplierRiskView from "../components/SupplierRiskView";
import OptimizationEngineView from "../components/OptimizationEngineView";
import TradePolicyView from "../components/TradePolicyView";
import SourcingDashboard from "../components/SourcingDashboard";
import SupplierDashboard from "../components/SupplierDashboard";
import StoreView from "../components/StoreView";
import ReportView from "../components/ReportView";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center font-['Inter']">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#FF6A00] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#6B7280] font-bold">Initializing Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-['Inter']">
      <TopNav activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="layout-max-width py-8">
        {activeTab === "Dashboard" && (
          user.role === "Supplier" ? <SupplierDashboard /> : <SourcingDashboard />
        )}

        {activeTab === "Store" && <StoreView />}
        {activeTab === "Shipment" && <ShipmentView />}
        {activeTab === "Shipping" && <ShipmentView />}
        {activeTab === "Report" && <ReportView />}
        
        {activeTab === "Cost Intelligence" && <CostIntelligenceView />}
        {activeTab === "Market Heatmap" && <MarketHeatmapView />}
        {activeTab === "Supplier Risk" && <SupplierRiskView />}
        {activeTab === "Optimization Engine" && <OptimizationEngineView />}
        {activeTab === "Trade Policy" && <TradePolicyView />}
      </main>
    </div>
  );
}
