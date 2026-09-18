import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/admin';
import { PostEditor } from '@/components/admin/post-editor';
import type { Post } from '@/lib/site';
export default async function Page({params}:{params:Promise<{id:string}>}){const {id}=await params;const {db}=await requireAdmin();const [{data:post},{data:categories}]=await Promise.all([db.from('posts').select('*').eq('id',id).maybeSingle(),db.from('categories').select('name').order('name')]);if(!post)notFound();return <div className="admin-content"><span className="admin-kicker">CONTENT / EDIT POST</span><h1>Edit article.</h1><PostEditor initial={post as Post} categories={(categories||[]).map(x=>x.name)}/></div>}
