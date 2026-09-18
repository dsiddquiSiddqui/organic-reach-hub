import { requireAdmin } from '@/lib/admin';
import { LeadsTable } from '@/components/admin/leads-table';
export default async function Page(){const {db}=await requireAdmin();const {data}=await db.from('leads').select('*').order('created_at',{ascending:false});return <div className="admin-content"><span className="admin-kicker">ENQUIRIES / MINI CRM</span><h1>Leads</h1><LeadsTable leads={data||[]}/></div>}
