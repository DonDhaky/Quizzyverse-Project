import {NextResponse} from "next/server"

import mysql from 'mysql2/promise'
const pool = mysql.createPool({host: process.env.MYSQL_HOST, user: process.env.MYSQL_USER, password: process.env.MYSQL_PASSWORD, database: process.env.MYSQL_DATABASE, waitForConnections: true})

//////////////////////////
// ===> Add xp to user
export async function POST(request, context) { //in TS: POST(request: Request)
    const { body } = request
    console.log("\n\n\n\n\n");
    console.log("BODY ===========>", body);
    const data  = await request.json()
    console.log(data);
    if (data.email === '') {data.email = null}
    if (data.xp === '') {data.xp = null}
    console.log(data.email)
    console.log(data.xp)
    console.log("\n\n\n\n\n");
    try {
        
        const sqlFetch = 'SELECT xp, daily_count FROM users WHERE email = ?;'
        const [mySqlFetchResponse] = await pool.query(sqlFetch, [data.email])
        console.log(mySqlFetchResponse);
        if(mySqlFetchResponse.length > 0) {
            console.log(mySqlFetchResponse[0].xp);
            console.log(mySqlFetchResponse[0].daily_count);

            const new_xp = mySqlFetchResponse[0].xp + data.xp
            const dayly_count = mySqlFetchResponse[0].daily_count + 1

            const sqlUpdate = 'UPDATE users SET xp = ?, daily_count = ? WHERE email = ?;'
            const mySqlResponse = await pool.query(sqlUpdate, [new_xp, dayly_count, data.email])
            console.log("\n\n\n\n\n")
            console.log(mySqlResponse);
            console.log("\n\n\n\n\n")

        } else {
            throw "Error during mySql process (check email again ?)"
        }
    } catch (error) { //<==== à gérer
        console.error(error)
        return new NextResponse(error, {
            statut : 500,
        });
    }

    return NextResponse.json({
        message: "Xp added",
    });
}
