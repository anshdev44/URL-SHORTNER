import React from "react";
import Link from "next/link";

const Main = () => {
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center md:justify-between px-4 sm:px-8 md:px-16 lg:px-24 min-h-[80vh] text-white overflow-hidden">


      <div className="relative z-10 w-full max-w-4xl md:max-w-[35vw] text-center md:text-left space-y-4 md:space-y-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
          The Best <span className="text-yellow-400">URL</span> Shortener In The Market
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed">
          We are the most straightforward URL Shortener in the world. Most URL shorteners will track you or ask for your details to log in.
          We understand your needs — that's why we've built a simple, secure, and privacy-first URL shortener.
        </p>
        <div className="pt-2">
          <Link href={"/short "}>
            <button className="cursor-pointer px-6 py-3 sm:px-8 sm:py-4 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-500 transition-all duration-200 hover:scale-105 text-base sm:text-lg">
              Try Now
            </button>
          </Link>
        </div>
      </div>


    </div>
  );
};

export default Main;