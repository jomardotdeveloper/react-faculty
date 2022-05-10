import React, { useState, createContext, useEffect, useContext } from "react";
import { wData } from "./WData";
import axios from "axios";
export const ProductContext = createContext();
export const AddContext = (init) => useContext(UserContext);
const BASE = "http://127.0.0.1:8000/api/";
const user = JSON.parse(localStorage.getItem("user"));

export const WContextProvider = (props) => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    let URL = user.is_admin ? BASE + "work/index" : BASE + "work/index/" + user.id;
    var res = await axios.get(URL);
    var newData = res.data.data;
    // console.log(newData);
    wData.splice(0, wData.length);
    for (var i = 0; i < newData.length; i++) {
      wData.push(newData[i]);
    }
    // console.log(fData);
    setData([...newData]);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return <ProductContext.Provider value={{ contextData: [data, setData] }}>{props.children}</ProductContext.Provider>;
};
