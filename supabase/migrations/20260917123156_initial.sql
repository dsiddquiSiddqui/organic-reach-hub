-- Apply this migration in the Supabase SQL editor or with `supabase db push`.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null default 'editor' check (role in ('admin','editor')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  content text not null default '',
  featured_image text,
  author text not null default 'Organic Reach HUB',
  category text not null default 'Website management',
  tags text[] not null default '{}',
  status text not null default 'draft' check (status in ('draft','published','scheduled')),
  published_at timestamptz,
  seo_title text,
  seo_description text,
  canonical_url text,
  focus_keyword text,
  og_title text,
  og_description text,
  og_image text,
  noindex boolean not null default false,
  nofollow boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists posts_status_date_idx on public.posts(status,published_at desc);
create table if not exists public.post_categories (
  post_id uuid not null references public.posts(id) on delete cascade,
  category_id uuid not null references public.categories(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key(post_id,category_id)
);
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('review','contact')),
  name text not null check (length(name) between 2 and 120),
  email text not null,
  company text not null,
  website_url text,
  service text,
  message text,
  status text not null default 'new' check (status in ('new','contacted','qualified','converted','closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists leads_created_idx on public.leads(created_at desc);
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create or replace function public.touch_updated_at() returns trigger language plpgsql set search_path = '' as $$
begin new.updated_at = now(); return new; end $$;
create trigger profiles_updated before update on public.profiles for each row execute function public.touch_updated_at();
create trigger categories_updated before update on public.categories for each row execute function public.touch_updated_at();
create trigger posts_updated before update on public.posts for each row execute function public.touch_updated_at();
create trigger leads_updated before update on public.leads for each row execute function public.touch_updated_at();
create trigger settings_updated before update on public.site_settings for each row execute function public.touch_updated_at();

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.posts enable row level security;
alter table public.post_categories enable row level security;
alter table public.leads enable row level security;
alter table public.site_settings enable row level security;

create policy profiles_self_read on public.profiles for select to authenticated using (id = (select auth.uid()));
create policy categories_public_read on public.categories for select to anon, authenticated using (true);
create policy categories_admin_write on public.categories for all to authenticated
  using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'))
  with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy posts_public_read on public.posts for select to anon, authenticated
  using ((status='published' and published_at<=now()) or (status='scheduled' and published_at<=now()));
create policy posts_admin_all on public.posts for all to authenticated
  using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'))
  with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy post_categories_public_read on public.post_categories for select to anon, authenticated
  using (exists(select 1 from public.posts p where p.id=post_id and ((p.status='published' and p.published_at<=now()) or (p.status='scheduled' and p.published_at<=now()))));
create policy post_categories_admin_all on public.post_categories for all to authenticated
  using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'))
  with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy leads_public_insert on public.leads for insert to anon, authenticated
  with check (status='new' and length(email)<=254 and length(company)<=160 and coalesce(length(message),0)<=3000);
create policy leads_admin_all on public.leads for all to authenticated
  using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'))
  with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy settings_admin_all on public.site_settings for all to authenticated
  using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'))
  with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));

-- Explicit grants support Supabase projects with opt-in Data API exposure.
grant usage on schema public to anon,authenticated;
grant select on public.categories,public.posts,public.post_categories to anon;
grant insert on public.leads to anon;
grant select on public.profiles,public.categories,public.posts,public.post_categories,public.leads,public.site_settings to authenticated;
grant insert,update,delete on public.categories,public.posts,public.post_categories,public.leads,public.site_settings to authenticated;

insert into public.categories(name,slug) values
 ('Website management','website-management'),('SEO','seo'),('Paid growth','paid-growth'),('Conversion','conversion')
on conflict (slug) do nothing;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values ('blog-media','blog-media',true,5242880,array['image/jpeg','image/png','image/webp','image/avif'])
on conflict (id) do nothing;
create policy media_public_read on storage.objects for select to anon,authenticated using (bucket_id='blog-media');
create policy media_admin_insert on storage.objects for insert to authenticated
  with check (bucket_id='blog-media' and exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy media_admin_update on storage.objects for update to authenticated
  using (bucket_id='blog-media' and exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'))
  with check (bucket_id='blog-media' and exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy media_admin_delete on storage.objects for delete to authenticated
  using (bucket_id='blog-media' and exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));

-- Create an Auth user in the Supabase dashboard, then grant that user admin access:
-- insert into public.profiles(id,email,role) values ('AUTH_USER_UUID','you@example.com','admin');

insert into public.posts(title,slug,excerpt,content,author,category,tags,status,published_at,seo_title,seo_description) values
('Website Maintenance vs Website Management: What’s the Difference?','website-maintenance-vs-management','Updates keep a site running. Management makes sure it keeps working for your business.','<h2>Maintenance is the baseline</h2><p>Website maintenance covers updates, backups, uptime checks and fixes. It protects the site you already have. These tasks matter, but they are only part of the job.</p><h2>Management is ongoing improvement</h2><p>Website management adds a regular look at how the site performs for visitors and for your business. Are forms working? Is the mobile experience clear? Are calls to action easy to find?</p><h2>What a monthly partner should do</h2><ul><li>Keep the technical foundations healthy.</li><li>Review search and visitor data.</li><li>Make small, purposeful improvements.</li><li>Explain what changed and what comes next.</li></ul>','Organic Reach HUB','Website management',array['Websites','Maintenance'],'published','2026-08-18','Website Maintenance vs Management | Organic Reach HUB','Understand the difference between routine website maintenance and proactive website management for small businesses.'),
('How Much Should a Small Business Spend on SEO?','small-business-seo-budget','A practical way to think about SEO spend, scope and the work your budget should actually buy.','<h2>Start with the work, not a magic number</h2><p>An SEO budget should reflect your market, your website and the amount of useful work that can be done each month. A local firm with a small site needs a different plan from a national business.</p><h2>What to expect</h2><p>At a minimum, someone should monitor indexing and search performance, maintain technical basics, improve existing service pages and report on progress.</p><h2>Ask for clarity</h2><p>Before signing up, ask what will be checked, changed and reported each month. Be wary of guaranteed rankings or vague promises without a work plan.</p>','Organic Reach HUB','SEO',array['SEO','Budget'],'published','2026-08-11','Small Business SEO Budget Guide | Organic Reach HUB','Learn how to assess an SEO budget by monthly scope, market competition and useful work rather than vague promises.'),
('Why Your Business Website Needs Monthly Maintenance','why-monthly-website-maintenance-matters','Small issues can quietly cost enquiries. A monthly routine keeps your site reliable and useful.','<h2>Websites do not stand still</h2><p>Software changes, links break, forms stop delivering and mobile layouts can drift. A site that looked finished at launch still needs regular care.</p><h2>A sensible monthly routine</h2><ul><li>Check uptime, backups and security.</li><li>Test important forms and conversion paths.</li><li>Review speed and mobile usability.</li><li>Fix broken links and errors.</li></ul><p>The goal is simple: keep the site dependable and make it a little better each month.</p>','Organic Reach HUB','Website management',array['Websites','Maintenance'],'published','2026-08-04','Why Monthly Website Maintenance Matters','Learn the practical monthly checks that keep a small business website reliable, secure and ready for enquiries.'),
('SEO vs Google Ads: Which Should Small Businesses Use?','seo-vs-google-ads-small-business','Understand where search optimisation and paid search fit, and when using both makes sense.','<h2>They solve different timing problems</h2><p>Google Ads can put an offer in front of people quickly, as long as you pay for clicks. SEO takes longer and builds the quality and visibility of your own pages over time.</p><h2>Start with your economics</h2><p>Consider the value of a new customer, the competition for your keywords and whether your website can convert visits into enquiries. Paid traffic sent to a weak page often wastes budget.</p><h2>A practical sequence</h2><p>Make the website clear and measurable first. Then choose the channel that fits your timeline and budget.</p>','Organic Reach HUB','Paid growth',array['SEO','Google Ads'],'published','2026-07-27','SEO vs Google Ads for Small Business','Compare SEO and Google Ads for a small business and choose the right approach for your timeline, budget and website.'),
('How to Improve Your Website’s Google Visibility','improve-google-visibility','A grounded checklist for making service pages easier to find, understand and trust.','<h2>Make important pages discoverable</h2><p>Check that search engines can crawl and index your key pages. A clean sitemap, sensible internal links and correct canonical tags help avoid confusion.</p><h2>Match the page to the question</h2><p>Each service page should explain the service, who it is for, where it is available and what the visitor should do next. Write for people first.</p><h2>Keep measuring</h2><p>Use Search Console to see which queries and pages gain impressions. Review the data regularly and improve pages based on real behaviour.</p>','Organic Reach HUB','SEO',array['SEO','Search visibility'],'published','2026-07-19','Improve Your Website’s Google Visibility','Practical steps to improve indexing, service page clarity and search visibility for a small business website.'),
('What Makes a High-Converting Service Business Website?','high-converting-service-business-website','The details that help visitors understand your offer and feel ready to get in touch.','<h2>Answer the first questions quickly</h2><p>Visitors need to know what you do, who you help and what to do next. Make that clear above the fold without relying on jargon.</p><h2>Reduce friction</h2><p>Keep forms short, show useful proof when you have it, and make phone and email options easy to find. The mobile journey deserves its own attention.</p><h2>Improve with evidence</h2><p>Track enquiries and review where people leave. Small headline, CTA and form changes can improve the journey when based on a clear hypothesis.</p>','Organic Reach HUB','Conversion',array['Conversion','Websites'],'published','2026-07-12','High-Converting Service Business Websites','Learn the page, form and trust details that help a service business website turn visits into enquiries.')
on conflict (slug) do nothing;

