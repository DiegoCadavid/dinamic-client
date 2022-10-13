import React, { useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";
import routesData from "../../routesData.json";

const Nav = () => {
  const [collapseNav, setCollapseNav] = useState(true);
  const nav = useRef(null);

  useEffect(() => {
    const openNav = () => {
      setCollapseNav(false);
    };

    const closedNav = () => {
      setCollapseNav(true);
    };

    if (nav) {
      nav.current.addEventListener("mouseenter", openNav);
      nav.current.addEventListener("mouseleave", closedNav);
    }

    return () => {
      if (nav) {
        nav.current.removeEventListener("mouseenter", openNav);
        nav.current.removeEventListener("mouseleave", closedNav);
      }
    };
  }, [nav]);

  return (
    <nav
      ref={nav}
      className={`${
        collapseNav ? "w-16" : "w-56 px-2 "
      } transition-all ease-out bg-zinc-200  h-screen  flex flex-col items-center justify-start gap-3 pt-3`}
    >
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
