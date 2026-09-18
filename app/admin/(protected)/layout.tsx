import Link from 'next/link';
import { LayoutDashboard, FileText, Tags, Image as ImageIcon, Search, Inbox, Settings } from 'lucide-react';
import { requireAdmin } from '@/lib/admin';
import { SignOut } from '@/components/admin/sign-out';
const links=[['Dashboard','/admin',LayoutDashboard],['Posts','/admin/posts',FileText],['Categories','/admin/categories',Tags],['Media','/admin/media',ImageIcon],['SEO','/admin/seo',Search],['Leads','/admin/leads',Inbox],['Settings','/admin/settings',Settings]] as const;
export default async function Layout({children}:{children:React.ReactNode}){await requireAdmin();return <div className="admin-shell"><aside className="admin-sidebar"><Link href="/admin" className="admin-brand"><span className="logo-mark"/>ORGANIC REACH <b>HUB</b></Link><div className="admin-kicker" style={{margin:'38px 0 17px'}}>WORKSPACE</div><nav>{links.map(([title,href,Icon])=><Link key={href} href={href}><Icon size={17}/>{title}</Link>)}</nav><div className="admin-sidebar-bottom"><SignOut/></div></aside><div className="admin-main"><div className="admin-topbar"><span>Organic Reach HUB / Admin</span><Link href="/" target="_blank">View website ↗</Link></div>{children}</div></div>}
