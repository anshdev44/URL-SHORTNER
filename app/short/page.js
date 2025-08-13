"use client";
import React, { useState } from "react";
import Link from "next/link";

const Page = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isgen, setIsgen] = useState(false);
  const [generated, setGenerated] = useState();
  const [loading, setLoading] = useState(false);
  const [aleradyexist, setAleradyexist] = useState(false);

  const genrate = (url, shortUrl) => {
    if (!url || !shortUrl) {
      alert("Please add URL or short URL");
      return;
    }

    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      url: url,
      shorturl: shortUrl,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/api/generate", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setGenerated(`${process.env.NEXT_PUBLIC_URL}${shortUrl}`);
        if (result.error === true) {
          setAleradyexist(true);
        } else {
          setAleradyexist(false);
          setUrl("");
          setIsgen(true);
          setShortUrl("");
        }

        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="flex flex-col items-center gap-8 sm:gap-10 md:gap-12 px-4 sm:px-6 lg:px-8 min-h-screen py-8">
      {/* Main Form Container */}
      <div className="w-full max-w-4xl ">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl hover:bg-white/15 transition-all duration-300 hover:shadow-3xl">
          <div className="flex flex-col gap-8 sm:gap-10">
            {/* URL Input */}
            <div className="space-y-2">
              <label className="text-white font-semibold text-sm sm:text-base block">
                🔗 Original URL
              </label>
              <input
                type="text"
                placeholder="https://example.com/your-very-long-url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-4 sm:px-6 py-4 sm:py-5 rounded-xl bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-600 
                 border-0 focus:outline-none focus:ring-3 focus:ring-blue-400/50 text-sm sm:text-base font-medium shadow-lg hover:bg-white transition-all duration-200 focus:shadow-xl"
              />
            </div>

            {/* Short URL Input */}
            <div className="space-y-2">
              <label className="text-white font-semibold text-sm sm:text-base block">
                ⚡ Custom Short URL
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={shortUrl}
                  onChange={(e) => setShortUrl(e.target.value)}
                  placeholder="my-awesome-link"
                  className="w-full px-4 sm:px-6 py-4 sm:py-5 rounded-xl bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-600 
                   border-0 focus:outline-none focus:ring-3 focus:ring-blue-400/50 text-sm sm:text-base font-medium shadow-lg hover:bg-white transition-all duration-200 focus:shadow-xl"
                />
              </div>

              {aleradyexist && (
                <div>
                  <p className="text-red-600 font-bold">
                    TRY GETTING A DIFFERENT SHORTURL
                  </p>
                </div>
              )}
            </div>

            {/* Generate Button */}
            <div className="text-center pt-4">
              {loading ? (
                <button
                  disabled
                  className="cursor-not-allowed bg-gradient-to-r from-red-400 to-red-600 px-8 sm:px-12 py-4 sm:py-5 rounded-full text-sm sm:text-base text-white font-bold shadow-lg opacity-70 min-w-[200px]"
                >
                  <div className="flex items-center justify-center gap-3">
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Generating...</span>
                  </div>
                </button>
              ) : (
                <button
                  onClick={() => genrate(url, shortUrl)}
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white cursor-pointer px-8 sm:px-12 py-4 sm:py-5 rounded-full hover:from-blue-600 hover:via-purple-600 hover:to-indigo-700 transition-all duration-300 text-sm sm:text-base font-bold shadow-xl hover:scale-110 hover:shadow-2xl transform min-w-[200px]"
                >
                  <span className="flex items-center justify-center gap-2">
                    <span>✨</span>
                    <span>Generate Short URL</span>
                    <span>🚀</span>
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success Result */}
      {isgen && (
        <div className="w-full max-w-4xl animate-fadeIn">
          <div className="bg-white/10 backdrop-blur-lg border border-white/30 rounded-2xl p-6 sm:p-8 shadow-xl hover:bg-white/15 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
            <div className="text-center space-y-6">
              {/* Success Header */}
              <div className="space-y-2">
                <div className="text-6xl">🎉</div>
                <h3 className="text-white font-bold text-xl sm:text-2xl">
                  Your shortened URL is ready!
                </h3>
                <p className="text-white/70 text-sm sm:text-base">
                  Click the link below to test it or copy it to share
                </p>
              </div>

              {/* Generated URL Display */}
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/30">
                <Link target="_blank" href={generated} className="group">
                  <div className="text-white font-semibold text-base sm:text-lg md:text-xl break-all hover:text-blue-300 transition-colors duration-200 cursor-pointer group-hover:underline decoration-2 underline-offset-4">
                    {generated}
                  </div>
                </Link>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generated);
                  }}
                  className="cursor-pointer px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full text-sm font-bold transition-all duration-200 hover:scale-105 shadow-lg min-w-[140px]"
                >
                  <span className="flex items-center justify-center gap-2">
                    <span>📋</span>
                    <span>Copy URL</span>
                  </span>
                </button>

                <button
                  onClick={() => {
                    setIsgen(false);
                    setUrl("");
                    setShortUrl("");
                  }}
                  className="cursor-pointer px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-full text-sm font-bold transition-all duration-200 hover:scale-105 shadow-lg min-w-[140px]"
                >
                  <span className="flex items-center justify-center gap-2">
                    <span>🔄</span>
                    <span>Create New</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <div className="w-full max-w-6xl mt-8 sm:mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: "🔒",
              title: "Privacy First",
              desc: "No tracking, no data collection",
            },
            {
              icon: "⚡",
              title: "Lightning Fast",
              desc: "Generate short URLs instantly",
            },
            {
              icon: "🎨",
              title: "Custom URLs",
              desc: "Create memorable short links",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 text-center"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h4 className="text-white font-bold text-lg mb-2">
                {feature.title}
              </h4>
              <p className="text-white/70 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
