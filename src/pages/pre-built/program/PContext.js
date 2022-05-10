import React, { useState, createContext, useEffect, useContext } from "react";
import { pData } from "./PData";
import axios from "axios";
export const ProductContext = createContext();
export const AddContext = (init) => useContext(UserContext);
const BASE = "http://127.0.0.1:8000/api/";
const user = JSON.parse(localStorage.getItem("user"));

export const PContextProvider = (props) => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    let URL = user.is_admin ? BASE + "program/index" : BASE + "program/index/" + user.id;
    var res = await axios.get(URL);
    var newData = res.data.data;
    // console.log(newData);
    pData.splice(0, pData.length);
    for (var i = 0; i < pData.length; i++) {
      pData.push(newData[i]);
    }
    // console.log(fData);
    setData([...newData]);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return <ProductContext.Provider value={{ contextData: [data, setData] }}>{props.children}</ProductContext.Provider>;
};
