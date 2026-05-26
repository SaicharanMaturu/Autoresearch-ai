import assert from 'node:assert/strict'
import test from 'node:test'
import { buildAssistantReply } from './assistantService.js'

test('buildAssistantReply highlights research gaps when asked', () => {
  const reply = buildAssistantReply('Which gap should we investigate next?')

  assert.match(reply, /underrepresented cohorts/i)
})

test('buildAssistantReply suggests a deck structure for presentation prompts', () => {
  const reply = buildAssistantReply('Create a presentation deck for leadership')

  assert.match(reply, /Recommended structure:/)
})
