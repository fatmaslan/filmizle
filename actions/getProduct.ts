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

  export const useAddFavorite = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
  
    const addFavorite = async (mediaId: number, mediaType: "movie" | "tv") => {
      setLoading(true);
      setError(null);
      setSuccess(false);
  
      const url = `https://api.themoviedb.org/3/account/${process.env.ACCOUNT_ID}/favorite`;
  
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          media_type: mediaType,
          media_id: mediaId,
          favorite: true,
        }),
      };
  
      try {
        const response = await fetch(url, options);
        const data = await response.json();
  
        if (response.ok) {
          setSuccess(true);
        } else {
          setError(data.status_message || "Bir hata oluştu");
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
  
    return { addFavorite, loading, error, success };
  };
  export const UseToday = ({ genre = "popular" } = {}) => {
    const [movies, setMovies] = useState<Movie []>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      const fetchHome = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/tv/airing_today?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
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