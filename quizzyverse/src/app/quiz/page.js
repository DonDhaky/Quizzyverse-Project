"use client";

import 'tailwindcss/tailwind.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Thèmes de quiz
const quizzFlag = "Trouve le pays qui correspond au drapeau !";
// const quizzCities = "Dévine la ville à partir de l'image ! (bonne chance)";
// const quizzMovies = "Cher cinéphile, tente de trouver le nom du film à partir de cette image !";
// const quizzOther = "Ce quizz n'a pas été décidé mais bientôt !";

// Initialiser le thème choisi
const quizzTheme = quizzFlag;

const Page = () => {
    // j'utilise useState pour définir des états de base pour les varaibles venant à être modifiées
    const [fetchedImage, setFetchedImage] = useState('');
    const [fetchedAnswer, setFetchedAnswer] = useState('');
    const [fetchedTip, setFetchedTip] = useState("");
    const [questionNumber, setQuestionNumber] = useState(1); // Par défaut à 1
    const [showTip, setShowTip] = useState(false);
    const [userAnswer, setUserAnswer] = useState(''); // stockage de la réponse du joueur pour comparer
    const [showResultPopup, setShowResultPopup] = useState(false); // affichage de la pop-up à false par défaut
    const [resultMessage, setResultMessage] = useState(''); // stockage du message de résultat
    const [xpWon, setXpWon] = useState(0); // xp gagnée à incrémenter et à ajouter au user dans la DB ultérieurement
    const router = useRouter();


    // J'utilise "useEffect" pour récupérer les données de l'api lors du montage du composant
    useEffect(() => {
        const fetchQuizzData = async () => {
            try {
                const response = await fetch('/api/flags');
                const data = await response.json();
                console.log(data);

                // Adapter les champs de data selon l'API !!!!
                setFetchedImage(data.flags.png);
                console.log(data.flags.png);
                setFetchedAnswer(data.translations.fra.common);
                console.log(data.translations.fra.common);
                 setFetchedTip(data.capital ? `Capitale(s) de ce pays : ${data.capital}` : 'Pas d\'indice disponible pour ce pays !');
                console.log(data.capital);
            } catch (error) {
                console.error(error);
            }
        };

        fetchQuizzData();
    }, [questionNumber]);

    const validateAnswer = () => { // bouton de validation de la réponse et affichage du pop-up
        if (userAnswer.trim().toLowerCase() === fetchedAnswer.trim().toLowerCase()) { // pour la sensibilité à la casse
            setXpWon(prevXp => prevXp + 10); // Incrémente l'XP si la réponse est correcte
            setResultMessage('Bonne réponse !');
        } else {
            setResultMessage(`Mauvaise réponse, c'était ${fetchedAnswer} !`);
        }
        setShowResultPopup(true);
    };

    const handleNextQuestion = () => { // bouton de validation du pop-up et affichage de la nouvelle question
        setShowResultPopup(false);
        setUserAnswer(''); // reset de la réponse du joueur
        setShowTip(false); // on cache de nouveau l'indice
        setQuestionNumber(prevQuestionNumber => {
            const nextQuestionNumber = prevQuestionNumber + 1;
            if (nextQuestionNumber > 5) {
                router.push('/'); // créer une page pour afficher les résultats finaux si le compteur atteint 6 OU mettre un POP UP DE FIN
            }
            return nextQuestionNumber;
        });
    };

    const handleShowTip = () => {
        setShowTip(true); // Met à jour l'état pour afficher l'indice
    };

    return (
        <div className="flex items-center justify-center mt-10 flex-col">
            <h1 className="text-3xl">Quizzyverse</h1>
            <h6 className="mt-10">{quizzTheme}</h6>
            <div className="container mx-auto p-4">
                <div className="max-w-sm mx-auto bg-white shadow-md rounded-md overflow-hidden">
                    <img src={fetchedImage} alt="Quiz Image" className="w-full h-auto max-w-full max-h-full object-contain" />
                    <div className="text-xl text-center text-black m-3">Question {questionNumber} sur 5</div>
                </div>
            </div>
            <input 
                name="answer"
                className="text-xl text-center text-black mt-5 w-80 h-10"
                type="text"
                value={userAnswer}
                onChange={e => setUserAnswer(e.target.value)}
            />
            <div className="mt-4">
                <button type="button" className="mr-20" onClick={handleShowTip}>Indice</button>
                <button type="button" className="ml-20" onClick={validateAnswer}>Valider</button>
            </div>
            {showTip && <div className="mt-8">{fetchedTip}</div>}
            {showResultPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="bg-white p-6 rounded shadow-md text-center">
                        <p className="text-black">{resultMessage}</p>
                        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={handleNextQuestion}>
                            Prochaine question
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Page;