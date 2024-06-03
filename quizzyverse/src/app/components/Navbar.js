'use client'
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-blue-600 p-4 rounded-lg flex justify-between items-center w-full max-w-4xl mb-8">
    <div className="left flex space-x-4">
      <Link className="text-white font-bold" href="/about">
        About
      </Link>
      <Link className="text-white font-bold" href="/xp">
        XP
      </Link>
      <Link className="text-white font-bold" href="/admin">
        Admin
      </Link>
    </div>
    <div className="center">
      <Link className="text-white font-bold text-2xl" href='/'>Quizzyverse</Link>
    </div>
    <div className="right flex space-x-4">
      <Link className="text-white font-bold" href="/login">
        Log In
      </Link>
      <Link className="text-white font-bold" href="/register">
        Register
      </Link>
    </div>
  </nav>
  );
}
