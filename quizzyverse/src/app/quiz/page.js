"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import NavBar from "../components/Navbar";

export default function Home() {
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');

  const fetchFilm = async () => {
    setLoading(true);
    const response = await fetch("/api/films");
    const data = await response.json();
    setFilm(data);
    setLoading(false);
    setShowOverview(false);
    setGuess('');
    setMessage('');
  };

  useEffect(() => {
    fetchFilm();
  }, []);

  const handleGuess = () => {
    if (guess.toLowerCase() === film.title.toLowerCase()) {
      setMessage('Correct!');
      setTimeout(() => fetchFilm(), 2000);
    } else {
      setMessage('Incorrect, Try Again Big Noob U suck AHHAH');
    }
  };
  return (
<div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
  <NavBar/>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl text-center">
        <h1 className="text-3xl font-bold mb-6">Find the title</h1>
        {film ? (
          <div>
            <img className="mx-auto mb-4 rounded-lg" src={`https://image.tmdb.org/t/p/w500${film.backdrop_path}`} alt={film.title} />
            {/* <h2 className="text-2xl font-semibold mb-4">{film.title}</h2> */}
            <button
            onClick={() => setShowOverview(!showOverview)}
            className="mt-2 mb-4 px-4 py-2 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700"
            >
              {showOverview ? 'Hide Overview' : 'Show Overview'}
            </button>
            {showOverview && (
              <p className="mb-4">{film.title}</p>
            )}
            <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            className="mt-2 mb-4 px-4 py-2 rounded-lg border border-gray-300"
            placeholder="Guess the film title"
            />
            <button
            onClick={handleGuess}
            className="mt-2 mb-4 px-4 py-2 rounded-lg text-white font-semibold bg-green-600 hover:bg-green-700"
            >
              Submit Guess
            </button>
            {message && <p className="mt-2 text-lg">{message}</p>}
          </div>
        ) : (
          <p className="text-gray-500">Loading...</p>
        )}
        <button 
          onClick={fetchFilm} 
          className={`mt-4 px-6 py-2 rounded-lg text-white font-semibold ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} disabled:opacity-50`}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Fetch Another Film'}
        </button>
      </div>
    </div>
  );
}
