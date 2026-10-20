# Portfolio approval register

Prepared from `E:\Profile Digital Agency.pdf` (Agile Digital Technologies company profile, created March 2023; 40 pages).

The PDF is evidence that the projects were presented in Agile Digital Technologies' historical agency profile. It is not by itself evidence of exact deliverables, technologies, project dates, results, client approval, or current relationships.

## Private review assets

The original review crops remain outside `public/`. Following owner approval, optimised copies are published from `public/portfolio/` and the approved project routes are included in the sitemap.

| Candidate | PDF page | Private review asset | PDF evidence | Current status |
|---|---:|---|---|---|
| Riviera Shades | 33 | `private/portfolio-review/riviera-shades.webp` | Presented under Website Development | Approved and published |
| 4AG Clothing | 33 | `private/portfolio-review/4ag-clothing.webp` | Presented under Website Development | Approved and published |
| Jilani Taylors | 34 | `private/portfolio-review/jilani-taylors.webp` | Presented under Website Development | Approved and published |
| Igloo Pakistan | 34 | `private/portfolio-review/igloo-pakistan.webp` | Presented under Website Development | Approved and published |
| Good Guy Vapes | 35 | `private/portfolio-review/good-guy-vapes.webp` | Presented under Website Development | Approved and published |
| Maroc Hammam Spa | 35 | `private/portfolio-review/maroc-hammam-spa.webp` | Presented under Website Development | Approved and published |
| The Pink Stone | 38 | `private/portfolio-review/the-pink-stone.webp` | Presented as Website Development | Approved and published |

The crops are review derivatives of the PDF pages, not confirmed original-resolution project assets. Before publication, search for original screenshots and prefer them where available.

## Owner approval recorded

On 20 October 2026, the owner confirmed that all listed items were approved for publication. The implementation therefore publishes the names, approved PDF-derived screenshots and the verified high-level service category of website development.

## Evidence still intentionally omitted

- Project years remain omitted because the profile date is not evidence of completion dates.
- Technology stacks remain omitted because they are not documented per project.
- Objectives and broader deliverables remain omitted unless supported by project records.
- Results and performance metrics remain omitted because no analytics evidence was supplied.
- The imagery is explicitly labelled historical and is not presented as a current live-site view.

## Business information still required

- Organic Reach HUB founder/owner name and approved biography.
- Current role, specialisms and genuine professional experience.
- Approved founder photograph.
- Current team members and their consent to publication.
- Organic Reach HUB legal entity/contact information where disclosure is required.
- Genuine public email, telephone number, address or service location, if intended for publication.
- Package termination, handover, account-ownership and reporting policies.
- Any genuine testimonial text, original source, date and written reuse permission.

## Publication workflow

The private records in `lib/portfolio.server.ts` render publicly only when all of the following are true:

1. `verified` is `true`.
2. `permissionStatus` is `approved`.
3. `publishStatus` is `published`.
4. At least one approved image has a non-null `publicPath`.

All seven records now satisfy these publication gates. Unsupported fields remain empty and therefore do not render.
