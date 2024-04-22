import React from 'react'
import { MdSunny } from "react-icons/md";
import { MdOutlineMyLocation } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import Searchbar from './Searchbar';
type Props = {}

function Navbar({}: Props) {
  return (
    <nav className=' sticky top-0 left-0 z-50 shadow-sm bg-white'>
      <div className=' flex items-center justify-between h-[80px] w-full max-w-7xl px-3  mx-auto'>
        <div className=' flex justify-center items-center gap-2'>
            <h2 className=' text-gray-500 text-3xl ml-10'>Weather</h2>
            <MdSunny className=' text-3xl text-yellow-300 mt-1' />
        </div>
        <section className=' flex gap-2 items-center'>
        <MdOutlineMyLocation className=' text-2xl text-gray-400 hover:opacity-80 cursor-pointer'/>
        <MdOutlineLocationOn className=' text-2xl' />
        <p>Algiers</p>
        <div>
          <Searchbar/>  
        </div>
        </section>
      </div>

    </nav>
  )
}

export default Navbar