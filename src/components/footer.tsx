"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  const [dateTime, setDateTime] = useState<string>("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setDateTime(
        now.toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="mt-10 sm:mt-16 mb-0 bg-white">
      <div className="container mx-auto px-4">
        {/* Brand */}
        <div className="mt-3 sm:mt-5">
          <Link href="/" className="font-black text-tertiary-light text-2xl">
            Nadia&apos;s<span className="text-black">Beads</span>
          </Link>
        </div>

        {/* Contact & Info */}
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 items-start justify-between mt-6">
          {/* Contact */}
          <div className="flex-1">
            <h4 className="font-semibold text-[18px] sm:text-[20px] py-2 sm:py-3">
              Contact Us
            </h4>
            <div className="flex items-center mb-3 sm:mb-4">
              <EmailIcon fontSize="small" />
              <a
                href="mailto:doreendaabbey@gmail.com"
                className="ml-2 text-sm sm:text-base"
              >
                doreendaabbey@gmail.com
              </a>
            </div>
            <div className="flex items-center mb-3 sm:mb-4">
              <PhoneIcon fontSize="small" />
              <a
                href="tel:+2330203900892"
                className="ml-2 text-sm sm:text-base"
              >
                0203900892
              </a>
            </div>
            <div className="flex items-center mb-3 sm:mb-4">
              <WhatsAppIcon fontSize="small" />
              <a
                href="https://wa.me/2330203900892"
                className="ml-2 text-sm sm:text-base"
              >
                0203900892
              </a>
            </div>
            <div className="flex items-center">
              <InstagramIcon fontSize="small" />
              <a
                href="https://www.instagram.com/africvouge"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-sm sm:text-base"
              >
                Nadia
              </a>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 sm:text-right mt-6 sm:mt-0">
            <h4 className="font-semibold text-[18px] sm:text-[20px] py-2 sm:py-3">
              Information
            </h4>
            <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
              <li>
                <Link href="/blog" className="hover:text-blue-400 transition">
                  Blog Post (Coming Soon)
                </Link>
              </li>
              <li>
                <Link
                  href="/our-story"
                  className="hover:text-blue-400 transition"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="hover:text-blue-400 transition"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Bottom bar */}
      <div className="w-full border-t border-gray-200 mt-6 sm:mt-8 py-3 sm:py-4 flex flex-col md:flex-row items-center justify-between px-4 text-xs sm:text-sm text-gray-600">
        <div className="mb-2 md:mb-0 text-center md:text-left">
          © {new Date().getFullYear()} Hollali — All rights reserved.
        </div>
        <div className="mb-2 md:mb-0 text-black font-medium text-center">
          {dateTime}
        </div>
        <div className="text-center md:text-right">
          <a
            href="https://hollalikelvin.netlify.app/"
            className="font-bold hover:text-blue-400 transition"
          >
            Developed by Hollali
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
