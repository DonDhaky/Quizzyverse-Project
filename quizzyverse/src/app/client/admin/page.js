"use client"

import { useState, useEffect } from 'react'
import './admin.css'

const AdminPanel = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        getAllUsers()
    }, [])

    const getAllUsers = async() => {
        try {
            const response = await fetch('/api/users', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            })
            const data = await response.json()
            console.log(data.users);
      
            setUsers(data.users)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div>
                <div class="divh1" style={{backgroundColor: "orange"}}><h1>REGISTERED USERS</h1></div>
                <div class="divtable">
                    <table>
                        <tr>
                            <th style={{borderTopLeftRadius: "10px"}}>id</th>
                            <th>is_admin</th>
                            <th>username</th>
                            <th>country</th>
                            <th>email</th>
                            <th>xp</th>
                            <th>is_premium</th>
                            <th>daily_count</th>
                            <th>renewed_at</th>
                            <th style={{width: "160px", borderTopRightRadius: "10px"}}>action</th>
                        </tr>
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <td style={index === users.length-1 ? {borderBottomLeftRadius: "10px"} : {}}>{user.id}</td>
                                <td>{user.is_admin}</td>
                                <td>{user.username}</td>
                                <td>{user.country}</td>
                                <td>{user.email}</td>
                                <td>{user.xp}</td>
                                <td>{user.is_premium}</td>
                                <td>{user.daily_count}</td>
                                <td>{user.renewed_at}</td>
                                <td style={index === users.length-1 ? {borderBottomRightRadius: "10px"} : {}}>{user.is_admin === 0 ? (<><button style={{backgroundColor: "green"}}>&nbsp;Modify&nbsp;</button>&nbsp;&nbsp;&nbsp;&nbsp;<button style={{backgroundColor: "red"}}>&nbsp;Delete&nbsp;</button></>) : null}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </>
    )
}

export default AdminPanel