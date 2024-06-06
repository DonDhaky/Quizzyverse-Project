import fetch from 'node-fetch';

let countriesData = [];

// je récupère tous les pays de l'api
const fetchAllCountries = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        countriesData = data;
    } catch (error) {
        console.error('Error while trying to fetch all countries data', error);
        throw error;
    }
};

// je récupère un pays aléatoire dans le tableau de tous les pays
const getRandomCountry = () => {
    return countriesData[Math.floor(Math.random() * countriesData.length)];
};

// j'initialise la fonction qui récupère tous les pays
await fetchAllCountries();


// j'exporte la méthode GET qui contient la fonction initialisée avec la récupération du pays au hasard
export const GET = async () => {
    try {
        if (countriesData.length === 0) {
            await fetchAllCountries(); // en cas de bug sur le fetch
        }
        const randomCountry = getRandomCountry();
        return new Response(JSON.stringify(randomCountry), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch countries data' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
};

