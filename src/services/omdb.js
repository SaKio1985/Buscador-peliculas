const API_KEY = import.meta.env.VITE_OMDB_API_KEY
const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`

export const searchOMDb = async (query) => {
  const response = await fetch(`${BASE_URL}&s=${query}`)
  const data = await response.json()
  if (data.Response === 'False') throw new Error(data.Error)
  return data.Search
}

export const getOMDbDetails = async (id) => {
  const response = await fetch(`${BASE_URL}&i=${id}&plot=full`)
  const data = await response.json()
  if (data.Response === 'False') throw new Error(data.Error)
  return data
}
