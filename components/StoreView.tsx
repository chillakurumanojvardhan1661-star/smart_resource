"use client";
import React, { useState } from "react";
import { Search, Plus, Filter, Star, Package, MoreVertical } from "lucide-react";

const PRODUCTS = [
  { id: 1, name: "Industrial Steel Coil", price: 1250, supplier: "Tata Steel", rating: 4.8, stock: "500 Tons", moq: "10 Tons" },
  { id: 2, name: "Lithium-Ion Battery Pack", price: 450, supplier: "CATL", rating: 4.9, stock: "12,000 Units", moq: "100 Units" },
  { id: 3, name: "Hydraulic Pump V3", price: 890, supplier: "Bosch Rexroth", rating: 4.7, stock: "850 Units", moq: "5 Units" },
  { id: 4, name: "Carbon Fiber Sheet", price: 120, supplier: "Toray Industries", rating: 4.6, stock: "2,500 Sqm", moq: "50 Sqm" },
  { id: 5, name: "Precision Bearing 608", price: 1.5, supplier: "SKF", rating: 4.9, stock: "150,000 Units", moq: "1,000 Units" },
  { id: 6, name: "Solar Panel 450W", price: 185, supplier: "Longi Solar", rating: 4.8, stock: "5,000 Units", moq: "20 Units" },
];

export default function StoreView() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.supplier.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 relative min-h-[calc(100vh-150px)]">
      {/* Header Area */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-[32px] font-bold text-[#111111] leading-tight">Store</h1>
          <p className="text-[14px] text-[#6B7280]">Manage your product catalog and suppliers</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-4">
        <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-[#E5E7EB]">
          <Search size={18} className="text-[#6B7280]" />
          <input
            type="text"
            placeholder="Search products, suppliers..."
            className="bg-transparent outline-none flex-1 text-sm text-[#111111]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="px-4 py-3 rounded-xl bg-white border border-[#E5E7EB] flex items-center gap-2 text-sm font-semibold text-[#111111]">
          <Filter size={18} className="text-[#6B7280]" />
          Filter
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div 
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className="card-white p-6 cursor-pointer hover:border-[#FF6A00] transition-colors group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-[#F5F5F5] rounded-xl flex items-center justify-center text-[#FF6A00]">
                <Package size={24} />
              </div>
              <button className="text-[#6B7280] opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical size={20} />
              </button>
            </div>
            
            <h3 className="text-lg font-bold text-[#111111] mb-1">{product.name}</h3>
            <p className="text-sm text-[#6B7280] mb-4">{product.supplier}</p>
            
            <div className="flex items-center gap-1 mb-4">
              <Star size={14} className="fill-[#FF6A00] text-[#FF6A00]" />
              <span className="text-sm font-bold text-[#111111]">{product.rating}</span>
            </div>

            <div className="pt-4 border-t border-[#E5E7EB] flex justify-between items-center">
              <div>
                <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Price</p>
                <p className="text-lg font-bold text-[#FF6A00]">${product.price.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Stock / MOQ</p>
                <p className="text-sm font-semibold text-[#111111]">{product.stock} / {product.moq}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Panel (Drawer style) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-black/20" onClick={() => setSelectedProduct(null)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-8 flex flex-col animate-in slide-in-from-right duration-300">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-8 right-8 text-[#6B7280] hover:text-[#111111]"
            >
              Close
            </button>
            
            <div className="mt-12">
              <div className="w-20 h-20 bg-[#F5F5F5] rounded-2xl flex items-center justify-center text-[#FF6A00] mb-6">
                <Package size={40} />
              </div>
              <h2 className="text-2xl font-bold text-[#111111] mb-2">{selectedProduct.name}</h2>
              <p className="text-[#6B7280] font-semibold mb-6">{selectedProduct.supplier}</p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="p-4 bg-[#F5F5F5] rounded-xl">
                  <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider mb-1">Unit Price</p>
                  <p className="text-xl font-bold text-[#FF6A00]">${selectedProduct.price}</p>
                </div>
                <div className="p-4 bg-[#F5F5F5] rounded-xl">
                  <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider mb-1">Rating</p>
                  <p className="text-xl font-bold text-[#111111]">{selectedProduct.rating} / 5.0</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-[#E5E7EB]">
                  <span className="text-sm text-[#6B7280]">Inventory Stock</span>
                  <span className="text-sm font-bold text-[#111111]">{selectedProduct.stock}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-[#E5E7EB]">
                  <span className="text-sm text-[#6B7280]">Minimum Order</span>
                  <span className="text-sm font-bold text-[#111111]">{selectedProduct.moq}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-[#E5E7EB]">
                  <span className="text-sm text-[#6B7280]">Lead Time</span>
                  <span className="text-sm font-bold text-[#111111]">12-15 Days</span>
                </div>
              </div>

              <button className="btn-primary w-full py-4">Update Inventory</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
