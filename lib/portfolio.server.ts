import 'server-only';

export type PortfolioProject = {
  id: string;
  slug: string;
  name: string;
  category: 'Website Development' | 'E-commerce' | 'Digital Creative' | 'Branding';
  summary: string | null;
  description: string | null;
  historicalAgency: 'Agile Digital Technologies';
  relationshipType: 'historical-agency-work';
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
  'riviera-shades': { summary: 'A historical responsive website presentation for the Riviera Shades brand.', description: 'The Agile Digital Technologies profile presents Riviera Shades under website development, showing desktop and mobile layouts for a sunglasses storefront. The available record supports website-development attribution only; project dates, technology and commercial outcomes are not stated.', featured: false },
  '4ag-clothing': { summary: 'A historical fashion website presentation shown across desktop and mobile.', description: 'The Agile Digital Technologies profile presents 4AG Clothing under website development. The supplied imagery shows a visual retail experience across desktop and mobile screens. No technology stack, delivery date or performance result is documented in the source.', featured: false },
  'jilani-taylors': { summary: 'A historical website presentation for Jilani Taylors and its clothing collections.', description: 'The Agile Digital Technologies profile presents Jilani Taylors under website development. Its historical screenshot shows a collection-led homepage and shopping navigation. The source does not document the platform, full scope or results.', featured: false },
  'igloo-pakistan': { summary: 'A colourful historical website presentation for the Igloo Pakistan brand.', description: 'The Agile Digital Technologies profile presents Igloo Pakistan under website development. The approved historical screenshot shows a branded desktop layout with product-led imagery. Technology, objectives and outcomes are not asserted because they are absent from the supplied profile.', featured: true },
  'good-guy-vapes': { summary: 'A historical responsive website presentation for Good Guy Vapes.', description: 'The Agile Digital Technologies profile presents Good Guy Vapes under website development, including desktop and mobile storefront views. The source confirms the presentation category but does not record the platform, date or commercial results.', featured: false },
  'maroc-hammam-spa': { summary: 'A historical responsive website presentation for Maroc Hammam Spa.', description: 'The Agile Digital Technologies profile presents Maroc Hammam Spa under website development. The approved image shows a dark, gold-accented desktop and mobile experience. The source does not establish technology, full deliverables or performance outcomes.', featured: true },
  'the-pink-stone': { summary: 'A historical website presentation for The Pink Stone.', description: 'The Agile Digital Technologies profile presents The Pink Stone as website-development work, with layered historical screens and brand imagery. No project date, technology stack or measured result is claimed beyond that source evidence.', featured: true },
};

const draftProjects: PortfolioProject[] = [
  ['riviera-shades', 'Riviera Shades', 33], ['4ag-clothing', '4AG Clothing', 33],
  ['jilani-taylors', 'Jilani Taylors', 34], ['igloo-pakistan', 'Igloo Pakistan', 34],
  ['good-guy-vapes', 'Good Guy Vapes', 35], ['maroc-hammam-spa', 'Maroc Hammam Spa', 35],
  ['the-pink-stone', 'The Pink Stone', 38],
].map(([slug, name, page]) => ({
  id: String(slug), slug: String(slug), name: String(name), category: 'Website Development',
  summary: approvedDetails[String(slug)].summary, description: approvedDetails[String(slug)].description, historicalAgency: 'Agile Digital Technologies', relationshipType: 'historical-agency-work',
  services: ['Website development'], industry: null, projectYear: null,
  images: [{ reviewPath: `/private/portfolio-review/${slug}.webp`, publicPath: `/portfolio/${slug}.webp`, alt: `Historical website presentation for ${name}, shown in the Agile Digital Technologies agency profile`, sourcePage: Number(page) }],
  technologies: [], objectives: [], deliverables: ['Website development'], results: [], clientWebsite: null,
  permissionStatus: 'approved', verified: true, featured: approvedDetails[String(slug)].featured, publishStatus: 'published',
  seoTitle: `${name} Website Project`, seoDescription: `View the historical ${name} website-development project presented by Agile Digital Technologies and the experience behind Organic Reach HUB.`,
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
