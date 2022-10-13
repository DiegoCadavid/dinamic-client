import React, { useState } from "react";

const TableFormFilter = ({ register }) => {

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown( prev => !prev );
  }

  return (
    <div className="h-full relative">
      <button onClick={toggleDropdown} className="h-full flex items-center justify-center  text-rose-400 hover:text-rose-600 transition-colors ease-in">
        Filtros
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
            d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
          />
        </svg>
      </button>
      { showDropdown && <div className="absolute flex flex-col gap-3  bg-zinc-200 right-0 top-12 p-2 rounded-md">
        <p>Resultados por pagina</p>
          <input className="p-2 focus-visible:outline-none" type="number" { ...register('perPage') } defaultValue={10} />
      </div>  }
    </div>
  );
};

export default TableFormFilter;
