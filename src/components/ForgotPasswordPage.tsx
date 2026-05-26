import React, { useState } from "react";
import { ArrowLeft, Mail, Loader } from "lucide-react";
import { NeonButton, AIInput, GlassCard } from "./UI";

interface ForgotPasswordPageProps {
  onBackToLogin: () => void;
  onResetCodeSubmit: (resetToken: string) => void;
}

export function ForgotPasswordPage({ onBackToLogin, onResetCodeSubmit }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [stage, setStage] = useState<"email" | "token">("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to send reset email");
        return;
      }

      setMessage("Reset code sent to your email");
      setResetToken(data.resetToken || ""); // Demo: returned from backend
      setStage("token");
    } catch (err: any) {
      setError(err.message || "Failed to request password reset");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (resetToken.trim()) {
      onResetCodeSubmit(resetToken);
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
        <button
          onClick={onBackToLogin}
          className="flex items-center gap-2 text-electric-cyan/70 hover:text-electric-cyan mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-body text-sm">Back to Login</span>
        </button>

        <GlassCard className="p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-electric-cyan to-neon-purple rounded-lg flex items-center justify-center">
                <Mail size={24} className="text-space-black" />
              </div>
            </div>
            <h1 className="font-display text-2xl font-bold text-white">Forgot Password?</h1>
            <p className="text-electric-cyan/70 font-body text-sm">
              {stage === "email"
                ? "Enter your email to receive a reset code"
                : "Enter the reset code we sent to your email"}
            </p>
          </div>

          {/* Messages */}
          {error && (
            <div className="bg-hot-pink/10 border border-hot-pink/30 rounded-lg p-3">
              <p className="text-hot-pink text-sm font-body">{error}</p>
            </div>
          )}
          {message && (
            <div className="bg-emerald-green/10 border border-emerald-green/30 rounded-lg p-3">
              <p className="text-emerald-green text-sm font-body">{message}</p>
            </div>
          )}

          {/* Email Stage */}
          {stage === "email" && (
            <form onSubmit={handleSubmitEmail} className="space-y-4">
              <AIInput
                type="email"
                placeholder="your.email@research.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <NeonButton
                type="submit"
                disabled={loading || !email}
                className="w-full"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader size={16} className="animate-spin" />
                    Sending...
                  </span>
                ) : (
                  "Send Reset Code"
                )}
              </NeonButton>
            </form>
          )}

          {/* Token Stage */}
          {stage === "token" && (
            <form onSubmit={handleVerifyToken} className="space-y-4">
              <div>
                <p className="text-electric-cyan/70 text-xs font-body mb-2">
                  Check your email for the reset code
                </p>
                <AIInput
                  type="text"
                  placeholder="Enter reset code"
                  value={resetToken}
                  onChange={(e) => setResetToken(e.target.value)}
                  disabled={loading}
                />
              </div>
              <NeonButton
                type="submit"
                disabled={loading || !resetToken}
                className="w-full"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader size={16} className="animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  "Verify Code"
                )}
              </NeonButton>
              <button
                type="button"
                onClick={() => setStage("email")}
                className="w-full py-2 text-electric-cyan/70 hover:text-electric-cyan font-body text-sm transition-colors"
              >
                Use different email
              </button>
            </form>
          )}

          {/* Demo Notice */}
          <div className="bg-amber-glow/10 border border-amber-glow/30 rounded-lg p-3 text-center">
            <p className="text-amber-glow/80 text-xs font-body">
              💡 Demo: Reset code returned from backend for testing
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
