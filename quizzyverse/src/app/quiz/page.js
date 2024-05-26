'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {

  const fetchFilms = async () => {
    try {
        const response = await fetch (`https://api.themoviedb.org/3/discover/movie?api_key=bde8dd7d1bfc301d94ec24636a3e78b7`);
        const data = await response.json();
        console.log('json:', data.results);
        return data.results;
    } catch (error) {
        console.error('Error Fetching films', error);
    }
};

fetchFilms();
  return (
    <div>
      <Link href="/">Home</Link>
      <h1>Popular Films</h1>
    </div>
  );
}
