import React, { useState, useEffect, useCallback } from "react";
import NavBar from "../../components/NavBar";
import Banner from "../../components/Banner";
import YouTube from "react-youtube";

function Browse() {
  const [moviesTrending, setMoviesTrending] = useState([]);
  const [moviesNetflixOriginals, setMoviesNetflixOriginals] = useState([]);
  const [moviesTopRated, setMoviesTopRated] = useState([]);
  const [moviesAction, setMoviesAction] = useState([]);
  const [moviesComedy, setMoviesComedy] = useState([]);
  const [moviesHorror, setMoviesHorror] = useState([]);
  const [moviesRomance, setMoviesRomance] = useState([]);
  const [moviesDocumentaries, setMoviesDocumentaries] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = "3a19f67ca00dbd2a8e317bd30ceccd70";

  const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
  };

  const fetchMoviesHandler = useCallback(async (request) => {
    setError(null);
    try {
      const response = await fetch(`https://api.themoviedb.org/3${request}`);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      console.log(data);

      const transformedMovies = data.results.map((movieData) => {
        return {
          backdrop_path: movieData.backdrop_path,
          first_air_date: movieData.first_air_date,
          genre_ids: movieData.genre_ids,
          id: movieData.id,
          name: movieData.name,
          origin_country: movieData.origin_country,
          original_language: movieData.original_language,
          original_name: movieData.original_name,
          overview: movieData.overview,
          popularity: movieData.popularity,
          poster_path: movieData.poster_path,
          vote_average: movieData.vote_average,
          vote_count: movieData.vote_count,
        };
      });
      return transformedMovies;
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setMoviesTrending(fetchMoviesHandler(requests.fetchTrending));
    setMoviesNetflixOriginals(
      fetchMoviesHandler(requests.fetchNetflixOriginals)
    );
    const dataNetflixOriginals = [];
    fetchMoviesHandler(requests.fetchNetflixOriginals, dataNetflixOriginals);
    setMoviesNetflixOriginals(dataNetflixOriginals);
    setMoviesTopRated(fetchMoviesHandler(requests.fetchTopRated));
    setMoviesAction(fetchMoviesHandler(requests.fetchActionMovies));
    setMoviesComedy(fetchMoviesHandler(requests.fetchComedyMovies));
    setMoviesHorror(fetchMoviesHandler(requests.fetchHorrorMovies));
    setMoviesRomance(fetchMoviesHandler(requests.fetchRomanceMovies));
    setMoviesDocumentaries(fetchMoviesHandler(requests.fetchDocumentaries));
    setIsLoading(false);
  }, [
    fetchMoviesHandler,
    requests.fetchTrending,
    requests.fetchNetflixOriginals,
    requests.fetchTopRated,
    requests.fetchActionMovies,
    requests.fetchComedyMovies,
    requests.fetchHorrorMovies,
    requests.fetchRomanceMovies,
    requests.fetchDocumentaries,
  ]);

  console.log(moviesNetflixOriginals);

  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  let content = "Hello";

  if (
    moviesTrending.length > 0 &&
    moviesNetflixOriginals.length > 0 &&
    moviesTopRated.length > 0 &&
    moviesAction.length > 0 &&
    moviesComedy.length > 0 &&
    moviesHorror.length > 0 &&
    moviesRomance.length > 0 &&
    moviesDocumentaries.length > 0
  ) {
    content = <Banner dataBanner={moviesNetflixOriginals} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <div className="app">
      {/* <YouTube videoId="tgB1wUcmbbw" opts={opts} /> */}
      {/* <h1>{content}</h1> */}
      <NavBar />
      {/* <section>{content}</section> */}
    </div>
  );
}

export default Browse;
