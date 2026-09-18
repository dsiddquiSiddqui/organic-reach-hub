import { requireAdmin } from '@/lib/admin';
import { CategoriesManager } from '@/components/admin/categories-manager';
export default async function Page(){const {db}=await requireAdmin();const {data}=await db.from('categories').select('*').order('name');return <div className="admin-content"><span className="admin-kicker">CONTENT / TAXONOMY</span><h1>Categories</h1><CategoriesManager categories={data||[]}/></div>}
