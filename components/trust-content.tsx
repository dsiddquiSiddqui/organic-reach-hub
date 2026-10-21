import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getPublishedProjects, type PortfolioProject } from '@/lib/portfolio.server';

export function TrustStrip() {
  return <section className="trust-strip"><div className="container trust-strip-inner"><div><span className="eyebrow">Built around real work</span><h2>One partner who sees the whole picture.</h2></div><p>Organic Reach HUB brings practical website, search and digital marketing experience into one focused ongoing service—so the technical work and the commercial goal do not drift apart.</p><Link href="/about">Meet the thinking behind the business <ArrowUpRight size={15} aria-hidden="true" /></Link></div></section>;
}

export function ConversionReassurance() {
  const items=[['A practical review','We look at website health, search visibility and the path from visit to enquiry.'],['A clear follow-up','We use the details you provide to respond with observations and sensible next steps.'],['No obligation','Requesting a review does not commit you to a package or ongoing agreement.'],['Direct communication','You speak with the people responsible for reviewing and improving the work.']];
  return <section className="section reassurance-section"><div className="container"><div className="section-head"><div><span className="eyebrow">Before you enquire</span><h2 className="heading">A useful review, handled responsibly.</h2></div><p className="muted">Your details are stored in our protected lead system and used to respond to your enquiry. Read the <Link href="/privacy">privacy policy</Link> for more information.</p></div><div className="reassurance-grid">{items.map(([title,copy],index)=><div key={title}><span>0{index+1}</span><h3>{title}</h3><p>{copy}</p></div>)}</div></div></section>;
}

export function RelevantExperience({ service }: { service: 'website' | 'seo' | 'paid' }) {
  const content={
    website:['Website experience behind the service','Previous website-development work informs how we assess structure, responsive behaviour and the long-term maintainability of a site. Explore the approved examples in our work archive.'],
    seo:['Evidence, not borrowed outcomes','Historical website screenshots do not prove SEO performance. We publish SEO results only when search or analytics evidence, scope and permission can be verified. Until then, our process and deliverables remain the evidence available on this page.'],
    paid:['Creative work is not campaign performance','Historical creative production does not establish advertising return. Paid-growth results will appear only when campaign records, attribution and publication permission are available.'],
  }[service];
  return <section className="section relevant-experience"><div className="container content-grid"><div><span className="eyebrow">Relevant experience</span><h2 className="heading">{content[0]}</h2></div><div><p>{content[1]}</p><Link className="editorial-text-link" href="/our-work">Review our portfolio approach <ArrowUpRight size={15} aria-hidden="true"/></Link></div></div></section>;
}

export function ProjectAttribution() {
  return <p className="project-attribution">Selected experience from work delivered through Agile Digital Technologies, a separate business under shared ownership with Organic Reach HUB.</p>;
}

export function PortfolioCard({ project }: { project: PortfolioProject }) {
  const image = project.images.find(item => item.publicPath);
  if (!image) return null;
  return <article className="portfolio-card"><Link href={`/our-work/${project.slug}`}><div className="portfolio-image"><Image src={image.publicPath!} alt={image.alt} fill sizes="(max-width: 760px) 100vw, 50vw" /></div><span className="eyebrow">{project.category}</span><h2>{project.name}</h2>{project.summary && <p>{project.summary}</p>}<ProjectAttribution/><span className="portfolio-link">View project <ArrowUpRight size={15} aria-hidden="true" /></span></Link></article>;
}

export function PortfolioGrid({ projects }: { projects: PortfolioProject[] }) {
  if (!projects.length) return <div className="portfolio-empty"><span className="eyebrow">Approval in progress</span><h2 className="heading">Selected historical work is being prepared carefully.</h2><p>Project records and imagery are being verified for attribution, scope and publication permission. We will publish them here only when those checks are complete.</p><Link className="btn btn-dark" href="/about">Read about our background <ArrowUpRight size={15} aria-hidden="true" /></Link></div>;
  return <div className="portfolio-grid">{projects.map(project => <PortfolioCard project={project} key={project.id} />)}</div>;
}

export function FeaturedProjects() {
  const projects=getPublishedProjects().filter(project=>project.featured).slice(0,3);
  if(!projects.length)return null;
  return <section className="section featured-work"><div className="container"><div className="section-head"><div><span className="eyebrow">Selected previous work</span><h2 className="heading">Experience you can see.</h2></div><div><p className="muted">Explore approved website projects delivered through Agile Digital Technologies, a separate business under shared ownership. We avoid attaching results that have not been verified.</p><Link className="editorial-text-link" href="/our-work">Explore our work <ArrowUpRight size={15} aria-hidden="true"/></Link></div></div><PortfolioGrid projects={projects}/></div></section>;
}

export type Profile = { name: string; role: string; biography: string; image: string };
export function FounderProfile({ profile }: { profile?: Profile }) {
  if (!profile) return null;
  return <article className="founder-profile"><Image src={profile.image} alt={`${profile.name}, ${profile.role}`} width={520} height={620}/><div><span className="eyebrow">The experience behind the work</span><h2 className="heading">{profile.name}</h2><strong>{profile.role}</strong><p>{profile.biography}</p></div></article>;
}

export type Testimonial = { quote: string; reviewer: string; business: string; role?: string; attribution: string; reviewDate?: string; permissionStatus: 'approved' | 'pending'; source: string; relatedProject?: string };
export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  if (testimonial.permissionStatus !== 'approved') return null;
  return <figure className="testimonial-card"><blockquote>{testimonial.quote}</blockquote><figcaption><strong>{testimonial.reviewer}</strong><span>{testimonial.role ? `${testimonial.role}, ` : ''}{testimonial.business}</span><small>{testimonial.attribution}</small></figcaption></figure>;
}
