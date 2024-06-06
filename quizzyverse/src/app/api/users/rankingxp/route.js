import MySQLAdapter from "../../../../../lib/next-auth-mysql-adapter";

export const GET = async (req) => {
  try {
    const users = await MySQLAdapter.getAllUsersSorted();
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: {'Content-Type': 'application/json'},
    });
  } catch (error) {
    console.error('Error fetching user rankings:', error);
    return new Response(JSON.stringify({error: "Failed to fetch users"}), {
      status: 500,
      headers: {'Content-Type': 'application/json'},
    });
  }
};