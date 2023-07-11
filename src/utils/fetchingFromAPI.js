import axios from 'axios';

const BASE_URL = 'https://opentdb.com/api.php?amount=5'

export const fetchingFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}${url}`)
  return data.results
}