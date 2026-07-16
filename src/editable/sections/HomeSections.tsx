import Link from 'next/link'
import { ArrowRight, Building2, Clock3, FileText, Search } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = { primaryTask: TaskKey; primaryRoute: string; posts: SitePost[]; timeSections: HomeTimeSection[] }

const shell = 'mx-auto w-full max-w-[1180px] px-4 sm:px-6'

function poolPosts(posts: SitePost[], sections: HomeTimeSection[]) {
  return Array.from(new Map([...posts, ...sections.flatMap((s) => s.posts)].map((p) => [p.slug || p.id || p.title, p])).values())
}

function Meta({ post }: { post: SitePost }) {
  const content = post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const author = typeof content.author === 'string' ? content.author : SITE_CONFIG.name
  return <p className="mt-3 flex items-center gap-2 text-[11px] uppercase tracking-[.13em] text-[var(--slot4-muted-text)]"><Clock3 className="h-3 w-3" /> {author}</p>
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = poolPosts(posts, timeSections)
  const lead = pool[0]
  const side = pool.slice(1, 3)
  if (!lead) return <section className={`${shell} py-20 text-center`}><h1 className="text-5xl font-bold">Ideas and businesses worth discovering.</h1></section>
  return (
    <>
      <section className="border-b border-[var(--editable-border)] bg-white">
        <div className={`${shell} py-6`}>
          <div className="news-ticker flex gap-8 overflow-hidden">
            {[...pool.slice(0, 6), ...pool.slice(0, 6)].map((post, i) => (
              <Link key={`${post.slug}-${i}`} href={postHref(primaryTask, post, primaryRoute)} className="flex w-[270px] shrink-0 items-center gap-3">
                <img src={getEditablePostImage(post)} alt="" className="h-16 w-16 rounded-full border-2 border-[var(--slot4-accent)] object-cover" />
                <span className="line-clamp-3 font-serif text-sm font-bold leading-snug">{post.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className={`${shell} py-10 sm:py-14`}>
        <div className="mb-8 flex flex-col justify-between gap-5 border-b border-black pb-6 md:flex-row md:items-end">
          <div><p className="text-xs font-bold uppercase tracking-[.22em] text-[var(--slot4-accent)]">The Bulktopus edit</p><h1 className="mt-2 max-w-3xl font-serif text-4xl font-bold leading-[1.05] sm:text-6xl">Smart reads. Remarkable businesses.</h1></div>
          <form action="/search" className="flex min-w-[280px] border-b border-black pb-2"><input name="q" placeholder="Search the edition" className="min-w-0 flex-1 bg-transparent text-sm outline-none"/><button aria-label="Search"><Search className="h-5 w-5"/></button></form>
        </div>
        <div className="grid gap-6 lg:grid-cols-[.8fr_1.65fr_.8fr]">
          <div className="grid gap-6">{side.slice(0,1).map((post) => <SmallFeature key={post.slug} post={post} href={postHref(primaryTask,post,primaryRoute)} />)}</div>
          <Link href={postHref(primaryTask, lead, primaryRoute)} className="group relative min-h-[460px] overflow-hidden bg-black">
            <img src={getEditablePostImage(lead)} alt={lead.title} className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent"/>
            <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9"><span className="bg-[var(--slot4-accent)] px-3 py-1 text-xs font-bold uppercase">{getEditableCategory(lead)}</span><h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-5xl">{lead.title}</h2><Meta post={lead}/></div>
          </Link>
          <div className="grid gap-6">{side.slice(1,2).map((post) => <SmallFeature key={post.slug} post={post} href={postHref(primaryTask,post,primaryRoute)} />)}{pool.slice(3,6).map((post) => <Link key={post.slug} href={postHref(primaryTask,post,primaryRoute)} className="border-b pb-4"><span className="text-[10px] font-bold uppercase text-[var(--slot4-accent)]">{getEditableCategory(post)}</span><h3 className="mt-1 line-clamp-2 font-serif font-bold">{post.title}</h3></Link>)}</div>
        </div>
      </section>
    </>
  )
}

function SmallFeature({post,href}:{post:SitePost;href:string}) { return <Link href={href} className="group relative min-h-[220px] overflow-hidden bg-black"><img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-105"/><div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"/><div className="absolute bottom-0 p-5 text-white"><span className="bg-[var(--slot4-accent)] px-2 py-1 text-[10px] font-bold uppercase">{getEditableCategory(post)}</span><h3 className="mt-3 font-serif text-xl font-bold leading-tight">{post.title}</h3></div></Link> }

export function EditableStoryRail({ primaryRoute }: HomeSectionProps) {
  const tasks = SITE_CONFIG.tasks.filter(t => t.enabled)
  return <section className="border-y bg-[var(--slot4-panel-bg)]"><div className={`${shell} flex flex-wrap items-center gap-3 py-5`}><strong className="mr-2 font-serif text-lg">Explore:</strong>{tasks.map(t=><Link key={t.key} href={t.route} className="rounded-full border border-black/15 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]">{t.label}</Link>)}<Link href={primaryRoute} className="ml-auto hidden items-center gap-2 text-sm font-bold sm:flex">View all <ArrowRight className="h-4 w-4"/></Link></div></section>
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const items=poolPosts(posts,timeSections).slice(4,12); if(!items.length)return null
  return <section className={`${shell} py-14`}><div className="mb-7 flex items-center gap-4"><h2 className="font-serif text-3xl font-bold">Latest stories</h2><div className="h-px flex-1 bg-[var(--slot4-accent)]"/></div><div className="grid gap-8 md:grid-cols-2">{items.map((p,i)=><Link key={p.slug} href={postHref(primaryTask,p,primaryRoute)} className={`group grid gap-5 border-b pb-7 ${i%3===1?'sm:grid-cols-[1fr_190px]':'sm:grid-cols-[190px_1fr]'}`}><img src={getEditablePostImage(p)} alt={p.title} className={`h-44 w-full object-cover ${i%3===1?'sm:order-2':''}`}/><div><span className="text-[10px] font-bold uppercase tracking-wider text-[var(--slot4-accent)]">{getEditableCategory(p)}</span><h3 className="mt-2 font-serif text-2xl font-bold leading-tight group-hover:text-[var(--slot4-accent)]">{p.title}</h3><p className="mt-3 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(p,130)}</p></div></Link>)}</div></section>
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const items=poolPosts(posts,timeSections).slice(0,8); if(!items.length)return null
  return <section className="overflow-hidden bg-[#080b16] py-14 text-white"><div className={shell}><div className="mb-7 flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[.24em] text-[#79d6ff]">Don’t miss</p><h2 className="mt-2 font-serif text-3xl font-bold">The endless edit</h2></div><Building2 className="h-8 w-8 text-[#79d6ff]"/></div><div className="endless-rail flex w-max gap-5">{[...items,...items].map((p,i)=><Link key={`${p.slug}-${i}`} href={postHref(primaryTask,p,primaryRoute)} className="group relative h-[350px] w-[270px] shrink-0 overflow-hidden"><img src={getEditablePostImage(p)} alt={p.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/><div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"/><div className="absolute bottom-0 p-5"><span className="bg-[var(--slot4-accent)] px-2 py-1 text-[10px] font-bold uppercase">{getEditableCategory(p)}</span><h3 className="mt-3 font-serif text-xl font-bold leading-tight">{p.title}</h3></div></Link>)}</div></div></section>
}

export function EditableHomeCta(){return <section className={`${shell} py-16 text-center`}><FileText className="mx-auto h-8 w-8 text-[var(--slot4-accent)]"/><h2 className="mx-auto mt-4 max-w-2xl font-serif text-4xl font-bold">Discover useful ideas and standout businesses every day.</h2><p className="mx-auto mt-4 max-w-xl text-[var(--slot4-muted-text)]">Read practical articles, compare services, and explore listings curated for informed decisions.</p><div className="mt-7 flex justify-center gap-3"><Link href="/article" className="bg-[var(--slot4-accent)] px-6 py-3 font-bold text-white">Read articles</Link><Link href="/listing" className="border border-black px-6 py-3 font-bold">Browse businesses</Link></div></section>}
