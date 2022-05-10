import React, { useState, createContext, useEffect, useContext } from "react";
import { fData } from "./FData";
import axios from "axios";
export const ProductContext = createContext();
export const AddContext = (init) => useContext(UserContext);
const BASE = "http://127.0.0.1:8000/api/";

export const FContextProvider = (props) => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    var res = await axios.get(BASE + "faculty/index");
    var newData = res.data.data;
    // console.log(newData);
    fData.splice(0, fData.length);
    for (var i = 0; i < newData.length; i++) {
      fData.push(newData[i]);
    }
    // console.log(fData);
    setData([...newData]);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return <ProductContext.Provider value={{ contextData: [data, setData] }}>{props.children}</ProductContext.Provider>;
};
