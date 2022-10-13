import React, { useContext } from "react";
import tableContext from "../tableContext";

import TableFormCreate from "./tableCreate/TableFormCreate";
import TableFormSearch from "./tableSearch/TableFormSearch";

const TableHeader = ({ setQuerys }) => {
  const { id: name } = useContext(tableContext);

  return (
    <div className="flex h-12 items-center justify-between">
      {/* Titulo */}
      <div className="">
        <h2 className="sans text-3xl text-zinc-600">
          <span className="text-rose-400 uppercase font-bold">{name[0]}</span>
          {name
            .split("")
            .filter(([], i) => (i == 0 ? false : true))
            .join("")}
        </h2>
      </div>

      {/* Buscador */}
      <TableFormSearch setQuerys={setQuerys} />

      <TableFormCreate />
    </div>
  );
};

export default TableHeader;
