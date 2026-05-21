"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Shuffle, Clock, X } from "lucide-react";

const EXPIRY_PRESETS = [
  { label: "1 Hour", value: 60 * 60 * 1000 },
  { label: "24 Hours", value: 24 * 60 * 60 * 1000 },
  { label: "7 Days", value: 7 * 24 * 60 * 60 * 1000 },
  { label: "30 Days", value: 30 * 24 * 60 * 60 * 1000 },
  { label: "Never", value: null },
];

const Page = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isgen, setIsgen] = useState(false);
  const [generated, setGenerated] = useState();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [aliasError, setAliasError] = useState("");

  // Expiration state
  const [expiryPreset, setExpiryPreset] = useState(null); // null = "Never"
  const [showCustomExpiry, setShowCustomExpiry] = useState(false);
  const [customExpiry, setCustomExpiry] = useState("");
  const [expiresAtDisplay, setExpiresAtDisplay] = useState(null);

  const validateAlias = (value) => {
    if (!value) {
      setAliasError("");
      return true;
    }
    const aliasRegex = /^[a-zA-Z0-9_-]+$/;
    if (!aliasRegex.test(value)) {
      setAliasError("Only letters, numbers, hyphens (-) and underscores (_) allowed");
      return false;
    }
    if (value.length < 2) {
      setAliasError("Must be at least 2 characters");
      return false;
    }
    if (value.length > 50) {
      setAliasError("Must be 50 characters or less");
      return false;
    }
    setAliasError("");
    return true;
  };

  const handleAliasChange = (e) => {
    const val = e.target.value;
    setShortUrl(val);
    validateAlias(val);
  };

  const generateRandomAlias = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setShortUrl(result);
    setAliasError("");
  };

  const getExpiresAt = () => {
    if (showCustomExpiry && customExpiry) {
      return new Date(customExpiry).toISOString();
    }
    if (expiryPreset !== null && expiryPreset !== undefined) {
      return new Date(Date.now() + expiryPreset).toISOString();
    }
    return null;
  };

  const genrate = () => {
    if (!url) {
      setErrorMsg("Please enter a URL to shorten");
      return;
    }
    if (shortUrl && !validateAlias(shortUrl)) {
      return;
    }

    setLoading(true);
    setErrorMsg("");

    const expiresAt = getExpiresAt();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      url: url,
      shorturl: shortUrl || "",
      expiresAt: expiresAt,
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
        if (result.error === true) {
          setErrorMsg(result.message);
        } else {
          const usedAlias = result.shorturl || shortUrl;
          setGenerated(`${process.env.NEXT_PUBLIC_URL}${usedAlias}`);
          if (expiresAt) {
            setExpiresAtDisplay(new Date(expiresAt));
          } else {
            setExpiresAtDisplay(null);
          }
          setErrorMsg("");
          setUrl("");
          setIsgen(true);
          setShortUrl("");
          setExpiryPreset(null);
          setShowCustomExpiry(false);
          setCustomExpiry("");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setErrorMsg("Something went wrong. Please try again.");
        setLoading(false);
      });
  };

  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset() + 5);
    return now.toISOString().slice(0, 16);
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
                onChange={(e) => { setUrl(e.target.value); setErrorMsg(""); }}
                className="w-full px-4 sm:px-6 py-4 sm:py-5 rounded-xl bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-600 
                 border-0 focus:outline-none focus:ring-3 focus:ring-blue-400/50 text-sm sm:text-base font-medium shadow-lg hover:bg-white transition-all duration-200 focus:shadow-xl"
              />
            </div>

            {/* Custom Alias Input */}
            <div className="space-y-2">
              <label className="text-white font-semibold text-sm sm:text-base block">
                ⚡ Custom Alias
                <span className="text-white/40 font-normal text-xs ml-2">(optional — leave blank to auto-generate)</span>
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={shortUrl}
                    onChange={handleAliasChange}
                    placeholder="my-awesome-link"
                    className={`w-full px-4 sm:px-6 py-4 sm:py-5 rounded-xl bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-600 
                     border-2 focus:outline-none focus:ring-3 focus:ring-blue-400/50 text-sm sm:text-base font-medium shadow-lg hover:bg-white transition-all duration-200 focus:shadow-xl
                     ${aliasError ? 'border-red-400/60' : 'border-transparent'}`}
                  />
                </div>
                <button
                  type="button"
                  onClick={generateRandomAlias}
                  className="cursor-pointer px-4 sm:px-5 py-4 sm:py-5 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center gap-2 shrink-0"
                  title="Generate random alias"
                >
                  <Shuffle className="h-5 w-5" />
                  <span className="hidden sm:inline text-sm font-medium">Random</span>
                </button>
              </div>

              {aliasError && (
                <p className="text-red-400 text-sm font-medium flex items-center gap-1.5">
                  <X className="h-3.5 w-3.5" />
                  {aliasError}
                </p>
              )}
            </div>

            {/* Expiration Picker */}
            <div className="space-y-3">
              <label className="text-white font-semibold text-sm sm:text-base flex items-center gap-2">
                <Clock className="h-4 w-4 text-white/70" />
                Link Expiration
                <span className="text-white/40 font-normal text-xs">(optional)</span>
              </label>

              {/* Preset Buttons */}
              <div className="flex flex-wrap gap-2">
                {EXPIRY_PRESETS.map((preset, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setExpiryPreset(preset.value);
                      setShowCustomExpiry(false);
                      setCustomExpiry("");
                    }}
                    className={`cursor-pointer px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 border
                      ${!showCustomExpiry && expiryPreset === preset.value
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-blue-400/50 shadow-lg shadow-blue-500/20"
                        : "bg-white/10 backdrop-blur-sm text-white/80 border-white/20 hover:bg-white/20 hover:border-white/30"
                      }`}
                  >
                    {preset.label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setShowCustomExpiry(true);
                    setExpiryPreset(undefined);
                  }}
                  className={`cursor-pointer px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 border
                    ${showCustomExpiry
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-blue-400/50 shadow-lg shadow-blue-500/20"
                      : "bg-white/10 backdrop-blur-sm text-white/80 border-white/20 hover:bg-white/20 hover:border-white/30"
                    }`}
                >
                  Custom
                </button>
              </div>

              {/* Custom Date/Time Picker */}
              {showCustomExpiry && (
                <div className="mt-2">
                  <input
                    type="datetime-local"
                    value={customExpiry}
                    min={getMinDateTime()}
                    onChange={(e) => setCustomExpiry(e.target.value)}
                    className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-4 rounded-xl bg-white/90 backdrop-blur-sm text-gray-900 
                     border-0 focus:outline-none focus:ring-3 focus:ring-blue-400/50 text-sm font-medium shadow-lg hover:bg-white transition-all duration-200 focus:shadow-xl"
                  />
                </div>
              )}

              {/* Expiry Info */}
              {(expiryPreset !== null && expiryPreset !== undefined && !showCustomExpiry) && (
                <p className="text-white/40 text-xs flex items-center gap-1.5">
                  <Clock className="h-3 w-3" />
                  Expires {new Date(Date.now() + expiryPreset).toLocaleString()}
                </p>
              )}
              {showCustomExpiry && customExpiry && (
                <p className="text-white/40 text-xs flex items-center gap-1.5">
                  <Clock className="h-3 w-3" />
                  Expires {new Date(customExpiry).toLocaleString()}
                </p>
              )}
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="bg-red-500/10 border border-red-400/30 rounded-xl px-4 py-3">
                <p className="text-red-400 font-semibold text-sm">{errorMsg}</p>
              </div>
            )}

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
                  onClick={genrate}
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

              {/* Expiration Badge */}
              {expiresAtDisplay ? (
                <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-400/30 rounded-full px-4 py-2">
                  <Clock className="h-4 w-4 text-orange-400" />
                  <span className="text-orange-300 text-sm font-medium">
                    Expires {expiresAtDisplay.toLocaleString()}
                  </span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 bg-green-500/15 border border-green-400/30 rounded-full px-4 py-2">
                  <span className="text-green-300 text-sm font-medium">♾️ Never expires</span>
                </div>
              )}

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
                    setExpiresAtDisplay(null);
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
              title: "Custom Aliases",
              desc: "Create memorable branded links",
            },
            {
              icon: "⏰",
              title: "Link Expiration",
              desc: "Set auto-expire dates for links",
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
