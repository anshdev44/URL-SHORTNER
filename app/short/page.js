"use client";
import React, { useState } from "react";

const Page = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isgen, setIsgen] = useState(false)
  const [generated, setGenerated] = useState();
  const [loading, setLoading] = useState(false);

  const genrate = (url, shortUrl) => {
    setLoading(true)
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    console.log(url, shortUrl);

    const raw = JSON.stringify({
      "url": url,
      "shorturl": shortUrl
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("/api/generate", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setUrl("")
        setIsgen(true)
        setShortUrl("")
        setGenerated(`${process.env.NEXT_HOST}/${shortUrl}`)

        setLoading(false)
      })
      .catch((error) => console.error(error));



  }


  return (
    <div className="flex flex-col items-center gap-11">
      <div className="flex flex-col justify-center items-center mt-60">
        <div className="flex flex-col gap-10 p-8 rounded-2xl shadow-xl">
          <input
            type="text"
            placeholder="Enter Your URL Here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-[600px] px-4 py-2 rounded-lg bg-white text-gray-900 placeholder-gray-500 
             border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            value={shortUrl}
            onChange={(e) => setShortUrl(e.target.value)}
            placeholder="Enter Your Preferred URL Text"
            className="w-[600px] px-4 py-2 rounded-lg bg-white text-gray-900 placeholder-gray-500 
             border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {loading ? (
          <button
            disabled
            className="cursor-not-allowed bg-red-500 p-5 rounded-2xl w-auto"
          >
            Generating..
          </button>
        ) : (
          <button
            onClick={() => { genrate(url, shortUrl) }}
            className="bg-blue-500 text-white cursor-pointer p-5 rounded-2xl w-auto hover:bg-blue-600 transition-colors"
          >
            Generate
          </button>
        )}
      </div>
      {isgen && (<div className="bg-white w-[27vw] h-[5vh] text-black">Your Url Is : {generated}</div>)}
    </div>
  );
};

export default Page;
