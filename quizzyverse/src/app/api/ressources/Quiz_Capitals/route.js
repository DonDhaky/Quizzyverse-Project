import {NextResponse} from "next/server"
import quizSettings from "./settings.json"

export async function GET(request, context){


    const QandA_array = await getData()
    //const QandA_array_str = JSON.stringify(QandA_array)


    return NextResponse.json({
        quizSettings,
        QandA_array
    });
}

/*//////////
Ci-dessous:

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
        console.log("===> RESPONSE ",response);
        throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // or response.text(), response.blob(), etc.
        console.log("===> RESPONSE:", response);
        return eval(quizSettings.response_obj)
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
      console.log("!!!",myObj);

      ///// makes myObj (the db) available in the return() /////

        const numberOfEntries = myObj[1].length // ...the 2nd (index [1]) = 296 entries
        console.log("!!!", numberOfEntries);
        let randomIndex = -1

      ///// chose a random valid entry (not empty) /////
      const QandA_array = []
      const findValidEntries = async() => {
        console.log("findValidEntries()");
        let isValid = false
        while (QandA_array.length < 10) {
          randomIndex = Math.floor(Math.random() * numberOfEntries)
          isValid = false //is valid if capital field not empty
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
      }
      findValidEntries()

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
