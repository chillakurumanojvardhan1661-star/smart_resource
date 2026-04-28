import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ResultsTableProps {
  options: any[];
}

const ResultsTable: React.FC<ResultsTableProps> = ({ options }) => {
  if (!options || options.length === 0) return null;

  return (
    <div className="card-light overflow-hidden">
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <h2 className="text-xl font-bold text-gray-800">Network Ranking Matrix</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-[10px] uppercase tracking-widest font-bold">
            <tr>
              <th className="px-6 py-4">Sourcing Node</th>
              <th className="px-6 py-4">Efficiency Score</th>
              <th className="px-6 py-4">Est. Margin</th>
              <th className="px-6 py-4">Demand</th>
              <th className="px-6 py-4">Risk</th>
              <th className="px-6 py-4 text-right">Confidence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {options.map((opt, index) => (
              <motion.tr
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                key={opt.origin_country}
                className={`hover:bg-orange-50/50 transition-colors group ${index === 0 ? 'bg-orange-50/30' : ''}`}
              >
                <td className="px-6 py-5 font-bold text-gray-800 flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${
                    index === 0 ? 'bg-orange-500 text-white shadow-md shadow-orange-200' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <div className={index === 0 ? 'text-orange-600 font-bold' : 'text-gray-800'}>{opt.origin_country}</div>
                    <div className="text-[10px] text-gray-400 font-mono uppercase tracking-tighter">VERIFIED NODE</div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-orange-500 h-full rounded-full" style={{ width: `${Number(opt.score) || 0}%` }} />
                    </div>
                    <span className="font-mono font-bold text-orange-600">{(Number(opt.score) || 0).toFixed(1)}%</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-1.5 text-green-600 font-bold">
                    <TrendingUp size={14} />
                    {(Number(opt.profit_margin) || 0).toFixed(1)}%
                  </div>
                </td>
                <td className="px-6 py-5 text-gray-600 font-mono">{opt.demand}</td>
                <td className="px-6 py-5">
                  <span className={`flex items-center gap-1.5 font-bold ${(Number(opt.risk) || 0) < 0.3 ? 'text-green-600' : (Number(opt.risk) || 0) < 0.5 ? 'text-yellow-600' : 'text-red-500'}`}>
                    {(Number(opt.risk) || 0) < 0.5 ? <TrendingDown size={14} className="rotate-180" /> : <TrendingDown size={14} />}
                    {((Number(opt.risk) || 0) * 100).toFixed(0)}%
                  </span>
                </td>
                <td className="px-6 py-5 text-right text-orange-600 font-mono font-bold">
                  {((Number(opt.confidence) || 0) * 100).toFixed(0)}%
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable;
