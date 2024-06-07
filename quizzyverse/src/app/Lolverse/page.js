"use client";

import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
// import { checkUserDailyCount } from "../api/users/renewedat/checkRenewedAt";
import { useRouter } from "next/navigation";

export default function Home() {
  // ON Export directement donc pas besoin de le faire a la fin

  // On enregistre les datas modifies avec useState et on specifie le type, soit un array, text, boolean etc
  const router = useRouter();
  const [championData, setChampionData] = useState(null); // Enregistre le nom du champion qui doit etre deviné
  const [championNames, setChampionNames] = useState([]); // Enregistre le nom de tous les champions
  const [suggestions, setSuggestions] = useState([]); // Enregistre la liste de tous les champions filtres pour l'autocomplete
  const [guess, setGuess] = useState(''); // Enregiste le 'Guess' du user
  const [hintVisible, setHintVisible] = useState(false); // Controle la visibilite de l'indice
  const [feedback, setFeedback] = useState(""); // Dit si c'est bon ou non avec un ternary
  const [questionCount, setQuestionCount] = useState(0);
  const maxQuestions = 5;

  // Ici on fetch un random champion, le random est gere dans le fichier route.js dans la route ci-dessous
  const fetchChampionData = async () => {
    // on le met on async pour qu'il on meme temps que ca charge
    const response = await fetch("api/champion");
    const data = await response.json();
    setChampionData(data); // Mets a jour le championData a devine par exemple ca peut etre LeeSin
    setFeedback(""); // A chaque nouveau fetch, on remet a 0 le feedback, le 'guess' de l'user et la visibile de l'indice
    setGuess(""); // A chaque nouveau fetch, on remet a 0 le feedback, le 'guess' de l'user et la visibile de l'indice
    setHintVisible(false); // A chaque nouveau fetch, on remet a 0 le feedback, le 'guess' de l'user et la visibile de l'indice
  };

  // Ici on va fetch le data de tous les champions, classique et on enregistre tous leur names dans 'championNames' grace au Object.keys(data.data)
  const fetchAllChampions = async () => {
    const response = await fetch("api/tousleschampions");
    const data = await response.json();
    // console.log(data);
    const names = Object.keys(data.data);
    // console.log(names);
    setChampionNames(names);
  };

  // le useEffect sert a excecute les fetch seulement quand ils sont prets pas avant, donc la on fetch le random champ grace au back et tous les champions egalement
  useEffect(() => {
    fetchChampionData();
    fetchAllChampions();
  }, []);

  useEffect(() => {
    redirectAfter();
  }, [questionCount]);

  // Ici je check si le guess du user on bon et correspond bien ou meme name dans championData.name
  // c'est pas case sensitive grace a lowercase
  // on met un timeout pour le delay du nouveau pour ne pas refetch d'un coup histoire que ce soit propre
  const handleGuess = () => {
    if (guess.toLowerCase() === championData.name.toLowerCase()) {
      setFeedback("Correct");
      setTimeout(() => {
        if (questionCount < maxQuestions - 1) {
          fetchChampionData();
        }
        setQuestionCount((prevCount) => prevCount + 1);
        console.log(questionCount);
      }, 2000); // On call le fetch pour avoir un nouveau champion
    } else {
      setFeedback(`Incorrect it was ${name}`);
      setQuestionCount((prevCount) => prevCount + 1);
      console.log(questionCount);
        setTimeout(() => {
        fetchChampionData();
      }, 2000);
    }
  };

  const redirectAfter = () => {
    if (questionCount >= maxQuestions) {
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  };

  // Ici on enregistre l'input de user en temps reel, et on ajuste la fonction auto complete
  const handleInputChange = (touche) => {
    // touche en parametre on enregistre les touche tapees
    const input = touche.target.value; // on enregistre les touches dans input
    setGuess(input); // puis on update le 'guess' grace au setGuess(input) qui reprend la const input devant
    if (input) {
      const filteredSuggestions = championNames.filter(
        (
          name // ici on va filtre le noms de tous les champions, on prend name en parametre
        ) => name.toLowerCase().startsWith(input.toLowerCase()) // on le met on lowercase pour matcher le case sensitive au dessus, puis on regard par quoi ca commmece avec startsWith(input.toLowerCase)
      );
      setSuggestions(filteredSuggestions); // on enregistre les suggestions dans suggestions grace aux setSuggestions
    } else {
      setSuggestions([]); // si le filter match rien, les suggestions sont vides par exemple on champion qui commence par les lettres 'df'
    }
  };

  // Ici je gere si l'user clikc sur un suggestion proposer, si oui, ca update le guess avec setGuess et vide les suggestions setSuggestions([])
  const handleSuggestionClick = (suggestions) => {
    console.log(suggestions);
    console.log("test");
    setGuess(suggestions);
    setSuggestions([]);
  };

  if (!championData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        PasdeDataFrerot
      </div>
    );
  }

  const { name, passive } = championData;

  console.log(championData);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <NavBar />
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl text-center">
        <h1 className="text-3xl font-bold mb-6">Champion Guess</h1>
        {/* <h2 className="text-2xl font-semibold mb-4">{name}</h2> */}
        <div className="mb-4">
          <img
            className="mx-auto mb-4 rounded-lg"
            src={`https://ddragon.leagueoflegends.com/cdn/14.11.1/img/passive/${passive.image.full}`}
          />
          <button
            onClick={() => setHintVisible(!hintVisible)}
            className="mt-2 mb-4 px-4 py-2 rounded-lg text-white font-semibold bg-yellow-500 hover:bg-yellow-600"
          >
            {hintVisible ? "Hide Hint" : "Show Hint"}
          </button>
          {hintVisible && (
            <p className="mb-4 text-lg text-gray-700">{passive.name}</p>
          )}
        </div>
        <div className="relative w-full">
          <input
            type="text"
            value={guess}
            onChange={handleInputChange}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleGuess();
              }
            }}
            className="mt-2 mb-4 px-4 py-2 rounded-lg border border-gray-300 w-full"
            placeholder="Enter the champion name"
          />
          {suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded-lg max-h-48 overflow-y-auto">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          onClick={handleGuess}
          className={`mt-2 mb-4 px-4 py-2 rounded-lg text-white font-semibold ${
            guess ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!guess}
        >
          Champion Guess
        </button>
        {feedback && <p className="mt-2 text-lg">{feedback}</p>}
        {/* <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700"
        >
          Fetch another Champion
        </button> */}
      </div>
    </div>
  );
}
