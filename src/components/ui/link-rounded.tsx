import Link from "next/link";
import React, { ReactNode } from "react";

type LinkButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export default function RoundedLink({
  href,
  children,
  className,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={`${className ? className : ""}
    'text-xs text-white px-5 py-3 rounded-md bg-white/5 opacity-75 ' +
    'active:bg-black/5 active:scale-105 hover:scale-110 hover:opacity-100 transition';`}
    >
      {children}
    </Link>
  );
}
