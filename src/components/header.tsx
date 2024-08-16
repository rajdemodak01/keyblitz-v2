import React from "react";
import Logo from "./logo";

interface Props {}

function Header({}: Props) {
  return (
    <div className=" py-8 px-4">
      <Logo />
    </div>
  );
}

export default Header;
