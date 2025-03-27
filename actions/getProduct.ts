"use client";
import axios from "axios";
import { useEffect, useState } from "react";




export interface Movie {
    poster_path:string
    id:number
    title:string
    first_air_date:number
}


export const useAllMovie = ({ genre = "popular" } = {}) => {
  const [movies, setMovies] = useState<Movie []>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${genre}?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
        );
        setMovies(response.data.results);
        console.log(response.data.results, "Movies Data");
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [genre]);
  return { movies, error, loading };
}
export const useHomeMovie = ({ genre = "popular" } = {}) => {
    const [movies, setMovies] = useState<Movie []>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      const fetchHome = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
          );
          setMovies(response.data.results);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          }
        } finally {
          setLoading(false);
        }
      };
  
      fetchHome();
    }, [genre]);
    return { movies, error, loading };
  }