export const platformData = {
  brand: {
    name: 'AutoResearch Scientist AI',
    tagline: 'An AI operating system for evidence-led discovery, memory, and presentation workflows.',
    status: 'Systems online · API modules standing by',
  },
  stats: [
    { label: 'Active research campaigns', value: '12', delta: '+3 this week' },
    { label: 'Documents indexed', value: '284', delta: 'OCR + semantic extraction ready' },
    { label: 'Research gaps surfaced', value: '19', delta: '6 high-priority opportunities' },
    { label: 'Presentation drafts', value: '7', delta: '2 ready for stakeholders' },
  ],
  navigation: [
    { title: 'Dashboard', description: 'Monitor discoveries, experiments, and live intelligence.', count: '04 hubs' },
    { title: 'Research Universe', description: 'Map themes, clusters, and frontier signals.', count: '11 clusters' },
    { title: 'Memory Chamber', description: 'Retain durable findings and evidence trails.', count: '32 memory nodes' },
    { title: 'Gap Lab', description: 'Convert blind spots into testable opportunities.', count: '08 opportunities' },
  ],
  profile: {
    name: 'Dr. Aurora Vega',
    role: 'Lead AutoResearch Strategist',
    focus: 'Translational AI, biotech scouting, multimodal evidence chains',
    streak: '21 day momentum streak',
    location: 'Orbit Lab · Remote',
  },
  history: [
    {
      title: 'Quantum materials scan',
      type: 'Literature synthesis',
      time: '15 minutes ago',
      summary: 'Compared 42 papers and flagged reproducibility variance in low-temperature datasets.',
    },
    {
      title: 'Cancer imaging triage',
      type: 'OCR extraction',
      time: '1 hour ago',
      summary: 'Extracted figure captions and detected three missing benchmark cohorts.',
    },
    {
      title: 'Frontier biotech watchlist',
      type: 'Agent briefing',
      time: 'Today',
      summary: 'Generated a founder signal brief across 9 startups and 3 grant programs.',
    },
  ],
  researchUniverse: [
    {
      cluster: 'Adaptive multimodal diagnostics',
      papers: '56 linked papers',
      signal: 'Signal strength 91%',
      focus: 'Emerging benchmark gaps in low-resource hospitals',
    },
    {
      cluster: 'Autonomous literature agents',
      papers: '38 linked papers',
      signal: 'Signal strength 84%',
      focus: 'Evaluation harnesses for agentic retrieval chains',
    },
    {
      cluster: 'Synthetic biology copilots',
      papers: '21 linked papers',
      signal: 'Signal strength 76%',
      focus: 'Closed-loop experiment design with sparse wet-lab feedback',
    },
  ],
  memoryChamber: [
    {
      title: 'Benchmark drift detected',
      detail: 'Two benchmark suites diverge after 2024 dataset refreshes.',
      resonance: 'High resonance',
    },
    {
      title: 'Evidence chain stable',
      detail: 'The oncology OCR workflow maintains a 98.2% extraction confidence.',
      resonance: 'Verified memory',
    },
    {
      title: 'Funding signal',
      detail: 'Climate resilience grants align with autonomous sensing initiatives.',
      resonance: 'Strategic memory',
    },
  ],
  researchGaps: [
    {
      title: 'Sparse validation on underrepresented cohorts',
      opportunity: 'Launch a targeted benchmark expansion with bias tracking.',
      impact: 'High impact · publishable baseline opportunity',
    },
    {
      title: 'No shared ontology for multimodal lab notes',
      opportunity: 'Design a schema for OCR + RAG ingestion continuity.',
      impact: 'Medium impact · platform moat opportunity',
    },
    {
      title: 'Presentation latency after discovery',
      opportunity: 'Auto-generate executive decks directly from validated findings.',
      impact: 'High impact · closes decision-making loop',
    },
  ],
  presentations: [
    {
      title: 'Precision medicine opportunity deck',
      stage: 'Storyboard ready',
      audience: 'Executive research council',
      updatedAt: 'Updated 8 minutes ago',
    },
    {
      title: 'Autonomous agents market radar',
      stage: 'Slide synthesis in progress',
      audience: 'Innovation venture team',
      updatedAt: 'Updated 2 hours ago',
    },
  ],
  chatStarters: [
    'Summarize the most novel signals from the current research universe.',
    'Identify three research gaps with the highest publication potential.',
    'Draft an executive-ready briefing for the presentation studio.',
  ],
  roadmap: [
    { name: 'LLM orchestration', description: 'Adapters for hosted and self-hosted model routing.' },
    { name: 'RAG pipeline', description: 'Vector indexing hooks and grounded answer tracing.' },
    { name: 'OCR workflows', description: 'Document image ingestion and citation recovery.' },
    { name: 'MongoDB persistence', description: 'Durable storage for users, memories, and projects.' },
  ],
} as const
