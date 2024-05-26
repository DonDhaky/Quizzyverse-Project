"use client"

import React, { useState, useEffect } from 'react'
import "./_skeleton.css"

const QuizContainer = () => {

  const [quizSettings, setquizSettings] = useState(null)

    useEffect(() => {
        const quizName = localStorage.getItem('quizName')
        const getquizSettings = (async() => {
            const response = await fetch(`/api/ressources/${quizName}`)
            const data =  await response.json()
            console.log(data);
            setquizSettings(data.quizSettings)
        })
        getquizSettings()
    }, [])

  const handleClue = () => {
    console.log(quizSettings.clue);
    setquizSettings({...quizSettings, show_clue: true})
  }

  const handleEvent = (event) => {
    // Do something with response
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
         "I'm a freeking text"
         )}
        <br/>
        {/*si réponse de type 'text'...*/}
        {quizSettings.response_type === 'text' && (
          <input style={{width: 300, height: 40, border: "solid", borderWidth: "1px", borderRadius: "10px", marginTop: "20px", marginBottom: "50px", padding: "0 5px"}} placeholder="Try your best!..." />
        )}
        <br/>
        {quizSettings.show_clue === true ? (
            <span>Clue: {quizSettings.clue}</span>
            )
            :
            <button style={{fontStyle: "italic", border: "solid", borderWidth: "1px", borderRadius: "10px", padding: "0 15px"}} onClick={handleClue}>Pay {"{"}clue_price{"}"} xp for a clue !</button>
        }
         <button style={{fontStyle: "italic", border: "solid", borderWidth: "1px", borderRadius: "10px", marginLeft: "50px", marginBottom: "50px", padding: "5px 15px", backgroundColor: "#FFD700"}} onClick={handleClue} >Answer</button>
         <br/>
    </div>
  )
}

export default QuizContainer
