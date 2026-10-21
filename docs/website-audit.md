# Organic Reach HUB website audit

Audit completed: 21 October 2026.

The live Vercel hostname, live sitemap and live robots file each returned HTTP 200 during the audit. The live sitemap contains 36 canonical `organicreachhub.com` URLs: 23 static routes, seven approved project routes and six published article routes. The Vercel hostname is therefore acting as an access point while canonical discovery targets the configured production domain.

## Route inventory

| Route | Purpose | Status |
|---|---|---|
| `/` | Primary commercial landing page | Improved and verified |
| `/services` | Service overview and routing | Improved |
| `/website-management` | Ongoing management service | Verified |
| `/website-maintenance` | Maintenance service | Verified |
| `/wordpress-management` | WordPress management service | Verified |
| `/seo` | Core SEO service | Verified |
| `/local-seo` | Local SEO service | Verified |
| `/technical-seo` | Technical SEO service | Verified |
| `/paid-growth` | Paid acquisition overview | Verified |
| `/google-ads-management` | Google Ads service | Verified |
| `/meta-ads-management` | Meta Ads service | Verified |
| `/conversion-rate-optimisation` | CRO service | Verified |
| `/ai-workflow-automation` | Responsible automation service | Improved discoverability |
| `/analytics-conversion-tracking` | Analytics service | Improved discoverability |
| `/packages` | Package comparison and qualification | Verified |
| `/about` | Brand story and operating model | Verified |
| `/our-work` | Approved previous-work overview | Attribution strengthened |
| `/our-work/[slug]` | Approved individual work record | Verified |
| `/free-website-review` | Primary lead-generation page | Improved |
| `/contact` | General and service enquiry | Verified |
| `/blog` | Insight index | Verified |
| `/blog/[slug]` | Published article | Verified |
| `/privacy`, `/terms`, `/cookies` | Legal information | Verified; legal review still required |
| `/admin/*` | Authenticated content and lead dashboard | Excluded from sitemap and robots crawling |
| `/api/leads` | Enquiry submission handler | Verified |

## Issues found and fixes implemented

- Two service overview cards linked directly to an enquiry form instead of their existing dedicated service pages. They now lead to the AI workflow automation and analytics pages.
- AI workflow automation and analytics routes did not activate the Services navigation state. Both are now included.
- The homepage FAQ and FAQ structured-data components existed but were not rendered. Both are now included.
- The sitemap generated a new `lastModified` value for every static and portfolio URL on every request/build. Unsupported dates were removed; article dates are emitted only when a real published or updated date exists.
- The robots file now explicitly blocks both `/admin` and `/admin/` path forms.
- Portfolio disclosures were less specific than the verified source register. Public attribution now states that selected work was delivered through Agile Digital Technologies, a separate business under shared ownership with Organic Reach HUB.
- The free review form did not require the visitor's primary concern or goal. The message field is now clearly labelled and required.
- Required delivery documentation was missing. The audit, keyword map, content strategy, trust-assets list and implementation report have been added.

## Existing strengths retained

- Next.js App Router metadata and canonical URLs.
- Service, FAQ, organisation, website, breadcrumb and article structured data where applicable.
- Server-side lead validation, honeypot, timing check, lightweight rate limiting and safe error responses.
- Supabase-backed leads and content management without exposing service credentials.
- Permission-gated portfolio data with explicit evidence boundaries.
- Responsive navigation, focus states, reduced-motion support, semantic tables and labelled forms.
- Distinct service-page content, related-service links, FAQs, exclusions and process details.

## Remaining limitations

- The final production domain must be confirmed through `NEXT_PUBLIC_SITE_URL`; the code falls back to `https://organicreachhub.com`.
- In-memory rate limiting is instance-local. A durable shared limiter is advisable if abuse becomes material.
- No production enquiry was submitted during verification, to avoid external side effects.
- No verified founder name, portrait, full biography, public email, telephone number, address, testimonials or measured case-study outcomes were available.
- Legal pages need review against the final legal entity, contact details, tracking configuration and operating territories.
- Automated checks support accessibility work but do not constitute WCAG certification.

