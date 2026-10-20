import { createClient } from '@/lib/supabase/server';
import { seedPosts, type Post } from '@/lib/site';
import { enhancePost } from '@/lib/article-enhancements';
export async function getPosts():Promise<Post[]> {
 const db=await createClient();
 if(!db) return seedPosts.map(enhancePost);
 const {data,error}=await db.from('posts').select('*').in('status',['published','scheduled']).order('published_at',{ascending:false});
 if(error) return seedPosts.map(enhancePost);
 return ((data||[]) as Post[]).map(enhancePost);
}
export async function getPost(slug:string):Promise<Post|undefined>{
 const db=await createClient();
 if(!db) { const post=seedPosts.find(p=>p.slug===slug); return post?enhancePost(post):undefined; }
 const {data}=await db.from('posts').select('*').eq('slug',slug).in('status',['published','scheduled']).maybeSingle();
 return data?enhancePost(data as Post):undefined;
}
