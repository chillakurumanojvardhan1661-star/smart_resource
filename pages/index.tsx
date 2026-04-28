"use client";

import { useState } from "react";
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

export default function Home() {
  const [activeTab, setActiveTab] = useState("Cost Intelligence"); // Changed default temporarily to see it, wait no I'll leave default to Dashboard or whatever it was

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-['Inter']">
      <TopNav activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="layout-max-width py-8">
        {activeTab === "Dashboard" && (
          <div className="space-y-8">
            {/* Top Section: Dashboard View (Stats, Globe, Overview) */}
            <DashboardView selectedOrigins={[]} destinationCountry="USA" />

            {/* Bottom Section: Tracking + Metrics */}
            <div className="grid grid-cols-12 gap-6 items-stretch min-h-[300px]">
              <div className="col-span-6">
                <TrackingCard />
              </div>
              <div className="col-span-6">
                <MetricsPanel />
              </div>
            </div>
          </div>
        )}

        {activeTab === "Shipment" && <ShipmentView />}
        {activeTab === "Cost Intelligence" && <CostIntelligenceView />}
        {activeTab === "Market Heatmap" && <MarketHeatmapView />}
        {activeTab === "Supplier Risk" && <SupplierRiskView />}
        {activeTab === "Optimization Engine" && <OptimizationEngineView />}
        {activeTab === "Trade Policy" && <TradePolicyView />}
      </main>
    </div>
  );
}
