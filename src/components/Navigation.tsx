
import { NavLink } from "react-router-dom";

const Navigation = () => {
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
          <div className="flex space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'text-primary glow' : 'text-foreground/80'}`
              }
            >
              HOME
            </NavLink>
            <NavLink 
              to="/biography" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'text-primary glow' : 'text-foreground/80'}`
              }
            >
              PROFILE
            </NavLink>
            <NavLink 
              to="/projects" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'text-primary glow' : 'text-foreground/80'}`
              }
            >
              ABOUT ME
            </NavLink>
            <NavLink 
              to="/media" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'text-primary glow' : 'text-foreground/80'}`
              }
            >
              MEDIA
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
