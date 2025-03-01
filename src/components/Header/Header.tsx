import React from "react";

type HeaderProps = {
    headlineText?:string;
    children?: React.ReactNode;
};

const Header: React.FC<HeaderProps> = ({ children, headlineText }) => {
  return (
    <header className="header">
        {headlineText && <h1 className="header__title">{headlineText}</h1>}
        {children}
    </header>
  );
};

export default Header;
