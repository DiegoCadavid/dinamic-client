import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/nav/Nav";
import Table from "./components/table/Table";

function App() {
  

  return (
    <div className="flex bg-zinc-100">
      <Nav />
      <Routes>
        <Route path="/" element={<p> Navega :V </p>} />
        <Route path="/table/:id" element={<Table />} />
      </Routes>
    </div>
  );
}

export default App;
