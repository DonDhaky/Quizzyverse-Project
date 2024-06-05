"use client";

import 'tailwindcss/tailwind.css';
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { checkUserDailyCount } from "../api/users/renewedat/checkRenewedAt"

const quizzCocktail = "Guess the name of the cocktail from the picture !";

const Page = () => {
  const { data: session } = useSession();
  const [fetchedImage, setFetchedImage] = useState('');
  const [fetchedAnswer, setFetchedAnswer] = useState('');
  const [fetchedTip, setFetchedTip] = useState("");
  const [questionNumber, setQuestionNumber] = useState(1);
  const [showTip, setShowTip] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [xpWon, setXpWon] = useState(0);
  const [totalXp, setTotalXp] = useState(0);

  console.log(session);
  const router = useRouter();

  const fetchQuizzData = useCallback(async () => {
    try {
      const response = await fetch('/api/cocktails');
      const data = await response.json();
      console.log(data);

      const ingredients = Object.keys(data)
        .filter(key => key.startsWith('strIngredient') && data[key])
        .map(key => data[key]);
      setFetchedImage(data.strDrinkThumb);
      setFetchedAnswer(data.strDrink);
      setFetchedTip(ingredients.join(', '));
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchQuizzData();

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = 'If you refresh the page, the quizz wont be compatible.';
    };

    const handlePopState = () => {
      confirm('If you leave the page, the quiz will not be counted and you will be redirected to the \home page.');
      router.push('/');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };

  }, [questionNumber, router, fetchQuizzData]);

  const validateAnswer = useCallback(async (event) => {
    if (!await checkUserDailyCount("arthis@mail.com")) {
      return;
    }

    let message = '';
    if (userAnswer != '' & userAnswer.trim().toLowerCase() === fetchedAnswer.trim().toLowerCase()) {
      const newXp = xpWon + 10;
      setXpWon(newXp);
      setTotalXp(prevTotalXp => prevTotalXp + 10);

      if (questionNumber >= 5) {
        message = 'Right answer ! You have won' + newXp + ' xp ! Come back tomorrow or upgrade to unlimited play !';
      } else {
        message = 'Right answer ! + 10 xp !';
      }

    } else {

      message = `Wrong answer, it was ${fetchedAnswer} !`;
      if (questionNumber >= 5) {
        message += ' You have won ' + xpWon + ' xp ! Come back tomorrow or upgrade to unlimited play !';
      }
    }
    setResultMessage(message);
    setShowResultPopup(true);
  }, [userAnswer, fetchedAnswer, xpWon, questionNumber, totalXp]);

  const handleNextQuestion = useCallback(() => {
    if (questionNumber >= 5) {
      router.push('/');
    } else {
      setShowResultPopup(false);
      setUserAnswer('');
      setShowTip(false);
      setQuestionNumber(prevQuestionNumber => prevQuestionNumber + 1);
    }
  }, [questionNumber, router]);

  const handleShowTip = useCallback(() => {
    setShowTip(true);
  }, []);
// valier en cliquant sur entree
  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      validateAnswer();
    }
  }, [validateAnswer]);

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
      <input
        required
        name="answer"
        className="text-xl text-center text-black mt-5 w-80 h-10"
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="mt-4">
        <button type="button" className="mr-20" onClick={handleShowTip}>Tips</button>
        <button type="button" className="ml-20" onClick={validateAnswer}>Enter</button>
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
              {questionNumber < 5 ? 'Next question' : 'Return to \home page'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
