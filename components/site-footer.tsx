import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Logo } from './site-header';

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="container">
      <div className="footer-cta">
        <div><span className="eyebrow">The next useful step</span><h2>Your next improvement<br /><em>starts here.</em></h2></div>
        <Link href="/free-website-review" className="footer-cta-link"><span>Get your free<br />website review</span><ArrowUpRight size={28} aria-hidden="true" /></Link>
      </div>
      <div className="footer-main">
        <div className="footer-brand"><Logo /><p>One dedicated partner for your website, search and digital growth. Direct communication and meaningful work, month after month.</p><span className="footer-availability"><i />Working with small businesses in the UK and US</span></div>
        <nav className="footer-columns" aria-label="Footer navigation">
          <div><h3>Explore</h3><Link href="/services">Services</Link><Link href="/packages">Packages</Link><Link href="/about">About</Link><Link href="/blog">Insights</Link></div>
          <div><h3>What we do</h3><Link href="/website-management">Website management</Link><Link href="/seo">SEO</Link><Link href="/paid-growth">Paid growth</Link><Link href="/services#cro">CRO improvements</Link><Link href="/services#ai-automation">AI workflows</Link></div>
          <div><h3>Connect</h3><Link href="/free-website-review">Free website review</Link><Link href="/contact">Contact us</Link></div>
        </nav>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Organic Reach HUB</span><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/cookies">Cookies</Link></div><span>WEBSITE / SEARCH / GROWTH</span></div>
    </div>
  </footer>;
}
