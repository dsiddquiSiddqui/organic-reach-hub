import { ServiceLanding, serviceMetadata } from '@/components/service-landing';
import { servicePages } from '@/lib/service-pages';

const data = servicePages['ai-workflow-automation'];
export const metadata = serviceMetadata(data);
export default function Page() { return <ServiceLanding data={data} />; }
