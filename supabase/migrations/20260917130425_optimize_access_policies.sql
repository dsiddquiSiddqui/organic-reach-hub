create index if not exists post_categories_category_idx on public.post_categories(category_id);

drop policy categories_public_read on public.categories;
drop policy categories_admin_write on public.categories;
create policy categories_anon_read on public.categories for select to anon using (true);
create policy categories_auth_read on public.categories for select to authenticated using (true);
create policy categories_admin_insert on public.categories for insert to authenticated
  with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy categories_admin_update on public.categories for update to authenticated
  using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'))
  with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy categories_admin_delete on public.categories for delete to authenticated
  using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));

drop policy posts_public_read on public.posts;
drop policy posts_admin_all on public.posts;
create policy posts_anon_read on public.posts for select to anon
  using ((status='published' and published_at<=now()) or (status='scheduled' and published_at<=now()));
create policy posts_auth_read on public.posts for select to authenticated
  using ((status='published' and published_at<=now()) or (status='scheduled' and published_at<=now())
    or exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy posts_admin_insert on public.posts for insert to authenticated
  with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy posts_admin_update on public.posts for update to authenticated
  using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'))
  with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy posts_admin_delete on public.posts for delete to authenticated
  using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));

drop policy post_categories_public_read on public.post_categories;
drop policy post_categories_admin_all on public.post_categories;
create policy post_categories_anon_read on public.post_categories for select to anon
  using (exists(select 1 from public.posts p where p.id=post_id and ((p.status='published' and p.published_at<=now()) or (p.status='scheduled' and p.published_at<=now()))));
create policy post_categories_auth_read on public.post_categories for select to authenticated
  using (exists(select 1 from public.posts p where p.id=post_id and ((p.status='published' and p.published_at<=now()) or (p.status='scheduled' and p.published_at<=now())))
    or exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy post_categories_admin_insert on public.post_categories for insert to authenticated
  with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy post_categories_admin_update on public.post_categories for update to authenticated
  using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'))
  with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy post_categories_admin_delete on public.post_categories for delete to authenticated
  using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));

drop policy leads_public_insert on public.leads;
drop policy leads_admin_all on public.leads;
create policy leads_public_insert on public.leads for insert to anon, authenticated
  with check (status='new' and length(email)<=254 and length(company)<=160 and coalesce(length(message),0)<=3000);
create policy leads_admin_read on public.leads for select to authenticated
  using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy leads_admin_update on public.leads for update to authenticated
  using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'))
  with check (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
create policy leads_admin_delete on public.leads for delete to authenticated
  using (exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));
