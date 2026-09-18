import type { Metadata } from 'next';
import { ArticleCard } from '@/components/article-card';
import { PageHero } from '@/components/page-shell';
import { getPosts } from '@/lib/posts';
export const metadata:Metadata={title:'Insights',description:'Practical articles on website management, SEO, paid advertising and conversion for small businesses.',alternates:{canonical:'/blog'}};
export default async function Page(){const posts=await getPosts();return <><PageHero eyebrow="Insights" title="Clear thinking for a better website." copy="Practical notes on keeping your site healthy, visible and useful to the people who visit it." actions={false}/><section className="section"><div className="container"><div className="blog-grid">{posts.map((p,i)=><ArticleCard key={p.slug} post={p} index={i}/>)}</div></div></section></>}
