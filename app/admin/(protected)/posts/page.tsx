import Link from 'next/link';
import { requireAdmin } from '@/lib/admin';
import { PostsTable } from '@/components/admin/posts-table';
export default async function Page(){const {db}=await requireAdmin();const {data}=await db.from('posts').select('id,title,slug,status,category,published_at,updated_at').order('updated_at',{ascending:false});return <div className="admin-content"><span className="admin-kicker">CONTENT</span><div className="admin-pagehead"><h1>Posts</h1><Link className="btn btn-dark" href="/admin/posts/new">Create post +</Link></div><PostsTable posts={data||[]}/></div>}
