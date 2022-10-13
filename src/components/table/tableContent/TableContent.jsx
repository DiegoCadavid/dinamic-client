import axios from "axios";
import React from "react";
import TableContentItem from "./TableContentItem";

const TableContent = ({ table = {}, id = "" }) => {
  return (
    <div className="flex-grow flex items-start justify-center overflow-y-auto ">
      <div className="w-full">
        <table className="w-full table-auto bg-zinc-50">
          <thead>
            <tr className="bg-zinc-100">
              <td className="p-2 pb-3 pt-6 font-medium text-rose-400 border border-zinc-300">
                #
              </td>
              {/* Titulo */}
              {Object.keys(table.data[0])
                .map((name) => {
                  if (name == "_id") return "id";
                  return name;
                })
                .map((name) => {
                  return (
                    <td
                      className="p-2 pb-3 pt-6 font-medium text-rose-400 border border-zinc-300"
                      key={name}
                    >
                      {name}
                    </td>
                  );
                })}

              <td className="p-2 pb-3 pt-6 font-medium text-rose-400 border border-zinc-300">
                Acciones
              </td>
            </tr>
          </thead>
          <tbody>
            {/* Elementos  */}
            {table.data.map((item, i) => {
              return ( <TableContentItem key={item._id} item={item} index={i} routeId={id}/> )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableContent;
