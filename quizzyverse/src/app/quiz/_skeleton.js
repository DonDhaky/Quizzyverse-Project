"use client"

import React, { useState } from 'react'
import "./_skeleton.css"

const QuizContainer = () => {

  const initialValue = {
    quiz_title: "Quiz #",
    question: "Quel est le titre de ce flim / d'où vient ce truc / quoi c'est ça ? etc.",
    question_number: 1,
    total_number: 10,
    type: 'image',
    imageUrl: "https://m.media-amazon.com/images/I/71CsUmAR-GL._SL1500_.jpg",
    imageAlt: "",
    show_clue: false,
    clue: "C'est poilu",
    clue_price: 1,
    response_type: "text",
  }

  const [myState, setMyState] = useState(initialValue)

  //setMyState({imageUrl: 'https://m.media-amazon.com/images/I/71CsUmAR-GL._SL1500_.jpg'});

  const handleClue = () => {
    console.log(initialValue.clue);
    setMyState({...myState, show_clue: true})
  }

  const handleEvent = (event) => {
    // Do something with response
  }

  return (

    <div style={{ textAlign: 'center', display: "" }}>

        {/*rend les components en fonction de ce qu'on décide de mettre dans 'const initialValue'*/}
        <h1 style={{fontSize: '48px'}}>{myState.quiz_title}</h1>
        <br/>
        <h3 style={{fontSize: '24px'}}>{myState.question}</h3>
        <br/>

        {/*si quiz de type 'image'...*/}
        {myState.type === 'image' && (
        <>
            <img style={{ display: 'inline-block' }} src={myState.imageUrl} alt={myState.imageAlt} width={250} height={"auto"} />
            <p>
                <br/><br/>
                Question {myState.question_number} of {myState.total_number}
            </p>
        </>
        )}
        {/*si quiz de type 'text'...*/}
        {myState.type === 'text' && (
         "I'm a freeking text"
         )}
        <br/>
        {myState.response_type === 'text' && (
          <input style={{width: 200, border: "solid", borderWidth: "1px", borderRadius: "10px", marginTop: "20px", marginBottom: "50px", padding: "0 5px"}} placeholder="Try your best..." />
        )}
        <br/>
        {myState.show_clue === true ? (
            <span>Clue: {initialValue.clue}</span>
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
