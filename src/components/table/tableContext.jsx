import { createContext } from "react";

const tableContext = createContext({
  data: {},
  setData: null,
  setQuerys: null,
  id: "",
  setPage: null,
  page: 0,
  axiosGetData: null
});

export default tableContext;
