import React from "react";
import { Link } from "react-router-dom";

const MainNav: React.FC = () => {
  return (
    <nav className="nav--main">
      <div className="container">
        <Link to="/">Domů</Link> <span className="hidden-for-screen-readers">|</span> 
		<Link to="/manzele-tarisovi/sheena">knihy Dcera svého otce</Link> <span className="hidden-for-screen-readers">|</span> 
		<Link to="/manzele-tarisovi/sheena">Články Sakura</Link>
      </div>
    </nav>
  );
};

export default MainNav;
