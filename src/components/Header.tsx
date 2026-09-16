import React from 'react';
import { Crosshair } from 'lucide-react';

interface HeaderProps {
  view: string;
}

const Header: React.FC<HeaderProps> = ({ view }) => {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <Crosshair className="header-icon" size={20} />
          <div className="header-title">
            <span className="header-title-main">VICE CITY</span>
            <span className="header-title-sub">MISSION CONTROL</span>
          </div>
        </div>

        {view !== 'landing' && (
          <nav className="header-nav" aria-label="Main navigation">
            <span className="header-nav-item active">MISSION CONTROL</span>
            <span className="header-nav-item">EVIDENCE</span>
            <span className="header-nav-item">DOSSIER</span>
          </nav>
        )}

        <div className="header-status">
          <span className="status-dot" />
          <span className="status-text">SYSTEM ONLINE</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
