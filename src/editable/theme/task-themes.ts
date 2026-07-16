import type { CSSProperties } from 'react'
import type { TaskKey } from '@/lib/site-config'

/*
  Yelp-style task surfaces.

  Every task (archive + detail) now shares one cohesive premium identity:
  clean white surfaces, the signature Yelp red accent, hairline gray borders
  and a single crisp sans-serif — exactly like Yelp. Per-task copy (kicker /
  note) still varies so each section keeps a little voice, but the visual
  language is unified. Tokens are delivered via CSS variables (`--tk-*`).
*/

export type TaskTheme = {
  /** short flavour word shown as an eyebrow kicker */
  kicker: string
  /** one-line mood note for the page intro */
  note: string
  dark: boolean
  fontDisplay: string
  fontBody: string
  bg: string
  surface: string
  raised: string
  text: string
  muted: string
  line: string
  accent: string
  accentSoft: string
  onAccent: string
  glow: string
  radius: string
}

const YELP_FONT = "'Inter', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif"

// Shared Yelp palette — every task inherits this; only kicker/note differ.
const base = {
  dark: false,
  fontDisplay: YELP_FONT,
  fontBody: YELP_FONT,
  bg: '#ffffff',
  surface: '#ffffff',
  raised: '#f7f7f7',
  text: '#1a1a1a',
  muted: '#6b6b6b',
  line: '#e6e6e6',
  accent: '#d32323',
  accentSoft: '#fdecec',
  onAccent: '#ffffff',
  glow: 'rgba(211,35,35,0.06)',
  radius: '0.75rem',
} satisfies Omit<TaskTheme, 'kicker' | 'note'>

export const taskThemes: Record<TaskKey, TaskTheme> = {
  article: { ...base, fontDisplay: "'Libre Caslon Text', Georgia, serif", bg: '#fffdf8', surface: '#ffffff', raised: '#f4efe5', text: '#17130f', muted: '#716960', line: '#ded7ca', accent: '#f21f2b', accentSoft: '#fff0f1', radius: '0rem', kicker: 'The reading desk', note: 'In-depth reads, guides and stories worth your time.' },
  listing: { ...base, fontDisplay: "'Inter', system-ui, sans-serif", bg: '#f3f8f7', surface: '#ffffff', raised: '#e2efec', text: '#102a28', muted: '#617573', line: '#c9dcda', accent: '#087f74', accentSoft: '#dff5f1', onAccent: '#ffffff', radius: '1.35rem', kicker: 'Local directory', note: 'Find, compare and connect with useful businesses.' },
  classified: { ...base, kicker: 'Marketplace', note: 'Fresh offers and listings, ready to act on.' },
  image: { ...base, kicker: 'Photos', note: 'A visual feed of standout images and galleries.' },
  sbm: { ...base, kicker: 'Bookmarks', note: 'Curated resources and links worth saving.' },
  pdf: { ...base, kicker: 'Documents', note: 'Downloadable guides, reports and references.' },
  profile: { ...base, kicker: 'People', note: 'Discover creators, businesses and profiles.' },
}

export function getTaskTheme(task: TaskKey): TaskTheme {
  return taskThemes[task] || taskThemes.article
}

/** All `--tk-*` tokens + font overrides for a task surface, ready for `style`. */
export function taskThemeStyle(task: TaskKey): CSSProperties {
  const t = getTaskTheme(task)
  return {
    '--tk-bg': t.bg,
    '--tk-surface': t.surface,
    '--tk-raised': t.raised,
    '--tk-text': t.text,
    '--tk-muted': t.muted,
    '--tk-line': t.line,
    '--tk-accent': t.accent,
    '--tk-accent-soft': t.accentSoft,
    '--tk-on-accent': t.onAccent,
    '--tk-glow': t.glow,
    '--tk-radius': t.radius,
    // Re-point the shared article-body accent vars so post HTML (headings,
    // links) inherits this task's accent instead of the global site accent.
    '--slot4-accent': t.accent,
    '--slot4-accent-fill': t.accent,
    '--editable-font-display': t.fontDisplay,
    '--editable-font-body': t.fontBody,
    fontFamily: t.fontBody,
  } as CSSProperties
}
