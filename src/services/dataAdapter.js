export const adaptSearchResults = (results, apiSource) => {
  if (!results) return []

  switch (apiSource) {
    case 'omdb':
      return results.map((item) => ({
        id: item.imdbID,
        title: item.Title,
        year: item.Year,
        poster: item.Poster !== 'N/A' ? item.Poster : null,
        type: item.Type,
        source: 'omdb', // Guardamos el origen para la llamada de detalles
      }))
    case 'tmdb':
      return results.map((item) => ({
        id: item.id,
        title: item.title,
        year: item.release_date ? item.release_date.substring(0, 4) : 'N/A',
        poster: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null,
        type: 'movie',
        source: 'tmdb',
      }))
    case 'jikan':
      return results.map((item) => ({
        id: item.mal_id,
        title: item.title,
        year: item.year || (item.aired?.from ? new Date(item.aired.from).getFullYear() : 'N/A'),
        poster: item.images?.jpg?.large_image_url || null,
        type: item.type, // "TV", "Movie", etc.
        source: 'jikan',
      }))
    default:
      return []
  }
}

export const adaptDetails = (details, apiSource) => {
  if (!details) return null

  switch (apiSource) {
    case 'omdb':
      return {
        title: details.Title,
        year: details.Year,
        poster: details.Poster !== 'N/A' ? details.Poster : null,
        genre: details.Genre,
        plot: details.Plot,
        director: details.Director,
        actors: details.Actors,
        ratings: details.Ratings?.map((r) => ({ source: r.Source, value: r.Value })) || [],
      }
    case 'tmdb':
      return {
        title: details.title,
        year: details.release_date ? details.release_date.substring(0, 4) : 'N/A',
        poster: details.poster_path
          ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
          : null,
        genre: details.genres?.map((g) => g.name).join(', '),
        plot: details.overview, // La sinopsis viene en 'overview'
        director: details.credits?.crew?.find((c) => c.job === 'Director')?.name || 'N/A',
        actors:
          details.credits?.cast
            ?.slice(0, 5)
            .map((a) => a.name)
            .join(', ') || 'N/A',
        ratings: [{ source: 'TMDB Score', value: `${details.vote_average.toFixed(1)} / 10` }],
      }
    case 'jikan':
      return {
        title: details.title,
        year:
          details.year ||
          (details.aired?.from ? new Date(details.aired.from).getFullYear() : 'N/A'),
        poster: details.images?.jpg?.large_image_url || null,
        genre: details.genres?.map((g) => g.name).join(', '),
        plot: details.synopsis,
        director: details.studios?.map((s) => s.name).join(', ') || 'N/A', // Jikan no tiene un "director" claro, usamos el estudio
        actors:
          details.characters
            ?.slice(0, 5)
            .map((c) => c.character.name)
            .join(', ') || 'N/A',
        ratings: [{ source: 'MyAnimeList Score', value: `${details.score} / 10` }],
      }
    default:
      return null
  }
}
