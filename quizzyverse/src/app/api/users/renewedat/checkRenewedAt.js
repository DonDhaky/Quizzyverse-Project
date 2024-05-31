export const greetUser = (name) => {
    console.log("greetUser: ", name);
    return `Hello, ${name}!`;
};

export const setupDailyCount = async(email) => {

  console.log(email);

  const data = {
    email
  }
  try {
    const response = await fetch('/api/users/renewedat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (response.ok) {
      const returnedData = await response.json()
      console.log("daily_count changed");
      console.log(response);
      console.log(returnedData.message);
    } else {
      console.log("There was an error changing the daily_count")
      console.log(response);
    }
  } catch (error) {
    console.log(error);
  }
}

export const checkRenewedAt = {is_checked: false}
  