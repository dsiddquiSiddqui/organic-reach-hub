import { requireAdmin } from '@/lib/admin';
import { MediaManager } from '@/components/admin/media-manager';
export default async function Page(){const {db}=await requireAdmin();const {data}=await db.storage.from('blog-media').list('',{limit:100,sortBy:{column:'created_at',order:'desc'}});return <div className="admin-content"><span className="admin-kicker">CONTENT / ASSETS</span><h1>Media</h1><MediaManager files={(data||[]).filter(x=>x.name)}/></div>}
