"use client"

import React, { useState, useEffect } from 'react'
import "./_skeleton.css"

const QuizContainer = () => {

  const [quizSettings, setQuizSettings] = useState(null)
  const [quizQandA, setQuizQandA] = useState(null)

  const [myCustomData, setMyCustomData] = useState(null)

  const [showClue, setShowClue] = useState(false)
  const [clue, setClue] = useState(null)
  const [myAnswer, setMyAnswer] = useState('')

  //const [numberOfGoodAnswers, setNumberOfGoodAnswers] = useState(0);
  let numberOfGoodAnswers = 0;
  let numberOfRequestedClues = 0;

    //voir le contenu de quizSettings dans api/ressources/{quizName}/settings.json

    //fonction réservée aux quiz qui ne fonctionnent pas avec le settings.json seul
    //se servir de quizName comme condition pour exécuter le bon bloc de code
    const myCustomFetch = async () => {
        //if (quizName === "MyVeryOwnQuiz") {
            //fetch...
            //setMyCustomData()
            //return data
        //}
        //if (quizName === "MyOtherVeryOwnQuiz") {
            //fetch...
            //setMyCustomData()
            //return data
        //}
    }


  useEffect(() => {
      const quizName = localStorage.getItem('quizName')
      localStorage.setItem("numberOfGoodAnswers", 0);
      localStorage.setItem("numberOfRequestedClues", 0);
      const getquizSettings = (async() => {
          const response = await fetch(`/api/ressources/${quizName}`)
          const data =  await response.json()
          console.log(data);
          //initialise le data du quiz ICI:
          setQuizSettings(data.quizSettings)
          setQuizQandA(data.QandA_array)
      })
      getquizSettings()
      //myCustomFetch()
  }, [])

  const handleClue = () => {
    console.log(quizSettings.clue);
    setClue(quizQandA[quizSettings.question_number-1][1][0]+"..."+quizQandA[quizSettings.question_number-1][1][quizQandA[quizSettings.question_number-1][1].length-1])
    /*if (quizSettings.show_clue === false) {
      setQuizSettings({...quizSettings, show_clue: true})
    }*/
    let numberOfRequestedClues = localStorage.getItem('numberOfRequestedClues')
    numberOfRequestedClues = Number(numberOfRequestedClues)+1
    localStorage.setItem("numberOfRequestedClues", numberOfRequestedClues)
    setShowClue(true)
  }

  const handleResponse = async(event) => {
    event.preventDefault()
      setShowClue(false)
      if (quizQandA[quizSettings.question_number-1][1].toLowerCase() === myAnswer.toLowerCase()) {
        //setNumberOfGoodAnswers(count + 1)
        let numberOfGoodAnswers = localStorage.getItem('numberOfGoodAnswers')
        numberOfGoodAnswers = Number(numberOfGoodAnswers)+1
        localStorage.setItem("numberOfGoodAnswers", numberOfGoodAnswers)
        alert(myAnswer+", correct !"+"\n"+numberOfGoodAnswers+"/"+quizSettings.total_number+" corrects")
      } else {
        alert("Nope... "+quizQandA[quizSettings.question_number-1][1]+", not "+myAnswer+"...")
      }
      setMyAnswer('')
      setQuizSettings({...quizSettings, question_number: quizSettings.question_number + 1})
      if (quizSettings.question_number == quizSettings.total_number) {
        let numberOfGoodAnswers = localStorage.getItem('numberOfGoodAnswers')
        let numberOfRequestedClues = localStorage.getItem('numberOfRequestedClues')
        const resultsData = {
          maxScore: (quizSettings.total_number * quizSettings.xpPerGoodAnswer),
          score: (numberOfGoodAnswers * quizSettings.xpPerGoodAnswer) - (numberOfRequestedClues * quizSettings.xpCostPerClue)
        }
        alert("Number of good answers: "+numberOfGoodAnswers+"\n"+"Number of requested clues: "+numberOfRequestedClues+"\n"+resultsData.score+" / "+resultsData.maxScore)
          window.location.href = "/"
      }
    }

  if (!quizSettings) {
    return <div>Loading...</div>;
  }

  return (
    
    <div style={{ width: "45%", margin: "auto", paddingLeft: "20px", paddingRight: "20px", textAlign: 'center', display: "", border: "solid", borderWidth: "2px", borderRadius: "10px" }}>

        {/*rend les components en fonction de ce qu'on décide de mettre dans 'const quizSettings'*/}
        <br/>
        <h1 style={{fontSize: '48px'}}>{quizSettings.quiz_title}</h1>
        <br/>
        <br/>
        <h3 style={{fontSize: '24px'}}>{quizSettings.question}</h3>
        <br/>
        <br/>
        {/*si quiz de type 'image'...*/}
        {quizSettings.type === 'image' && (
          <>
              <img style={{ display: 'inline-block' }} src={quizSettings.imageUrl} alt={quizSettings.imageAlt} width={250} height={"auto"} />
              <p>
                  <br/><br/>
                  Question {quizSettings.question_number} of {quizSettings.total_number}
              </p>
          </>
        )}
        {/*si quiz de type 'text'...*/}
        {quizSettings.type === 'text' && (
          <>
            <h1 style={{ fontSize: '48px' }}>{quizQandA[quizSettings.question_number-1][0]}</h1>
            <br/><br/>
            Question {quizSettings.question_number} of {quizSettings.total_number}
          </>
         )}
        <br/>
        {/*si réponse de type 'text'...*/}
        {quizSettings.response_type === 'text' && (
          <input style={{width: 300, height: 40, border: "solid", borderWidth: "1px", borderRadius: "10px", marginTop: "20px", marginBottom: "50px", padding: "0 5px"}} placeholder="Try your best!..." value={myAnswer} onChange={(event) => setMyAnswer(event.target.value)} />
        )}
        <br/>
        {showClue === true ? (
            <span>Clue: {clue}</span>
            ) : (
            <button style={{fontStyle: "italic", border: "solid", borderWidth: "1px", borderRadius: "10px", padding: "0 15px"}} onClick={handleClue}>Pay {"{"}clue_price{"}"} xp for a clue !</button>
          )
        }
         <button style={{fontStyle: "italic", border: "solid", borderWidth: "1px", borderRadius: "10px", marginLeft: "50px", marginBottom: "50px", padding: "5px 15px", fontStyle: "thick", color: "gray", backgroundColor: "#FFD700"}} onClick={handleResponse} >Answer</button>
         <br/>
    </div>
  )
}

export default QuizContainer
