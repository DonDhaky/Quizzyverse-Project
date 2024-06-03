export const greetUser = (name) => {
    console.log("greetUser: ", name);
    return `Hello, ${name}!`;
};

export const setupDailyCount = async(email) => {

  console.log("check...");

  if (checkRenewedAt.is_checked == false) {

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
        console.log("daily_count managed");
        console.log(response);
        console.log(returnedData.message);
        checkRenewedAt.is_checked = true
        if (returnedData.message == "maximum daily_count reached") {
          checkRenewedAt.block_player = true
        }
      } else {
        console.log("There was an error changing the daily_count")
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }

  }

}

export const checkUserDailyCount = async(email) => {
  if (checkRenewedAt.is_checked == false) {await setupDailyCount(email)}
  if (checkRenewedAt.block_player) {alert(checkRenewedAt.block_message) ; return false}
  return true
}

export const checkRenewedAt = {is_checked: false, block_player: false, block_message: "Non premium users can only take 4 quizzes a day. Please try tomorrow or get a premium account."}
