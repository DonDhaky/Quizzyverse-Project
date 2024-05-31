import {NextResponse} from "next/server"

import mysql from 'mysql2/promise'
const pool = mysql.createPool({host: process.env.MYSQL_HOST, user: process.env.MYSQL_USER, password: process.env.MYSQL_PASSWORD, database: process.env.MYSQL_DATABASE, waitForConnections: true})

///////////////////////////////////////////////////
// ===> Deal with daily_count, renewed_at, premium
export async function POST(request, context) { //in TS: POST(request: Request)
    const { body } = request
    console.log("\n\n\n\n\n");
    console.log("BODY ===========>", body);
    const data  = await request.json()
    console.log("data:", data);
    if (data.email === '') {data.email = null}
    console.log(data.email)
    console.log("\n\n\n\n\n");
    try {
        
        const sqlFetch = 'SELECT daily_count, renewed_at FROM users WHERE email = ?;'
        const [mySqlFetchResponse] = await pool.query(sqlFetch, [data.email])
        console.log(mySqlFetchResponse);
        if(mySqlFetchResponse.length > 0) {
            console.log(mySqlFetchResponse[0].daily_count);
            console.log(mySqlFetchResponse[0].renewed_at);

            const now = Date.now();
            if (mySqlFetchResponse[0].renewed_at < now || mySqlFetchResponse[0].renewed_at == NULL) {
                const daily_count = 1
                const nowPlus24Hours = now + 24 * 60 * 60 * 1000;
                console.log(typeof(nowPlus24Hours));
                const sqlUpdate = 'UPDATE users SET daily_count = ?, renewed_at = ? WHERE email = ?;'
                const [mySqlUpdateResponse] = await pool.query(sqlUpdate, [daily_count, nowPlus24Hours, data.email])
                const message = "dayly_count set to 1"
            } else {
                if (mySqlFetchResponse[0].daily_count < 4) {
                    const daily_count = mySqlFetchResponse[0].daily_count + 1
                    const sqlUpdate = 'UPDATE users SET daily_count = ? WHERE email = ?;'
                    const [mySqlUpdateResponse] = await pool.query(sqlUpdate, [daily_count, data.email])
                    const message = "dayly_count incremented"
                } else {
                    const message = "maximum daily_count reached"
                }
            }

            console.log("\n\n\n\n\n")
            console.log(mySqlResponse);
            console.log("\n\n\n\n\n")

        } else {
            throw "Error during mySql process (daily_count)"
        }
    } catch (error) { //<==== à gérer
        console.error(error)
        return new NextResponse(error, {
            statut : 500,
        });
    }

    return NextResponse.json({
        message: message,
    });
}
