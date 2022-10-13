import { createContext } from "react";

const tableContext = createContext({
  data: {},
  setData: null,
  setQuerys: null,
  id: "",
});

export default tableContext;
