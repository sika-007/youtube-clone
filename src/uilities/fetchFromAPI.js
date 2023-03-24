import axios from "axios";
import { rapidApiKey } from "./config";

 const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

const options = {
  url: BASE_URL,
  params: {
    maxResults: '50',
  },
  headers: {
    'X-RapidAPI-Key': rapidApiKey,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
};

export const fetchFromAPI = async(activity) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/${activity}`, options)
        return data
    } catch(error) {
        console.log(error)
    }
}