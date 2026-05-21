"use client";
import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Clock, AlertTriangle, ArrowRight } from "lucide-react";
import { Suspense } from "react";

function ExpiredContent() {
  const searchParams = useSearchParams();
  const alias = searchParams.get("alias");

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 sm:p-12 shadow-2xl text-center max-w-lg w-full">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 p-5 rounded-2xl border border-red-400/30">
              <Clock className="h-12 w-12 text-red-400" />
            </div>
            <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1">
              <AlertTriangle className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
          Link <span className="text-red-400">Expired</span>
        </h1>
        <p className="text-white/60 text-base sm:text-lg mb-2">
          This shortened URL has passed its expiration date and is no longer active.
        </p>
        {alias && (
          <div className="bg-white/5 rounded-xl px-4 py-2 border border-white/10 inline-block mb-6">
            <span className="text-white/40 text-sm">/{alias}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
          <Link href="/short">
            <button className="cursor-pointer bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white px-6 py-3 rounded-full hover:from-blue-600 hover:via-purple-600 hover:to-indigo-700 transition-all duration-300 font-bold shadow-xl hover:scale-105 hover:shadow-2xl">
              <span className="flex items-center gap-2">
                <span>Create New Link</span>
                <ArrowRight className="h-4 w-4" />
              </span>
            </button>
          </Link>
          <Link href="/">
            <button className="cursor-pointer px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-200 hover:scale-105 font-semibold">
              Go Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ExpiredPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-12 shadow-2xl text-center">
          <div className="animate-spin h-8 w-8 border-2 border-white border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    }>
      <ExpiredContent />
    </Suspense>
  );
}
