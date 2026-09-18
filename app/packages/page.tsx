import type { Metadata } from 'next';
import { PackagesSection } from '@/components/packages-section';
import { PageHero } from '@/components/page-shell';

export const metadata: Metadata = {
  title: 'Packages',
  description: 'Explore Website + SEO, Advanced Growth and Growth Plus support from Organic Reach HUB. Ask us which package fits your business.',
  alternates: { canonical: '/packages' },
};

export default function PackagesPage() {
  return <><PageHero eyebrow="Our packages" title="Your website and growth, looked after." copy="Choose the level of ongoing support that fits where your business is now. We’ll talk through the scope together before work begins." /><PackagesSection /></>;
}
