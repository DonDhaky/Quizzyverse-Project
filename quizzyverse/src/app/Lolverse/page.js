'use client'

import React, { useState, useEffect } from 'react';
import NavBar from '../components/Navbar';

export default function Home() {
  const [championData, setChampionData] = useState(null);
  const [championNames, setChampionNames] = useState([]);
  const [guess, setGuess] = useState(null);
  const [hintVisible, setHintVisible] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [suggestions, setSuggestions] = useState([]);

    const fetchChampionData = async () => {
      const response = await fetch('api/champions');
      const data = await response.json();
      setChampionData(data);
      setFeedback('');
      setGuess('');
      setHintVisible(false);
    };

    const fetchAllChampions = async () => {
      const response = await fetch('https://ddragon.leagueoflegends.com/cdn/14.11.1/data/en_US/champion.json');
      const data = await response.json();
      const names = Object.keys(data.data);
      setChampionNames(names);
    };

    useEffect(() => {
      fetchChampionData();
      fetchAllChampions();
    }, []);

  const handleGuess = () => {
    if (guess.toLowerCase() === championData.name.toLowerCase()) {
      setFeedback('Correct');
      setTimeout(fetchChampionData, 2000);
    } 
    else {
      setFeedback('Incorrect');
    }
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setGuess(input);
    if (input) {
      const filteredSuggestions = championNames.filter((name) =>
        name.toLowerCase().startsWith(input.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setGuess(suggestion);
    setSuggestions([]);
  };

  if (!championData) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">PasdeDataFrerot</div>
  }

  const {name, passive} = championData;

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
          <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 max-h-48 overflow-y-auto">
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
        <button
          onClick={handleGuess}
          className="mt-2 mb-4 px-4 py-2 rounded-lg text-white font-semibold bg-green-600 hover:bg-green-700"
        >
          Champion Guess
        </button>
        {feedback && <p className="mt-2 text-lg">{feedback}</p>}
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700"
        >
          Fetch another Champion
        </button>
      </div>
    </div>
  );
}
