const responseTemplates = [
  'I traced that question through the dashboard, memory chamber, and research gap lab. The strongest next move is to formalize the evidence chain and push the result into presentation mode.',
  'The current platform data suggests prioritizing documents with the highest novelty signal, then routing the validated findings into a presentation-ready storyline.',
  'I would connect this prompt to a future LLM + RAG pipeline, but even in preview mode the platform can outline the likely gaps, opportunities, and stakeholder narrative.',
]

export function buildAssistantReply(message: string) {
  const normalized = message.trim().toLowerCase()
  const template = responseTemplates[normalized.length % responseTemplates.length]

  if (normalized.includes('gap')) {
    return `${template} Focus on underrepresented cohorts, missing ontologies, and time-to-presentation latency.`
  }

  if (normalized.includes('presentation') || normalized.includes('deck')) {
    return `${template} Recommended structure: research context, evidence trail, gap framing, and execution roadmap.`
  }

  return `${template} Prompt received: “${message.trim()}”.`
}
