import {NextResponse} from "next/server"
import quizSettings from "./settings.json"

////////////////////////////////////////////////////////////////////////
// trigger getData -> fetchAPIData and send quiz questions/answers back
export async function GET(request, context){


    const QandA_array = await getData()
    //const QandA_array_str = JSON.stringify(QandA_array)


    return NextResponse.json({
        quizSettings,
        QandA_array
    });
}

/*//////////
Below, functions are nested:

getData()
    fetchAPIData()

*/

////////////////////////////
// fetch whole api data
const fetchAPIData = async() => {
    console.log("   fetchAPIData()");
    try {
        const response = await fetch(quizSettings.api_path, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        });

        if (!response.ok) {
        console.log("===> BAD RESPONSE ",response);
        throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // or response.text(), response.blob(), etc.
        //console.log("===> RESPONSE:", response);
        //console.log(eval(quizSettings.response_obj));
        return JSON.stringify(eval(quizSettings.response_obj))
    } catch (error) {
        console.error('Fetch failed: ', error);
    }
}

let myStringObj = ""
let myObj = {}
const getData = async() => {
    console.log("getData()")

    ///// fetches db if not already done /////
    //if (!showDiv) {
      myStringObj = await fetchAPIData()
      console.log("suite...");
    //}
    console.log("===> myStringObj\n", myStringObj);

    ///// here myObj get birth /////
    if (myStringObj !== "") {
      myObj = JSON.parse(myStringObj)
      console.log("\nMYSTRINGOBJ PARSED:\n", myObj);

      ///// makes myObj (the db) available in the return() /////

        const numberOfEntries = myObj[1].length // ...the 2nd (index [1]) = 296 entries
        console.log("!!!", numberOfEntries);
        let randomIndex = -1

      ///// chose a random valid entry (not empty) /////
      const QandA_array = []
      const findValidEntries = async() => {
        // text still in its semi-hardcoded version (capital quizz)
        if (quizSettings.response_type === "text") {
          console.log("findValidEntries()");
          let isValid = false
          while (QandA_array.length < 10) {
            randomIndex = Math.floor(Math.random() * numberOfEntries)
            isValid = false //is valid if choosen response field from api object is not empty
            if (myObj[1][randomIndex].capitalCity.length > 0) {
              console.log(":");
              console.log(myObj[1][randomIndex].name, "-", myObj[1][randomIndex].capitalCity);
              console.log("CHOOSEN:", myObj[1][randomIndex].name, "-", myObj[1][randomIndex].capitalCity);
              ///// makes randomIndex available in the return() /////
              //setDisplayRandomIndex(randomIndex)
              isValid = true
            }
            if (isValid) {
              const duplet = [myObj[1][randomIndex].name, myObj[1][randomIndex].capitalCity]
              const index = QandA_array.findIndex(arr => arr.toString() === duplet.toString());
              console.log("Q&A INDEX:", index);
              if (index === -1) {
                QandA_array.push([myObj[1][randomIndex].name, myObj[1][randomIndex].capitalCity])
                console.log("pushed");
                console.log(QandA_array.length);
              }
            }
          }
          console.log("exiting findValidEntries()...");
          return 0

        } else {

          console.log("=========================ELSE MCQ=========================");
          console.log(myObj[0].question);
          console.log(myObj[0].correct_answer);
          console.log(myObj[0].incorrect_answers[0]);
          for (let i = 0 ; i < myObj.length ; i++) {
            const arr = [myObj[i].correct_answer, myObj[i].incorrect_answers[0], myObj[i].incorrect_answers[1], myObj[i].incorrect_answers[2]]
            const randomIndexes = []
            let j
            while (randomIndexes.length < 4) {
              j = Math.floor(Math.random()*4)
              if (randomIndexes.indexOf(j) === -1) {randomIndexes.push(j)}
            }
            console.log("RANDOM_INDEXES:", randomIndexes);
            const shuffled_array = [arr[randomIndexes[0]], arr[randomIndexes[1]], arr[randomIndexes[2]], arr[randomIndexes[3]]]
            QandA_array.push([myObj[i].question, shuffled_array, myObj[i].correct_answer])
          }
          console.log("QANDA ARRAY:", QandA_array);
        }
      }
      findValidEntries()
      console.log("END OF GET DATA");
      console.log(QandA_array);
      console.log(randomIndex);

      return QandA_array
    }
}// end getData()



  // checks if an object is empty.
  /*
  function isEmpty(obj) {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }
    return true;
  }
  */
