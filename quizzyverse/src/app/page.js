"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import NavBar from "./components/Navbar";
import { Libre_Franklin } from "next/font/google";

const handleQuiz = (event) => {
  console.log(event);
  let quizName = event.target.innerHTML.replaceAll(" ", "_")
  console.log(quizName);
  localStorage.setItem('quizName', quizName)
  window.location.href = "/quiz"
}

export default function Home() {
  
  const [customQuizList, setCustomQuizList] = useState([])
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchDirectoryList = async () => {
      try {
        const response = await fetch('/api');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCustomQuizList(data.directories);
      } catch (error) {
        console.error('Error fetching directory list:', error);
      }
    };

    fetchDirectoryList();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <NavBar/>
      <section className="flex flex-col justify-center items-center h-screen">
        <Link href='/Lolverse' className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 m-5">
          Start Quiz
        </Link>
        {/* <Link href='/client/admin' className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 m-5">
          Start admin
        </Link> */}
        <Link href='/quizz-flag' target="_blank" className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 m-5">
          Start Quiz Flag
        </Link>
        <Link href='/quizz-cocktail' className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 m-5">
          Start Quiz Cocktail
        </Link>
        {customQuizList.map((quiz, index) => (
          <button key={index} className="bg-violet-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 m-5" onClick={(event) => handleQuiz(event)}>{customQuizList[index].replaceAll('_', ' ')}</button>
        ))}
      </section>
    </main>
  );
}


/*
//To see elements stored in localStorage using browser console:
for (var i = 0; i < localStorage.length; i++){
    console.log(localStorage.key(i) + ":");
    console.log(localStorage.getItem(localStorage.key(i)));
    console.log("\n");
}
*/
