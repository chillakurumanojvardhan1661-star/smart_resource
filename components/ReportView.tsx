"use client";
import React from "react";
import { MessageSquare, Paperclip, Send, Clock, CheckCircle, AlertCircle } from "lucide-react";

const COMPLAINTS = [
  { id: 1, subject: "Delay in Shipment #SH-9920", category: "Shipment", status: "Open", date: "2024-04-28", desc: "Package has been stuck at Mumbai port for 3 days." },
  { id: 2, subject: "Incorrect Invoice Amount", category: "Payment", status: "Resolved", date: "2024-04-25", desc: "Double charge on transaction TX-441." },
  { id: 3, subject: "Damaged Items - Order #221", category: "Supplier", status: "Pending", date: "2024-04-20", desc: "3 boxes received with crushed corners." },
];

export default function ReportView() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[32px] font-bold text-[#111111] leading-tight">Report</h1>
        <p className="text-[14px] text-[#6B7280]">Submit a complaint or track previous reports</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Section */}
        <div className="lg:col-span-7 card-white p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[#F5F5F5] rounded-xl flex items-center justify-center text-[#FF6A00]">
              <MessageSquare size={20} />
            </div>
            <h2 className="text-xl font-bold text-[#111111]">Submit New Complaint</h2>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-[#6B7280] uppercase tracking-wider">Subject</label>
              <input type="text" className="input w-full" placeholder="Brief summary of the issue" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-[#6B7280] uppercase tracking-wider">Category</label>
                <select className="input w-full appearance-none bg-white">
                  <option>Supplier</option>
                  <option>Shipment</option>
                  <option>Payment</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-[#6B7280] uppercase tracking-wider">Attachment</label>
                <div className="flex items-center gap-2 px-4 py-3 border border-[#E5E7EB] rounded-xl cursor-pointer hover:bg-[#F5F5F5] transition-colors">
                  <Paperclip size={18} className="text-[#6B7280]" />
                  <span className="text-sm text-[#6B7280]">Attach file (Max 5MB)</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[12px] font-bold text-[#6B7280] uppercase tracking-wider">Description</label>
              <textarea 
                className="input w-full min-h-[150px] resize-none" 
                placeholder="Provide detailed information about your concern..."
              />
            </div>

            <div className="flex justify-end">
              <button className="btn-primary flex items-center gap-2 px-8">
                <Send size={18} />
                Submit Report
              </button>
            </div>
          </form>
        </div>

        {/* History Section */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider">Previous Complaints</h3>
          
          <div className="space-y-4">
            {COMPLAINTS.map((c) => (
              <div key={c.id} className="card-white p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-base font-bold text-[#111111] mb-1">{c.subject}</h4>
                    <p className="text-xs font-semibold text-[#6B7280] flex items-center gap-2">
                      <Clock size={12} />
                      {c.date} • {c.category}
                    </p>
                  </div>
                  <StatusBadge status={c.status} />
                </div>
                <p className="text-sm text-[#6B7280] line-clamp-2 leading-relaxed">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    Open: "bg-blue-50 text-blue-600 border-blue-100",
    Resolved: "bg-green-50 text-green-600 border-green-100",
    Pending: "bg-orange-50 text-orange-600 border-orange-100",
  };
  
  const icons: any = {
    Open: <Clock size={12} />,
    Resolved: <CheckCircle size={12} />,
    Pending: <AlertCircle size={12} />,
  };

  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-bold uppercase tracking-wider ${styles[status]}`}>
      {icons[status]}
      {status}
    </div>
  );
}
