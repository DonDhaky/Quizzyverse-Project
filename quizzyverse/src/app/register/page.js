"use client"

import React, { useState } from 'react'
import './register.css'

const RegisterForm = () => {
  //const [is_admin, setIsAdmin] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [password, setPassword] = useState('')
  //const [xp, setXp] = useState(0)
  //const [is_premium, setIsPremium] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()

    // Do something with the form data, such as sending it to a server to create a new user
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    {/* admin panel reserved
        <label style={{ marginBottom: '10px' }}>Admin:</label>
        <input type="checkbox" checked={is_admin} onChange={(event) => setIsAdmin(event.target.checked)} />
        <br />
    */}
        <label style={{ marginBottom: '10px', marginTop: '20px' }}>Username:</label>
        <input style={{ marginBottom: '10px' }} type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        <br />
        <label style={{ marginBottom: '10px' }}>Country:</label>
        <input style={{ marginBottom: '10px' }} type="text" value={country} onChange={(event) => setCountry(event.target.value)} />
        <br />
        <label style={{ marginBottom: '10px' }}>Email:</label>
        <input style={{ marginBottom: '10px' }} type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <br />
        <label style={{ marginBottom: '10px' }}>Password:</label>
        <input style={{ marginBottom: '50px' }} type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <br />
    {/* admin panel reserved
        <label style={{ marginBottom: '10px' }}>XP:</label>
        <input type="number" value={xp} onChange={(event) => setXp(event.target.value)} />
        <br />
        <label style={{ marginBottom: '10px' }}>Premium:</label>
        <input type="checkbox" checked={is_premium} onChange={(event) => setIsPremium(event.target.checked)} />
        <br />
    */}
      <button style={{ marginBottom: '20px' }} type="submit">Register</button>
    </form>
  )
}

export default RegisterForm
