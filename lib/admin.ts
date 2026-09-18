import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
export async function requireAdmin(){const db=await createClient();if(!db)redirect('/admin/login?error=setup');const {data}=await db.auth.getClaims();const claims=data?.claims;if(!claims?.sub)redirect('/admin/login');const {data:profile}=await db.from('profiles').select('role').eq('id',claims.sub).maybeSingle();if(profile?.role!=='admin')redirect('/admin/login?error=access');return {db,userId:claims.sub}}
