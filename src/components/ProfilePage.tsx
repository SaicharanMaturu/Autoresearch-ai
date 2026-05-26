import React, { useState } from 'react';
import { User, Mail, BookOpen, Award, Clock, Settings, LogOut, X } from 'lucide-react';
import { GlassCard, NeonButton, StatDisplay, SectionTitle, HolographicLine } from './UI';

export function ProfilePage({ 
  userName = 'Researcher', 
  userEmail = 'researcher@ai.com',
  onBack,
  onLogout
}: { 
  userName?: string; 
  userEmail?: string;
  onBack: () => void;
  onLogout: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: userName,
    email: userEmail,
    bio: 'AI Research Scientist | Always learning',
    specialization: 'Physics-Informed Neural Networks',
  });

  const stats = [
    { label: 'Papers Uploaded', value: 8, icon: BookOpen },
    { label: 'Research Topics', value: 15, icon: Award },
    { label: 'Active Projects', value: 3, icon: User },
    { label: 'Time Invested', value: '24h', icon: Clock },
  ];

  const recentActivity = [
    { action: 'Uploaded paper', subject: 'Physics-Informed Neural Networks.pdf', date: '2 hours ago' },
    { action: 'Analyzed research', subject: 'Quantum Computing Applications', date: '5 hours ago' },
    { action: 'Generated report', subject: 'AI Safety Framework', date: '1 day ago' },
    { action: 'Chat history saved', subject: '12 conversations', date: '2 days ago' },
  ];

  const badges = [
    { name: 'Early Adopter', color: 'from-ai-accent-cyan to-ai-accent-blue' },
    { name: 'Active Researcher', color: 'from-ai-accent-purple to-ai-accent-pink' },
    { name: 'Knowledge Seeker', color: 'from-ai-accent-blue to-ai-accent-cyan' },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-ai-bg via-ai-surface to-ai-bg">
      {/* Background orbs */}
      <div className="fixed top-20 right-20 w-96 h-96 bg-ai-accent-purple/10 rounded-full blur-3xl opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <SectionTitle>Research Profile</SectionTitle>
          <button
            onClick={onBack}
            className="text-ai-text-secondary hover:text-ai-accent-cyan transition p-2"
          >
            <X size={24} />
          </button>
        </div>

        <HolographicLine className="mb-8" />

        {/* Profile Header Card */}
        <GlassCard className="p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-ai-accent-cyan to-ai-accent-purple flex items-center justify-center">
                <User size={40} className="text-ai-bg" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-ai-accent-cyan mb-2">{profile.name}</h2>
                <p className="text-ai-text-secondary flex items-center gap-2 mb-1">
                  <Mail size={16} />
                  {profile.email}
                </p>
                <p className="text-ai-accent-blue">{profile.specialization}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 border-2 border-ai-accent-cyan text-ai-accent-cyan rounded-lg hover:bg-ai-accent-cyan/10 transition"
            >
              {isEditing ? 'Done' : 'Edit Profile'}
            </button>
          </div>

          {isEditing && (
            <div className="space-y-4 pt-4 border-t border-white/10">
              <input
                type="text"
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-ai-text-primary"
                placeholder="Bio"
              />
              <input
                type="text"
                value={profile.specialization}
                onChange={(e) => setProfile({ ...profile, specialization: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-ai-text-primary"
                placeholder="Specialization"
              />
            </div>
          )}
        </GlassCard>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <StatDisplay key={index} label={stat.label} value={stat.value} icon={stat.icon} />
          ))}
        </div>

        <HolographicLine className="mb-8" />

        {/* Badges Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-ai-accent-purple mb-4 flex items-center gap-2">
            <Award size={24} />
            Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {badges.map((badge, index) => (
              <GlassCard key={index} className="p-4">
                <div className={`
                  w-full h-24 rounded-lg bg-gradient-to-br ${badge.color}
                  flex items-center justify-center text-ai-bg font-bold text-lg
                  mb-3
                `}>
                  ⭐
                </div>
                <p className="text-ai-text-primary font-semibold text-center">{badge.name}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        <HolographicLine className="mb-8" />

        {/* Recent Activity */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-ai-accent-blue mb-4 flex items-center gap-2">
            <Clock size={24} />
            Recent Activity
          </h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <GlassCard key={index} className="p-4 hover:shadow-neon-cyan transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-ai-text-primary font-semibold">{activity.action}</p>
                    <p className="text-ai-text-secondary text-sm">{activity.subject}</p>
                  </div>
                  <p className="text-ai-text-secondary text-xs">{activity.date}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <NeonButton variant="ghost" className="flex items-center gap-2 flex-1">
            <Settings size={20} />
            Settings
          </NeonButton>
          <NeonButton
            onClick={onLogout}
            variant="ghost"
            className="flex items-center gap-2 flex-1 border-ai-accent-pink text-ai-accent-pink hover:bg-ai-accent-pink/10"
          >
            <LogOut size={20} />
            Logout
          </NeonButton>
        </div>
      </div>
    </div>
  );
}
