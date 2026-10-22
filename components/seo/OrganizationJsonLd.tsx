import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "../../lib/site";
import { EMAIL, INSTAGRAM_HREF, SERVICES, TIKTOK_HREF } from "../sections/data";

// Format E.164 untuk mesin; `PHONE_LABEL` di data.ts hanya untuk tampilan.
const TELEPHONE = "+6282282873453";

// Alamat sengaja hanya sampai kota — jalan tidak dipublikasikan.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: SITE_NAME,
  alternateName: "TOP SOLVIX LABS",
  description: SITE_DESCRIPTION,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/brand/logo-on-light.png`,
  email: EMAIL,
  telephone: TELEPHONE,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tembilahan",
    addressRegion: "Riau",
    addressCountry: "ID",
  },
  areaServed: { "@type": "AdministrativeArea", name: "Riau" },
  sameAs: [INSTAGRAM_HREF, TIKTOK_HREF],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Layanan",
    itemListElement: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, description: s.description },
    })),
  },
};

export function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      // `<` di-escape agar string di dalam JSON tidak bisa menutup tag <script>.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
