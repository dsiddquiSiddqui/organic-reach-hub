# Organic Reach HUB launch audit

Audit date: 20 October 2026

## Architecture and route inventory

Next.js 16 App Router with React 19 and TypeScript. Public content is rendered from `app/`; articles use Supabase when configured and fall back to six bundled posts. Supabase also stores leads and provides admin authentication. `proxy.ts` refreshes Supabase claims for admin and API paths.

### Public routes present before this pass

`/`, `/services`, `/website-management`, `/seo`, `/paid-growth`, `/packages`, `/about`, `/blog`, `/blog/[slug]`, `/free-website-review`, `/contact`, `/privacy`, `/terms`, `/cookies`, `/robots.txt`, `/sitemap.xml`.

The dynamic blog route exposes six published articles. Unlinked application routes also include `/admin/login` and protected admin pages for posts, categories, media, leads, SEO and settings. These are excluded from the sitemap and `/admin/` is disallowed in robots.

### Routes added

`/website-maintenance`, `/wordpress-management`, `/local-seo`, `/technical-seo`, `/google-ads-management`, `/meta-ads-management`, `/conversion-rate-optimisation`, plus custom `/_not-found` behaviour through `app/not-found.tsx`.

The requested `/ai-workflow-automation`, `/analytics-conversion-tracking` and `/case-studies` routes remain unpublished. The current repository does not contain enough verified service detail or genuine case-study evidence to publish them responsibly.

## Pre-change findings

- Existing identity was coherent and reusable: Manrope body type, Georgia display type, green accent, restrained motion and a consistent editorial page shell.
- Core routes already had one H1, canonical metadata, descriptions, service schema, an XML sitemap and robots generation.
- Root metadata supplied Open Graph and X/Twitter defaults, but there was no dedicated social image asset.
- The home journey was strong but its hero did not use the requested launch proposition.
- Primary commercial pages were concise and lacked audience, process, detailed boundaries, related services and page-specific FAQs.
- Packages preserved the correct names and basic inclusions, but lacked comparison, onboarding and a full explanation of scope boundaries.
- All six articles were thin (approximately one-minute reads) and lacked tables, checklists, FAQs and service links.
- The form had client validation, Zod server validation and a honeypot, but no submission-age defence or rate limiting. URL validation accepted schemes beyond HTTP/HTTPS.
- Supabase migrations enable RLS on all public tables. Anonymous users can insert leads but cannot read them; administrators are checked through `profiles`. The browser uses a publishable key, not a service-role key.
- The lead insert policy limits lengths but does not reproduce every application validation rule. Durable, distributed rate limiting is not present.
- Legal pages accurately state Supabase storage and the present absence of non-essential analytics or advertising cookies. They still need legal/business review before launch.
- No verified founder biography, testimonials, qualifications, performance results or notification integration were found. Historical website records were subsequently approved for publication by the owner.
- No custom not-found or error UI was present.

## Implemented

- Reworked homepage hero proposition and CTA wording while preserving the visual composition.
- Added seven distinct service landing pages with unique intent, audiences, problems, deliverables, processes, exclusions, FAQs, related services and service/FAQ structured data.
- Added reusable `ServiceLanding` and data-driven service content structures.
- Updated header, footer, service overview and homepage internal links to the new routes.
- Added all new published routes to the sitemap and fixed the homepage sitemap URL so it has no trailing slash duplication.
- Added package comparison, onboarding and plain-English scope/ad-spend explanations.
- Expanded each published article with distinct practical guidance, a table, checklist or steps, contextual service links and a relevant FAQ.
- Added custom 404 and recoverable error UI.
- Added form privacy context, live status semantics, HTTP/HTTPS-only URL validation, submission-age checks and a best-effort per-instance rate limit.
- Added responsive styles for new service, comparison, FAQ and process components.
- Added a homepage trust strip and pre-enquiry reassurance section with accurate shared-ownership wording.
- Rebuilt the About page around the origin, ownership distinction, working principles and approved historical experience.
- Added `/our-work` with seven approved historical website projects, metadata and clear attribution.
- Added a server-only portfolio model that requires verification, permission, publication approval and a public asset before rendering a project.
- Added reusable portfolio, attribution, founder-profile and testimonial components; unverified profiles and testimonials render nothing.
- Extracted seven historical website candidates from PDF pages 33–35 and 38, retained private review sources and published optimised approved copies.
- Added seven statically generated project routes with unique metadata, breadcrumbs, CreativeWork schema, responsive imagery, evidence boundaries and related-service journeys.
- Added three approved featured projects to the homepage: Igloo Pakistan, Maroc Hammam Spa and The Pink Stone.
- Added evidence-standard sections to Website Management, SEO and Paid Growth.
- Added the independent-business relationship statement to the footer and contact journey.

## Verified

- `npm run lint`: pass.
- `npm run typecheck`: pass.
- `npm run build`: pass; 35 pages generated and all expected routes listed.
- HTTP route sweep: every public route returned 200; an unknown route returned 404.
- Heading sweep: every public route checked rendered exactly one H1.
- Invalid lead payload: returned 400 and did not reach the database insert.
- Browser checks at 360, 390, 768, 1024 and 1440 CSS pixels: no horizontal document overflow; mobile navigation was present through 768 and desktop navigation at 1024/1440.
- New landing-page browser check: correct title, H1, canonical URL, FAQ schema and CTA links.
- Sitemap and robots endpoints returned 200 and the sitemap contains the new service routes.
- `/our-work` checked at 360, 390, 768, 1024 and 1440px with no horizontal overflow and correct navigation switching.
- Confirmed all seven approved projects render publicly, their images return 200, their routes appear in the sitemap and an unknown project returns 404.

## Requires business or legal approval

- Canonical production domain. The code defaults to `https://organicreachhub.com`, while the supplied live URL is `https://organic-reach-hub.vercel.app/`. Set `NEXT_PUBLIC_SITE_URL` to the single domain that should be indexed before deployment.
- Founder/team name, biography, portrait, relevant experience and qualifications.
- Founder and current-team details remain unavailable. Testimonials, technology stacks, project dates and performance claims remain unpublished because supporting evidence was not supplied.
- Package prices, minimum terms, notice periods, response times and precise commercial commitments.
- Exact scope for AI workflow automation and analytics/tracking before dedicated pages are published.
- Legal review of privacy, cookie and terms copy, including retention periods, lawful basis, controller contact details, international processing and any future analytics/advertising tools.
- A lead-notification workflow and operational response owner.

## Remaining technical blockers and recommendations

- Replace the in-memory rate limit with a durable distributed limit at the platform or database edge before paid traffic or high-volume launch. The current limit is best-effort per server instance only.
- Verify the applied production database schema and RLS policies against the committed migrations; this audit inspected migration files but did not mutate or query the remote project.
- Add a branded 1200×630 Open Graph image and verify social previews.
- Run Lighthouse and an automated accessibility scanner in a stable browser test environment. Responsive and semantic browser checks were completed, but no Lighthouse or axe score is claimed.
- Add consent-aware conversion events only after the analytics platform, consent model and legal copy are approved.
- Add automated form notification monitoring and a safe staging destination for end-to-end form tests.
- Add verified proof components only when source material and publication permission exist.
