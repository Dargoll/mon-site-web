import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const NavLinks = ({ onClick }: { onClick?: () => void }) => {
  const { t } = useTranslation();
  const base = "nav-link";
  const active = "text-primary glow";

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
      <NavLink to="/" className={({isActive}) => `${base} ${isActive ? active : "text-foreground/80"}`} onClick={onClick}>
        {t("nav.home")}
      </NavLink>
      <NavLink to="/biography" className={({isActive}) => `${base} ${isActive ? active : "text-foreground/80"}`} onClick={onClick}>
        {t("nav.biography")}
      </NavLink>
      <NavLink to="/projects" className={({isActive}) => `${base} ${isActive ? active : "text-foreground/80"}`} onClick={onClick}>
        {t("nav.projects")}
      </NavLink>
      <NavLink to="/media" className={({isActive}) => `${base} ${isActive ? active : "text-foreground/80"}`} onClick={onClick}>
        {t("nav.media")}
      </NavLink>
      <div className="pt-2 md:pt-0">
        <LanguageSwitcher />
      </div>
    </div>
  );
};

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-md border-b border-border/30">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-xl sm:text-2xl font-bold text-primary glow">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Walder Corporation
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center">
            <NavLinks />
          </div>

          {/* Mobile burger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Ouvrir le menu">
                  <Menu className="size-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] max-w-sm">
                <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <NavLinks onClick={() => (document.activeElement as HTMLElement)?.blur()} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
