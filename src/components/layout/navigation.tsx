"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie"; // dangerous
import RoundedButton from "../ui/btn-rounded";

type Labels = {
  backBtn: string;
  exitBtn: string;
};

export default function Navigation({ labels }: { labels: Labels }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const cookieValue = Cookies.get("userRegistered");
    console.log(cookieValue);

    setIsLoggedIn(!!cookieValue);
  }, []);

  //   useEffect(() => {
  //     fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/check`, {
  //       credentials: "include"
  //     })
  //       .then(res => res.json())
  //       .then(data => setIsLoggedIn(data.loggedIn))
  //       .catch(() => setIsLoggedIn(false));
  //   }, []);

  console.log(isLoggedIn);
  if (!isLoggedIn) return null;

  return (
    <nav className="flex flex-row gap-x-4 mb-6">
      <button
        type="button"
        onClick={() => router.back()}
        className="bg-emerald-800 py-2 px-4 hover:text-gray-400 transition-colors duration-200"
      >
        {labels.backBtn}
      </button>
      <button
        onClick={() => router.push("/")}
        className="bg-emerald-800 py-2 px-4 hover:text-gray-400 transition-colors duration-200"
      >
        {labels.exitBtn}
      </button>
    </nav>
  );
}
