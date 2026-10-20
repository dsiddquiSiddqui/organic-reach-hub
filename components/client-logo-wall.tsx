import Image from 'next/image';
import { clientLogos } from '@/lib/client-logos';

export function ClientLogoWall({ compact = false }: { compact?: boolean }) {
  const logos = compact ? clientLogos.filter((logo) => logo.featured) : clientLogos;
  return <section className={`section client-logo-section${compact ? ' client-logo-section--compact' : ''}`}>
    <div className="container">
      <div className="section-head">
        <div><span className="eyebrow">Experience behind the business</span><h2 className="heading">Brands we have worked with.</h2></div>
        <p className="muted">A selection of organisations represented in our approved previous-work archive. These logos show past project experience and do not imply a current retained relationship.</p>
      </div>
      <div className="client-logo-grid" aria-label="Previous client and project brands">
        {logos.map((logo, index) => <div className="client-logo-card" key={`${logo.src}-${index}`}>
          <Image src={logo.src} alt={logo.name === 'Previous client brand' ? '' : `${logo.name} logo`} fill sizes={compact ? '(max-width: 640px) 50vw, 16vw' : '(max-width: 640px) 50vw, 20vw'} />
        </div>)}
      </div>
    </div>
  </section>;
}
