import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, ShieldAlert, BarChart3, Zap, Target } from 'lucide-react';

interface RecommendationCardProps {
  data: {
    origin_country: string;
    score: number;
    profit_margin: number;
    demand: number;
    risk: number;
    confidence: number;
  };
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ data }) => {
  return (
    <div className="card-elevated p-10 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/5 blur-[120px] rounded-full -mr-20 -mt-20 group-hover:bg-orange-500/10 transition-colors duration-700" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-200">
              <Target size={28} />
            </div>
            <div>
              <div className="text-orange-600 font-bold tracking-widest text-[10px] uppercase mb-1 flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                Optimal Strategic Match
              </div>
              <h2 className="text-5xl font-black tracking-tighter text-gray-900">{data.origin_country}</h2>
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-2xl flex items-center gap-4 min-w-[200px]">
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
              <Zap size={20} />
            </div>
            <div>
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">AI Score</div>
              <div className="text-2xl font-black text-gray-800 font-mono">{(Number(data.score) || 0).toFixed(1)}%</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <StatItem label="Est. Margin" value={`${(Number(data.profit_margin) || 0).toFixed(1)}%`} color="text-green-600" icon={<TrendingUp size={14} />} />
          <StatItem label="Market Demand" value={(data.demand || 0).toString()} color="text-amber-600" icon={<BarChart3 size={14} />} />
          <StatItem label="Risk Index" value={`${((Number(data.risk) || 0) * 100).toFixed(0)}%`} color="text-red-500" icon={<ShieldAlert size={14} />} />
          <StatItem label="Confidence" value={`${((Number(data.confidence) || 0) * 100).toFixed(0)}%`} color="text-orange-600" icon={<Sparkles size={14} />} />
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest">Weight Distribution</h3>
            <span className="text-[10px] text-gray-400 font-mono">NEURAL WEIGHTS V4</span>
          </div>
          <div className="space-y-5">
            <WeightBar label="Profitability Impact" value={40} current={Number(data.profit_margin) || 0} color="bg-green-500" />
            <WeightBar label="Demand Resilience" value={30} current={75} color="bg-amber-500" />
            <WeightBar label="Geopolitical Stability" value={30} current={(1 - (Number(data.risk) || 0)) * 100} color="bg-orange-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ label, value, color, icon }: { label: string; value: string; color: string; icon: any }) => (
  <div className="space-y-1">
    <div className="flex items-center gap-1.5 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
      {icon}{label}
    </div>
    <div className={`text-3xl font-black tracking-tighter ${color}`}>{value}</div>
  </div>
);

const WeightBar = ({ label, value, current, color }: { label: string; value: number; current: number; color: string }) => (
  <div>
    <div className="flex justify-between items-end text-[10px] mb-2">
      <div className="flex items-center gap-2">
        <span className="text-gray-600 font-bold uppercase">{label}</span>
        <span className="bg-gray-200 px-1.5 py-0.5 rounded text-gray-500">Weight: {value}%</span>
      </div>
      <span className="text-gray-700 font-mono font-bold">{current.toFixed(0)}% PERFORMANCE</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${current}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`${color} h-full rounded-full`}
      />
    </div>
  </div>
);

export default RecommendationCard;
