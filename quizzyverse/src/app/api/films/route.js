import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.API_KEY;
  const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`);
  const data = await response.json();

  const films = data.results;
  const randomIndex = Math.floor(Math.random() * films.length);
  const randomFilm = films[randomIndex];

  return NextResponse.json(randomFilm, {status: 200});
}
