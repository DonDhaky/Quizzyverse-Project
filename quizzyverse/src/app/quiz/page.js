"use client";

import 'tailwindcss/tailwind.css';
import React, { useState, useEffect } from 'react';

// Thèmes de quiz
const quizzFlag = "Trouve le pays qui correspond au drapeau !";
// const quizzCities = "Dévine la ville à partir de l'image ! (bonne chance)";
// const quizzMovies = "Cher cinéphile, tente de trouver le nom du film à partir de cette image !";
// const quizzOther = "Ce quizz n'a pas été décidé mais bientôt !";

// Initialiser le thème choisi
const quizzTheme = quizzFlag;

const Page = () => {
    const [fetchedImage, setFetchedImage] = useState('');
    const [fetchedAnswer, setFetchedAnswer] = useState('');
    const [fetchedTip, setFetchedTip] = useState("");
    const [questionNumber, setQuestionNumber] = useState(3); // Par défaut à 3, peut être modifié selon le besoin

    // J'utilise "useEffect" pour récupérer les données de l'api lors du montage du composant
    useEffect(() => {
        const fetchQuizzData = async () => {
            try {
                const response = await fetch('/api/flags');
                const data = await response.json();
                // Adapter les champs de data selon les informations récupérées de votre API
                setFetchedImage(data[0].flags.png);
                console.log(data[0].flags.png);
                setFetchedAnswer(data[0].name.common);
                setFetchedTip(data[0].capital ? `La capitale est ${data[0].capital[0]}` : 'Pas d\'indice disponible');
            } catch (error) {
                console.error('Error while trying to fetch quizz data', error);
            }
        };

        fetchQuizzData();
    }, []);

    const validateAnswer = () => {
        console.log("validateAnswer"); // Définir la logique de validation ici
    };

    const showTip = () => {
        console.log("showTip"); // Définir la logique d'affichage des indices ici
        setFetchedTip(fetchedTip); // Exemple pour afficher l'indice
    };

    return (
        <div className="flex items-center justify-center mt-10 flex-col">
            <h1 className="text-3xl">Quizzyverse</h1>
            <h6 className="mt-10">{quizzTheme}</h6>
            <div className="container mx-auto p-4">
                <div className="max-w-sm mx-auto bg-white shadow-md rounded-md overflow-hidden">
                    <img src={fetchedImage} alt="Quiz Image" className="w-full h-auto max-w-full max-h-full object-contain" />
                    <div className="text-xl text-center text-black m-3">Question {questionNumber} sur 10</div>
                </div>
            </div>
            <input name="answer" className="text-xl text-center text-black mt-5 w-80 h-10" type="text"></input>
            <div className="mt-4">
                <button type="button" className="mr-20" onClick={showTip}>Indice</button>
                <button type="button" className="ml-20" onClick={validateAnswer}>Valider</button>
            </div>
            <div className="mt-8">{fetchedTip}</div>
        </div>
    );
}

export default Page;