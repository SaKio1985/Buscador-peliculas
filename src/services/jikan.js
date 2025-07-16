const BASE_URL = 'https://api.jikan.moe/v4'

export const searchJikan = async (query) => {
  const response = await fetch(`${BASE_URL}/anime?q=${query}&sfw`)
  const data = await response.json()
  return data.data
}

export const getJikanDetails = async (id) => {
  // Jikan necesita una pequeña pausa entre peticiones para no saturar la API
  await new Promise((resolve) => setTimeout(resolve, 500)) // Pausa de 500ms
  const response = await fetch(`${BASE_URL}/anime/${id}/full`)
  const data = await response.json()
  return data.data
}
