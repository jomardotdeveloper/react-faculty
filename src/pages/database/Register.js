import axios from "axios";
const URL = "http://127.0.0.1:8000/api/";

async function signup(data) {
  var data = await axios.post(URL + "signup", data);
  return data.data;
}

async function signin(data) {
  var data = await axios.post(URL + "signin", data);
  return data.data;
}

export { signup, signin };
