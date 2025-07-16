// src/services/jikan.js
const BASE_URL = 'https://api.jikan.moe/v4'

export const searchJikan = async (query) => {
  const response = await fetch(`${BASE_URL}/anime?q=${query}&sfw`)
  const data = await response.json()
  return data.data
}

// MODIFICAMOS ESTA FUNCIÓN PARA HACER DOS LLAMADAS
export const getJikanDetails = async (id) => {
  // Preparamos las dos URLs que necesitamos
  const fullDetailsUrl = `${BASE_URL}/anime/${id}/full`
  const charactersUrl = `${BASE_URL}/anime/${id}/characters`

  // Usamos Promise.all para hacer ambas llamadas al mismo tiempo
  const [fullDetailsResponse, charactersResponse] = await Promise.all([
    fetch(fullDetailsUrl),
    fetch(charactersUrl),
  ])

  // Convertimos ambas respuestas a JSON
  const fullDetailsData = await fullDetailsResponse.json()
  const charactersData = await charactersResponse.json()

  // Combinamos los resultados en un solo objeto.
  // La información principal viene de 'full', y le añadimos 'characters'.
  const combinedDetails = {
    ...fullDetailsData.data, // Tomamos todos los datos del anime
    characters: charactersData.data, // Y le añadimos la lista de personajes
  }

  return combinedDetails
}
