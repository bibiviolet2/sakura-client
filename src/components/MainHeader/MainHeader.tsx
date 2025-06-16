import React from "react";
import { Link } from "react-router-dom";

const MainHeader: React.FC = () => {
  return (
    <div className="top">
      <div className="container">
        <div className="top__title">
          <Link to="/">Dcera svého otce - literární seriál</Link>
        </div>
        <nav className="top__nav">
          <Link to="/manzele-tarisovi/sheena">O seriálu</Link>
        </nav>
      </div>
    </div>
  );
};

export default MainHeader;
