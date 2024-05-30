import {NextResponse} from "next/server"

import mysql from 'mysql2/promise'
const pool = mysql.createPool({host: process.env.MYSQL_HOST, user: process.env.MYSQL_USER, password: process.env.MYSQL_PASSWORD, database: process.env.MYSQL_DATABASE, waitForConnections: true})
import bcrypt from "bcrypt";

//////////////////////
// ===> Get user list
export async function GET() {

	let users;
	try {
    const sql = 'SELECT * FROM users;'
    const mySqlResponse = await pool.query(sql)
	users = mySqlResponse[0]

	if (false) {throw "Erreur"} // <=== à gérer

	} catch (error) {
		console.error(error)
		return new NextResponse(error, {
			statut : 204,
		});
	}

    return NextResponse.json({
        users,
    });
}

//////////////////////////
// ===> Register new user
export async function POST(request, context) { //in TS: POST(request: Request)
    const { body } = request
    console.log("\n\n\n\n\n");
    console.log("BODY ===========>", body);
    const data  = await request.json()
    console.log(data);
    if (data.username === '') {data.username = null}
    if (data.country === '') {data.country = null}
    if (data.email === '') {data.email = null}
    if (data.password === '') {data.password = null}
    console.log(data.username);
    console.log(data.country);
    console.log(data.email)
    console.log(data.password)
    console.log("\n\n\n\n\n");
    const hashedPassword = await bcrypt.hash(data.password, 10)
    try {
        const sql = 'INSERT INTO users (id, is_admin, username, country, email, password, xp, is_premium, daily_count) VALUES (NULL, 0, ?, ?, ?, ?, 0, 0, 0);'
        const mySqlResponse = await pool.query(sql, [data.username, data.country, data.email, hashedPassword])
        console.log("\n\n\n\n\n")
        console.log(mySqlResponse);
        console.log("\n\n\n\n\n")
        /*
        if (rows.length > 0) {
          res.status(200).json({ message: 'User registered' })
        } else {
          res.status(401).json({ message: 'Invalid email or password' })
        }*/
    } catch (error) { //<==== à gérer
        console.error(error)
        return new NextResponse(error, {
            statut : 500,
        });
    }

    return NextResponse.json({
        message: "User registered",
    });
}
