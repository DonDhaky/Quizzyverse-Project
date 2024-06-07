"use client";

import NavBar from "../components/Navbar";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from 'next-auth/react';
// import 'tailwindcss/tailwind.css';
import './login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    await signIn('credentials', {
      email,
      password,
      callbackUrl: '/',
    });
  };

    return (
      <main className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
        <NavBar/>
      <div className="mx-auto max-w-screen-xl px-4 py-8">
          <div className="mb-6 flex justify-center">
            <h2 className="text-2xl font-semibold">Login</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="col-span-full">
              <form className="space-y-6" onSubmit={handleLogin}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                    Email
                  </label>
                  <input required type="email" name="email" id="email" placeholder="Type your email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                    Password
                  </label>
                  <input required type="password" name="password" id="password" placeholder="Type your password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <button onClick={handleLogin} type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Login
                </button>
              </form><br></br>
              <div>
                  <p>Don't have an account ? <Link href="/register">Register here</Link></p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
}

export default Login;