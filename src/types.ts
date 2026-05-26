export type TabId = 'core' | 'universe' | 'gap-lab' | 'streams' | 'studio' | 'chamber' | 'profile';

export interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
}

export interface AgentNode {
  id: string;
  name: string;
  role: string;
  load: number;
  status: 'active' | 'idle' | 'syncing';
  description: string;
}

export interface ResearchPaper {
  id: string;
  title: string;
  category: 'Paper' | 'Topic' | 'AI Recommendation';
  citations: number;
  field: string;
  confidence: number;
  abstract: string;
  x: number;
  y: number;
}

export interface Slide {
  id: string;
  title: string;
  subtitle: string;
  bullets: string[];
  layout: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  indexPercent: number;
  category: 'preference' | 'session' | 'behavior' | 'insight';
}

export interface StreamDataPoint {
  time: string;
  velocity: number;
  density: number;
}
