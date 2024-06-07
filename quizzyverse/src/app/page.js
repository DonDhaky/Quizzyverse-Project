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
  //const [background, setBackground] = useState('https://i.ibb.co/v1FsGWW/liquid-art-painting-texture-background-abstract-watercolor-paint-background-dark-blue-color-grunge-t.jpg')
  //const [background, setBackground] = useState('https://i.ibb.co/DKDs6pj/pastel-orange-hb1533cinpdw33lm.jpg')
  //const [background, setBackground] = useState('https://i.ibb.co/2ddjMjC/abstract-background-with-blue-yellow-and-orange-paint-in-water-with-ai-generated-free-photo.jpg')
  //const [background, setBackground] = useState('https://i.ibb.co/C9DGyym/1000-F-178852830-Dv5s-Yjrp4-Lur-PGKIrx1n-HYnoo-IEn-KJb-N.jpg')
  //const [background, setBackground] = useState('https://i.ibb.co/87p33jm/66228630-background-in-jackson-s-pollock-style-old-paint-on-the-wall-of-white-color-texture-bedraggl.jpg')
  //const [background, setBackground] = useState('https://i.ibb.co/Pm1VTcD/wp2190608.jpg')
  const [background, setBackground] = useState('https://i.ibb.co/r2gzR2z/clean-clean-background-blur-green.jpg')

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
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-4" style={{ minHeight: "100vh", backgroundColor: "#070707", backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center" }}>
      <NavBar/>
      <section className="flex flex-col justify-center items-center h-screen">
        <Link href='/Lolverse' className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 m-5">
          Start Quiz
        </Link>
        <Link href='/quizz-flag' target="_blank" className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 m-5">
          Start Quiz Flag
        </Link>
        <Link href='/quizz-cocktail' className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 m-5">
          Start Quiz Cocktail
        </Link>
        <br/>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
          {customQuizList.map((quiz, index) => (
            <button key={index} className="bg-violet-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 m-5" onClick={(event) => handleQuiz(event)}>{customQuizList[index].replaceAll('_', ' ')}</button>
          ))}
        </div>
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
