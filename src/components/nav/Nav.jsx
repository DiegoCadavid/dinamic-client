import React, { useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";
import routesData from "../../routesData.json";

const Nav = () => {
  const [collapseNav, setCollapseNav] = useState(true);
  const nav = useRef(null);

  return (
    <nav
      ref={nav}
      onMouseEnter={() => setCollapseNav(false)}
      onMouseLeave={() => setCollapseNav(true)}
      className={`${
        collapseNav ? "w-16" : "w-56 px-2 "
      } transition-all ease-out bg-zinc-200  h-screen  flex flex-col items-center justify-start gap-3 pt-3`}>
      {routesData.routes.map((route) => {
        return (
          <NavItem
            key={route}
            collapse={collapseNav}
            name={route}
            url={route}
          />
        );
      })}
    </nav>
  );
};

export default Nav;
