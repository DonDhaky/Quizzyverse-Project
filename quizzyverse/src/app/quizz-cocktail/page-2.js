"use client";

import 'tailwindcss/tailwind.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { checkUserDailyCount } from "../api/users/renewedat/checkRenewedAt"

// Thème du quiz
const quizzFlag = "Trouve le pays ou la région qui correspond au drapeau !";

const Page = () => {
    // j'utilise useState pour définir des états de base pour les varaibles venant à être modifiées
    const { data: session } = useSession();
    const [fetchedImage, setFetchedImage] = useState('');
    const [fetchedAnswer, setFetchedAnswer] = useState('');
    const [fetchedTip, setFetchedTip] = useState("");
    const [questionNumber, setQuestionNumber] = useState(1); // Par défaut à 1
    const [showTip, setShowTip] = useState(false);
    const [userAnswer, setUserAnswer] = useState(''); // stockage de la réponse du joueur pour comparer
    const [showResultPopup, setShowResultPopup] = useState(false); // affichage de la pop-up à false par défaut
    const [resultMessage, setResultMessage] = useState(''); // stockage du message de résultat
    const [xpWon, setXpWon] = useState(0); // xp gagnée à incrémenter et à ajouter au user dans la DB ultérieurement
    const [totalXp, setTotalXp] = useState(0); // total XP gagné par le joueur à la fin du quizz

    const router = useRouter();

    console.log(session);

    // J'utilise "useEffect" pour récupérer les données de l'api lors du montage du composant
    useEffect(() => {
        const fetchQuizzData = async () => {
            try {
                const response = await fetch('/api/flags');
                const data = await response.json();

                // Adapter les champs de data selon l'API !!!!
                setFetchedImage(data.flags.png);
                setFetchedAnswer(data.translations.fra.common);
                 setFetchedTip(data.capital ? `Capitale(s) de ce pays : ${data.capital}` : 'Pas d\'indice disponible pour ce pays !');
            } catch (error) {
                console.error(error);
            }
        };
        fetchQuizzData();

        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = 'Si vous rafraîchissez la page, le quizz ne sera pas comptabilisé.';
        };

        const handlePopState = () => {
            confirm('Si vous quittez la page, le quizz ne sera pas comptabilisé et vous serez redirigé vers la page d\'accueil.');
            router.push('/');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('popstate', handlePopState);
        };

    }, [questionNumber, router]);

    const updateXpInDb = async (newXp) => { // pour ajouter l'xp à mon user dans la DB en cas de bonne réponse à la fin
        if (!session) return;

        try {
            const response = await fetch('/api/users/xp-flags', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ xp: newXp }),
            });

            if (!response.ok) {
                throw new Error('Failed to update XP');
            }

            const data = await response.json();
            console.log(data.message);
        } catch (error) {
            console.error(error);
        }
    };

    const validateAnswer = async() => { // bouton de validation de la réponse et affichage du pop-up
        if (!await checkUserDailyCount("arthis@mail.com")) // placer le user actuel avec "UseSession"
        {return};

        let message = '';
        if (userAnswer != '' & userAnswer.trim().toLowerCase() === fetchedAnswer.trim().toLowerCase()) { // pour la sensibilité à la casse
            const newXp = xpWon + 10; // incrémentation de l'XP si la réponse est correcte
            setXpWon(newXp);
            setTotalXp(prevTotalXp => prevTotalXp + 10);

            if (questionNumber >= 5) {
                message = 'Bonne réponse ! Vous avez gagné ' + newXp + ' xp ! Revenez demain ou passez premium pour jouer en illimité !';
                updateXpInDb(newXp); // ajout de l'xp à la db à la fin du quizz
            } else {
                message = 'Bonne réponse ! + 10 xp !';
            }

        } else {

            message = `Mauvaise réponse, c'était ${fetchedAnswer} !`;
            if (questionNumber >= 5) {
                message += ' Vous avez gagné ' + xpWon + ' xp ! Revenez demain ou passez premium pour jouer en illimité !';
                updateXpInDb(xpWon); // ajout de l'xp à la db à la fin du quizz
            }
        }
        setResultMessage(message);
        setShowResultPopup(true);
    };

    const handleNextQuestion = () => { // bouton de validation du pop-up et affichage de la nouvelle question
        if (questionNumber >= 5) {
            router.push('/');
            // ajouter la limitation de réalisation du quizz
        } else {
            setShowResultPopup(false);
            setUserAnswer(''); // reset de la réponse du joueur
            setShowTip(false); // on cache de nouveau l'indice
            setQuestionNumber(prevQuestionNumber => prevQuestionNumber + 1);
        }
    };

    const handleShowTip = () => {
        setShowTip(true); // Met à jour l'état pour afficher l'indice
    };

    return (
        <div className="flex items-center justify-center mt-10 flex-col">
            <h1 className="text-3xl">Quizzyverse</h1>
            <h6 className="mt-10">{quizzCocktail}</h6>
            <div className="container mx-auto p-4">
                <div className="max-w-sm mx-auto bg-white shadow-md rounded-md overflow-hidden">
                    <img src={fetchedImage} alt="Quiz Image" className="w-full h-auto max-w-full max-h-full object-contain" />
                    <div className="text-xl text-center text-black m-3">Question {questionNumber}</div>
                </div>
            </div>
            <input required
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
                        <button 
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" 
                            onClick={handleNextQuestion}
                        >
                            {questionNumber < 5 ? 'Prochaine question' : 'Retourner à l\'accueil'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Page;