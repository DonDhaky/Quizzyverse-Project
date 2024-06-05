export const addXp = async(email, xp) => {

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
