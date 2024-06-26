"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function NavBar() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const is_admin = session?.user?.is_admin === 1;
  const xp = session?.user?.xp;
  const premium = session?.user?.is_premium;

  return (
    <nav className="bg-blue-600 p-4 rounded-lg flex justify-between items-center w-full max-w-6xl">
    <div className="left flex space-x-4">
      <Link className="text-white font-bold" href="/xp">
        {xp} XP
      </Link>
      <Link className="text-white font-bold" href="/ranking">
        Ranking
      </Link>
    </div>
    <div className="center">
      <Link className="text-white font-bold text-2xl" href="/">
        Quizzyverse
      </Link>
    </div>
    <div className="right flex space-x-4">
      {isAuthenticated ? (
        <>
          <Link className="text-white font-bold" href="/profile">
            Profile
          </Link>
          {!premium && (
            <Link className="text-white font-bold" href="/premium-sub">
              Get Premium
            </Link>
          )}
          {is_admin && (
            <Link className="text-white font-bold" href="/client/admin">
              Admin
            </Link>
          )}
        </>
      ) : (
        <>
          <Link className="text-white font-bold" href="/login">
            Log In
          </Link>
          <Link className="text-white font-bold" href="/register">
            Register
          </Link>
        </>
      )}
    </div>
  </nav>
  );
}
