"use client";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell,
} from "recharts";

export default function MarketComparison({ data }: { data: any[] }) {
  if (!data || data.length === 0) return null;

  const chartData = data.map((item) => ({
    name: item.origin_country || item.name,
    score: item.score,
    margin: item.profit_margin || item.score * 1.2,
  }));

  return (
    <div className="card-light p-8 h-full min-h-[400px] flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold mb-1 text-gray-800">Comparative Analysis</h3>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">Sourcing Efficiency Matrix</p>
        </div>
      </div>
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E8600A" stopOpacity={1} />
                <stop offset="100%" stopColor="#FF8C42" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                boxShadow: '0 10px 24px rgba(0,0,0,0.08)',
                color: '#1A1A1A'
              }}
              itemStyle={{ color: '#E8600A' }}
              cursor={{ fill: 'rgba(232, 96, 10, 0.04)' }}
            />
            <Bar dataKey="score" radius={[6, 6, 0, 0]} barSize={40}>
              {chartData.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? "url(#barGradient)" : "rgba(0,0,0,0.08)"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
