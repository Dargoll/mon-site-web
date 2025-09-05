import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import heroBackground from "@/assets/hero-background-tech.jpg";
import Seo from "@/components/Seo";
import { useTranslation } from "react-i18next";
import {
  Search,
  MapPin,
  AlertCircle,
  RefreshCw,
  Database,
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Building2,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ---------- Types ----------
interface LocationInfo {
  address: string;
  city: string;
  postcode: string;
  department?: string;
  departmentCode?: string;
  cityCode: string;
  coordinates: [number, number]; // [lon, lat]
}

interface CrimeStat {
  indicateur: string;
  years: { [year: string]: number };
  lastYear: string;
  lastValue: number;
  evolution: number | null;
}

interface CrimeData {
  stats: CrimeStat[];
  total: number;
  metadata?: {
    source?: string;
    resource_id?: string;
    last_updated?: string;
    total_records?: number;
    data_period?: string;
    years_available?: number;
  };
}

interface CrimeStats {
  [key: string]: CrimeData;
}

interface AggregatedItem {
  id?: string;
  source: string;
  title: string;
  description?: string;
  url?: string;
  published_at?: string;
  metadata?: { hashtags?: string[] };
}
interface AggregatorResult {
  items: AggregatedItem[];
  timestamp?: string;
}

// ---------- UI helpers ----------
const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  children,
  className = "",
}) => (
  <div className={`bg-card border border-border rounded-lg shadow-sm ${className}`}>
    {children}
  </div>
);

const CardContent: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  children,
  className = "",
}) => <div className={`p-6 ${className}`}>{children}</div>;

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;
type SectionColor = "primary" | "green" | "purple" | "orange";

const colorClasses: Record<
  SectionColor,
  { box: string; icon: string; badge: string }
> = {
  primary: {
    box: "border-primary/50 bg-primary/10",
    icon: "text-primary",
    badge: "bg-primary/20 text-primary",
  },
  green: {
    box: "border-emerald-500/50 bg-emerald-500/10",
    icon: "text-emerald-400",
    badge: "bg-emerald-600/20 text-emerald-300",
  },
  purple: {
    box: "border-violet-500/50 bg-violet-500/10",
    icon: "text-violet-400",
    badge: "bg-violet-600/20 text-violet-300",
  },
  orange: {
    box: "border-orange-500/50 bg-orange-500/10",
    icon: "text-orange-400",
    badge: "bg-orange-600/20 text-orange-300",
  },
};

const ExpandableSection: React.FC<{
  title: string;
  subtitle?: string;
  icon: IconType;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  metadata?: { source?: string; period?: string; lastUpdate?: string };
  itemCount?: number;
  color?: SectionColor;
}> = ({
  title,
  subtitle,
  icon: Icon,
  isOpen,
  onToggle,
  children,
  metadata,
  itemCount = 0,
  color = "primary",
}) => {
  const c = colorClasses[color];

  return (
    <div className={`border rounded-lg ${c.box} transition-all duration-300`}>
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between hover:bg-foreground/5 transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <Icon className={`h-6 w-6 ${c.icon}`} />
          <div className="text-left">
            <h3 className="text-lg font-bold text-foreground">{title}</h3>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {itemCount > 0 && (
            <span className={`px-2 py-1 rounded text-xs ${c.badge}`}>
              {itemCount} éléments
            </span>
          )}
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-border/60">
          <div className="p-4">{children}</div>
          {metadata && (
            <div className="border-t border-border/40 p-3 bg-card/60">
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                {metadata?.source && (
                  <div className="flex items-center gap-1">
                    <Database className="h-3 w-3" />
                    <span>{metadata.source}</span>
                  </div>
                )}
                {metadata?.period && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Période&nbsp;: {metadata.period}</span>
                  </div>
                )}
                {metadata?.lastUpdate && (
                  <div className="flex items-center gap-1">
                    <span>
                      MAJ&nbsp;:{" "}
                      {new Date(metadata.lastUpdate).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const StatsGrid: React.FC<{
  stats: CrimeStat[];
  getEvolutionIcon: (evolution: number | null) => JSX.Element;
  getEvolutionColor: (evolution: number | null) => string;
}> = ({ stats, getEvolutionIcon, getEvolutionColor }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {stats.slice(0, 15).map((stat, i) => {
      const color =
        stat.evolution !== null
          ? getEvolutionColor(stat.evolution)
          : "text-muted-foreground";
      return (
        <div
          key={`${stat.indicateur}-${i}`}
          className="bg-card/60 rounded-lg p-4 border border-border/60 hover:border-border transition-colors"
        >
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-sm font-medium text-foreground leading-tight">
              {stat.indicateur}
            </h4>
            {stat.evolution !== null && (
              <div className={`flex items-center gap-1 ${color}`}>
                {getEvolutionIcon(stat.evolution)}
              </div>
            )}
          </div>

          <div className="space-y-1">
            <div className="text-2xl font-bold text-foreground">
              {stat.lastValue}
            </div>
            <div className="text-xs text-muted-foreground">{stat.lastYear}</div>
            {stat.evolution !== null && (
              <div className={`text-xs ${color}`}>
                {stat.evolution > 0 ? "+" : ""}
                {stat.evolution.toFixed(1)}% vs année préc.
              </div>
            )}
          </div>
        </div>
      );
    })}
  </div>
);

// ---------- Reusable SearchBar ----------
const SearchBar: React.FC<{
  address: string;
  setAddress: (v: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  exampleAddresses: string[];
}> = ({ address, setAddress, onSubmit, loading, exampleAddresses }) => (
  <form onSubmit={onSubmit} className="space-y-6">
    <div className="relative">
      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Saisissez une adresse (ex: 1 Avenue des Champs-Élysées, Paris)"
        className="w-full h-14 pl-12 pr-36 rounded border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        <Button type="submit" disabled={loading || !address.trim()} className="h-10">
          {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
        </Button>
      </div>
    </div>

  </form>
);

// ---------- Page ----------
const ApiData: React.FC = () => {
  const { t } = useTranslation();
  const [address, setAddress] = useState("");
  const [searchResults, setSearchResults] = useState<AggregatorResult | null>(null);
  const [crimeStats, setCrimeStats] = useState<CrimeStats | null>(null);
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // Hauteur dynamique de la navbar
  const [navH, setNavH] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.querySelector("nav");
      setNavH(el ? el.getBoundingClientRect().height : 0);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Config API
  const API_KEY =
    (import.meta as any).env?.VITE_API_KEY || "ak_int_7ab8ced0324efdae3fad640f5b0748";
  const API_BASE = (import.meta as any).env?.VITE_API_BASE || window.location.origin;

  const DEP_RESOURCE_ID = "93438d99-b493-499c-b39f-7de46fa58669";
  const COM_RESOURCE_ID = "6252a84c-6b9e-4415-a743-fc6a631877bb";

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!address.trim()) return;

    setLoading(true);
    setError("");
    setHasSearched(true);
    setSearchResults(null);
    setCrimeStats(null);
    setLocationInfo(null);

    try {
      // 1) Géoloc BAN
      const geoResponse = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(address.trim())}&limit=1`
      );
      if (!geoResponse.ok) throw new Error("Impossible de géolocaliser cette adresse");

      const geoData = await geoResponse.json();
      if (!geoData.features || geoData.features.length === 0) throw new Error("Adresse non trouvée");

      const feature = geoData.features[0];
      const context = feature.properties.context || "";
      const parts = context.split(",").map((s: string) => s.trim());

      const location: LocationInfo = {
        address: feature.properties.label,
        city: feature.properties.city,
        postcode: feature.properties.postcode,
        department: parts[1],
        departmentCode: parts[0],
        cityCode: feature.properties.citycode,
        coordinates: feature.geometry.coordinates,
      };
      setLocationInfo(location);

      // 2) Données
      await Promise.all([fetchCrimeStats(location), fetchApiResults(location)]);
    } catch (err: any) {
      setError(err?.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  const fetchCrimeStats = async (location: LocationInfo) => {
    try {
      const promises: Promise<any>[] = [];

      if (location.cityCode) {
        const comUrl = `https://tabular-api.data.gouv.fr/api/resources/${COM_RESOURCE_ID}/data/?CODGEO_2025__exact=${location.cityCode}&page_size=200`;
        promises.push(
          fetch(comUrl)
            .then((res) => res.json())
            .then((data) => ({
              type: "commune",
              data: data.data,
              metadata: {
                source: "Data.gouv.fr - Base communale",
                resource_id: COM_RESOURCE_ID,
                last_updated: new Date().toISOString(),
                total_records: data.data?.length || 0,
              },
            }))
        );
      }

      if (location.departmentCode) {
        const depUrl = `https://tabular-api.data.gouv.fr/api/resources/${DEP_RESOURCE_ID}/data/?Code_departement__exact=${location.departmentCode}&page_size=200`;
        promises.push(
          fetch(depUrl)
            .then((res) => res.json())
            .then((data) => ({
              type: "departement",
              data: data.data,
              metadata: {
                source: "Data.gouv.fr - Base départementale",
                resource_id: DEP_RESOURCE_ID,
                last_updated: new Date().toISOString(),
                total_records: data.data?.length || 0,
              },
            }))
        );
      }

      const results = await Promise.all(promises);
      const processed = processCrimeData(results);
      setCrimeStats(processed);
    } catch (e) {
      console.error("Erreur récupération stats criminalité:", e);
    }
  };

  const processCrimeData = (results: any[]): CrimeStats => {
    const processed: CrimeStats = {};
    const officialUpdate = "2025-07-10T00:00:00Z"; // MAJ officielle

    results.forEach((result) => {
      if (result.data && result.data.length > 0) {
        const groupedData: { [indicateur: string]: { [year: string]: number } } = {};

        result.data.forEach((item: any) => {
          if (!groupedData[item.indicateur]) {
            groupedData[item.indicateur] = {};
          }
          groupedData[item.indicateur][item.annee] = parseInt(item.nombre) || 0;
        });

        const statsWithEvolution: CrimeStat[] = Object.entries(groupedData).map(
          ([indicateur, years]) => {
            const yearsList = Object.keys(years).sort();
            const lastYear = yearsList[yearsList.length - 1];
            const prevYear = yearsList[yearsList.length - 2];

            const lastValue = years[lastYear] || 0;
            const prevValue = years[prevYear] || 0;

            let evolution: number | null = null;
            if (prevValue > 0) {
              evolution = ((lastValue - prevValue) / prevValue) * 100;
            }

            return {
              indicateur,
              years,
              lastYear,
              lastValue,
              evolution,
            };
          }
        );

        const allYears = new Set<string>();
        Object.values(groupedData).forEach((years) => {
          Object.keys(years).forEach((year) => allYears.add(year));
        });
        const yearsList = Array.from(allYears).sort();

        processed[result.type] = {
          stats: statsWithEvolution,
          total: result.data.length,
          metadata: {
            ...result.metadata,
            last_updated: officialUpdate,
            data_period:
              yearsList.length > 0
                ? `${yearsList[0]} - ${yearsList[yearsList.length - 1]}`
                : "Non disponible",
            years_available: yearsList.length,
          },
        };
      }
    });

    return processed;
  };

  const fetchApiResults = async (location: LocationInfo) => {
    try {
      const query = encodeURIComponent(`${location.city} ${location.department || ""}`);
      const response = await fetch(
        `${API_BASE}/api/aggregator?sources=twitter&query=${query}&limit=10&api_key=${API_KEY}`
      );
      if (response.ok) {
        const result = (await response.json()) as AggregatorResult;
        setSearchResults(result);
      }
    } catch (e) {
      console.error("Erreur récupération API results:", e);
    }
  };

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));

  const getEvolutionIcon = (evolution: number | null) => {
    if (evolution === null) return <Minus className="h-4 w-4 text-muted-foreground" />;
    if (evolution > 0) return <TrendingUp className="h-4 w-4" />;
    if (evolution < 0) return <TrendingDown className="h-4 w-4" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  const getEvolutionColor = (evolution: number | null) => {
    if (evolution === null) return "text-muted-foreground";
    if (evolution > 0) return "text-red-500";
    if (evolution < 0) return "text-emerald-500";
    return "text-muted-foreground";
  };

  const exampleAddresses = [
    "1 Avenue des Champs-Élysées, Paris",
    "Place Bellecour, Lyon",
    "Vieux-Port, Marseille",
    "Place du Capitole, Toulouse",
    "Place Stanislas, Nancy",
  ];

  // SEO alternates
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const alternates = [
    { hrefLang: "fr", href: `${origin}/api-data?lng=fr` },
    { hrefLang: "en", href: `${origin}/api-data?lng=en` },
    { hrefLang: "zh", href: `${origin}/api-data?lng=zh` },
    { hrefLang: "x-default", href: `${origin}/api-data` },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Seo
        title="Sécurité & Actualités — Analyse par adresse"
        description="Statistiques de délinquance (commune & département) et mentions locales dans les médias/réseaux, à partir d'une adresse."
        path="/api-data"
        image="/images/og/og-media.jpg"
        alternates={alternates}
      />

      <Navigation />

      {/* Layout conditionnel : Flexbox pour page d'accueil, normal pour résultats */}
      {!hasSearched && !loading ? (
        // Page d'accueil avec layout optimisé
        <div className="flex-1 flex flex-col">
          {/* Hero avec hauteur adaptative */}
          <div
            className={`
              relative
              -mx-4 sm:-mx-6
              tech-grid
              flex-shrink-0
            `}
            style={{
              marginTop: -navH,
              paddingTop: navH,
              height: 'clamp(200px, 28vh, 400px)',
              backgroundImage: `linear-gradient(rgba(34,40,49,0.85), rgba(34,40,49,0.7)), url(${heroBackground})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* scan-lines */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="scan-line absolute -top-8 left-0 right-0 h-0.5"></div>
                <div className="scan-line absolute -bottom-8 left-0 right-0 h-0.5" style={{ animationDelay: "2s" }}></div>
              </div>
            </div>

            {/* Conteneur : titre centré uniquement */}
            <div className="relative z-10 max-w-5xl mx-auto h-full px-6 flex items-center justify-center">
              <div className="text-center">
                <div className="inline-block border border-primary/30 rounded-lg px-4 py-2 mb-6 bg-primary/10 backdrop-blur-sm">
                  <span className="text-primary text-sm font-mono uppercase tracking-wider">
                    ANALYSE TERRITORIALE
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-primary glow mb-4">
                  Sécurité & Actualités
                </h1>
                <p className="text-xl text-foreground/70 font-mono">
                  Statistiques de délinquance et actualités locales par adresse
                </p>
              </div>
            </div>
          </div>

          {/* Intro avec flex-1 pour prendre l'espace restant */}
          <section className="flex-1 flex flex-col justify-center px-6 py-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <BarChart3 className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Analyse de Sécurité par Adresse
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                Obtenez les statistiques officielles de délinquance et l'actualité locale
                pour n'importe quelle adresse en France.
              </p>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <Card>
                  <CardContent className="p-4 text-center">
                    <BarChart3 className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-sm font-semibold text-foreground">
                      Stats Officielles
                    </div>
                    <div className="text-xs text-muted-foreground">Data.gouv.fr</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Clock className="h-6 w-6 mx-auto mb-2 text-emerald-400" />
                    <div className="text-sm font-semibold text-foreground">
                      Évolutions récentes
                    </div>
                    <div className="text-xs text-muted-foreground">Suivi annuel</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <MapPin className="h-6 w-6 mx-auto mb-2 text-violet-400" />
                    <div className="text-sm font-semibold text-foreground">
                      Géolocalisé
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Commune & Département
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Barre de recherche fixée en bas (DESKTOP) */}
          <section 
            data-searchbar-desktop
            className="px-6 py-8 bg-card/60 border-t border-border/60 hidden md:block flex-shrink-0"
          >
            <div className="max-w-4xl mx-auto">
              <div className="rounded-xl border border-border bg-card/80 backdrop-blur-md shadow-xl px-6 py-5">
                <SearchBar
                  address={address}
                  setAddress={setAddress}
                  onSubmit={handleSearch}
                  loading={loading}
                  exampleAddresses={exampleAddresses}
                />
              </div>
            </div>
          </section>

          {/* Barre de recherche (MOBILE uniquement) */}
          <section className="py-12 px-6 bg-card/60 border-y border-border/60 md:hidden">
            <div className="max-w-4xl mx-auto">
              <SearchBar
                address={address}
                setAddress={setAddress}
                onSubmit={handleSearch}
                loading={loading}
                exampleAddresses={exampleAddresses}
              />
            </div>
          </section>
        </div>
      ) : (
        // Layout normal pour chargement et résultats
        <>
          {/* Hero normal */}
          <div
            className={`
              relative
              -mx-4 sm:-mx-6
              h-[40vh] md:h-[34vh] lg:h-[30vh]
              tech-grid
            `}
            style={{
              marginTop: -navH,
              paddingTop: navH,
              backgroundImage: `linear-gradient(rgba(34,40,49,0.85), rgba(34,40,49,0.7)), url(${heroBackground})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* scan-lines */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="scan-line absolute -top-8 left-0 right-0 h-0.5"></div>
                <div className="scan-line absolute -bottom-8 left-0 right-0 h-0.5" style={{ animationDelay: "2s" }}></div>
              </div>
            </div>

            {/* Conteneur : titre centré uniquement */}
            <div className="relative z-10 max-w-5xl mx-auto h-full px-6 flex items-center justify-center">
              <div className="text-center">
                <div className="inline-block border border-primary/30 rounded-lg px-4 py-2 mb-6 bg-primary/10 backdrop-blur-sm">
                  <span className="text-primary text-sm font-mono uppercase tracking-wider">
                    ANALYSE TERRITORIALE
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-primary glow mb-4">
                  Sécurité & Actualités
                </h1>
                <p className="text-xl text-foreground/70 font-mono">
                  Statistiques de délinquance et actualités locales par adresse
                </p>
              </div>
            </div>
          </div>

          {/* Barre de recherche (MOBILE uniquement) */}
          <section className="py-12 px-6 bg-card/60 border-y border-border/60 md:hidden">
            <div className="max-w-4xl mx-auto">
              <SearchBar
                address={address}
                setAddress={setAddress}
                onSubmit={handleSearch}
                loading={loading}
                exampleAddresses={exampleAddresses}
              />
            </div>
          </section>

          {/* Contenu */}
          <div className="flex-1 py-16 px-6">
            <div className="max-w-6xl mx-auto">
              {/* Erreur */}
              {error && (
                <Card className="mb-8 border-red-500/40 bg-red-500/10">
                  <CardContent>
                    <div className="flex items-center gap-2 text-red-400">
                      <AlertCircle className="h-5 w-5" />
                      <span className="font-semibold">Erreur de recherche</span>
                    </div>
                    <p className="text-red-300 mt-2 font-mono text-sm">{error}</p>
                  </CardContent>
                </Card>
              )}

              {/* Chargement */}
              {loading && (
                <div className="text-center py-16">
                  <div className="relative inline-block">
                    <RefreshCw className="h-12 w-12 animate-spin text-primary" />
                    <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-foreground font-mono mt-4 text-lg">
                    Analyse en cours pour <span className="text-primary">"{address}"</span>
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Géolocalisation et récupération des données…
                  </p>
                </div>
              )}

              {/* Résultats */}
              {locationInfo && hasSearched && !loading && (
                <>
                  <Card className="mb-8 bg-primary/5 border-primary/30">
                    <CardContent>
                      <div className="flex items-center gap-3 mb-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        <h2 className="text-xl font-bold text-primary">Localisation</h2>
                      </div>
                      <p className="text-foreground font-mono text-lg">{locationInfo.address}</p>
                      <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                        <span>
                          Ville : <strong className="text-foreground">{locationInfo.city}</strong>
                        </span>
                        <span>
                          Code postal :{" "}
                          <strong className="text-foreground">{locationInfo.postcode}</strong>
                        </span>
                        {locationInfo.department && (
                          <span>
                            Département :{" "}
                            <strong className="text-foreground">{locationInfo.department}</strong>
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    {/* Criminalité */}
                    {crimeStats &&
                      Object.entries(crimeStats).map(([type, data]) => {
                        const title =
                          type === "commune"
                            ? `Délinquance - ${locationInfo.city}`
                            : `Délinquance - ${locationInfo.department || "Département"}`;
                        const subtitle =
                          type === "commune"
                            ? "Statistiques communales"
                            : "Statistiques départementales";
                        return (
                          <ExpandableSection
                            key={type}
                            title={title}
                            subtitle={subtitle}
                            icon={BarChart3}
                            isOpen={true}
                            onToggle={() => {}}
                            itemCount={data.stats?.length || 0}
                            color="primary"
                            metadata={{
                              source: data.metadata?.source || "Data.gouv.fr",
                              period: data.metadata?.data_period,
                              lastUpdate: data.metadata?.last_updated,
                            }}
                          >
                            <StatsGrid
                              stats={data.stats || []}
                              getEvolutionIcon={getEvolutionIcon}
                              getEvolutionColor={getEvolutionColor}
                            />
                            {data.stats && data.stats.length > 15 && (
                              <div className="mt-4 text-center">
                                <span className="text-sm text-muted-foreground">
                                  … et {data.stats.length - 15} autres indicateurs
                                </span>
                              </div>
                            )}
                          </ExpandableSection>
                        );
                      })}

                    {/* Actualités */}
                    {searchResults?.items?.length ? (
                      <ExpandableSection
                        title="Actualités Locales"
                        subtitle="Mentions dans les médias et réseaux sociaux"
                        icon={Database}
                        isOpen={false}
                        onToggle={() => {}}
                        itemCount={searchResults.items.length}
                        color="green"
                        metadata={{
                          source: "Agrégateur (Twitter/News)",
                          lastUpdate: searchResults.timestamp,
                        }}
                      >
                        <div className="space-y-3">
                          {searchResults.items.slice(0, 5).map((item, idx) => (
                            <div
                              key={item.id || idx}
                              className="bg-card/60 rounded-lg p-4 border border-border/60"
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="px-2 py-1 text-xs rounded bg-emerald-600/20 text-emerald-300">
                                      {item.source}
                                    </span>
                                    {item.published_at && (
                                      <span className="text-xs text-muted-foreground">
                                        {formatDate(item.published_at)}
                                      </span>
                                    )}
                                  </div>
                                  <h4 className="text-sm font-semibold text-foreground mb-2 leading-tight">
                                    {item.title}
                                  </h4>
                                  {item.description && (
                                    <p className="text-sm text-foreground/80 leading-relaxed">
                                      {item.description.length > 150
                                        ? `${item.description.substring(0, 150)}…`
                                        : item.description}
                                    </p>
                                  )}
                                  {item.metadata?.hashtags?.length ? (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      {item.metadata.hashtags.slice(0, 3).map((tag, i) => (
                                        <span
                                          key={i}
                                          className="px-1 py-0.5 text-xs bg-muted text-foreground/80 rounded"
                                        >
                                          #{tag}
                                        </span>
                                      ))}
                                    </div>
                                  ) : null}
                                </div>
                                {item.url && (
                                  <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs bg-primary hover:bg-primary/90 text-primary-foreground px-2 py-1 rounded transition-colors"
                                  >
                                    Voir
                                  </a>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </ExpandableSection>
                    ) : null}

                    {/* Scolaire (placeholder) */}
                    <ExpandableSection
                      title="Établissements Scolaires"
                      subtitle="Écoles, collèges et lycées de la zone"
                      icon={GraduationCap}
                      isOpen={false}
                      onToggle={() => {}}
                      itemCount={0}
                      color="purple"
                      metadata={{
                        source: "Ministère de l'Éducation Nationale",
                        period: "Année scolaire 2024-2025",
                      }}
                    >
                      <div className="text-center py-8">
                        <GraduationCap className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                          Données bientôt disponibles
                        </h3>
                        <p className="text-sm text-muted-foreground/80">
                          Les informations sur les établissements scolaires seront intégrées prochainement.
                        </p>
                      </div>
                    </ExpandableSection>

                    {/* Établissements/Commerces (placeholder) */}
                    <ExpandableSection
                      title="Établissements & Commerces"
                      subtitle="Entreprises, commerces et services publics"
                      icon={Building2}
                      isOpen={false}
                      onToggle={() => {}}
                      itemCount={0}
                      color="orange"
                      metadata={{
                        source: "Base SIRENE, OpenStreetMap",
                        period: "Données en temps réel",
                      }}
                    >
                      <div className="text-center py-8">
                        <Building2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                          Fonctionnalité en développement
                        </h3>
                        <p className="text-sm text-muted-foreground/80">
                          Les données sur les établissements et commerces locaux seront ajoutées.
                        </p>
                      </div>
                    </ExpandableSection>
                  </div>
                </>
              )}

              {/* Aucun résultat */}
              {locationInfo && !loading && !crimeStats && !searchResults && (
                <Card className="bg-card/60 border-border/60 mt-8">
                  <CardContent className="text-center">
                    <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                      Données non disponibles
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Aucune statistique de délinquance ou actualité trouvée pour cette adresse.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setAddress("");
                        setHasSearched(false);
                        setLocationInfo(null);
                        setCrimeStats(null);
                        setSearchResults(null);
                      }}
                    >
                      Nouvelle recherche
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ApiData;