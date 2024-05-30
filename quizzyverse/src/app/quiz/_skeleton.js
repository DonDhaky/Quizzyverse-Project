"use client"

import React, { useState, useEffect } from 'react'
import "./_skeleton.css"

const QuizContainer = () => {

  const [quizSettings, setQuizSettings] = useState(null)
  const [quizQandA, setQuizQandA] = useState(null)

  const [myCustomData, setMyCustomData] = useState(null)

  const [showClue, setShowClue] = useState(false)
  const [clue, setClue] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [color, setColor] = useState(null)
  const [myAnswer, setMyAnswer] = useState('')

  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const [isCorrect, setIsCorrect] = useState(null)
  const [message, setMessage] = useState(null)
  const [numOfGoodA, setNumOfGoodA] = useState(0)
  const [numOfReqC, setNumOfReqC] = useState(0)
  const [score, setScore] = useState(0)
  const [maxScore, setMaxScore] = useState(0)

  const [progressiveResults, setProgressiveResults] = useState([])

  const [showResults, setShowResults] = useState(false)

  //const [numberOfGoodAnswers, setNumberOfGoodAnswers] = useState(0);
  //let numberOfGoodAnswers = 0;
  //let numberOfRequestedClues = 0;

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

    const setQuiz = async() => {
      await getquizSettings()
      //myCustomFetch()
    }
    setQuiz()
  }, [])


  const displayResults = () => {
    let numberOfGoodAnswers = localStorage.getItem('numberOfGoodAnswers')
    let numberOfRequestedClues = localStorage.getItem('numberOfRequestedClues')
    const resultsData = {
      maxScore: (quizSettings.total_number * quizSettings.xpPerGoodAnswer),
      score: (numberOfGoodAnswers * quizSettings.xpPerGoodAnswer) - (numberOfRequestedClues * quizSettings.xpCostPerClue)
    }
    if (resultsData.score < 0) {
      resultsData.score = 0
    }
    setNumOfGoodA(numberOfGoodAnswers)
    setNumOfReqC(numberOfRequestedClues)
    setScore(resultsData.score)
    setMaxScore(resultsData.maxScore)
    setShowResults(true)
    if (resultsData.score > 0){
      addXP("arthis@mail.com", resultsData.score)
    }
    //alert("Number of good answers: "+numberOfGoodAnswers+"\n"+"Number of requested clues: "+numberOfRequestedClues+"\n"+resultsData.score+" / "+resultsData.maxScore)
  }

  const addXP = async(email, xp) => {

    console.log(email);
    console.log(xp);

    const data = {
      email,
      xp
    }
    try {
      const response = await fetch('/api/users/xp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      if (response.ok) {
        console.log("Xp added");
        console.log(response);
      } else {
        console.log("There was an error adding the xp")
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }

  }

  //////////
  //BUTTONS
  const handleClue = () => {
    //console.log(quizSettings.clue);
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
    setIsButtonDisabled(true)
    setShowClue(false)
    if (quizQandA[quizSettings.question_number-1][1].toLowerCase() === myAnswer.toLowerCase()) {
      //setNumberOfGoodAnswers(count + 1)
      let numberOfGoodAnswers = localStorage.getItem('numberOfGoodAnswers')
      numberOfGoodAnswers = Number(numberOfGoodAnswers)+1
      localStorage.setItem("numberOfGoodAnswers", numberOfGoodAnswers)
      //alert(myAnswer+", correct !"+"\n"+numberOfGoodAnswers+"/"+quizSettings.total_number+" corrects")
      setIsCorrect(true)
      setMessage(myAnswer+", correct !")
      setColor("green")
      setIsVisible(true)
      setTimeout(() => {
        setIsVisible(false)
      }, 3000)
    } else {
      setIsCorrect(false)
      setMessage("Nope... "+quizQandA[quizSettings.question_number-1][1]+", too bad!")
      setColor("red")
      setIsVisible(true)
      setTimeout(() => {
        setIsVisible(false)
      }, 3000)
      //alert("Nope... "+quizQandA[quizSettings.question_number-1][1]+", not "+myAnswer+"...")
    }
    setTimeout(() => {
      setMyAnswer('')
      setQuizSettings({...quizSettings, question_number: quizSettings.question_number + 1})
      setIsButtonDisabled(false)
    
      if (quizSettings.question_number == quizSettings.total_number) {
        displayResults()
        //window.location.href = "/"
      }
    }, 4000)
  }

  const handlePass = () => {
    setIsButtonDisabled(true)
    let numberOfGoodAnswers = localStorage.getItem('numberOfGoodAnswers')
    //alert("The answer was "+quizQandA[quizSettings.question_number-1][1]+", too bad !"+"\n"+numberOfGoodAnswers+"/"+quizSettings.total_number+" corrects")
    setIsCorrect(false)
    setMessage("The answer was "+quizQandA[quizSettings.question_number-1][1])
    setColor("red")
    setIsVisible(true)
    setTimeout(() => {
      setIsVisible(false)
    }, 3000)
    setTimeout(() => {
      setMyAnswer('')
      setShowClue(false)
      setQuizSettings({...quizSettings, question_number: quizSettings.question_number + 1})
      setIsButtonDisabled(false)
      if (quizSettings.question_number == quizSettings.total_number) {
        displayResults()
        //
      }
    }, 4000)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleResponse(event)
    }
  }

  const handleHomeRedirection = () => {
    window.location.href = "/"
  }

  const handleTakeAgain = () => {
    window.location.href = "/quiz"
  }


  //////////
  //LOADING
  if (!quizSettings) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <br/><br/>
    <div style={{ width: "45%", margin: "auto", paddingLeft: "20px", paddingRight: "20px", textAlign: 'center', display: "", border: "solid", borderWidth: "2px", borderRadius: "10px" }}>

      {/*rend les components en fonction de ce qu'on décide de mettre dans 'const quizSettings'*/}
      <br/>
      <h1 style={{fontSize: '48px'}}>{quizSettings.quiz_title}</h1>
      <br/>
      {showResults === false ? (
        <>
          Question {quizSettings.question_number} of {quizSettings.total_number}
          <br/><br/>
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
              <br/>
              <div>
                <span style={{fontSize: '28px'}}>&nbsp;<span className={`fade-in ${isVisible ? 'visible' : ''}`} style={{fontSize: '28px', color: color}}>{message}</span>&nbsp;</span>
              </div>
            </>
          )}
          <br/>
          {/*si réponse de type 'text'...*/}
          {quizSettings.response_type === 'text' && (
            <input style={{width: 300, height: 40, border: "solid", borderWidth: "1px", borderRadius: "10px", marginTop: "20px", marginBottom: "50px", padding: "0 5px"}} placeholder="Try your best!..." value={myAnswer} onChange={(event) => setMyAnswer(event.target.value)} onKeyDown={handleKeyDown} />
          )}
          <br/>
          {showClue === true ? (
              <span>Clue: {clue}</span>
              ) : (
              <button style={{fontStyle: "italic", border: "solid", borderWidth: "1px", borderRadius: "10px", padding: "0 15px"}} onClick={handleClue}>Pay {quizSettings.clue_price} xp for a clue !</button>
            )
          }
          <button style={{border: "solid", borderWidth: "1px", borderRadius: "10px", marginLeft: "50px", marginBottom: "50px", padding: "5px 15px", fontStyle: "thick", color: "gray", backgroundColor: "#FFD700"}} onClick={handleResponse} disabled={isButtonDisabled}><b>Answer</b></button>
          <button style={{border: "solid", borderWidth: "1px", borderRadius: "10px", marginLeft: "50px", marginBottom: "50px", padding: "5px 15px", fontStyle: "thick", color: "gray", backgroundColor: "#ffffff"}} onClick={handlePass} >I don't know</button>
          <br/>
        </>
      ) : (
        <>
          RESULTS
          <br/><br/>
          <span>Number of good answers: {numOfGoodA}<br/></span>
          <span>Number of requested clues: {numOfReqC}<br/><br/></span>
          <span>XP earned: {score} / {maxScore}<br/></span>
          <br/><br/>
          <button style={{width: "120px", border: "solid", borderWidth: "1px", borderRadius: "10px", marginLeft: "30px", marginBottom: "50px", padding: "5px 15px", fontStyle: "thick", color: "black", backgroundColor: "DodgerBlue"}} onClick={handleHomeRedirection}><b>Home</b></button>
          <button style={{width: "120px", border: "solid", borderWidth: "1px", borderRadius: "10px", marginLeft: "30px", marginBottom: "50px", padding: "5px 15px", fontStyle: "thick", color: "black", backgroundColor: "DodgerBlue"}} onClick={handleTakeAgain} ><b>Take again</b></button>

        </>
      )}
    </div>
    </>
  )
}

export default QuizContainer
