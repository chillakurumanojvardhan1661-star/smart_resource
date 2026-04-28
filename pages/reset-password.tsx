"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Zap, Eye, EyeOff, Lock, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get("token") || "mock-token";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    if (password.length < 8) {
      return setError("Password must be at least 8 characters");
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, new_password: password }),
      });

      if (!response.ok) {
        throw new Error("Failed to reset password");
      }

      setIsSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center p-6 font-['Inter']">
      <div className="mb-12">
        <div className="w-12 h-12 bg-[#FF6A00] rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200">
          <Zap size={28} className="text-white" />
        </div>
      </div>

      <div className="w-full max-w-md bg-white rounded-[24px] border border-[#E5E7EB] p-10 shadow-sm">
        {!isSuccess ? (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#111111] mb-2">Reset Password</h2>
              <p className="text-[#6B7280] text-sm">Enter your new password below.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[12px] font-bold text-[#6B7280] uppercase tracking-wider">New Password</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]">
                    <Lock size={18} />
                  </div>
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="input w-full pl-12 h-14"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-bold text-[#6B7280] uppercase tracking-wider">Confirm New Password</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]">
                    <Lock size={18} />
                  </div>
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="input w-full pl-12 h-14"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                disabled={isLoading}
                type="submit"
                className="btn-primary w-full h-14 flex items-center justify-center gap-2 text-lg disabled:opacity-70"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : "Reset Password"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-2xl font-bold text-[#111111] mb-2">Password Reset!</h2>
            <p className="text-[#6B7280] text-sm mb-4">Your password has been successfully updated.</p>
            <p className="text-xs text-[#6B7280]">Redirecting you to login...</p>
          </div>
        )}
      </div>
    </div>
  );
}
