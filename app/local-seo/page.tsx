import { ServiceLanding, serviceMetadata } from '@/components/service-landing';
import { servicePages } from '@/lib/service-pages';
const data = servicePages['local-seo'];
export const metadata = serviceMetadata(data);
export default function Page() { return <ServiceLanding data={data} />; }
