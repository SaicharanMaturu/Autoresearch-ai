export type Stat = {
  label: string
  value: string
  delta: string
}

export type NavigationItem = {
  title: string
  description: string
  count: string
}

export type HistoryItem = {
  title: string
  type: string
  time: string
  summary: string
}

export type ResearchCluster = {
  cluster: string
  papers: string
  signal: string
  focus: string
}

export type MemoryNode = {
  title: string
  detail: string
  resonance: string
}

export type ResearchGap = {
  title: string
  opportunity: string
  impact: string
}

export type PresentationDraft = {
  title: string
  stage: string
  audience: string
  updatedAt: string
}

export type UserProfile = {
  name: string
  role: string
  focus: string
  streak: string
  location: string
}

export type PlatformData = {
  brand: {
    name: string
    tagline: string
    status: string
  }
  stats: Stat[]
  navigation: NavigationItem[]
  profile: UserProfile
  history: HistoryItem[]
  researchUniverse: ResearchCluster[]
  memoryChamber: MemoryNode[]
  researchGaps: ResearchGap[]
  presentations: PresentationDraft[]
  chatStarters: string[]
  roadmap: Array<{
    name: string
    description: string
  }>
}

export type AuthResponse = {
  token: string
  user: {
    name: string
    role: string
    email: string
  }
}

export type ChatResponse = {
  reply: string
  suggestions: string[]
}

export type UploadResponse = {
  fileName: string
  size: number
  summary: string
  type: string
}
