import React from "react";
import { useNavigate } from "react-router-dom";

const NavItem = ({ collapse, name }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`${
        collapse ? "w-12 border-2 border-rose-400" : "w-full"
      } h-12 rounded-lg`}>
      <button
        onClick={() => {
          navigate(`/table/${name}`);
        }}
        className={`h-full w-full ${
          collapse && "font-medium text-lg uppercase text-rose-400 "
        } hover:bg-zinc-100 hover:border-l-8 hover:border-l-rose-400 transition-all ease-in`}>
        {" "}
        {collapse ? name[0] : name}{" "}
      </button>
    </div>
  );
};

export default NavItem;
