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
        <span className="inline-block text-black dark:text-gray-100">
          Top Fashion
        </span>{" "}
        <span className="text-blue-600 dark:text-blue-400">
          at an
        </span>
          {" "}
        <span className="inline-block text-indigo-600 dark:text-indigo-400">
          Affordable Price!
        </span>
      </h1>

      <p
        ref={textRef}
        className={`max-w-md leading-relaxed text-gray-500 dark:text-gray-400 xl:text-lg transition-all duration-1000 ease-out delay-300 ${
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
        <button className="group relative px-6 py-3 bg-gray-900 dark:bg-indigo-600 text-white rounded-full font-medium overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <span className="relative z-10">Shop Now</span>
          <div className="absolute inset-0 bg-indigo-700 dark:bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>

    </div>
  );
}