import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { brand, description, siteUrl } from '@/lib/site';
import './globals.css';
import './polish.css';
import './audit.css';
export const metadata:Metadata={metadataBase:new URL(siteUrl),title:{default:`${brand} | Your website and growth, managed`,template:`%s | ${brand}`},description,alternates:{canonical:'/'},openGraph:{type:'website',siteName:brand,title:brand,description,url:siteUrl},twitter:{card:'summary_large_image',title:brand,description}};
export default function RootLayout({children}:{children:React.ReactNode}){const graph=[{'@context':'https://schema.org','@type':'Organization',name:brand,url:siteUrl,description},{'@context':'https://schema.org','@type':'WebSite',name:brand,url:siteUrl}];return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(graph)}}/><SiteHeader/><main id="main-content">{children}</main><SiteFooter/></body></html>}
