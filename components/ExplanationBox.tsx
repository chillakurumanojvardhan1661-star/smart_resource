import React from 'react';
import { Lightbulb } from 'lucide-react';

interface ExplanationBoxProps {
  explanation: string;
}

const ExplanationBox: React.FC<ExplanationBoxProps> = ({ explanation }) => {
  return (
    <div className="bg-orange-50 border border-orange-200 p-6 rounded-xl flex gap-4 items-start">
      <div className="p-2 bg-orange-100 rounded-lg text-orange-600 mt-1 shrink-0">
        <Lightbulb size={24} />
      </div>
      <div>
        <h3 className="text-orange-700 font-bold mb-1 uppercase text-sm tracking-widest">AI Strategic Insight</h3>
        <p className="text-base text-gray-700 leading-relaxed italic">
          &ldquo;{explanation}&rdquo;
        </p>
      </div>
    </div>
  );
};

export default ExplanationBox;
