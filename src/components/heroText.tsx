"use client";
import { useEffect, useRef, useState } from "react";

export default function HeroText() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48">
      <h1
        ref={titleRef}
        className={`mb-4 text-4xl font-bold text-black sm:text-5xl md:mb-8 md:text-6xl transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{
          lineHeight: "1.1",
          letterSpacing: "-0.02em",
        }}
      >
        <span className="inline-block bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent animate-gradient">
          Top Fashion
        </span>{" "}
        <span className="text-gray-700 dark:bg-gradient-to-br dark:from-purple-600 dark:via-pink-600 dark:to-blue-600 dark:bg-clip-text dark:text-transparent hover:text-blue-600 hover:bg-blue-800 dark:hover:bg-gradient-to-br dark:hover:from-green-600 dark:hover:via-teal-600 dark:hover:to-cyan-600 dark:hover:text-green-500 animate-gradient">
          at an
          </span>{" "}
        <span className="inline-block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
          Affordable Price!
        </span>
      </h1>

      <p
        ref={textRef}
        className={`max-w-md leading-relaxed text-gray-500 xl:text-lg transition-all duration-1000 ease-out delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        We sell only the most exclusive and high quality products for you. We
        are the best so come and shop with us.
      </p>

      <div
        className={`mt-8 flex gap-4 transition-all duration-1000 ease-out delay-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <button className="group relative px-6 py-3 bg-black text-white  dark:bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full font-medium overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <span className="relative z-10">Shop Now</span>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
