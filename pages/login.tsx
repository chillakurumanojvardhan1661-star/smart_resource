"use client";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { Zap, Eye, EyeOff, Lock, Mail, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Login failed");
      }

      login(data.user);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center p-6 font-['Inter']">
      {/* Logo */}
      <div className="mb-12 flex flex-col items-center gap-4">
        <div className="w-12 h-12 bg-[#FF6A00] rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200">
          <Zap size={28} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-[#111111]">CargoTrack Pro</h1>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white rounded-[24px] border border-[#E5E7EB] p-10 shadow-sm">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#111111] mb-2">Login</h2>
          <p className="text-[#6B7280] text-sm">Welcome back! Please enter your details.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          {error && (
            <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              {error}
            </div>
          )}

          <div className="space-y-4">
            <label className="text-[13px] font-bold text-[#6B7280] uppercase tracking-wider ml-1">Email Address</label>
            <div className="relative">
              <div className="absolute left-8 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                <Mail size={22} />
              </div>
              <input
                required
                type="email"
                placeholder="name@company.com"
                className="input w-full !pl-20 h-16 text-base shadow-sm border-[#E5E7EB] focus:border-[#FF6A00] transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end mb-1 px-1">
              <label className="text-[13px] font-bold text-[#6B7280] uppercase tracking-wider">Password</label>
              <Link href="/forgot-password" size={14} className="text-xs font-bold text-[#FF6A00] hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute left-8 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                <Lock size={22} />
              </div>
              <input
                required
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="input w-full !pl-20 h-16 text-base shadow-sm border-[#E5E7EB] focus:border-[#FF6A00] transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-8 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#111111] transition-colors"
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="btn-primary w-full h-14 flex items-center justify-center gap-2 text-lg disabled:opacity-70"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Login"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-[#6B7280]">
          Don't have an account?{" "}
          <Link href="/signup" className="font-bold text-[#FF6A00] hover:underline">
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  );
}
