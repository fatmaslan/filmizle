"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";
import { useAllMovie } from "../../../actions/getProduct";
import { useSearchParams } from "next/navigation";

const MovieItem = () => {
  const searchParams = useSearchParams();
  const genre = searchParams.get("genre") || "popular";
  const { movies, error, loading } = useAllMovie({ genre });

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata oluştu: {error}</p>;
  if (!movies || movies.length === 0) return <p>Ürün bulunamadi.</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {movies.map((movie, i) => {
        const imageUrl = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "/placeholder.png";

        return (
          <Link
            href={`/movie/${movie?.id}`}
            key={i}
            className="rounded-lg p-2 cursor-pointer relative"
          >
            <Image
              src={imageUrl}
              alt={movie?.title || "Film posteri"}
              width={300}
              height={350}
              className="rounded-lg object-cover"
            />
            <h3 className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-center text-lg font-semibold text-white p-2">
              {movie.title}
              
            </h3>
          </Link>
        );
      })}
    </div>
  );
};

export default MovieItem;
