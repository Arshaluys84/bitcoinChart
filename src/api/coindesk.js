import axios from "axios";
import { BASEURL } from "../constants/constants";

const coindeskApi = axios.create({
  baseURL: BASEURL,
});

export const fetchBitcoinPrice = async () => {
  try {
    const response = await coindeskApi.get();
    return response.data.bpi;
  } catch (error) {
    throw error;
  }
};
