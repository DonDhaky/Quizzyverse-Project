"use client"

import React, { useState } from 'react'

const QuizContainer = () => {

  const initialValue = {
    quiz_title: "Quiz #",
    question: "Quel est le titre de ce flim / d'où vient ce truc / quoi c'est ? etc.",
    question_number: 1,
    total_number: 10,
    type: 'image',
    imageUrl: "https://m.media-amazon.com/images/I/71CsUmAR-GL._SL1500_.jpg",
    imageAlt: "",
    show_indice: false,
    indice: "C'est poilu"
  }

  const [myState, setMyState] = useState(initialValue)

  //setMyState({imageUrl: 'https://m.media-amazon.com/images/I/71CsUmAR-GL._SL1500_.jpg'});

  const handleIndice = (event) => {
    console.log(initialValue.indice);
  }

  const handleEvent = (event) => {
    // Do something with response
  }

  return (

    <div style={{ textAlign: 'center' }}>
        {/*rend les components en fonction de ce qu'on décide de mettre dans 'const initialValue'*/}
        <h1 style={{fontSize: '48px'}}>{myState.quiz_title}</h1>
        <h3 style={{fontSize: '24px'}}>{myState.question}</h3>

        {/*si quiz de type 'image'...*/}
        {myState.type === 'image' && (
        <>
            <img style={{ display: 'inline-block' }} src={myState.imageUrl} alt={myState.imageAlt} width={250} height={"auto"} />
            <p>
                <br/>
                Question {myState.question_number} of {myState.total_number}
            </p>
        </>
        )}
        {/*si quiz de type 'text'...*/}
        {myState.type === 'text' && (
         "I'm a freeking text"
         )}
        
        {myState.show_indice === true ? (
            <>
            Clue: {myState.indice}
            </>
            )
            :
            <button style={{fontStyle: "italic"}} onClick={{handleIndice}}>"pay for a clue !"</button>
        }


        {/*si quiz de type 'video'...*/}
    </div>
  )
}

export default QuizContainer
