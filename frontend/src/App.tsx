import { useEffect, useMemo, useState } from 'react'
import { GlassPanel } from './components/GlassPanel'
import { getPlatformData, login, sendChatMessage, uploadResearchFile } from './services/api'
import type { PlatformData, UploadResponse } from './types/platform'

const fallbackData: PlatformData = {
  brand: {
    name: 'AutoResearch Scientist AI',
    tagline: 'An AI operating system for evidence-led discovery, memory, and presentation workflows.',
    status: 'Systems online · future integrations ready',
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
}

type ChatMessage = {
  role: 'assistant' | 'user'
  content: string
}

function App() {
  const [platformData, setPlatformData] = useState<PlatformData>(fallbackData)
  const [status, setStatus] = useState('Booting research systems…')
  const [email, setEmail] = useState('researcher@autoresearch.ai')
  const [password, setPassword] = useState('open-sesame')
  const [authName, setAuthName] = useState('Aurora Vega')
  const [chatInput, setChatInput] = useState('')
  const [chatBusy, setChatBusy] = useState(false)
  const [uploadStatus, setUploadStatus] = useState('Awaiting documents for ingestion')
  const [uploadedFiles, setUploadedFiles] = useState<UploadResponse[]>([])
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        'Welcome to AutoResearch Scientist AI. I can turn raw research material into structured insight, memory, and presentation outputs.',
    },
  ])

  useEffect(() => {
    getPlatformData()
      .then((data) => {
        setPlatformData(data)
        setStatus(data.brand.status)
      })
      .catch(() => {
        setStatus(`${fallbackData.brand.status} · fallback intelligence profile active`)
      })
  }, [])

  const quickSignal = useMemo(() => platformData.researchGaps[0], [platformData.researchGaps])

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('Authenticating secure research workspace…')

    try {
      const response = await login(email, password)
      setAuthName(response.user.name)
      setStatus(`Authenticated as ${response.user.email}`)
    } catch {
      setStatus('Using local secure preview mode')
      setAuthName('Aurora Vega')
    }
  }

  async function handleChatSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!chatInput.trim()) {
      return
    }

    const message = chatInput.trim()
    setChatMessages((current) => [...current, { role: 'user', content: message }])
    setChatInput('')
    setChatBusy(true)

    try {
      const response = await sendChatMessage(message)
      setChatMessages((current) => [...current, { role: 'assistant', content: response.reply }])
    } catch {
      setChatMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content:
            'Local mode: I recommend linking this question to the Research Gap Lab and Presentation Studio for the next iteration.',
        },
      ])
    } finally {
      setChatBusy(false)
    }
  }

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    setUploadStatus(`Uploading ${file.name}…`)

    try {
      const response = await uploadResearchFile(file)
      setUploadedFiles((current) => [response, ...current])
      setUploadStatus(`Indexed ${response.fileName} (${Math.round(response.size / 1024)} KB)`)
    } catch {
      const previewResponse = {
        fileName: file.name,
        size: file.size,
        type: file.type || 'application/octet-stream',
        summary: 'Stored locally for future OCR and retrieval augmentation workflows.',
      }
      setUploadedFiles((current) => [previewResponse, ...current])
      setUploadStatus(`Stored ${file.name} in local preview mode`)
    } finally {
      event.target.value = ''
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(192,132,252,0.18),_transparent_32%),linear-gradient(180deg,_#020617_0%,_#0f172a_45%,_#020617_100%)] text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row lg:px-6">
        <aside className="lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:w-80">
          <div className="flex h-full flex-col rounded-[2rem] border border-cyan-400/15 bg-slate-950/70 p-6 shadow-[0_18px_80px_rgba(8,15,35,0.6)] backdrop-blur-xl">
            <div>
              <p className="text-xs uppercase tracking-[0.45em] text-cyan-200/70">AI research OS</p>
              <h1 className="mt-4 text-3xl font-semibold text-white">{platformData.brand.name}</h1>
              <p className="mt-3 text-sm leading-6 text-slate-300">{platformData.brand.tagline}</p>
            </div>
            <div className="mt-8 rounded-3xl border border-cyan-300/15 bg-cyan-400/8 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">System signal</p>
              <p className="mt-3 text-lg font-medium text-white">{status}</p>
              <p className="mt-2 text-sm text-slate-300">Modular foundations for authentication, AI agents, LLM adapters, RAG, OCR, and MongoDB persistence.</p>
            </div>
            <nav className="mt-8 space-y-3">
              {platformData.navigation.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-white">{item.title}</p>
                    <span className="rounded-full border border-cyan-300/20 px-2 py-1 text-[10px] uppercase tracking-[0.25em] text-cyan-100/80">
                      {item.count}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{item.description}</p>
                </div>
              ))}
            </nav>
            <div className="mt-auto rounded-3xl border border-fuchsia-300/15 bg-fuchsia-400/10 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-fuchsia-100/70">Roadmap</p>
              <ul className="mt-3 space-y-3 text-sm text-slate-200">
                {platformData.roadmap.map((item) => (
                  <li key={item.name}>
                    <span className="font-medium text-white">{item.name}</span>
                    <p className="text-slate-400">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        <main className="flex-1 space-y-6">
          <GlassPanel
            title={`Welcome back, ${authName}`}
            subtitle="Authenticate, ingest research signals, and orchestrate the next breakthrough from one interface."
            actions={
              <div className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-emerald-100">
                Live dashboard
              </div>
            }
          >
            <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="grid gap-4 sm:grid-cols-2">
                {platformData.stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                    <p className="text-sm text-slate-400">{stat.label}</p>
                    <p className="mt-3 text-3xl font-semibold text-white">{stat.value}</p>
                    <p className="mt-2 text-sm text-cyan-200">{stat.delta}</p>
                  </div>
                ))}
              </div>
              <form className="rounded-3xl border border-white/10 bg-slate-950/55 p-5" onSubmit={handleLogin}>
                <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Authentication core</p>
                <label className="mt-4 block text-sm text-slate-200">
                  Email
                  <input
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-cyan-300/40"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    autoComplete="email"
                    required
                  />
                </label>
                <label className="mt-4 block text-sm text-slate-200">
                  Password
                  <input
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-cyan-300/40"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    type="password"
                    autoComplete="current-password"
                    required
                  />
                </label>
                <button
                  className="mt-5 w-full rounded-2xl bg-linear-to-r from-cyan-400 to-fuchsia-500 px-4 py-3 font-medium text-slate-950 transition hover:opacity-90"
                  type="submit"
                >
                  Enter AutoResearch Scientist AI
                </button>
                <p className="mt-3 text-sm text-slate-400">
                  Secure preview auth ready now, with future adapters for OAuth, SSO, and MongoDB-backed user sessions.
                </p>
              </form>
            </div>
          </GlassPanel>

          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <GlassPanel title="AI chat workspace" subtitle="Collaborate with a research copilot that turns raw prompts into actionable next steps.">
              <div className="space-y-3">
                {chatMessages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={`rounded-2xl px-4 py-3 text-sm ${
                      message.role === 'assistant'
                        ? 'border border-cyan-300/15 bg-cyan-400/8 text-cyan-50'
                        : 'border border-fuchsia-300/15 bg-fuchsia-400/10 text-fuchsia-50'
                    }`}
                  >
                    <p className="mb-2 text-[11px] uppercase tracking-[0.3em] text-slate-300">{message.role}</p>
                    <p className="leading-6">{message.content}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {platformData.chatStarters.map((starter) => (
                  <button
                    key={starter}
                    type="button"
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200 transition hover:border-cyan-300/30 hover:text-white"
                    onClick={() => setChatInput(starter)}
                  >
                    {starter}
                  </button>
                ))}
              </div>
              <form className="mt-4 flex flex-col gap-3 sm:flex-row" onSubmit={handleChatSubmit}>
                <input
                  className="min-h-14 flex-1 rounded-2xl border border-white/10 bg-slate-950/65 px-4 py-3 text-white outline-none transition focus:border-cyan-300/40"
                  placeholder="Ask for summaries, research gaps, knowledge graphs, or deck narratives…"
                  value={chatInput}
                  onChange={(event) => setChatInput(event.target.value)}
                />
                <button
                  className="rounded-2xl bg-white px-5 py-3 font-medium text-slate-950 transition hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-60"
                  type="submit"
                  disabled={chatBusy}
                >
                  {chatBusy ? 'Thinking…' : 'Send'}
                </button>
              </form>
            </GlassPanel>

            <GlassPanel title="File upload system" subtitle="Ingest papers, slide decks, notes, and images for future OCR and retrieval workflows.">
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-cyan-300/30 bg-slate-950/35 px-6 py-12 text-center transition hover:border-cyan-200/50">
                <span className="text-sm uppercase tracking-[0.32em] text-cyan-100/70">Drag, drop, or browse</span>
                <span className="mt-3 max-w-sm text-sm text-slate-300">
                  Upload research papers, screenshots, or briefing docs to seed the intelligence workspace.
                </span>
                <span className="mt-5 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white">Select file</span>
                <input className="hidden" type="file" onChange={handleFileUpload} />
              </label>
              <p className="mt-4 text-sm text-cyan-200">{uploadStatus}</p>
              <div className="mt-4 space-y-3">
                {uploadedFiles.length === 0 ? (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-400">
                    No uploads yet. The backend already exposes an upload endpoint for future OCR and metadata extraction pipelines.
                  </div>
                ) : (
                  uploadedFiles.map((file) => (
                    <div key={`${file.fileName}-${file.size}`} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-medium text-white">{file.fileName}</p>
                          <p className="mt-1 text-sm text-slate-400">{file.summary}</p>
                        </div>
                        <span className="text-xs uppercase tracking-[0.3em] text-cyan-100/70">{file.type}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </GlassPanel>
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            <GlassPanel title="Profile" subtitle="Research identity and mission control.">
              <div className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
                <p className="text-2xl font-semibold text-white">{platformData.profile.name}</p>
                <p className="mt-2 text-sm text-cyan-200">{platformData.profile.role}</p>
                <p className="mt-4 text-sm leading-6 text-slate-300">{platformData.profile.focus}</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Streak</p>
                    <p className="mt-2 text-white">{platformData.profile.streak}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Location</p>
                    <p className="mt-2 text-white">{platformData.profile.location}</p>
                  </div>
                </div>
              </div>
            </GlassPanel>

            <GlassPanel title="History" subtitle="Recent research activity and evidence trails." className="xl:col-span-2">
              <div className="grid gap-3 lg:grid-cols-3">
                {platformData.history.map((item) => (
                  <article key={item.title} className="rounded-3xl border border-white/10 bg-slate-950/45 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[11px] uppercase tracking-[0.3em] text-cyan-100/70">{item.type}</span>
                      <span className="text-xs text-slate-400">{item.time}</span>
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{item.summary}</p>
                  </article>
                ))}
              </div>
            </GlassPanel>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <GlassPanel title="Research universe" subtitle="Explore thematic clusters, frontier momentum, and where to zoom next.">
              <div className="space-y-3">
                {platformData.researchUniverse.map((cluster) => (
                  <div key={cluster.cluster} className="rounded-3xl border border-white/10 bg-slate-950/45 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="text-lg font-medium text-white">{cluster.cluster}</h3>
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.26em] text-cyan-100/75">
                        {cluster.signal}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-slate-300">{cluster.focus}</p>
                    <p className="mt-4 text-sm text-slate-400">{cluster.papers}</p>
                  </div>
                ))}
              </div>
            </GlassPanel>

            <GlassPanel title="Memory chamber" subtitle="Store durable signals that future agents can reason over.">
              <div className="space-y-3">
                {platformData.memoryChamber.map((memory) => (
                  <div key={memory.title} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-medium text-white">{memory.title}</h3>
                      <span className="text-xs uppercase tracking-[0.28em] text-fuchsia-100/70">{memory.resonance}</span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{memory.detail}</p>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <GlassPanel title="Research gap lab" subtitle="Turn blind spots into hypotheses, experiments, and strategic bets.">
              <div className="space-y-3">
                {platformData.researchGaps.map((gap) => (
                  <article key={gap.title} className="rounded-3xl border border-white/10 bg-slate-950/45 p-4">
                    <h3 className="text-lg font-medium text-white">{gap.title}</h3>
                    <p className="mt-3 text-sm text-slate-300">{gap.opportunity}</p>
                    <p className="mt-4 text-sm text-emerald-200">{gap.impact}</p>
                  </article>
                ))}
              </div>
            </GlassPanel>

            <GlassPanel title="Presentation studio" subtitle="Convert validated findings into polished research narratives and decks.">
              <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-3">
                  {platformData.presentations.map((presentation) => (
                    <div key={presentation.title} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                      <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">{presentation.stage}</p>
                      <h3 className="mt-3 text-lg font-medium text-white">{presentation.title}</h3>
                      <p className="mt-3 text-sm text-slate-300">Audience: {presentation.audience}</p>
                      <p className="mt-2 text-sm text-cyan-200">{presentation.updatedAt}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-3xl border border-fuchsia-300/20 bg-linear-to-br from-fuchsia-500/18 to-cyan-400/10 p-5">
                  <p className="text-xs uppercase tracking-[0.28em] text-fuchsia-100/70">Next presentation move</p>
                  <h3 className="mt-4 text-2xl font-semibold text-white">{quickSignal.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-slate-200">{quickSignal.opportunity}</p>
                  <p className="mt-6 rounded-2xl border border-white/10 bg-slate-950/45 p-4 text-sm text-slate-200">
                    Suggested deck arc: context → evidence → research gap → opportunity sizing → execution roadmap.
                  </p>
                </div>
              </div>
            </GlassPanel>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
