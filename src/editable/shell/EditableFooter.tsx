'use client'
import Link from 'next/link'
import { ArrowUp, LogOut } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const { session, logout } = useEditableLocalAuthSession()
  const year = new Date().getFullYear()
  const tasks = SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'article')

  return <footer className="bg-[#080b16] text-white">
    <div className="mx-auto grid max-w-[1180px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr]">
      <div>
        <Link href="/" className="inline-flex items-center gap-4 font-serif text-4xl font-bold italic text-[#79d6ff] sm:text-5xl">
          <img src="/favicon.png" alt="" className="h-20 w-20 scale-125 object-contain sm:h-24 sm:w-24" />
          <span>bulktopus</span>
        </Link>
        <p className="mt-4 max-w-sm text-sm leading-7 text-white/60">Independent articles and practical business discovery for curious readers and confident decisions.</p>
      </div>
      <div>
        <h3 className="text-xs font-bold uppercase tracking-[.2em] text-[#79d6ff]">Explore</h3>
        <div className="mt-4 grid grid-cols-2 gap-3">{tasks.map((task) => <Link key={task.key} href={task.route} className="text-sm text-white/70 hover:text-white">{task.label}</Link>)}</div>
      </div>
      <div>
        <h3 className="text-xs font-bold uppercase tracking-[.2em] text-[#79d6ff]">Account</h3>
        <div className="mt-4 flex flex-wrap gap-3">{session ? <><Link href="/create" className="border border-white/20 px-4 py-2 text-sm">Create</Link><Link href="/about" className="border border-white/20 px-4 py-2 text-sm">About</Link><button onClick={logout} className="inline-flex items-center gap-2 bg-[var(--slot4-accent)] px-4 py-2 text-sm font-bold"><LogOut className="h-4 w-4" />Logout</button></> : <><Link href="/login" className="border border-white/20 px-4 py-2 text-sm">Login</Link><Link href="/signup" className="bg-[var(--slot4-accent)] px-4 py-2 text-sm font-bold">Sign up</Link></>}</div>
      </div>
    </div>
    <div className="border-t border-white/10"><div className="mx-auto flex max-w-[1180px] items-center justify-between px-4 py-5 text-xs text-white/50 sm:px-6"><span>© {year} {SITE_CONFIG.name}. All rights reserved.</span><a href="#" aria-label="Back to top" className="bg-[var(--slot4-accent)] p-3 text-white"><ArrowUp className="h-4 w-4" /></a></div></div>
  </footer>
}
