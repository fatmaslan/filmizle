"use client"
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'
import React from 'react'

const Categories = () => {
const searchParams = useSearchParams();
const genre = searchParams.get('genre')|| 'popular';


    const category =[
        {
            name:"Popüler",
            url:"popular",
        },
        {
            name:"Yüksek reyting",
            url:"top_rated",
        },
        {
            name:"Yakında",
            url:"upcoming"
        }
    ]
  return (
    <div className='flex items-center justify-center text-2xl gap-5 shadow-2xl '>
      {category?.map((cat)=>(
        <Link  href={`/?genre=${cat.url}`} key={cat.url} className={` font-bold text-xl font-serif ${genre === cat.url ? "text-blue-900" : "text-blue-400"}`}  >{cat.name}</Link>
      ))}
    </div>
  )
}

export default Categories
