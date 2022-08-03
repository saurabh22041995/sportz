import axios from "axios";

export const Baseurl = "https://api.npoint.io/";


export const GET = async function (route) {
    try {
      return await axios.get(Baseurl + route);
    } catch (err) {
      console.log(err);
    }
  };