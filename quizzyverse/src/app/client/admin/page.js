"use client"

import { useState, useEffect } from 'react'
import './admin.css'
import NavBar from "/src/app/components/Navbar";

const AdminPanel = () => {

    const [users, setUsers] = useState([])
    const [userToUpdate, setUserToUpdate] = useState([{}])

    const [content, setContent] = useState(
        `{\n\t"quiz_title": "Quiz - Find capitals",\n\t"question": "What is the capital of the following country?",\n\t"question_number": 1,\n\t"total_number": 10,\n\t"type": "text",\n\t"api_path": "https://api.allorigins.win/get?url=https://api.worldbank.org/v2/country/?format=json&per_page=296",\n\t"response_obj": "",\n\t"imageUrl": "https://m.media-amazon.com/images/I/71CsUmAR-GL._SL1500_.jpg",\n\t"imageAlt": "",\n\t"show_clue": false,\n\t"clue": "C'est poilu",\n\t"clue_price": 1,\n\t"response_type": "text",\n\t"xpPerGoodAnswer": 2,\n\t"xpCostPerClue": 1\n}`
    )

    const handleInputChange = (event, index, field) => {
        const newUserToUpdate = [...userToUpdate]
        newUserToUpdate[index][field] = event.target.value
        setUserToUpdate(newUserToUpdate)
      }

    useEffect(() => {
        getUsers()
    }, [])

    //////////////////////////////////
    // Get all or one user(s)
    const getUsers = async(requestedUsers='all') => {
        console.log(requestedUsers);
        try {
            const response = await fetch('/api/users?requestedUsers='+requestedUsers, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            })
            const data = await response.json()
            console.log(data.users);
            
            if (requestedUsers == 'all') {setUsers(data.users)}
            else {setUserToUpdate(data.users);}

        } catch (error) {
            console.error(error)
        }
    }

    //////////////////////////////////
    // Update user
    const updateUser = async(userToUpdate) => {
        console.log(userToUpdate);
        try {
            const response = await fetch(
                '/api/users',
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'
                },
                body: JSON.stringify(userToUpdate)
            })
            const data = await response.json()
            console.log(data.user);
            window.location.href = '/client/admin'
        } catch (error) {
            console.error(error)
        }
    }

    //////////////////////////////////
    // Delete user
    const deleteUser = async(userIdToDelete) => {
        console.log(userIdToDelete);

        const confirm = window.confirm("Are you sure you want to delete this user?");

        if (confirm) {
            console.log("Deletion confirmed.");
        } else {
            console.log("Deletion canceled.");
            return -1
        }

        try {
            const response = await fetch(
                '/api/users',
                {
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'
                },
                body: JSON.stringify(userIdToDelete)
            })
            const data = await response.json()
            console.log(data.user);
            window.location.href = '/client/admin'
        } catch (error) {
            console.error(error)
        }
    }

    //////////////////////////////////
    // Write file
    const writeFile = async(quizName, fileName, content) => {
        console.log(content);
        const dataObj = {quizName: quizName, fileName: fileName, content: content};
        try {
            const response = await fetch(
                '/api/write_file',
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataObj)
            })
            const data = await response.json()
            console.log(data.message);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <NavBar style={{width: "100%"}} />
            </div>
            <div>
                <div class="divh1" style={{backgroundColor: "orange"}}>
                    <h1>REGISTERED USERS</h1>
                </div>
                <br/>
                <div class="divh2" style={{backgroundColor: "purple"}}>
                    <h1>user list</h1>
                </div>
                <div class="divtable">
                    <table>
                        <thead>
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
                        </thead>
                        <tbody>
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
                                <td style={index === users.length-1 ? {borderBottomRightRadius: "10px"} : {}}><button style={{backgroundColor: "green"}} onClick={() => {getUsers(user.id)}}>&nbsp;Modify&nbsp;</button>&nbsp;&nbsp;{user.is_admin === 0 ? (<>&nbsp;&nbsp;<button style={{backgroundColor: "red"}} onClick={() => {deleteUser(user.id)}}>&nbsp;Delete&nbsp;</button></>) : null}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div class="divh2" style={{backgroundColor: "purple"}}>
                    <h1>modify and update user</h1>
                </div>
                <div class="divtable">
                    <table>
                        <thead>
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
                        </thead>
                        <tbody>
                            {userToUpdate.map((utu, index) => (
                            <tr key={utu.id}>
                                <td style={{borderBottomLeftRadius: "10px"}}>{utu.id}</td>
                                <td><input style={{width: "75px"}} value={utu.is_admin} onChange={(event) => handleInputChange(event, index, 'is_admin')}></input></td>
                                <td><input style={{width: "75px"}} value={utu.username} onChange={(event) => handleInputChange(event, index, 'username')}></input></td>
                                <td><input style={{width: "120px"}} value={utu.country} onChange={(event) => handleInputChange(event, index, 'country')}></input></td>
                                <td><input style={{width: "150px"}} value={utu.email} onChange={(event) => handleInputChange(event, index, 'email')}></input></td>
                                <td><input style={{width: "100px"}} value={utu.xp} onChange={(event) => handleInputChange(event, index, 'xp')}></input></td>
                                <td><input style={{width: "80px"}} value={utu.is_premium} onChange={(event) => handleInputChange(event, index, 'is_premium')}></input></td>
                                <td><input style={{width: "80px"}} value={utu.daily_count} onChange={(event) => handleInputChange(event, index, 'daily_count')}></input></td>
                                <td><input style={{width: "125px"}} value={utu.renewed_at} onChange={(event) => handleInputChange(event, index, 'renewed_at')}></input></td>
                                <td style={{borderBottomRightRadius: "10px"}}><button style={{width: "80px", backgroundColor: "DarkCyan"}} onClick={() => {updateUser(userToUpdate)}}>&nbsp;Update&nbsp;</button></td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <br/>
                <div class="divh1" style={{backgroundColor: "orange"}}>
                    <h1>QUIZ MANAGEMENT</h1>
                </div>
                <br/>
                <div class="divh2" style={{backgroundColor: "purple"}}>
                    <h1>create custom quiz</h1>
                </div>
                &nbsp;<br/><br/><br/><br/><br/>&nbsp;
                <button style={{width: "80px", backgroundColor: "DarkCyan"}} onClick={() => {writeFile("myQuiz", "settings.json", content)}}>&nbsp;Write file&nbsp;</button>
            </div>
        </>
    )
}

export default AdminPanel

// onChange={setUserToUpdate(...userToUpdate, id)}