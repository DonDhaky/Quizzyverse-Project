import { useState, useEffect } from 'react'

const MyPage = () => {

  //const [myStringObj, setMyStringObj] = useState("")
  const [isFetchDone, setIsFetchDone] = useState(false) //avoid numerous fetch requests beyond control (limits to 1)
  const [displayMyObj, setDisplayMyObj] = useState({})
  const [showDiv, setShowDiv] = useState(false)
  const [displayRandomIndex, setDisplayRandomIndex] = useState(null)

  const [displayCountryName, setDisplayCountryName] = useState("")
  const [displayCountryCapitalCity, setDisplayCountryCapitalCity] = useState("")

  const [displayCountriesAndCapitals, setDisplayCountriesAndCapitals] = useState(null)


  // fetch whole countries db
  const fetchCountries = async() => {
    console.log("   fetchCountries()");
    try {
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://api.worldbank.org/v2/country/?format=json&per_page=296')}`, {
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
      return data.contents
    } catch (error) {
      console.error('Fetch failed: ', error);
    }
  }

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



  let myStringObj = ""
  let myObj = {}
  const getData = async() => {
    console.log("getData()")

    ///// fetches db if not already done /////
    if (!showDiv) {
      myStringObj = await fetchCountries()
      console.log("suite...");
    }
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
          isValid = false
          if (myObj[1][randomIndex].capitalCity.length > 0) {
            console.log(":");
            console.log(myObj[1][randomIndex].name, "-", myObj[1][randomIndex].capitalCity);
            console.log("CHOOSEN:", myObj[1][randomIndex].name, "-", myObj[1][randomIndex].capitalCity);
            ///// makes randomIndex available in the return() /////
            setDisplayRandomIndex(randomIndex)
            isValid = true
          }
          if (isValid) {
            if (QandA_array.indexOf([myObj[1][randomIndex].name, myObj[1][randomIndex].capitalCity]) === -1) {
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
      setDisplayMyObj(myObj) // here, 2 entries...
      setDisplayCountryName(myObj[1][randomIndex].name)
      setDisplayCountryCapitalCity(myObj[1][randomIndex].capitalCity)
      setDisplayCountriesAndCapitals(QandA_array);
      console.log(displayCountryName);
      console.log(displayCountryCapitalCity);

      setShowDiv(true)
    }
  }// end getData()

  if (myStringObj === "") {
    getData()
    console.log(myStringObj)
  }
}
