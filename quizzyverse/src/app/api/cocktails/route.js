import { deepStrictEqual } from 'assert';
import { headers } from 'next/headers';
import fetch from 'node-fetch';

let allCocktails = [];

// je recupere tous les cocktails
const fetchAllCocktails = async () => {
  try {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
      const data = await response.json();
      allCocktails = data.drinks;
  } catch (error) {
      console.error({ error: 'Failed to fetch data' });
      throw error;
  }
}

// je recupere un cocktail au hasard
const getRandomCocktail = () => {
    return allCocktails[Math.floor(Math.random() * allCocktails.length)];
}

// jinitialise la fonction de fetch
await fetchAllCocktails();

// exportqtion des bg comme clemence
export const GET = async () => {
    try {
            if (allCocktails.length === 0) {
                await fetchAllCocktails();
            }
            const randomCocktail = getRandomCocktail();
            return new Response(JSON.stringify(randomCocktail), { status: 200, headers: { 'Content-Type': 'application/json'}});
    } catch (error) {
        return new Response(JSON.stringify({ error: 'failed to fetch'}), { status: 500, headers: { 'Content-Type': 'application/json' } }); 
    }
}