'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { nav, serviceLinks } from '@/lib/site';

export function Logo() {
  return <Link href="/" className="logo" aria-label="Organic Reach HUB home"><span className="logo-mark" aria-hidden="true" /><span>ORGANIC<br /><strong>REACH</strong><em>HUB</em></span></Link>;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  const servicePaths = ['/website-management', '/website-maintenance', '/wordpress-management', '/seo', '/local-seo', '/technical-seo', '/paid-growth', '/google-ads-management', '/meta-ads-management', '/conversion-rate-optimisation', '/ai-workflow-automation', '/analytics-conversion-tracking'];
  const isActive = (href: string) => pathname === href || (href === '/blog' && pathname.startsWith('/blog/')) || (href === '/services' && servicePaths.includes(pathname));

  return <header className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' menu-open' : ''}`}>
    <div className="container header-inner">
      <Logo />
      <nav className="desktop-nav" aria-label="Main navigation">
        {nav.map(item => item.label === 'Services' ? <div className="nav-dropdown" key={item.href}>
          <Link className={`nav-link${isActive(item.href) ? ' is-active' : ''}`} aria-current={isActive(item.href) ? 'page' : undefined} href={item.href}>Services</Link>
          <div className="mega"><span className="mega-label">Explore the work</span>{serviceLinks.map((service, index) => <Link key={service.href} href={service.href}><span className="mega-index">0{index + 1}</span><span><strong>{service.title}</strong><small>{service.detail}</small></span><ArrowUpRight size={15} aria-hidden="true" /></Link>)}</div>
        </div> : <Link className={`nav-link${isActive(item.href) ? ' is-active' : ''}`} aria-current={isActive(item.href) ? 'page' : undefined} key={item.href} href={item.href}>{item.label}</Link>)}
      </nav>
      <Link className="btn btn-dark header-cta" href="/free-website-review">Free website review <ArrowUpRight size={15} aria-hidden="true" /></Link>
      <button className="menu-button" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-site-nav" onClick={() => setOpen(value => !value)}>{open ? <X /> : <Menu />}</button>
    </div>
    {open && <nav className="mobile-nav" id="mobile-site-nav" aria-label="Mobile navigation">
      <div className="container mobile-nav-inner">
        <span className="mobile-nav-label">Explore</span>
        <div className="mobile-nav-primary">{nav.map((item, index) => <Link className={isActive(item.href) ? 'is-active' : ''} aria-current={isActive(item.href) ? 'page' : undefined} key={item.href} href={item.href} onClick={() => setOpen(false)}><span>0{index + 1}</span>{item.label}<ArrowUpRight size={17} aria-hidden="true" /></Link>)}</div>
        <span className="mobile-nav-label">What we manage</span>
        <div className="mobile-nav-services">{serviceLinks.map(service => <Link key={service.href} href={service.href} onClick={() => setOpen(false)}>{service.title}</Link>)}</div>
        <Link className="mobile-nav-cta" href="/free-website-review" onClick={() => setOpen(false)}>Get your free website review <ArrowUpRight size={18} aria-hidden="true" /></Link>
      </div>
    </nav>}
  </header>;
}
