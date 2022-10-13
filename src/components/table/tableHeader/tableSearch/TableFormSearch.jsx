import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import tableContext from "../../tableContext";
import TableFormFilter from "./TableFormFilter";

const TableFormSearch = () => {

  const { setQuerys } = useContext(tableContext);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const perPageQuery = data?.perPage || "10";
    setQuerys(`perPage=${perPageQuery}&q=${data.search}`);
  };

  return (
    <div className="flex gap-2 h-full text-sm  ">
      <form className="flex gap-2 h-full py-2" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Buscador"
          className="p-1 w-72 rounded-full pl-3 focus-visible:outline-0 bg-white"
          { ...register('search') }
        />
        <button type="submit" className="bg-rose-400 hover:bg-rose-600 transition-colors ease-in aspect-square rounded-full text-zinc-50 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </form>

      <TableFormFilter register={register} />
    </div>
  );
};

export default TableFormSearch;
