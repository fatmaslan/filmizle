import Link from 'next/link'
import React from 'react'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const Footer = () => {
  return (
 
      <div className="bg-gray-600 p-5 h-50  ">
      <div className=" max-w-6xl mx-auto mt-5 flex justify-between ">
        <Link href={"/contact"} className="flex-1 text-white">
          <h3 className="font-bold text-lg mb-2">Müşteri Hizmetleri</h3>
          <p>SSS</p>
          <p>İade Politikasi</p>
          <p>Kargo Takibi</p>
        </Link>
        <Link href={"/contact"} className="flex-1 text-white">
          <h3 className="font-bold text-lg mb-2">Bizimle Çalişin</h3>
          <p>Kariyer</p>
          <p>İş Ortakliği</p>
        </Link>
        <Link href={"/contact"} className="flex-1 text-white">
          <h3 className="font-bold text-lg mb-2">Bağlantida Kal</h3>
          <div className="flex gap-5 ">
            <FaXTwitter size={24} />
            <FaInstagram size={24} />
            <FaWhatsapp size={24} />
          </div>
        </Link>
      </div>
      </div>
 
  )
}

export default Footer
