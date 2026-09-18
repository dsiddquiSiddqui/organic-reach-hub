import { requireAdmin } from '@/lib/admin';
import { PostEditor } from '@/components/admin/post-editor';
export default async function Page(){const {db}=await requireAdmin();const {data}=await db.from('categories').select('name').order('name');return <div className="admin-content"><span className="admin-kicker">CONTENT / NEW POST</span><h1>Create an article.</h1><PostEditor categories={(data||[]).map(x=>x.name)}/></div>}
