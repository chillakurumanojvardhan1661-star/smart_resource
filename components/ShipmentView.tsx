"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TrackingCard from "./TrackingCard";
import MetricsPanel from "./MetricsPanel";

const VEHICLE = {
  name: "Cargo Track\nHD 320",
  vehicleId: "HD 3842 Y",
  loadVolume: "372.45 m³",
  weight: "7,260 kg",
};

const TRUCK_IMAGES = [
  "/truck_side.png",
  "/truck_front.png",
  "/truck_rear.png"
];

export default function ShipmentView() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="space-y-8">
      {/* ── Vehicle Showcase Hero ──────────────────── */}
      <div className="card-white overflow-hidden p-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
          {/* Left: Vehicle Info */}
          <div className="lg:col-span-3 p-8 flex flex-col justify-center">
            <div>
              <h1 className="text-[40px] xl:text-[48px] font-bold text-[#111111] leading-[1.1] mb-8 whitespace-pre-line tracking-tight">
                {VEHICLE.name}
              </h1>

              <div className="space-y-5">
                <VehicleSpec label="VEHICLE ID" value={VEHICLE.vehicleId} />
                <VehicleSpec label="LOAD VOLUME" value={VEHICLE.loadVolume} />
                <VehicleSpec label="WEIGHT" value={VEHICLE.weight} />
              </div>
            </div>
          </div>

          {/* Center: Vehicle Image */}
          <div className="lg:col-span-6 flex items-center justify-center relative bg-[#F5F5F5] p-4">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Flat design: no shadow blob beneath the truck */}
              <img
                src={TRUCK_IMAGES[currentSlide]}
                alt="Cargo Track HD 320"
                className="max-w-full max-h-[360px] object-contain relative z-10"
              />
            </div>

            {/* Carousel arrows */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
              <button
                onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                className="w-10 h-10 rounded-full border border-[#E5E7EB] bg-[#FFFFFF] flex items-center justify-center text-[#111111] hover:border-[#FF6A00] hover:text-[#FF6A00] transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setCurrentSlide(Math.min(2, currentSlide + 1))}
                className="w-10 h-10 rounded-full border border-[#E5E7EB] bg-[#FFFFFF] flex items-center justify-center text-[#111111] hover:border-[#FF6A00] hover:text-[#FF6A00] transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Right: Thumbnails */}
          <div className="lg:col-span-3 p-8 flex flex-col justify-center border-l border-[#E5E7EB]">
            <div>
              <h3 className="text-[14px] font-bold text-[#111111] mb-6">Vehicle & Shipment Details</h3>
              <div className="space-y-4">
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`w-full h-24 rounded-xl overflow-hidden border-2 transition-colors ${
                      currentSlide === i
                        ? "border-[#FF6A00]"
                        : "border-[#E5E7EB] hover:border-[#111111]"
                    }`}
                  >
                    <img
                      src={TRUCK_IMAGES[i]}
                      alt={`Truck view ${i + 1}`}
                      className="w-full h-full object-cover bg-[#F5F5F5]"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Section: Tracking + Metrics ────── */}
      <div className="grid grid-cols-12 gap-6 items-stretch min-h-[300px]">
        <div className="col-span-6">
          <TrackingCard />
        </div>
        <div className="col-span-6">
          <MetricsPanel />
        </div>
      </div>
    </div>
  );
}

function VehicleSpec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold text-[#6B7280] uppercase mb-1">{label}</p>
      <p className="text-[16px] font-bold text-[#111111]">{value}</p>
    </div>
  );
}
