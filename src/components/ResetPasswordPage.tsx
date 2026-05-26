import React, { useState } from "react";
import { ArrowLeft, Lock, Eye, EyeOff, Loader, CheckCircle } from "lucide-react";
import { NeonButton, AIInput, GlassCard } from "./UI";

interface ResetPasswordPageProps {
  onPasswordReset: () => void;
  onBackToLogin: () => void;
}

export function ResetPasswordPage({ onPasswordReset, onBackToLogin }: ResetPasswordPageProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const resetToken = localStorage.getItem("resetToken") || "";

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resetToken,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to reset password");
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        onPasswordReset();
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-space-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-cyan/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-hot-pink/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back Button */}
        {!success && (
          <button
            onClick={onBackToLogin}
            className="flex items-center gap-2 text-electric-cyan/70 hover:text-electric-cyan mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-body text-sm">Back to Login</span>
          </button>
        )}

        <GlassCard className="p-8 space-y-6">
          {/* Success State */}
          {success && (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-green to-electric-cyan rounded-full flex items-center justify-center animate-pulse">
                  <CheckCircle size={32} className="text-space-black" />
                </div>
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-white">Password Reset!</h1>
                <p className="text-electric-cyan/70 font-body text-sm mt-2">
                  Your password has been successfully reset. Redirecting to login...
                </p>
              </div>
            </div>
          )}

          {/* Form State */}
          {!success && (
            <>
              {/* Header */}
              <div className="text-center space-y-2">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-electric-cyan to-neon-purple rounded-lg flex items-center justify-center">
                    <Lock size={24} className="text-space-black" />
                  </div>
                </div>
                <h1 className="font-display text-2xl font-bold text-white">Create New Password</h1>
                <p className="text-electric-cyan/70 font-body text-sm">
                  Enter a strong password to secure your account
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-hot-pink/10 border border-hot-pink/30 rounded-lg p-3">
                  <p className="text-hot-pink text-sm font-body">{error}</p>
                </div>
              )}

              {/* Password Form */}
              <form onSubmit={handleResetPassword} className="space-y-4">
                {/* New Password */}
                <div>
                  <label className="text-electric-cyan/70 text-xs font-body mb-2 block">
                    New Password
                  </label>
                  <div className="relative">
                    <AIInput
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-electric-cyan/50 hover:text-electric-cyan transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="text-electric-cyan/70 text-xs font-body mb-2 block">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <AIInput
                      type={showConfirm ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-electric-cyan/50 hover:text-electric-cyan transition-colors"
                    >
                      {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Password Requirements */}
                <div className="bg-deep-indigo/20 border border-electric-cyan/20 rounded-lg p-3 space-y-1">
                  <p className="text-electric-cyan/70 font-body text-xs">Password requirements:</p>
                  <ul className="text-electric-cyan/50 text-xs space-y-1 font-body">
                    <li className={newPassword.length >= 6 ? "text-emerald-green" : ""}>
                      ✓ At least 6 characters
                    </li>
                    <li className={newPassword === confirmPassword && confirmPassword !== "" ? "text-emerald-green" : ""}>
                      ✓ Passwords match
                    </li>
                  </ul>
                </div>

                {/* Submit Button */}
                <NeonButton
                  type="submit"
                  disabled={loading || !newPassword || !confirmPassword}
                  className="w-full"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader size={16} className="animate-spin" />
                      Resetting...
                    </span>
                  ) : (
                    "Reset Password"
                  )}
                </NeonButton>
              </form>
            </>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
