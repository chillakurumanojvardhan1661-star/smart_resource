"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, Eye, EyeOff, Lock, Mail, Building2, Globe, Briefcase, BarChart3, Package, Layers, Loader2, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

type Role = "Sourcing Company" | "Supplier" | null;

export default function SignupPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [role, setRole] = useState<Role>(null);
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    industry: "",
    expectedVolume: "",
    productCategory: "",
    moq: ""
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    if (formData.password.length < 8) {
      return setError("Password must be at least 8 characters");
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          company_name: formData.companyName,
          email: formData.email,
          password: formData.password,
          country: formData.country,
          industry: role === "Sourcing Company" ? formData.industry : null,
          expected_volume: role === "Sourcing Company" ? formData.expectedVolume : null,
          product_category: role === "Supplier" ? formData.productCategory : null,
          moq: role === "Supplier" ? formData.moq : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Signup failed");
      }

      // Automatically login after signup for a professional onboarding experience
      login(data.user);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (selectedRole: Role) => {
    setRole(selectedRole);
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center p-6 font-['Inter']">
      {/* Branding */}
      <div className="mb-8 flex flex-col items-center gap-4">
        <div className="w-12 h-12 bg-[#FF6A00] rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200">
          <Zap size={28} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-[#111111]">Join Smart Resource</h1>
      </div>

      {/* Step 1: Role Selection */}
      {step === 1 && (
        <div className="w-full max-w-2xl animate-in fade-in zoom-in-95 duration-500">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#111111] mb-3">Choose your account type</h2>
            <p className="text-[#6B7280] text-lg">Select how you want to use the platform to get started.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sourcing Company Card */}
            <button
              onClick={() => handleRoleSelect("Sourcing Company")}
              className="group bg-white p-8 rounded-[32px] border-2 border-transparent hover:border-[#FF6A00] transition-all text-left shadow-sm hover:shadow-xl hover:-translate-y-1 duration-300"
            >
              <div className="w-16 h-16 bg-[#FF6A00]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#FF6A00] transition-colors">
                <Building2 size={32} className="text-[#FF6A00] group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#111111] mb-2">Sourcing Company</h3>
              <p className="text-[#6B7280] leading-relaxed">Find suppliers, optimize costs, and manage imports with AI-driven insights.</p>
              <div className="mt-8 flex items-center gap-2 text-[#FF6A00] font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Select this role <Zap size={14} />
              </div>
            </button>

            {/* Supplier Card */}
            <button
              onClick={() => handleRoleSelect("Supplier")}
              className="group bg-white p-8 rounded-[32px] border-2 border-transparent hover:border-[#FF6A00] transition-all text-left shadow-sm hover:shadow-xl hover:-translate-y-1 duration-300"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#FF6A00] transition-colors">
                <Package size={32} className="text-blue-600 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#111111] mb-2">Supplier</h3>
              <p className="text-[#6B7280] leading-relaxed">Sell products globally, manage trade operations, and grow your reach.</p>
              <div className="mt-8 flex items-center gap-2 text-[#FF6A00] font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Select this role <Zap size={14} />
              </div>
            </button>
          </div>

          <p className="mt-10 text-center text-sm text-[#6B7280]">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-[#FF6A00] hover:underline">
              Login here
            </Link>
          </p>
        </div>
      )}

      {/* Step 2: Dynamic Form */}
      {step === 2 && (
        <div className="w-full max-w-xl bg-white rounded-[32px] border border-[#E5E7EB] p-12 shadow-sm animate-in slide-in-from-bottom-4 duration-500">
          <button 
            onClick={() => setStep(1)}
            className="flex items-center gap-2 text-sm font-bold text-[#6B7280] hover:text-[#111111] mb-8 transition-colors"
          >
            <ChevronLeft size={16} />
            Back to selection
          </button>

          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF6A00]/10 text-[#FF6A00] rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              {role}
            </div>
            <h2 className="text-3xl font-bold text-[#111111] mb-2">Complete your profile</h2>
            <p className="text-[#6B7280]">Fill in your business details to join the network.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                {error}
              </div>
            )}

            {/* Common Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[13px] font-bold text-[#6B7280] uppercase tracking-wider ml-1">Company Name</label>
                <div className="relative">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                    <Building2 size={20} />
                  </div>
                  <input
                    required
                    name="companyName"
                    placeholder="Enter company name"
                    className="input w-full !pl-16 h-14 text-base border-[#E5E7EB] focus:border-[#FF6A00] transition-all"
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[13px] font-bold text-[#6B7280] uppercase tracking-wider ml-1">Business Email</label>
                <div className="relative">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                    <Mail size={20} />
                  </div>
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="name@company.com"
                    className="input w-full !pl-16 h-14 text-base border-[#E5E7EB] focus:border-[#FF6A00] transition-all"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Password Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[13px] font-bold text-[#6B7280] uppercase tracking-wider ml-1">Password</label>
                <div className="relative">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                    <Lock size={20} />
                  </div>
                  <input
                    required
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="input w-full !pl-16 h-14 text-base border-[#E5E7EB] focus:border-[#FF6A00] transition-all"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#111111]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[13px] font-bold text-[#6B7280] uppercase tracking-wider ml-1">Confirm Password</label>
                <div className="relative">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                    <Lock size={20} />
                  </div>
                  <input
                    required
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="input w-full !pl-16 h-14 text-base border-[#E5E7EB] focus:border-[#FF6A00] transition-all"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Role Specific Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[13px] font-bold text-[#6B7280] uppercase tracking-wider ml-1">Country</label>
                <div className="relative">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                    <Globe size={20} />
                  </div>
                  <input
                    required
                    name="country"
                    placeholder="e.g. USA, China"
                    className="input w-full !pl-16 h-14 text-base border-[#E5E7EB] focus:border-[#FF6A00] transition-all"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {role === "Sourcing Company" ? (
                <div className="space-y-3">
                  <label className="text-[13px] font-bold text-[#6B7280] uppercase tracking-wider ml-1">Industry</label>
                  <div className="relative">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                      <Briefcase size={20} />
                    </div>
                    <input
                      required
                      name="industry"
                      placeholder="e.g. Retail, Tech"
                      className="input w-full !pl-16 h-14 text-base border-[#E5E7EB] focus:border-[#FF6A00] transition-all"
                      value={formData.industry}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <label className="text-[13px] font-bold text-[#6B7280] uppercase tracking-wider ml-1">Product Category</label>
                  <div className="relative">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                      <Package size={20} />
                    </div>
                    <input
                      required
                      name="productCategory"
                      placeholder="e.g. Electronics"
                      className="input w-full !pl-16 h-14 text-base border-[#E5E7EB] focus:border-[#FF6A00] transition-all"
                      value={formData.productCategory}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Role Specific Row 2 */}
            <div className="space-y-3">
              {role === "Sourcing Company" ? (
                <>
                  <label className="text-[13px] font-bold text-[#6B7280] uppercase tracking-wider ml-1">Expected Monthly Volume</label>
                  <div className="relative">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                      <BarChart3 size={20} />
                    </div>
                    <input
                      required
                      name="expectedVolume"
                      placeholder="e.g. 5,000 units"
                      className="input w-full !pl-16 h-14 text-base border-[#E5E7EB] focus:border-[#FF6A00] transition-all"
                      value={formData.expectedVolume}
                      onChange={handleChange}
                    />
                  </div>
                </>
              ) : (
                <>
                  <label className="text-[13px] font-bold text-[#6B7280] uppercase tracking-wider ml-1">Minimum Order Quantity (MOQ)</label>
                  <div className="relative">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                      <Layers size={20} />
                    </div>
                    <input
                      required
                      name="moq"
                      placeholder="e.g. 100 units"
                      className="input w-full !pl-16 h-14 text-base border-[#E5E7EB] focus:border-[#FF6A00] transition-all"
                      value={formData.moq}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="btn-primary w-full h-18 mt-4 flex items-center justify-center gap-3 text-xl disabled:opacity-70 shadow-lg shadow-orange-100 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <>Create {role} Account <Zap size={20} /></>}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
