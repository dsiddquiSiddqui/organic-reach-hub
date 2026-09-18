'use client';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { createClient } from '@/lib/supabase/browser';
export function SignOut(){const router=useRouter();return <button className="admin-signout" onClick={async()=>{await createClient()?.auth.signOut();router.replace('/admin/login');router.refresh()}}><LogOut size={17}/> Sign out</button>}
