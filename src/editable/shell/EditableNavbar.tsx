'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, X, PenLine, LogOut, UserRound } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open,setOpen]=useState(false); const pathname=usePathname(); const {session,logout}=useEditableLocalAuthSession()
  const items=useMemo(()=>SITE_CONFIG.tasks.filter(t=>t.enabled && t.key !== 'article').map(t=>({label:t.label,href:t.route})),[])
  return <header className="relative z-50 bg-white text-black">
    <div className="mx-auto grid max-w-[1180px] grid-cols-[1fr_auto_1fr] items-center px-4 py-5 sm:px-6">
      <span aria-hidden="true" />
      <Link href="/" aria-label="Bulktopus homepage" title="Go to Bulktopus homepage" className="group flex items-center gap-3 rounded-sm font-serif text-4xl font-bold italic tracking-[-.06em] text-[#62c9ef] outline-none transition hover:text-[#25aada] focus-visible:ring-2 focus-visible:ring-[var(--slot4-accent)] focus-visible:ring-offset-4 sm:text-6xl"><img src="/favicon.png" alt="" className="h-14 w-14 scale-110 object-contain transition group-hover:scale-125 sm:h-20 sm:w-20 sm:scale-125 sm:group-hover:scale-[1.35]"/><span>bulktopus</span></Link>
      <div className="flex items-center justify-self-end gap-2">
        {session ? <><span className="hidden items-center gap-2 text-sm font-bold sm:flex"><UserRound className="h-4 w-4"/>{session.name}</span><Link href="/create" className="hidden bg-[var(--slot4-accent)] px-4 py-2 text-xs font-bold text-white sm:flex"><PenLine className="mr-2 h-4 w-4"/>Create</Link><button onClick={logout} className="hidden items-center gap-2 px-3 py-2 text-sm font-bold transition hover:text-[var(--slot4-accent)] sm:inline-flex" aria-label="Logout"><LogOut className="h-4 w-4"/><span>Logout</span></button></> : <><Link href="/login" className="hidden text-sm font-bold sm:block">Login</Link><Link href="/signup" className="hidden bg-[var(--slot4-accent)] px-4 py-2 text-sm font-bold text-white sm:block">Sign up</Link></>}
        <button onClick={()=>setOpen(!open)} className="p-2 lg:hidden" aria-label="Toggle menu">{open?<X/>:<Menu/>}</button>
      </div>
    </div>
    <div className="border-y border-black/15">
      <nav className="mx-auto flex min-h-14 max-w-[1180px] items-center gap-7 overflow-x-auto px-4 sm:px-6">
        <Link href="/" className="font-bold text-[var(--slot4-accent)]">Home</Link>{items.map(i=><Link key={i.href} href={i.href} className={`whitespace-nowrap font-serif text-sm font-bold ${pathname.startsWith(i.href)?'text-[var(--slot4-accent)]':'hover:text-[var(--slot4-accent)]'}`}>{i.label}</Link>)}<Link href="/contact" className="whitespace-nowrap font-serif text-sm font-bold">Contact</Link><Link href="/search" className="ml-auto" aria-label="Search"><Search className="h-5 w-5"/></Link>
      </nav>
    </div>
    {open?<div className="absolute inset-x-0 top-full border-b bg-white p-4 shadow-xl lg:hidden"><div className="grid gap-1">{[...items,{label:'Contact',href:'/contact'},...(session?[{label:'Create',href:'/create'}]:[{label:'Login',href:'/login'},{label:'Sign up',href:'/signup'}])].map(i=><Link key={i.href} href={i.href} onClick={()=>setOpen(false)} className="border-b px-2 py-3 font-bold">{i.label}</Link>)}{session?<button onClick={()=>{logout();setOpen(false)}} className="px-2 py-3 text-left font-bold text-[var(--slot4-accent)]">Logout</button>:null}</div></div>:null}
  </header>
}
