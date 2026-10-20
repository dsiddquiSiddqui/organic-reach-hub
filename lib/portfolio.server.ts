import 'server-only';

export type PortfolioProject = {
  id: string;
  slug: string;
  name: string;
  category: 'Website Development' | 'E-commerce' | 'Digital Creative' | 'Branding';
  summary: string | null;
  description: string | null;
  attribution: 'Experience behind Organic Reach HUB';
  relationshipType: 'previous-work';
  services: string[];
  industry: string | null;
  projectYear: number | null;
  images: { reviewPath: string; publicPath: string | null; alt: string; sourcePage: number }[];
  technologies: string[];
  objectives: string[];
  deliverables: string[];
  results: string[];
  clientWebsite: string | null;
  permissionStatus: 'pending-verification' | 'awaiting-permission' | 'approved' | 'rejected';
  verified: boolean;
  featured: boolean;
  publishStatus: 'draft' | 'published';
  seoTitle: string | null;
  seoDescription: string | null;
};

const approvedDetails: Record<string,{summary:string;description:string;featured:boolean}> = {
  'riviera-shades': { summary: 'A responsive website presentation for the Riviera Shades brand.', description: 'This approved previous-work record shows desktop and mobile layouts for a sunglasses storefront. The available record supports website-development attribution only; project dates, technology and commercial outcomes are not stated.', featured: false },
  '4ag-clothing': { summary: 'A fashion website presentation shown across desktop and mobile.', description: 'This approved previous-work record shows a visual retail experience for 4AG Clothing across desktop and mobile screens. No technology stack, delivery date or performance result is documented in the source material.', featured: false },
  'jilani-taylors': { summary: 'A website presentation for Jilani Taylors and its clothing collections.', description: 'This approved previous-work record shows a collection-led homepage and shopping navigation for Jilani Taylors. The source does not document the platform, full scope or results.', featured: false },
  'igloo-pakistan': { summary: 'A colourful website presentation for the Igloo Pakistan brand.', description: 'This approved previous-work record shows a product-led desktop experience shaped around Igloo Pakistan’s distinctive visual identity. Technology, objectives and outcomes are not asserted because they are absent from the supplied material.', featured: true },
  'good-guy-vapes': { summary: 'A responsive website presentation for Good Guy Vapes.', description: 'This approved previous-work record includes desktop and mobile storefront views for Good Guy Vapes. The source confirms the website-development category but does not record the platform, date or commercial results.', featured: false },
  'maroc-hammam-spa': { summary: 'A responsive website presentation for Maroc Hammam Spa.', description: 'This approved previous-work record shows a dark, gold-accented desktop and mobile experience for Maroc Hammam Spa. The source does not establish technology, full deliverables or performance outcomes.', featured: true },
  'the-pink-stone': { summary: 'A website presentation for The Pink Stone.', description: 'This approved previous-work record shows layered website screens and brand imagery for The Pink Stone. No project date, technology stack or measured result is claimed beyond the supplied source evidence.', featured: true },
};

const draftProjects: PortfolioProject[] = [
  ['riviera-shades', 'Riviera Shades', 33], ['4ag-clothing', '4AG Clothing', 33],
  ['jilani-taylors', 'Jilani Taylors', 34], ['igloo-pakistan', 'Igloo Pakistan', 34],
  ['good-guy-vapes', 'Good Guy Vapes', 35], ['maroc-hammam-spa', 'Maroc Hammam Spa', 35],
  ['the-pink-stone', 'The Pink Stone', 38],
].map(([slug, name, page]) => ({
  id: String(slug), slug: String(slug), name: String(name), category: 'Website Development',
  summary: approvedDetails[String(slug)].summary, description: approvedDetails[String(slug)].description, attribution: 'Experience behind Organic Reach HUB', relationshipType: 'previous-work',
  services: ['Website development'], industry: null, projectYear: null,
  images: [{ reviewPath: `/private/portfolio-review/${slug}.webp`, publicPath: `/portfolio/${slug}.webp`, alt: `Previous website presentation for ${name}`, sourcePage: Number(page) }],
  technologies: [], objectives: [], deliverables: ['Website development'], results: [], clientWebsite: null,
  permissionStatus: 'approved', verified: true, featured: approvedDetails[String(slug)].featured, publishStatus: 'published',
  seoTitle: `${name} Website Project`, seoDescription: `View the approved ${name} website-development project from the experience behind Organic Reach HUB.`,
})) as PortfolioProject[];

export function getPublishedProjects() {
  return draftProjects.filter(project => project.verified && project.permissionStatus === 'approved' && project.publishStatus === 'published' && project.images.some(image => image.publicPath));
}

export function getPortfolioApprovalSummary() {
  return { totalDrafts: draftProjects.length, approved: getPublishedProjects().length };
}

export function getPublishedProject(slug:string) {
  return getPublishedProjects().find(project=>project.slug===slug);
}
