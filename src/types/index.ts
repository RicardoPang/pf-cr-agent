export interface CodeFile {
  id: string
  name: string
  content: string
  language: string
  size: number
  lastModified: Date
}

export interface ReviewIssue {
  id: string
  type: 'error' | 'warning' | 'info'
  severity: 'high' | 'medium' | 'low'
  category: string
  line: number
  column?: number
  message: string
  suggestion?: string
  ruleId?: string
}

export interface ReviewResult {
  id: string
  fileId: string
  timestamp: Date
  overall: {
    score: number
    issues: number
    suggestions: number
    complexity: 'low' | 'medium' | 'high'
    maintainability: number
    reliability: number
    security: number
  }
  issues: ReviewIssue[]
  suggestions: string[]
  metrics: {
    linesOfCode: number
    cyclomaticComplexity: number
    maintainabilityIndex: number
    technicalDebt: string
  }
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'user' | 'admin'
  preferences: {
    theme: 'light' | 'dark' | 'system'
    language: string
    autoReview: boolean
    notifications: boolean
  }
}

export interface Project {
  id: string
  name: string
  description: string
  repository?: {
    url: string
    branch: string
    provider: 'github' | 'gitlab' | 'bitbucket'
  }
  files: CodeFile[]
  reviews: ReviewResult[]
  settings: {
    rules: string[]
    excludePatterns: string[]
    autoReview: boolean
  }
  createdAt: Date
  updatedAt: Date
}

export interface AIReviewOptions {
  model: 'gpt-4' | 'gpt-3.5-turbo' | 'claude-3'
  temperature: number
  maxTokens: number
  includeContext: boolean
  focusAreas: string[]
  customPrompt?: string
}

export interface TechStack {
  framework: string[]
  language: string[]
  tools: string[]
  patterns: string[]
}

export interface CodeMetrics {
  linesOfCode: number
  cyclomaticComplexity: number
  maintainabilityIndex: number
  technicalDebt: number
  testCoverage?: number
  duplicateLines?: number
}

export interface GitHubIntegration {
  token: string
  repositories: {
    owner: string
    repo: string
    branch: string
  }[]
  webhookUrl?: string
  autoReviewPRs: boolean
}

export interface ReviewTemplate {
  id: string
  name: string
  description: string
  rules: {
    category: string
    weight: number
    enabled: boolean
  }[]
  prompts: {
    system: string
    user: string
  }
  settings: AIReviewOptions
}