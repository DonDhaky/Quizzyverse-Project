import {NextResponse} from "next/server"

import mysql from 'mysql2/promise'
const pool = mysql.createPool({host: process.env.MYSQL_HOST, user: process.env.MYSQL_USER, password: process.env.MYSQL_PASSWORD, database: process.env.MYSQL_DATABASE, waitForConnections: true})


///////////////////////////////
// ===> Get all or one user(s)
export async function GET(request, context) {

    const { searchParams } = new URL(request.url);
    const requestedUsers = searchParams.get('requestedUsers')

    console.log("\n\n\n\nIN GET USERS:", requestedUsers);

    const data = {}
    const sql = {}
    //const mySqlGetResponse = []
    try {
        if (requestedUsers === 'all') {
            sql.get = 'SELECT id, is_admin, username, country, email, xp, is_premium, daily_count,renewed_at FROM users;'
        } else {
            sql.get = 'SELECT id, is_admin, username, country, email, xp, is_premium, daily_count,renewed_at FROM users WHERE id = ?;'
        }
        const [mySqlGetResponse] = await pool.query(sql.get, [requestedUsers])
        data.users = mySqlGetResponse
        console.log(data.users);

    } catch (error) {

        console.error(error)
        return new NextResponse(error, {
            statut : 500,
        });

    }

    return NextResponse.json({
        message: "All users",
        users: data.users
    });
}

//////////////////////////
// ===> Update user
export async function POST(request, context) { //in TS: POST(request: Request)
    //console.log(request)
    //const body = await request.json();
    //const { body } = request
    //console.log("\n\n\n\n\n");
    //console.log("BODY ===========>", body);
    const dataObj  = await request.json()
    const data = dataObj[0]
    console.log(data);
    console.log("\n\n\n\n\n");
    console.log(data.id);
    console.log(data.is_admin);
    console.log(data.username);
    console.log(data.country);
    console.log(data.email)
    console.log(data.xp)
    console.log(data.is_premium);
    console.log(data.daily_count);
    console.log(data.renewed_at);
    console.log("\n\n\n\n\n");
    if (data.email === '') {data.email = null}
    if (data.xp === '') {data.xp = null}

    try {

            const sqlUpdate = 'UPDATE users SET is_admin = ?, username = ?, country= ?, email = ?, xp = ?, is_premium = ?, daily_count = ?, renewed_at = ? WHERE id = ?;'
            const mySqlUpdateResponse = await pool.query(sqlUpdate, [data.is_admin, data.username, data.country, data.email, data.xp, data.is_premium, data.daily_count, data.renewed_at, data.id])
            console.log("\n\n\n\n\n")
            console.log(mySqlUpdateResponse);
            console.log("\n\n\n\n\n")

    } catch (error) { //<==== à gérer
        console.error(error)
        return new NextResponse(error, {
            statut : 500,
        });
    }

    return NextResponse.json({
        message: "User updated",
    });
}

//////////////////////////
// ===> Delete user
export async function DELETE(request, context) { //in TS: POST(request: Request)

    console.log("\n\n\n\n\nIN DELETE");
    const userIdToDelete  = await request.json()
    console.log(userIdToDelete);


    try {

            const sqlUpdate = 'DELETE FROM users WHERE id = ?;'
            const mySqlUpdateResponse = await pool.query(sqlUpdate, [userIdToDelete])
            console.log("\n\n\n\n\n")
            console.log(mySqlUpdateResponse);
            console.log("\n\n\n\n\n")

    } catch (error) { //<==== à gérer
        console.error(error)
        return new NextResponse(error, {
            statut : 500,
        });
    }

    return NextResponse.json({
        message: "User deleted",
    });
}

/*
//////////////////////////
// ===> Add user
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
            const mySqlUpdateResponse = await pool.query(sqlUpdate, [new_xp, dayly_count, data.email])
            console.log("\n\n\n\n\n")
            console.log(mySqlUpdateResponse);
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
*/
