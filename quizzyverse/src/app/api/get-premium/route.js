import MySQLAdapter from '../../../../lib/next-auth-mysql-adapter';

async function updateUserToPremium(req) {
  if (req.method === 'POST') {
    try {
      const { email } = await req.json();
      console.log("Email récupéré dans le back : ", email);
      const result = await MySQLAdapter.updateUserToPremium(email);
      if (result.affectedRows > 0) {
        console.log("User is now premium !");
        return new Response(JSON.stringify({ message: "User is now premium" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } else {
        console.log("User is already premium or not found !");
        return new Response(JSON.stringify({ message: "User is already premium or not found" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
    } catch (error) {
      console.error('Error while trying to make user premium : ', error);
      return new Response(JSON.stringify({ message: "Error while trying to make user premium" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  } else {
    console.error('Method not allowed, try POST method : ', error);
    return new Response(JSON.stringify({ message: "Method not allowed, try POST method" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export { updateUserToPremium as POST };
