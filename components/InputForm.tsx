import React, { useState } from 'react';

interface InputFormProps {
  onAnalyze: (data: any) => void;
  loading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onAnalyze, loading }) => {
  const [formData, setFormData] = useState({
    product_name: '',
    destination_country: '',
    origin_options: '',
    quantity: 1000,
    weight: 2.5,
    selling_price: 1200
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'weight' || name === 'selling_price' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      origin_options: formData.origin_options.split(',').map(s => s.trim()).filter(s => s)
    };
    onAnalyze(payload);
  };

  const handleDemoMode = () => {
    const demoData = {
      product_name: 'Laptop',
      destination_country: 'USA',
      origin_options: 'China, India, Vietnam',
      quantity: 1000,
      weight: 2.5,
      selling_price: 1200
    };
    setFormData(demoData);
    const payload = {
      ...demoData,
      origin_options: demoData.origin_options.split(',').map(s => s.trim()).filter(s => s)
    };
    onAnalyze(payload);
  };

  return (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Trade Analysis Input</h2>
        <button 
          onClick={handleDemoMode}
          className="text-sm bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 px-3 py-1 rounded-md transition-colors"
        >
          Demo Mode
        </button>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Product Name</label>
          <input
            type="text"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="e.g. Laptop"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Destination Country</label>
          <input
            type="text"
            name="destination_country"
            value={formData.destination_country}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="e.g. USA"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-400 mb-1">Origin Options (comma separated)</label>
          <input
            type="text"
            name="origin_options"
            value={formData.origin_options}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="e.g. China, India, Vietnam"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Weight (kg/unit)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Selling Price ($/unit)</label>
          <input
            type="number"
            name="selling_price"
            value={formData.selling_price}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>
        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full btn-primary ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Analyzing Trade...' : 'Analyze Trade'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
