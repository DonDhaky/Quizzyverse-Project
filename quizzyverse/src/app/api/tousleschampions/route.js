import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch("https://ddragon.leagueoflegends.com/cdn/14.11.1/data/en_US/champion.json");
  const data = await response.json();

  return NextResponse.json(data, { status: 200 });
}