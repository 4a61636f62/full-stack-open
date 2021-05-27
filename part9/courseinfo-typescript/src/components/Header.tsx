import React from "react";

interface HeaderProps {
    text: string
}

const Header = ({ text }: HeaderProps) => (
    <div>
        <h1>{text}</h1>
    </div>
);

export default Header;