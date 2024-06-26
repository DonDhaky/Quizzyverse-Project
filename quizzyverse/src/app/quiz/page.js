"use client"

import React, { useState, useEffect } from 'react'
import "./skeleton.css"
import NavBar from "/src/app/components/Navbar"
import { useSession } from 'next-auth/react';
import { checkUserDailyCount } from "/src/app/api/users/renewedat/checkRenewedAt"
import { addXp } from "/src/app/api/users/xp/addXp"



const QuizContainer = () => {


  const [userIsLogged, setUserIsLogged] = useState(false)

  const session = useSession()
  //console.log(session);
  if (session.data != null && userIsLogged === false) {
    console.log(session.data);
    console.log(session.data.user.email);
    console.log(session.status);
    setUserIsLogged(true)

  }

  const [darkMode, setDarkMode] = useState(false)

  const [delayPassed, setDelayPassed] = useState(false)


  const [quizSettings, setQuizSettings] = useState(null)
  const [quizQandA, setQuizQandA] = useState(null)

  //const [myCustomData, setMyCustomData] = useState(null)

  const [showClue, setShowClue] = useState(false)
  const [clue, setClue] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [color, setColor] = useState(null)
  const [myAnswer, setMyAnswer] = useState('')

  const [A, setA] = useState("Answer A")
  const [B, setB] = useState("Answer B")
  const [C, setC] = useState("Answer C")
  const [D, setD] = useState("Answer D")

  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const [isCorrect, setIsCorrect] = useState(null)
  const [message, setMessage] = useState(null)
  const [numOfGoodA, setNumOfGoodA] = useState(0)
  const [numOfReqC, setNumOfReqC] = useState(0)
  const [score, setScore] = useState(0)
  const [maxScore, setMaxScore] = useState(0)

  const [progressiveResults, setProgressiveResults] = useState([])

  const [showResults, setShowResults] = useState(false)

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
        if (data.quizSettings.response_type === 'mcq') {
          setA(data.QandA_array[data.quizSettings.question_number-1][1][0].replaceAll("&#039;", "'"))
          setB(data.QandA_array[data.quizSettings.question_number-1][1][1].replaceAll("&#039;", "'"))
          setC(data.QandA_array[data.quizSettings.question_number-1][1][2].replaceAll("&#039;", "'"))
          setD(data.QandA_array[data.quizSettings.question_number-1][1][3].replaceAll("&#039;", "'"))
        }
    })

    const setQuiz = async() => {
      await getquizSettings()
      //myCustomFetch()
    }
    setQuiz()

    setTimeout(() => {
      setDelayPassed(true)
    }, 2000)

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
      addXp(session.data.user.email, resultsData.score)
    }
    //alert("Number of good answers: "+numberOfGoodAnswers+"\n"+"Number of requested clues: "+numberOfRequestedClues+"\n"+resultsData.score+" / "+resultsData.maxScore)
  }

  //////////
  //BUTTONS

  //BUTTON CLUE
  const handleClue = async() => {
    if (!await checkUserDailyCount(session.data.user.email)) {return}
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

  //BUTTON ANSWER
  const handleResponse = async(event) => {
    event.preventDefault()
    if (!await checkUserDailyCount(session.data.user.email)) {return}
    setIsButtonDisabled(true)
    setShowClue(false)

    console.log(quizSettings.response_type);
    if (quizSettings.response_type === "text") {
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
    } else { //response_type == mcq
      console.log("MCQ");
      console.log(quizSettings.question_number);
      console.log(quizQandA[quizSettings.question_number-1][0]);
      console.log(event.target.innerHTML);
      if (quizQandA[quizSettings.question_number-1][2].toLowerCase().replaceAll("&#039;", "'") === event.target.innerHTML.toLowerCase().replaceAll("&#039;", "'")) {
        console.log("GOOD ANSWER");
        let numberOfGoodAnswers = localStorage.getItem('numberOfGoodAnswers')
        numberOfGoodAnswers = Number(numberOfGoodAnswers)+1
        localStorage.setItem("numberOfGoodAnswers", numberOfGoodAnswers)
        setIsCorrect(true)
        setMessage(event.target.innerHTML+", correct !")
        setColor("green")
        setIsVisible(true)
        setTimeout(() => {
          setIsVisible(false)
        }, 3000)
      } else {
        console.log("BAD ANSWER");
        setIsCorrect(false)
        setMessage(quizQandA[quizSettings.question_number-1][2])
        setColor("red")
        setIsVisible(true)
        setTimeout(() => {
          setIsVisible(false)
        }, 3000)
      }
    }
    setTimeout(() => {
      setMyAnswer('')
      setQuizSettings({...quizSettings, question_number: quizSettings.question_number + 1})
      setIsButtonDisabled(false)

    
      if (quizSettings.question_number == quizSettings.total_number) {
        displayResults()
        //window.location.href = "/"
      }
      if (quizSettings.response_type === "mcq" && quizSettings.question_number != quizSettings.total_number) {
        setA(quizQandA[quizSettings.question_number][1][0].replaceAll("&#039;", "'"))
        setB(quizQandA[quizSettings.question_number][1][1].replaceAll("&#039;", "'"))
        setC(quizQandA[quizSettings.question_number][1][2].replaceAll("&#039;", "'"))
        setD(quizQandA[quizSettings.question_number][1][3].replaceAll("&#039;", "'"))
      }
    }, 4000)
  }

  //BUTTON I DON'T KNOW
  const handlePass = async() => {
    setIsButtonDisabled(true)
    if (!await checkUserDailyCount(session.data.user.email)) {return}
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

  const buttonStyle = {
    border: "solid",
    borderWidth: "1px",
    borderRadius: "10px",
    padding: "5px 15px",
    color: "grey",
    backgroundColor: "#FFD700",
    flex: 1,
    margin: "10px"
  };

  return (
    <>
    <div style={{ minHeight: "100vh", backgroundColor: "#070707", backgroundImage: `url('${quizSettings.imageUrl}')`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center" }} >

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <NavBar />
      </div>
      <br/>
      <div style={{ width: "45%", minHeight: "50vh", margin: "auto", paddingLeft: "20px", paddingRight: "20px", textAlign: 'center', display: "", border: "solid", borderWidth: "2px", borderRadius: "10px", backgroundColor: "#070707ee"}}>

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
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '25vh' }}>
                {delayPassed ? (<h1 style={{ fontSize: '42px' }}>{quizQandA[quizSettings.question_number-1][0].replaceAll("&#039;", "'").replaceAll('&quot;', '"')}</h1>) : null}
                </div>
                <br/>
                <div>
                  <span style={{ fontSize: '32px' }}>&nbsp;<span className={`fade-in ${isVisible ? 'visible' : ''}`} style={{fontSize: '28px', color: color}}>{message}</span>&nbsp;</span>
                </div>
              </>
            )}
            <br/>
            {/*si réponse de type 'text'...*/}
            {quizSettings.response_type === 'text' ? (
              <input style={{width: 300, height: 40, border: "solid", borderWidth: "1px", borderRadius: "10px", marginTop: "20px", marginBottom: "50px", padding: "0 5px"}} placeholder="Try your best!..." value={myAnswer} onChange={(event) => setMyAnswer(event.target.value)} onKeyDown={handleKeyDown} />
            ) : 
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <button style={buttonStyle} value={A} onClick={() => { handleResponse(event); }}><b>{A}</b></button>
                <button style={buttonStyle} onClick={() => { setMyAnswer("Resp_B"); handleResponse(event); }}><b>{B}</b></button>
              </div>
              <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <button style={buttonStyle} onClick={() => { setMyAnswer("Resp_C"); handleResponse(event); }}><b>{C}</b></button>
                <button style={buttonStyle} onClick={() => { setMyAnswer("Resp_D"); handleResponse(event); }}><b>{D}</b></button>
              </div>
            </div>
            }

            <br/>
            {quizSettings.clue_activated ? (
              showClue ? (
                  <span>Clue: {clue}</span>
                  ) : (
                  <button style={{marginRight: "50px", fontStyle: "italic", border: "solid", borderWidth: "1px", borderRadius: "10px", padding: "0 15px"}} onClick={handleClue}>Pay {quizSettings.xpCostPerClue} xp for a clue !</button>
                )
              )
            : (null)}
            {quizSettings.response_type === 'text' ? (<button style={{border: "solid", borderWidth: "1px", borderRadius: "10px", marginRight: "50px", marginBottom: "50px", padding: "5px 15px", fontStyle: "thick", color: "gray", backgroundColor: "#FFD700"}} onClick={handleResponse} disabled={isButtonDisabled}><b>Answer</b></button>) : null}
            <button style={{border: "solid", borderWidth: "1px", borderRadius: "10px", marginBottom: "50px", padding: "5px 15px", fontStyle: "thick", color: "gray", backgroundColor: "#ffffff"}} onClick={handlePass} >I don't know</button>

            <br/>
          </>
        ) : (
          <>
            RESULTS
            <br/><br/>
            <span>Number of good answers: {numOfGoodA}<br/></span>
            {quizSettings.clue_activated ? (<span>Number of requested clues: {numOfReqC}</span>) :null}
            <br/><br/>
            <span>XP earned: {score} / {maxScore}<br/></span>
            <br/><br/>
            <button style={{width: "120px", border: "solid", borderWidth: "1px", borderRadius: "10px", marginLeft: "30px", marginBottom: "50px", padding: "5px 15px", fontStyle: "thick", color: "black", backgroundColor: "DodgerBlue"}} onClick={handleHomeRedirection}><b>Home</b></button>
            <button style={{width: "120px", border: "solid", borderWidth: "1px", borderRadius: "10px", marginLeft: "30px", marginBottom: "50px", padding: "5px 15px", fontStyle: "thick", color: "black", backgroundColor: "DodgerBlue"}} onClick={handleTakeAgain} ><b>Take again</b></button>

          </>
        )}
      </div>
      <br/><br/>
    </div>
    </>
  )
}

export default QuizContainer