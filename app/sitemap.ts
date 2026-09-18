import type { MetadataRoute } from 'next';
import { getPosts } from '@/lib/posts';
import { siteUrl } from '@/lib/site';
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const paths=['','services','website-management','seo','paid-growth','packages','about','blog','contact','free-website-review','privacy','terms','cookies'];const posts=await getPosts();return [...paths.map(x=>({url:`${siteUrl}/${x}`,lastModified:new Date(),changeFrequency:'monthly' as const,priority:x===''?1:.7})),...posts.map(p=>({url:`${siteUrl}/blog/${p.slug}`,lastModified:new Date(p.updated_at||p.published_at||Date.now()),changeFrequency:'monthly' as const,priority:.6}))]}
