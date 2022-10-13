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
      <NavItem collapse={collapseNav} name="Inicio" url={`/`} />

      {collapseNav ? (
        <div className="w-full h-1 bg-rose-500" />
      ) : (
        <div className="text-rose-500 py-2 border-b-4 border-rose-500 w-full flex gap-1 items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
            />
          </svg>
          <p>Tablas</p>
        </div>
      )}

      {routesData.routes.map((route) => {
        return (
          <NavItem
            key={route}
            collapse={collapseNav}
            name={route}
            url={`/table/${route}`}
          />
        );
      })}
    </nav>
  );
};

export default Nav;
