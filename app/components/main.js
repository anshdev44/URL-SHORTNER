import React from "react";

const Main = () => {
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between px-8 md:px-16 lg:px-24 min-h-[80vh] text-white overflow-hidden">
      
     
      <div className="relative z-10 max-w-[35vw] text-center md:text-left space-y-4">
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
          The Best <span className="text-yellow-400">URL</span> Shortener In The Market
        </h1>
        <p className="text-2xl text-gray-300 leading-relaxed">
          We are the most straightforward URL Shortener in the world. Most URL shorteners will track you or ask for your details to log in. 
          We understand your needs — that’s why we’ve built a simple, secure, and privacy-first URL shortener.
        </p>
        <button className=" cursor-pointer mt-4 px-6 py-3 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-500 transition">
          Try Now
        </button>
      </div>

 
    </div>
  );
};

export default Main;
