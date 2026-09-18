import { createClient } from '@/lib/supabase/server';
import { seedPosts, type Post } from '@/lib/site';
export async function getPosts():Promise<Post[]> {
 const db=await createClient();
 if(!db) return seedPosts;
 const {data,error}=await db.from('posts').select('*').in('status',['published','scheduled']).order('published_at',{ascending:false});
 if(error) return seedPosts;
 return (data||[]) as Post[];
}
export async function getPost(slug:string):Promise<Post|undefined>{
 const db=await createClient();
 if(!db) return seedPosts.find(p=>p.slug===slug);
 const {data}=await db.from('posts').select('*').eq('slug',slug).in('status',['published','scheduled']).maybeSingle();
 return (data || undefined) as Post|undefined;
}
