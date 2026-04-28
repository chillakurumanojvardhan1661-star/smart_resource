"use client";
import React, { useState } from "react";
import { Zap, Mail, Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8000/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Request failed");
      }

      setIsSent(true);
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
        {!isSent ? (
          <>
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-[#111111] mb-2">Forgot Password?</h2>
              <p className="text-[#6B7280] text-sm">No worries, we'll send you reset instructions.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[12px] font-bold text-[#6B7280] uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]">
                    <Mail size={18} />
                  </div>
                  <input
                    required
                    type="email"
                    placeholder="name@company.com"
                    className="input w-full pl-12 h-14"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <button
                disabled={isLoading}
                type="submit"
                className="btn-primary w-full h-14 flex items-center justify-center gap-2 text-lg disabled:opacity-70"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : "Send Reset Link"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-2xl font-bold text-[#111111] mb-2">Check your email</h2>
            <p className="text-[#6B7280] text-sm mb-8">
              We've sent a password reset link to <br /><span className="font-bold text-[#111111]">{email}</span>
            </p>
            <button
              onClick={() => setIsSent(false)}
              className="text-[#FF6A00] font-bold hover:underline"
            >
              Didn't receive the email? Try again
            </button>
          </div>
        )}

        <div className="mt-8 pt-8 border-t border-[#F5F5F5] text-center">
          <Link href="/login" className="inline-flex items-center gap-2 text-sm font-bold text-[#6B7280] hover:text-[#111111] transition-colors">
            <ArrowLeft size={16} />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
