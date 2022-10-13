import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Nav from "./components/nav/Nav";
import Table from "./components/table/Table";

function App() {
  return (
    <div className="flex bg-zinc-100">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table/:id" element={<Table />} />
      </Routes>
    </div>
  );
}

export default App;
