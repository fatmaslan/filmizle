import Image from "next/image";
import React from "react";
import { IoEarth } from "react-icons/io5";
import { TbChartBarPopular } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import { CiVideoOn } from "react-icons/ci";
import { Button } from "@/components/ui/button";

const MovieDetail = async ({ params }) => {
  const { id } = params;

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
  );
  const movie = await response.json();

  return (
    <div className="mt-16  w-full h-screen">
      <div className="mx-auto p-3 flex justify-center gap-4">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.id}
          width={200}
          height={200}
          className="rounded-lg mt-5 mx-auto"
        />
        <div className="flex flex-col mt-5">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-white">
              {movie.title}
              <span className="text-sm ml-3 text-blue-600">
                IMDb: {movie.vote_average}
              </span>
            </h1>
            <Button className="w-[150px] flex items-center justify-between text-blue-600 cursor-pointer">
              Favorilere ekle
              <FaRegHeart size={20} className="text-white ml-2" />
            </Button>
          </div>

          <p className="text-gray-400">{movie.overview}</p>

          <div className="flex items-center text-white font-light mt-5 space-x-5">
            <div className="flex items-center space-x-1">
              <IoEarth className="text-xl" />
              <span>{movie.original_language}</span>
            </div>
            <div className="flex items-center space-x-1">
              <TbChartBarPopular className="text-xl" />
              <span>{movie.popularity}</span>
            </div>
            <div className="flex items-center space-x-1">
              <CiVideoOn className="text-xl" />
              <span>{movie.video}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;