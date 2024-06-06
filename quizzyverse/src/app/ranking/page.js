"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import NavBar from "../components/Navbar";

export default function Ranking() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users/rankingxp");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <NavBar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">User Rankings</h1>
        <h2 className="text-xl font-semibold mb-6">Experience Points (XP)</h2>
        <div className="space-y-4">
          {users.map((user, index) => (
            <div
              key={user.id}
              className="bg-white shadow-md rounded-md p-4 w-full"
            >
              <h3 className="text-lg font-bold">
                {index + 1}. {user.email}
              </h3>
              <p className="text-md">XP: {user.xp}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link
            className="text-blue-500 font-semibold underline"
            href="/"
            passHref
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
