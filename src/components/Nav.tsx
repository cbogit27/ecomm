"use client"
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import PersonOutlineSharpIcon from '@mui/icons-material/PersonOutlineSharp';
import LocalMallSharpIcon from '@mui/icons-material/LocalMallSharp';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar(){
    const [dropdown, setDropdown] = useState(false)
    const pathname = usePathname()

    const activeLink = (href:string) => pathname === href

    const toggleDropdown = () => {
        setDropdown(!dropdown)
    }
    return (
        <nav className="container mx-auto px-4 py-6 border-b border-gray-400/40">
            <div className="flex items-center justify-between">
                <div className="ml-4">Logo</div>
                <div className='flex gap-8'>
                <div className="relative group">
       <Link href={'/'} onTouchMove={toggleDropdown} className={`active:font-bold text-sm  text-center w-full ${activeLink('/') ? "border-b border-emerald-800 py-2 w-fit" : ""}`} >
         Home <KeyboardArrowDownSharpIcon fontSize='small'/>
       </Link>

     <div className={`fixed top-20 right-0 h-56 w-full z-0 hidden bg-gray-200 group-hover:block transition-transform duration-500 transform`}>
       <div className="bg-gray-200 py-8 px-16 shadow-md">
            <div className="dropdown-menu flex space-x-32">
              
            </div>
          </div>
      </div>
    </div> 
                <div className="relative group">
       <Link href={'/shop'} onTouchMove={toggleDropdown} className={`active:font-bold text-sm  text-center w-full ${activeLink('/shop') ? "border-b border-emerald-800 py-2 w-fit" : ""}`} >
         shop <KeyboardArrowDownSharpIcon fontSize='small'/>
       </Link>

     <div className={`fixed top-20 right-0 h-56 w-full z-0 hidden bg-gray-200 group-hover:block transition-transform duration-500 transform`}>
       <div className="bg-gray-200 py-8 px-16 shadow-md">
            <div className="dropdown-menu flex space-x-32">
              <ul className='flex flex-col space-y-8 text-sm font-light'>
              <li><Link href="/shirts" className=" dropdown-item">shirts</Link></li>
              <li><Link href="/jeans" className=" dropdown-item">Jeans</Link></li>
              </ul>

              <ul className='flex flex-col space-y-8 text-sm font-light'>
              <li><Link href="/sneakers" className=" dropdown-item">sneakers</Link></li>
              <li><Link href="/shirts" className=" dropdown-item">Accessories</Link></li>
              </ul>

              <ul className='flex flex-col space-y-8 text-sm font-light'>
              <li><Link href="/sneakers" className=" dropdown-item">Bags</Link></li>
              <li><Link href="/shirts" className=" dropdown-item">Shoes</Link></li>
              </ul>
            </div>
          </div>
      </div>
    </div>

    <div>
    <Link href={'/faq'} className={`active:font-bold text-sm  text-center w-full ${activeLink('/faq')?"border-b border-emerald-800 py-2 w-fit":""}`}>Faq</Link>
    </div>
                 </div>
                <div className="flex space-x-8">
                    <div>
                        <SearchSharpIcon fontSize='medium'/>
                    </div>
                    <div>
                        <PersonOutlineSharpIcon fontSize='medium'/>
                    </div>
                    <div>
                        <FavoriteBorderSharpIcon fontSize='medium'/>
                    </div>
                    <div>
                        <LocalMallSharpIcon fontSize='medium'/>
                    </div>
                </div>
            </div>
        </nav>
    )
}