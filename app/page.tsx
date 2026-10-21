import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { HomeMotion } from '@/components/home-motion';
import { ScopeMatcher } from '@/components/scope-matcher';
import { PackagesSection } from '@/components/packages-section';
import { LeadForm } from '@/components/lead-form';
import { ArticleCard } from '@/components/article-card';
import { ConversionReassurance } from '@/components/trust-content';
import { getPosts } from '@/lib/posts';
import {
  CuratedCredibility,
  FounderStoryPreview,
  GoalPathways,
  MomentumMethod,
  PremiumAiPositioning,
  PremiumHero,
  PremiumWorkShowcase,
} from '@/components/premium-home-sections';
import './home-premium.css';

export default async function Home() {
  const posts = (await getPosts()).slice(0, 3);
  return <>
    <HomeMotion />
    <PremiumHero />
    <CuratedCredibility />
    <GoalPathways />
    <FounderStoryPreview />
    <MomentumMethod />
    <PremiumWorkShowcase />
    <PremiumAiPositioning />
    <div id="digital-diagnosis"><ScopeMatcher homepage /></div>
    <PackagesSection compact />
    <section className="section premium-insights"><div className="container">
      <div className="premium-section-heading"><div><span className="eyebrow">Useful thinking</span><h2>Notes for building a more useful digital presence.</h2></div><div><p>Practical guidance on websites, search, conversion and responsible automation—written to help you make a better decision.</p><Link className="premium-text-link" href="/blog">Read all insights <ArrowUpRight size={15} aria-hidden="true"/></Link></div></div>
      <div className="blog-grid" data-home-reveal>{posts.map((post, index) => <ArticleCard post={post} index={index} key={post.slug}/>)}</div>
    </div></section>
    <ConversionReassurance />
    <section className="section premium-review"><div className="container"><div className="review-band" data-home-reveal><div><span className="eyebrow">A personal next step</span><h2 className="heading">Let me take a proper look at your website.</h2><p>Share the site and what is frustrating you. You will receive a practical review of the most useful next steps, without an obligation to buy a package.</p></div><LeadForm/></div></div></section>
  </>;
}
