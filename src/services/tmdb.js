const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
}

export const searchTMDB = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?query=${query}&language=es-ES&page=1`,
    options,
  )
  const data = await response.json()
  return data.results
}

export const getTMDBDetails = async (id) => {
  // Esta parte es la que nos trae los créditos (reparto)
  const url = `${BASE_URL}/movie/${id}?language=es-ES&append_to_response=credits`
  const response = await fetch(url, options)
  const data = await response.json()
  return data
}
