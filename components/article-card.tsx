import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { type Post, readingTime } from '@/lib/site';
export function ArticleCard({post,index=0}:{post:Post;index?:number}){return <Link href={`/blog/${post.slug}`} className="article-card"><div className="article-art" style={index%3===1?{background:'#253329',color:'#d9f3b0'}:undefined}>{post.featured_image?<Image src={post.featured_image} alt="" fill sizes="(max-width: 640px) 100vw, 33vw" style={{objectFit:'cover'}}/>:<span>{post.category} / {String(index+1).padStart(2,'0')}</span>}</div><div className="article-card-body"><small>{post.category} · {readingTime(post.content)} min read</small><h3>{post.title}</h3><p>{post.excerpt}</p><footer><span>Read article</span><ArrowUpRight size={15}/></footer></div></Link>}
