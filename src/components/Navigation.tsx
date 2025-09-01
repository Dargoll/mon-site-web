import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const Navigation = () => {
  const { t } = useTranslation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/20 backdrop-blur-md border-b border-border/30">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-primary glow">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Walder Corporation
            </span>
          </div>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `nav-link ${isActive ? "text-primary glow" : "text-foreground/80"}`
              }
            >
              {t("nav.home")}
            </NavLink>

            <NavLink 
              to="/biography" 
              className={({ isActive }) => 
                `nav-link ${isActive ? "text-primary glow" : "text-foreground/80"}`
              }
            >
              {t("nav.biography")}
            </NavLink>

            <NavLink 
              to="/projects" 
              className={({ isActive }) => 
                `nav-link ${isActive ? "text-primary glow" : "text-foreground/80"}`
              }
            >
              {t("nav.projects")}
            </NavLink>

            <NavLink 
              to="/media" 
              className={({ isActive }) => 
                `nav-link ${isActive ? "text-primary glow" : "text-foreground/80"}`
              }
            >
              {t("nav.media")}
            </NavLink>

            {/* Language Switcher */}
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
