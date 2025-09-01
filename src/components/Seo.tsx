import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

type Alternate = { hrefLang: string; href: string };

type SeoProps = {
  title?: string;
  description?: string;
  path?: string;   // ex: "/projet-design"
  image?: string;  // URL absolue conseillée
  alternates?: Alternate[]; // ex: [{ hrefLang:"en", href:"https://.../projet-design?lng=en" }]
};

const Seo: React.FC<SeoProps> = ({ title, description, path = "/", image, alternates = [] }) => {
  const { t, i18n } = useTranslation();
  const siteName = t("seo.siteName", { defaultValue: "Walder Corporation" });
  const fullTitle = title ?? t("seo.homepageTitle");
  const desc = description ?? t("seo.homepageDescription");
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const url = origin ? origin + path : path;
  const lang = i18n.language || "fr";

  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      {/* hreflang alternates */}
      {alternates.map((a) => (
        <link key={a.hrefLang} rel="alternate" hrefLang={a.hrefLang} href={a.href} />
      ))}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image.startsWith("http") ? image : origin + image} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      {image && <meta name="twitter:image" content={image.startsWith("http") ? image : origin + image} />}
    </Helmet>
  );
};

export default Seo;
