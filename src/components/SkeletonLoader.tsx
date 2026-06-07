import React from "react";
import { motion } from "motion/react";

interface SkeletonLoaderProps {
  isDarkMode: boolean;
}

export default function SkeletonLoader({ isDarkMode }: SkeletonLoaderProps) {
  const bgColor = isDarkMode ? "bg-slate-950" : "bg-slate-50";
  const itemBg = isDarkMode ? "bg-slate-900" : "bg-slate-200";
  const accentPulseBg = isDarkMode ? "bg-slate-800" : "bg-slate-300";
  const tintPulseBg = isDarkMode ? "bg-indigo-950/40" : "bg-indigo-100/60";

  return (
    <div className={`min-h-screen ${bgColor} overflow-hidden flex flex-col font-sans transition-colors duration-300`}>
      {/* 1. Navbar Skeleton */}
      <div className={`fixed top-0 left-0 right-0 h-16 border-b ${isDarkMode ? "border-slate-900 bg-slate-950" : "border-slate-200 bg-white"} z-50 px-4 sm:px-6 lg:px-8 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          {/* Logo Placeholder */}
          <div className={`w-8 h-8 rounded-lg ${accentPulseBg} animate-pulse`} />
          <div className={`w-28 h-5 rounded-md ${itemBg} animate-pulse`} />
        </div>
        {/* Navigation Link Placeholders */}
        <div className="hidden md:flex items-center gap-6">
          <div className={`w-16 h-4 rounded ${itemBg} animate-pulse`} />
          <div className={`w-16 h-4 rounded ${itemBg} animate-pulse`} />
          <div className={`w-16 h-4 rounded ${itemBg} animate-pulse`} />
          <div className={`w-16 h-4 rounded ${itemBg} animate-pulse`} />
        </div>
        {/* Theme + Resume Button Placeholders */}
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg ${itemBg} animate-pulse`} />
          <div className={`w-24 h-9 rounded-xl ${accentPulseBg} animate-pulse`} />
        </div>
      </div>

      {/* 2. Hero Section Skeleton Body */}
      <main className="flex-grow pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            
            {/* Badge Indicator */}
            <div className="flex items-center gap-2">
              <div className={`w-5 h-5 rounded-full ${tintPulseBg} animate-pulse`} />
              <div className={`w-40 h-5 rounded-full ${tintPulseBg} animate-pulse`} />
            </div>

            {/* Giant Title Bars */}
            <div className="space-y-3">
              <div className={`w-11/12 h-10 sm:h-12 rounded-lg ${itemBg} animate-pulse`} />
              <div className={`w-4/5 h-10 sm:h-12 rounded-lg ${itemBg} animate-pulse`} />
            </div>

            {/* Description Lines */}
            <div className="space-y-2 mt-2">
              <div className={`w-full h-4 rounded ${itemBg} animate-pulse`} />
              <div className={`w-11/12 h-4 rounded ${itemBg} animate-pulse`} />
              <div className={`w-3/4 h-4 rounded ${itemBg} animate-pulse`} />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
              <div className={`w-full sm:w-36 h-12 rounded-xl ${accentPulseBg} animate-pulse`} />
              <div className={`w-full sm:w-36 h-12 rounded-xl ${itemBg} animate-pulse`} />
              <div className={`w-full sm:w-36 h-12 rounded-xl ${itemBg} animate-pulse`} />
            </div>

            {/* Micro Tech Tags Title */}
            <div className="mt-8 space-y-3">
              <div className={`w-36 h-4 rounded ${itemBg} animate-pulse`} />
              <div className="flex flex-wrap gap-2">
                <div className={`w-20 h-8 rounded-lg ${itemBg} animate-pulse`} />
                <div className={`w-24 h-8 rounded-lg ${itemBg} animate-pulse`} />
                <div className={`w-16 h-8 rounded-lg ${itemBg} animate-pulse`} />
                <div className={`w-28 h-8 rounded-lg ${itemBg} animate-pulse`} />
                <div className={`w-20 h-8 rounded-lg ${itemBg} animate-pulse`} />
              </div>
            </div>

          </div>

          {/* Right Column: Visual Graphic Card Accent */}
          <div className="lg:col-span-5 flex justify-center">
            <div className={`w-full max-w-[380px] aspect-square rounded-3xl border ${isDarkMode ? "border-slate-900 bg-slate-950" : "border-slate-200 bg-white"} p-6 flex flex-col justify-between shadow-lg relative overflow-hidden`}>
              {/* Dynamic shining background gradient simulation */}
              <div className={`absolute inset-0 bg-gradient-to-tr from-transparent ${isDarkMode ? "via-indigo-950/10" : "via-indigo-50/20"} to-transparent animate-pulse`} />
              
              <div className="flex justify-between items-start">
                <div className={`w-12 h-12 rounded-2xl ${accentPulseBg} animate-pulse`} />
                <div className={`w-20 h-5 rounded-full ${tintPulseBg} animate-pulse`} />
              </div>

              <div className="space-y-3">
                <div className={`w-2/3 h-5 rounded ${itemBg} animate-pulse`} />
                <div className={`w-full h-8 rounded-lg ${accentPulseBg} animate-pulse`} />
              </div>

              <div className="border-t border-slate-900/50 pt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full ${itemBg} animate-pulse`} />
                  <div className={`w-20 h-4 rounded ${itemBg} animate-pulse`} />
                </div>
                <div className={`w-12 h-4 rounded ${itemBg} animate-pulse`} />
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* 3. Section Divider bar preview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className={`h-px ${isDarkMode ? "bg-slate-900" : "bg-slate-200"}`} />
      </div>
    </div>
  );
}
