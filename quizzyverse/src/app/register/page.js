"use client"

import React, { useState } from 'react'
import './register.css'

const RegisterForm = () => {
  //const [is_admin, setIsAdmin] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  //const [xp, setXp] = useState(0)
  //const [is_premium, setIsPremium] = useState(false)

  const handleSubmit = async(event) => {
    event.preventDefault()

    console.log(username)
    console.log(country);
    console.log(email);
    console.log(password);
    console.log(passwordConfirmation);

    if (password !== passwordConfirmation) {
      alert("The password and its confirmation do not match.\nPlease enter your password again.")
      setPassword('')
      setPasswordConfirmation('')
      return -1;
    } else if (country === "") {
      alert("Please select a country.")
      return -1;
    }

    const data = {
      username,
      country,
      email,
      password
    }
  
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
  
      if (response.ok) {
        console.log("User registered");
        console.log(response);
        //document.cookie = "is_logged=1; expires=" + new Date(Date.now() + 3600000).toUTCString() + "; path=/";
        window.location.href = '/login'
      } else {
        console.log("There was an error registering the user")
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }

  }

  const countries = [ 'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua & Deps', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Rep', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo, Democratic Republic of the', 'Congo, Republic of the', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Ivory Coast', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea North', 'Korea South', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar, Burma', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russian Federation', 'Rwanda', 'St Kitts & Nevis', 'St Lucia', 'Saint Vincent & the Grenadines', 'Samoa', 'San Marino', 'Sao Tome & Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad & Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe' ]

  return (
    <>
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
        {/*<input style={{ marginBottom: '10px' }} type="text" value={country} onChange={(event) => setCountry(event.target.value)} />*/}
        <select style={{ marginBottom: '10px' }} type="text" value={country} onChange={(event) => setCountry(event.target.value)} >
          <option value="" style={{ fontStyle: 'italic' }}>Select a country</option>
          {countries.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
        <br />
        <label style={{ marginBottom: '10px' }}>Email:</label>
        <input style={{ marginBottom: '10px' }} type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <br />
        <label style={{ marginBottom: '10px' }}>Password:</label>
        <input style={{ marginBottom: '10px' }} type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <br />
        <label style={{ marginBottom: '10px' }}>Confirm password:</label>
        <input style={{ marginBottom: '50px' }} type="password" value={passwordConfirmation} onChange={(event) => setPasswordConfirmation(event.target.value)} />
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
    </>
  )
}

export default RegisterForm