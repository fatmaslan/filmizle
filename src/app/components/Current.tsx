"use client"
import React, { useState } from 'react'
import { UseToday } from '../../../actions/getProduct'
import Link from 'next/link';
import Image from 'next/image';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination"

const Current = () => {
    const { movies, error, loading } = UseToday();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;
    if (loading) return <p>Yükleniyor...</p>;
    if (error) return <p>Hata oluştu: {error}</p>;
    if (!movies || movies.length === 0) return <p>Ürün bulunamadi.</p>;

  
    const moviesLast = currentPage * itemsPerPage;
    const moviefirst = moviesLast - itemsPerPage;
    const currentMovies = movies.slice(moviefirst, moviesLast);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(movies.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='flex flex-col '>
            <h1 className='flex items-center ml-8 font-mono font-bold text-2xl  text-white'>Yeni eklenen bölümler</h1>
            <div className="flex items-center justify-center gap-2 mt-1 ">
                {currentMovies.map((movie, i) => {
                    const imageUrl = movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "/placeholder.png"; 

                    return (
                        <div key={i} className="m-2">
                            <Link href={`/movie/${movie?.id}`} className=" hidden md:flex relative  w-[150px] h-[150px]  ">
                                <Image
                                    src={imageUrl}
                                    alt={movie?.title || "Film posteri"}
                                    width={130}
                                    height={130}
                                    className="object-cover rounded-md transition-transform duration-300 group-hover:scale-125 shadow-2xl "
                                />
                            </Link>
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-center text-white ">
                <Pagination>
                    <PaginationContent>
                        {pageNumbers.map((number) => (
                            <PaginationItem key={number}>
                                <PaginationLink 
                                    href="#"
                                    onClick={() => handlePageChange(number)}
                                    className={currentPage === number ? " text-white" : ""}
                                >
                                    {number}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
}

export default Current
