import type { AuthResponse, ChatResponse, PlatformData, UploadResponse } from '../types/platform'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001/api'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json() as Promise<T>
}

export function getPlatformData() {
  return request<PlatformData>('/platform')
}

export function login(email: string, password: string) {
  return request<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export function sendChatMessage(message: string) {
  return request<ChatResponse>('/chat', {
    method: 'POST',
    body: JSON.stringify({ message }),
  })
}

export async function uploadResearchFile(file: File) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`Upload failed with status ${response.status}`)
  }

  return response.json() as Promise<UploadResponse>
}
