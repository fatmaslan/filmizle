"use client"
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaUser } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { FaRegHeart } from "react-icons/fa";
import Categories from "./Categories";
import { useRouter } from "next/navigation";





const Navbar = () => {
  const [keyword,setKeyword] = useState('');
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const searchFunc = (e)=>{
    if(e.key === "Enter" && keyword.length >= 2){
        router.push(`search/${keyword}`)
        setKeyword('');
    }}
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);


  return (
    <div>
      <div className=" w-full fixed shadow-2xl z-40 flex items-center justify-between gap-5 p-5 bg-gray-950 ">
        <Link
          href="/"
          className="flex items-center justify-center text-4xl font-bold font-serif text-white "
        >
          <span className="text-blue-700">film</span>izle
        </Link>
        <div><Categories/></div>
        <div className="hidden md:flex relative w-64">
          <Input
          value={keyword} onKeyDown={searchFunc} onChange={e => setKeyword(e.target.value)}
            className="outline-none w-full rounded-md text-white"
            type="text"
            placeholder="bir şeyler ara.."
          ></Input>
          <IoSearchOutline className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-white " />
        </div>
       
        <div className="flex items-center justify-center gap-5">
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <div className="cursor-pointer flex items-center gap-2 hover:text-blue-600 ">
                <FaUser size={24} className="text-white" />
                <p className="hidden md:block text-xs font-semibold text-white">
                  {isAuthenticated ? "Profilim" : "Giriş Yap"}
                </p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-white shadow-md rounded-md">
              <DropdownMenuLabel className="text-center ">
                Hesabim
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {!isAuthenticated ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/login">Giriş Yap</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/register">Üye Ol</Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profilim</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/cart">Beğendiklerim</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button variant="outline" className="w-full">
                      Çikiş Yap
                    </Button>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/favorites" className="text-end ">
          <FaRegHeart size={20} className="text-blue-600"/>
        </Link>
        </div>
       
      </div>
    </div>
  );
};

export default Navbar;
