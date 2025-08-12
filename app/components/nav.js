import React from 'react'
import Link from 'next/link'

const Nav = () => {
  return (
    <div className='p-4 flex justify-between items-center relative'>
      {/* Glassy background with blur effect */}
      <div className='absolute inset-0 bg-white/10 backdrop-blur-md border-b border-white/20'></div>

      {/* Content */}
      <div className='relative z-10 flex justify-between items-center w-full'>
        <div>
          <h1 className='text-3xl font-bold text-white drop-shadow-lg'>BitLinks</h1>
        </div>

        <div className='flex items-center gap-8'>
          <nav className='hidden md:block'>
            <ul className='flex gap-6'>
              <li className='cursor-pointer hover:text-blue-300 transition-colors duration-200 text-white/90 hover:underline underline-offset-4'>
                <Link href={"/"}>Home</Link>
              </li>
              <li className='cursor-pointer hover:text-blue-300 transition-colors duration-200 text-white/90 hover:underline underline-offset-4'>
                <Link href={"/about"}>About</Link>
              </li>
              <li className='cursor-pointer hover:text-blue-300 transition-colors duration-200 text-white/90 hover:underline underline-offset-4'>
                <Link href={"/short"}>Shorten</Link>
              </li>
            </ul>
          </nav>

          <div className='flex gap-3'>
            <Link href={"/short"}>
              <button className='cursor-pointer px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white hover:bg-white/30 transition-all duration-200 hover:scale-105 hover:shadow-lg'>
                Try Now
              </button>
            </Link>
            <Link href={"https://github.com/anshdev44/URL-SHORTNER"} target="_blank"
              rel="noopener noreferrer"
            >
              <button className='cursor-pointer px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all duration-200 hover:scale-105 hover:shadow-lg'>
                Github
              </button>
            </Link>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Nav