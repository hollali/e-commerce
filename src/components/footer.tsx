"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LocationOnIcon from "@mui/icons-material/LocationOn";
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
    <footer className="mt-16 mb-0">
      <div className="container mx-auto px-4">
        {/* Brand */}
        <div className="mt-5">
          <Link href="/" className="font-black text-tertiary-light text-2xl">
            Nadia's<span className="text-black">Beads</span>
          </Link>
        </div>

        {/* Contact & Info */}
        <div className="flex flex-wrap gap-16 items-start justify-between mt-6">
          {/* Contact */}
          <div className="flex-1">
            <h4 className="font-semibold text-[20px] py-3">Contact</h4>
            <div className="flex items-center mb-4">
              <EmailIcon />
              <a href="mailto:doreendaabbey@gmail.com" className="ml-2">
                doreendaabbey@gmail.com
              </a>
            </div>
            <div className="flex items-center mb-4">
              <PhoneIcon />
              <a href="tel:+2330203900890" className="ml-2">
                0203900890
              </a>
            </div>
            <div className="flex items-center mb-4">
              <WhatsAppIcon />
              <a href="https://wa.me/2330203900892" className="ml-2">
                0203900892
              </a>
            </div>
            <div className="flex items-center">
              <InstagramIcon />
              <a
                href="https://www.instagram.com/africvouge"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2"
              >
                Nadia
              </a>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 md:text-right">
            <h4 className="font-semibold text-[20px] py-3">Information</h4>
            <ul className="space-y-2 text-gray-600">
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
      <div className="w-full border-t border-gray-200 mt-8 py-4 flex flex-col md:flex-row items-center justify-between px-4 text-sm text-gray-600">
        <div className="mb-2 md:mb-0 text-center md:text-left">
          © {new Date().getFullYear()} Hollali — All rights reserved.
        </div>
        <div className="mb-2 md:mb-0 text-black font-medium">{dateTime}</div>
        <div className="text-center md:text-right">
          <a
            href="https://hollali.pxxl.space/"
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
