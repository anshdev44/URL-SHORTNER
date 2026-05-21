"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BarChart3, Link2, MousePointerClick, TrendingUp, ExternalLink, Copy, ArrowUpRight, Loader2, Clock, AlertTriangle } from "lucide-react";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    const creatorId = localStorage.getItem("creatorId");
    if (!creatorId) {
      setLoading(false);
      return;
    }

    fetch(`/api/analytics?creatorId=${creatorId}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setData(result.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const totalClicks = data.reduce((sum, item) => sum + item.clicks, 0);
  const avgClicks = data.length > 0 ? (totalClicks / data.length).toFixed(1) : 0;
  const topLink = data.length > 0 ? data[0] : null;
  const expiredCount = data.filter((item) => item.expiresAt && new Date(item.expiresAt) < new Date()).length;

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatExpiry = (dateStr) => {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getExpiryStatus = (item) => {
    if (!item.expiresAt) return "never";
    const now = new Date();
    const exp = new Date(item.expiresAt);
    if (exp < now) return "expired";
    // Expiring within 24 hours
    if (exp - now < 24 * 60 * 60 * 1000) return "expiring-soon";
    return "active";
  };

  const ExpiryBadge = ({ item }) => {
    const status = getExpiryStatus(item);
    const expiry = formatExpiry(item.expiresAt);

    if (status === "never") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-500/15 text-green-400 border border-green-400/20">
          ♾️ Never
        </span>
      );
    }
    if (status === "expired") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500/15 text-red-400 border border-red-400/20">
          <AlertTriangle className="h-3 w-3" />
          Expired
        </span>
      );
    }
    if (status === "expiring-soon") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-500/15 text-orange-400 border border-orange-400/20 animate-pulse">
          <Clock className="h-3 w-3" />
          {expiry}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-400 border border-blue-400/20">
        <Clock className="h-3 w-3" />
        {expiry}
      </span>
    );
  };

  const maxClicks = data.length > 0 ? Math.max(...data.map((d) => d.clicks), 1) : 1;

  // --- Loading State ---
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-12 shadow-2xl text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Loader2 className="h-8 w-8 text-purple-400 animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading Analytics</h2>
          <p className="text-white/60">Fetching your link data...</p>

          {/* Skeleton cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white/5 rounded-2xl p-6 animate-pulse">
                <div className="h-4 bg-white/10 rounded w-20 mb-3"></div>
                <div className="h-8 bg-white/10 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- Empty State ---
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-12 shadow-2xl text-center max-w-lg">
          <div className="text-6xl mb-6">📊</div>
          <h2 className="text-3xl font-bold text-white mb-4">No Links Yet</h2>
          <p className="text-white/60 text-lg mb-8">
            Create your first shortened URL to start tracking clicks and views.
          </p>
          <Link href="/short">
            <button className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white cursor-pointer px-8 py-4 rounded-full hover:from-blue-600 hover:via-purple-600 hover:to-indigo-700 transition-all duration-300 font-bold shadow-xl hover:scale-110 hover:shadow-2xl transform">
              <span className="flex items-center gap-2">
                <span>✨</span>
                <span>Create Your First Link</span>
                <span>🚀</span>
              </span>
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // --- Main Dashboard ---
  return (
    <div className="flex flex-col items-center gap-8 px-4 sm:px-6 lg:px-8 min-h-screen py-8">
      {/* Header */}
      <div className="w-full max-w-6xl text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg">
            <BarChart3 className="h-7 w-7 text-white" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2">
          Analytics <span className="text-yellow-400">Dashboard</span>
        </h1>
        <p className="text-white/60 text-base sm:text-lg">
          Track clicks and performance across all your BitLinks
        </p>
      </div>

      {/* Stats Cards */}
      <div className="w-full max-w-6xl grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Links */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl hover:bg-white/15 transition-all duration-300 hover:scale-105 group">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-500/20 p-2.5 rounded-xl group-hover:bg-blue-500/30 transition-colors">
              <Link2 className="h-5 w-5 text-blue-400" />
            </div>
            <span className="text-white/60 text-sm font-medium">Total Links</span>
          </div>
          <div className="text-4xl font-extrabold text-white">{data.length}</div>
          <div className="text-white/40 text-xs mt-1">Shortened URLs</div>
        </div>

        {/* Total Clicks */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl hover:bg-white/15 transition-all duration-300 hover:scale-105 group">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-500/20 p-2.5 rounded-xl group-hover:bg-purple-500/30 transition-colors">
              <MousePointerClick className="h-5 w-5 text-purple-400" />
            </div>
            <span className="text-white/60 text-sm font-medium">Total Clicks</span>
          </div>
          <div className="text-4xl font-extrabold text-white">{totalClicks.toLocaleString()}</div>
          <div className="text-white/40 text-xs mt-1">Across all links</div>
        </div>

        {/* Avg Clicks */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl hover:bg-white/15 transition-all duration-300 hover:scale-105 group">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-500/20 p-2.5 rounded-xl group-hover:bg-green-500/30 transition-colors">
              <TrendingUp className="h-5 w-5 text-green-400" />
            </div>
            <span className="text-white/60 text-sm font-medium">Avg Clicks</span>
          </div>
          <div className="text-4xl font-extrabold text-white">{avgClicks}</div>
          <div className="text-white/40 text-xs mt-1">Per link</div>
        </div>

        {/* Expired */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl hover:bg-white/15 transition-all duration-300 hover:scale-105 group">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-500/20 p-2.5 rounded-xl group-hover:bg-red-500/30 transition-colors">
              <Clock className="h-5 w-5 text-red-400" />
            </div>
            <span className="text-white/60 text-sm font-medium">Expired</span>
          </div>
          <div className="text-4xl font-extrabold text-white">{expiredCount}</div>
          <div className="text-white/40 text-xs mt-1">Inactive links</div>
        </div>
      </div>

      {/* Top Performer Banner */}
      {topLink && topLink.clicks > 0 && (
        <div className="w-full max-w-6xl">
          <div className="bg-gradient-to-r from-yellow-500/15 to-orange-500/15 backdrop-blur-lg border border-yellow-400/30 rounded-2xl p-5 sm:p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🏆</span>
                <div>
                  <div className="text-yellow-400 text-xs font-bold uppercase tracking-wider">Top Performer</div>
                  <div className="text-white font-bold text-lg truncate max-w-[300px]">
                    /{topLink.shorturl}
                  </div>
                </div>
              </div>
              <div className="sm:ml-auto flex items-center gap-3">
                <ExpiryBadge item={topLink} />
                <span className="text-3xl font-extrabold text-yellow-400">{topLink.clicks.toLocaleString()}</span>
                <span className="text-white/60 text-sm">clicks</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Links Table */}
      <div className="w-full max-w-6xl">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
          {/* Table Header */}
          <div className="px-6 sm:px-8 py-5 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Link2 className="h-5 w-5 text-blue-400" />
                Your Links
              </h2>
              <span className="text-white/40 text-sm">{data.length} links</span>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/50 text-xs font-semibold uppercase tracking-wider px-8 py-4">Short URL</th>
                  <th className="text-left text-white/50 text-xs font-semibold uppercase tracking-wider px-4 py-4">Original URL</th>
                  <th className="text-left text-white/50 text-xs font-semibold uppercase tracking-wider px-4 py-4">Clicks</th>
                  <th className="text-left text-white/50 text-xs font-semibold uppercase tracking-wider px-4 py-4">Status</th>
                  <th className="text-left text-white/50 text-xs font-semibold uppercase tracking-wider px-4 py-4">Created</th>
                  <th className="text-right text-white/50 text-xs font-semibold uppercase tracking-wider px-8 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  const fullShortUrl = `${process.env.NEXT_PUBLIC_URL}${item.shorturl}`;
                  const isExpired = getExpiryStatus(item) === "expired";
                  return (
                    <tr
                      key={index}
                      className={`border-b border-white/5 hover:bg-white/5 transition-colors duration-200 group ${isExpired ? "opacity-60" : ""}`}
                    >
                      {/* Short URL */}
                      <td className="px-8 py-5">
                        <Link href={fullShortUrl} target="_blank" className="flex items-center gap-2 group/link">
                          <span className={`font-semibold group-hover/link:text-blue-300 transition-colors ${isExpired ? "text-white/40 line-through" : "text-blue-400"}`}>
                            /{item.shorturl}
                          </span>
                          {!isExpired && <ArrowUpRight className="h-3.5 w-3.5 text-blue-400/50 group-hover/link:text-blue-300 transition-colors" />}
                        </Link>
                      </td>

                      {/* Original URL */}
                      <td className="px-4 py-5">
                        <div className="text-white/60 text-sm truncate max-w-[220px]" title={item.url}>
                          {item.url}
                        </div>
                      </td>

                      {/* Clicks */}
                      <td className="px-4 py-5">
                        <div className="flex items-center gap-3">
                          <span className="text-white font-bold text-lg min-w-[40px]">
                            {item.clicks.toLocaleString()}
                          </span>
                          <div className="flex-1 max-w-[100px]">
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                                style={{ width: `${Math.max((item.clicks / maxClicks) * 100, 2)}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-5">
                        <ExpiryBadge item={item} />
                      </td>

                      {/* Created */}
                      <td className="px-4 py-5">
                        <span className="text-white/50 text-sm">{formatDate(item.createdAt)}</span>
                      </td>

                      {/* Actions */}
                      <td className="px-8 py-5">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => copyToClipboard(fullShortUrl, index)}
                            className="cursor-pointer p-2 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/25 transition-all duration-200 hover:scale-110"
                            title="Copy short URL"
                          >
                            {copiedIndex === index ? (
                              <span className="text-green-400 text-xs font-bold px-1">✓</span>
                            ) : (
                              <Copy className="h-4 w-4 text-white/60" />
                            )}
                          </button>
                          <Link href={fullShortUrl} target="_blank">
                            <button className="cursor-pointer p-2 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/25 transition-all duration-200 hover:scale-110"
                              title="Open link"
                            >
                              <ExternalLink className="h-4 w-4 text-white/60" />
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-white/5">
            {data.map((item, index) => {
              const fullShortUrl = `${process.env.NEXT_PUBLIC_URL}${item.shorturl}`;
              const isExpired = getExpiryStatus(item) === "expired";
              return (
                <div key={index} className={`p-5 hover:bg-white/5 transition-colors duration-200 ${isExpired ? "opacity-60" : ""}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Link href={fullShortUrl} target="_blank" className="flex items-center gap-1.5">
                        <span className={`font-bold text-lg ${isExpired ? "text-white/40 line-through" : "text-blue-400"}`}>/{item.shorturl}</span>
                        {!isExpired && <ArrowUpRight className="h-4 w-4 text-blue-400/50" />}
                      </Link>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyToClipboard(fullShortUrl, index)}
                        className="cursor-pointer p-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 transition-all duration-200"
                      >
                        {copiedIndex === index ? (
                          <span className="text-green-400 text-xs font-bold">✓</span>
                        ) : (
                          <Copy className="h-3.5 w-3.5 text-white/60" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="text-white/50 text-sm truncate mb-3" title={item.url}>
                    {item.url}
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <MousePointerClick className="h-4 w-4 text-purple-400" />
                      <span className="text-white font-bold">{item.clicks.toLocaleString()}</span>
                      <span className="text-white/40 text-sm">clicks</span>
                    </div>
                    <span className="text-white/40 text-xs">{formatDate(item.createdAt)}</span>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <ExpiryBadge item={item} />
                  </div>

                  {/* Click bar */}
                  <div className="mt-3">
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                        style={{ width: `${Math.max((item.clicks / maxClicks) * 100, 2)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="w-full max-w-6xl pb-8">
        <div className="text-center">
          <Link href="/short">
            <button className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white cursor-pointer px-8 py-4 rounded-full hover:from-blue-600 hover:via-purple-600 hover:to-indigo-700 transition-all duration-300 font-bold shadow-xl hover:scale-105 hover:shadow-2xl">
              <span className="flex items-center gap-2">
                <span>✨</span>
                <span>Create New Link</span>
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
