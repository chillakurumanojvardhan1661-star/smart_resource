import React, { useState } from "react";

export default function CostIntelligenceView() {
  const [exportValue, setExportValue] = useState(125000);
  const [shippingCost, setShippingCost] = useState(14200);
  const [currencyRate, setCurrencyRate] = useState(1.0);
  const [temperature, setTemperature] = useState(45);
  const [demandIndex, setDemandIndex] = useState(85);

  const [isLoading, setIsLoading] = useState(false);
  const [predictionData, setPredictionData] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const calculateCost = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          export_value: Number(exportValue),
          shipping_cost: Number(shippingCost),
          currency_rate: Number(currencyRate),
          temperature: Number(temperature),
          demand_index: Number(demandIndex),
        }),
      });

      if (!response.ok) throw new Error("API error");
      const data = await response.json();
      setPredictionData(data);
    } catch (err) {
      console.error(err);
      alert("Failed to calculate. Ensure backend is running on port 8000.");
    } finally {
      setIsLoading(false);
    }
  };

  // Derive display values
  const riskPremium = predictionData ? Math.round(predictionData.metrics.predicted_trade_score * 45) : 4650;
  const landedCost = Number(exportValue) + Number(shippingCost) + riskPremium;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-[32px] font-bold text-[#111111] leading-tight">Cost Intelligence</h1>
        <p className="text-[14px] text-[#6B7280]">True Cost Calculator & Margin Analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Panel: Inputs */}
        <div className="lg:col-span-8 card-white p-8">
          <h2 className="text-[18px] font-bold text-[#111111] mb-6">Cost Parameters</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold text-[#6B7280] uppercase tracking-wider">Export Value</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280] font-semibold">$</span>
                <input 
                  type="number" 
                  className="input w-full pl-8" 
                  value={exportValue} 
                  onChange={(e) => setExportValue(Number(e.target.value))} 
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold text-[#6B7280] uppercase tracking-wider">Shipping Cost</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280] font-semibold">$</span>
                <input 
                  type="number" 
                  className="input w-full pl-8" 
                  value={shippingCost} 
                  onChange={(e) => setShippingCost(Number(e.target.value))} 
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold text-[#6B7280] uppercase tracking-wider">Currency Rate</label>
              <input 
                type="number" 
                step="0.01"
                className="input w-full" 
                value={currencyRate} 
                onChange={(e) => setCurrencyRate(Number(e.target.value))} 
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold text-[#6B7280] uppercase tracking-wider">Demand Index</label>
              <input 
                type="number" 
                className="input w-full" 
                value={demandIndex} 
                onChange={(e) => setDemandIndex(Number(e.target.value))} 
              />
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-[12px] font-bold text-[#6B7280] uppercase tracking-wider">Temperature (Risk Factor)</label>
              <div className="flex items-center gap-4">
                <input 
                  type="range" 
                  className="flex-1 accent-[#FF6A00]" 
                  min="0" max="100" 
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                />
                <span className="text-[14px] font-semibold text-[#111111] min-w-[30px]">{temperature}°</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button 
              onClick={calculateCost}
              disabled={isLoading}
              className="btn-primary flex items-center justify-center min-w-[200px]"
            >
              {isLoading ? "Analyzing..." : "Calculate Landed Cost"}
            </button>
          </div>
        </div>

        {/* Right Panel: Output */}
        <div className="lg:col-span-4 p-8 flex flex-col justify-center bg-[#111111] rounded-xl relative overflow-hidden">
          {predictionData && (
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1
              bg-[#FF6A00] text-white">
              Risk: {predictionData.risk_level}
            </div>
          )}

          <p className="text-[12px] font-bold text-[#6B7280] uppercase tracking-wider mb-2 text-center mt-4">Final Landed Cost</p>
          <div className="text-center">
            <span className="text-[48px] font-black text-[#FF6A00] tracking-tight">
              {mounted ? `$${landedCost.toLocaleString()}` : "$0"}
            </span>
          </div>

          <div className="mt-6 p-4 rounded-xl border border-[#333333] bg-[#1A1A1A]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[14px] text-[#A3A3A3]">Base Cost</span>
              <span className="text-[14px] text-white font-semibold">{mounted ? `$${exportValue.toLocaleString()}` : "$0"}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[14px] text-[#A3A3A3]">Logistics</span>
              <span className="text-[14px] text-white font-semibold">{mounted ? `$${shippingCost.toLocaleString()}` : "$0"}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-[#333333]">
              <span className="text-[14px] text-[#A3A3A3]">Est. Risk Premium</span>
              <span className="text-[14px] text-[#FF6A00] font-semibold">{mounted ? `+$${riskPremium.toLocaleString()}` : "+$0"}</span>
            </div>
          </div>

          {predictionData && (
            <div className="mt-4 text-center">
              <p className="text-[13px] text-white">{predictionData.recommendation}</p>
              <p className="text-[10px] text-[#6B7280] mt-1">Confidence: {predictionData.confidence * 100}%</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Panel: Comparison Table */}
      <div className="card-white overflow-hidden">
        <div className="p-6 border-b border-[#E5E7EB] bg-[#F9FAFB]">
          <h2 className="text-[16px] font-bold text-[#111111]">Regional Profit Margin Comparison</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E5E7EB]">
                <th className="p-6 text-[12px] font-bold text-[#6B7280] uppercase tracking-wider w-[25%]">Region</th>
                <th className="p-6 text-[12px] font-bold text-[#6B7280] uppercase tracking-wider w-[25%]">Est. Landed Cost</th>
                <th className="p-6 text-[12px] font-bold text-[#6B7280] uppercase tracking-wider w-[25%]">Market Price</th>
                <th className="p-6 text-[12px] font-bold text-[#6B7280] uppercase tracking-wider w-[25%]">Profit Margin</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors">
                <td className="p-6 text-[16px] font-semibold text-[#111111]">India</td>
                <td className="p-6 text-[16px] text-[#6B7280]">{mounted ? `$${Math.round(landedCost * 1.03).toLocaleString()}` : "$0"}</td>
                <td className="p-6 text-[16px] text-[#6B7280]">$185,000</td>
                <td className="p-6">
                  <span className="text-[16px] font-bold text-[#FF6A00]">19.8%</span>
                </td>
              </tr>
              <tr className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors">
                <td className="p-6 text-[16px] font-semibold text-[#111111]">United Arab Emirates</td>
                <td className="p-6 text-[16px] text-[#6B7280]">{mounted ? `$${Math.round(landedCost * 0.98).toLocaleString()}` : "$0"}</td>
                <td className="p-6 text-[16px] text-[#6B7280]">$192,000</td>
                <td className="p-6">
                  <span className="text-[16px] font-bold text-[#FF6A00]">26.3%</span>
                </td>
              </tr>
              <tr className="hover:bg-[#F9FAFB] transition-colors">
                <td className="p-6 text-[16px] font-semibold text-[#111111]">United States</td>
                <td className="p-6 text-[16px] text-[#6B7280]">{mounted ? `$${Math.round(landedCost).toLocaleString()}` : "$0"}</td>
                <td className="p-6 text-[16px] text-[#6B7280]">$178,500</td>
                <td className="p-6">
                  <span className="text-[16px] font-bold text-[#FF6A00]">19.4%</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
