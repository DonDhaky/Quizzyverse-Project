    "use client";

    import { useState, useEffect } from 'react'
    import './admin.css'
    const AdminPanel = () => {

        const [users, setUsers] = useState([]);
        const [userToUpdate, setUserToUpdate] = useState([]);

        const handleInputChange = (event, index, field) => {
            const newUserToUpdate = [...userToUpdate];
            newUserToUpdate[index][field] = event.target.value;
            setUserToUpdate(newUserToUpdate);
        };

        useEffect(() => {
            getUsers();
        }, []);
        //////////////////////////////////
        // Get all or one user(s)
        const getUsers = async (requestedUsers = 'all') => {
            try {
                const response = await fetch(`/api/users?requestedUsers=${requestedUsers}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                const data = await response.json();
                if (requestedUsers === 'all') {
                    setUsers(data.users);
                } else {
                    setUserToUpdate(data.users);
                }
            } catch (error) {
                console.error(error);
            }
        };

        //////////////////////////////////
        // Update user
        const updateUser = async (userToUpdate) => {
            try {
                const response = await fetch('/api/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userToUpdate)
                });
                const data = await response.json();
                window.location.href = '/client/admin';
            } catch (error) {
                console.error(error);
            }
        };

        //////////////////////////////////
        // Delete user
        const deleteUser = async (userIdToDelete) => {
            const confirm = window.confirm("Are you sure you want to delete this user?");
            if (!confirm) {
                return;
            }

            try {
                const response = await fetch('/api/users', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: userIdToDelete })
                });
                const data = await response.json();
                window.location.href = '/client/admin';
            } catch (error) {
                console.error(error);
            }
        };

        return (
            <div>
                <div className="divh1" style={{ backgroundColor: "orange" }}>
                    <h1>REGISTERED USERS</h1>
                </div>
                <div className="divtable">
                    <table>
                        <thead>
                            <tr>
                                <th style={{ borderTopLeftRadius: "10px" }}>id</th>
                                <th>is_admin</th>
                                <th>username</th>
                                <th>country</th>
                                <th>email</th>
                                <th>xp</th>
                                <th>is_premium</th>
                                <th>daily_count</th>
                                <th>renewed_at</th>
                                <th style={{ width: "160px", borderTopRightRadius: "10px" }}>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.id}>
                                    <td style={index === users.length - 1 ? { borderBottomLeftRadius: "10px" } : {}}>{user.id}</td>
                                    <td>{user.is_admin}</td>
                                    <td>{user.username}</td>
                                    <td>{user.country}</td>
                                    <td>{user.email}</td>
                                    <td>{user.xp}</td>
                                    <td>{user.is_premium}</td>
                                    <td>{user.daily_count}</td>
                                    <td>{user.renewed_at}</td>
                                    <td style={index === users.length - 1 ? { borderBottomRightRadius: "10px" } : {}}>
                                        <button style={{ backgroundColor: "green" }} onClick={() => getUsers(user.id)}>&nbsp;Modify&nbsp;</button>
                                        {user.is_admin === 0 && (
                                            <>&nbsp;&nbsp;<button style={{ backgroundColor: "red" }} onClick={() => deleteUser(user.id)}>&nbsp;Delete&nbsp;</button></>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="divh2" style={{ backgroundColor: "purple" }}>
                    <h1>modify and update user</h1>
                </div>
                <div className="divtable">
                    <table>
                        <thead>
                            <tr>
                                <th style={{ borderTopLeftRadius: "10px" }}>id</th>
                                <th>is_admin</th>
                                <th>username</th>
                                <th>country</th>
                                <th>email</th>
                                <th>xp</th>
                                <th>is_premium</th>
                                <th>daily_count</th>
                                <th>renewed_at</th>
                                <th style={{ width: "160px", borderTopRightRadius: "10px" }}>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userToUpdate.map((utu, index) => (
                                <tr key={utu.id}>
                                    <td style={{ borderBottomLeftRadius: "10px" }}>{utu.id}</td>
                                    <td><input style={{ width: "75px" }} value={utu.is_admin} onChange={(event) => handleInputChange(event, index, 'is_admin')} /></td>
                                    <td><input style={{ width: "75px" }} value={utu.username} onChange={(event) => handleInputChange(event, index, 'username')} /></td>
                                    <td><input style={{ width: "120px" }} value={utu.country} onChange={(event) => handleInputChange(event, index, 'country')} /></td>
                                    <td><input style={{ width: "150px" }} value={utu.email} onChange={(event) => handleInputChange(event, index, 'email')} /></td>
                                    <td><input style={{ width: "100px" }} value={utu.xp} onChange={(event) => handleInputChange(event, index, 'xp')} /></td>
                                    <td><input style={{ width: "80px" }} value={utu.is_premium} onChange={(event) => handleInputChange(event, index, 'is_premium')} /></td>
                                    <td><input style={{ width: "80px" }} value={utu.daily_count} onChange={(event) => handleInputChange(event, index, 'daily_count')} /></td>
                                    <td><input style={{ width: "125px" }} value={utu.renewed_at} onChange={(event) => handleInputChange(event, index, 'renewed_at')} /></td>
                                    <td style={{ borderBottomRightRadius: "10px" }}><button style={{ width: "80px", backgroundColor: "DarkCyan" }} onClick={() => updateUser(userToUpdate)}>&nbsp;Update&nbsp;</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    export default AdminPanel;