import React, { useState, createContext, useEffect, useContext } from "react";
import { eData } from "./EData";
import axios from "axios";
export const ProductContext = createContext();
export const AddContext = (init) => useContext(UserContext);
const BASE = "http://127.0.0.1:8000/api/";
const user = JSON.parse(localStorage.getItem("user"));
export const EContextProvider = (props) => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    let URL = user.is_admin ? BASE + "education/index" : BASE + "education/index/" + user.id;
    var res = await axios.get(URL);
    var newData = res.data.data;
    // console.log(newData);
    eData.splice(0, eData.length);
    for (var i = 0; i < newData.length; i++) {
      eData.push(newData[i]);
    }
    // console.log(fData);
    setData([...newData]);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return <ProductContext.Provider value={{ contextData: [data, setData] }}>{props.children}</ProductContext.Provider>;
};
