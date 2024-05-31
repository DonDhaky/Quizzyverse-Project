import { NextResponse } from "next/server";

export async function GET() {
  const version = "14.11.1";
  const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`);
  const data = await response.json();

  const championsArray = Object.values(data.data);
  const randomIndex = Math.floor(Math.random() * championsArray.length);
  const randomChampion = championsArray[randomIndex];

  // Fetch detailed data for the selected champion
  const detailedResponse = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${randomChampion.id}.json`);
  const detailedData = await detailedResponse.json();

  const championDetail = detailedData.data[randomChampion.id];

  return NextResponse.json(championDetail, { status: 200 });
}



// export async function GET() {
//   const apiKey = process.env.API_KEY;
//   const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`);
//   const data = await response.json();

//   const films = data.results;
//   const randomIndex = Math.floor(Math.random() * films.length);
//   const randomFilm = films[randomIndex];

//   return NextResponse.json(randomFilm, {status: 200});
// }
