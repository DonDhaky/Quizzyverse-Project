'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [film, setFilm] = useState(null);

  useEffect(() => {
    const fetchFilm = async () => {
        const response = await fetch('/api/films');
        const data = await response.json();
        setFilm(data);
    };

    fetchFilm();
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div>
      <Link href="/">Home</Link>
      <h1>Random Film</h1>
      {film ? (
        <div>
          <h2>{film.title}</h2>
          <p>{film.overview}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
