import MySQLAdapter from "../../../../../lib/next-auth-mysql-adapter";
import bcrypt from "bcrypt";

export const PUT = async (req) => {
  const { email, password, userId } = await req.json(); // "await req.json() pour les requêtes POST
  console.log(
    "Ce que je tape dans mon formulaire de modification de données, et mon id : ",
    email,
    ",",
    password,
    ",",
    userId
  );

  if (!email || !userId) {
    return new Response(JSON.stringify({ error: "Missing informations" }), {
      status: 400,
    });
  }

  const updatedData = { email };

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    updatedData.password = hashedPassword;
    console.log(
      "Les données qui vont remplacer celles de ma DB : ",
      updatedData,
      updatedData.password
    );
  }

  try {
    await MySQLAdapter.updateUser({ ...updatedData, id: userId });
    return new Response(JSON.stringify({ message: "Updated successfully!" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour : ", error);
    return new Response(JSON.stringify({ error: "Error updating user" }), {
      status: 500,
    });
  }
};

export const DELETE = async (req) => {
  const { email } = await req.json();
  console.log("Delete request received with:", email);

  if (!email) {
    return new Response(JSON.stringify({ error: "Missing email" }), {
      status: 400,
    });
  }
  try {
    await MySQLAdapter.deleteUser(email);
    return new Response(JSON.stringify({ message: "Deleted successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting user", error);
    return new Response(JSON.stringify({ error: "Error deleting user" }), {
      status: 500,
    });
  }
};
