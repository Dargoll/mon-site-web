const Footer = () => {
  return (
    <footer
      role="contentinfo"
      className="bg-card border-t border-border tech-grid"
      style={{
        // évite que le footer soit collé sous la barre 'home' iOS
        paddingBottom: "max(1rem, var(--safe-bottom, 0px))",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center">
          <div className="mb-4">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-mono">
              Walder Corporation
            </span>
          </div>
          <div className="font-mono text-sm text-foreground/60 space-y-1">
            <p>© {new Date().getFullYear()} Loïc WALDER | TOUS DROITS RÉSERVÉS</p>
            <p className="text-primary">SYSTÈME VERSION 1.0.0 | STATUS: OPÉRATIONNEL</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
