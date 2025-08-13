"use client"
import React, { useState } from 'react'
import Link from 'next/link'

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className='p-4 flex justify-between items-center relative'>
      {/* Glassy background with blur effect */}
      <div className='absolute inset-0 bg-white/10 backdrop-blur-md border-b border-white/20'></div>

      {/* Content */}
      <div className='relative z-10 flex justify-between items-center w-full'>
        <div>
          <h1 className='text-2xl sm:text-3xl font-bold text-white drop-shadow-lg'>BitLinks</h1>
        </div>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center gap-8'>
          <nav>
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

        {/* Mobile Menu Button */}
        <div className='md:hidden'>
          <button 
            onClick={toggleMenu}
            className='p-2 text-white hover:bg-white/20 rounded-lg transition-colors duration-200'
          >
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              {isMenuOpen ? (
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
              ) : (
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16' />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMenuOpen && (
        <div 
          className='fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-40 transition-opacity duration-300'
          onClick={toggleMenu}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white/10 backdrop-blur-md border-l border-white/20 md:hidden z-50 transform transition-transform duration-300 ease-in-out ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Sidebar Header */}
        <div className='flex justify-between items-center p-6 border-b border-white/20'>
          <h2 className='text-xl font-bold text-white'>Menu</h2>
          <button 
            onClick={toggleMenu}
            className='p-2 text-white hover:bg-white/20 rounded-lg transition-colors duration-200'
          >
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>

        {/* Sidebar Content */}
        <div className='p-6 space-y-6'>
          <nav>
            <ul className='space-y-4'>
              <li>
                <Link 
                  href={"/"} 
                  onClick={toggleMenu}
                  className='block cursor-pointer hover:text-blue-300 transition-colors duration-200 text-white/90 hover:underline underline-offset-4 py-3 text-lg'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href={"/about"} 
                  onClick={toggleMenu}
                  className='block cursor-pointer hover:text-blue-300 transition-colors duration-200 text-white/90 hover:underline underline-offset-4 py-3 text-lg'
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href={"/short"} 
                  onClick={toggleMenu}
                  className='block cursor-pointer hover:text-blue-300 transition-colors duration-200 text-white/90 hover:underline underline-offset-4 py-3 text-lg'
                >
                  Shorten
                </Link>
              </li>
            </ul>
          </nav>

          {/* Updated Buttons with fixed gap */}
          <div className='flex flex-col gap-4 pt-4 border-t border-white/20'>
            <Link href={"/short"}>
              <button 
                onClick={toggleMenu}
                className='w-full cursor-pointer px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white hover:bg-white/30 transition-all duration-200 hover:scale-105 hover:shadow-lg'
              >
                Try Now
              </button>
            </Link>
            <Link href={"https://github.com/anshdev44/URL-SHORTNER"} target="_blank"
              rel="noopener noreferrer"
            >
              <button 
                onClick={toggleMenu}
                className='w-full cursor-pointer px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all duration-200 hover:scale-105 hover:shadow-lg'
              >
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
