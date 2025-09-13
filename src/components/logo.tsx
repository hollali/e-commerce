"use client";

import Image from "next/image";
import Link from "next/link";

export default function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="flex items-center">
      <Image
        src="/logo.png" // Place your logo file in /public/logo.png
        alt="Anet Beads Logo"
        width={160}
        height={60}
        className="h-10 w-auto sm:h-12 md:h-14 lg:h-16"
        priority
      />
    </Link>
  );
}
