import React, { useState, useEffect } from 'react'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'

const BACKEND_URL = 'http://localhost:5000/'

const RegisterApplicant = () => {
    const [ username, setUsername ] = useState("")
    const [ name, setName ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ confirmPassword, setConfirmPassword ] = useState("")
    const [ location, setLocation ] = useState("")
    const [ contact, setContact ] = useState("")
    const [ period, setPeriod ] = useState("")
    const [ additional, setAdditional ] = useState("")
    const [ error, setError ] = useState("")

    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!(username || name || password || confirmPassword || location || contact || period)) {
            setError("Please fill in all fields")
            return
        }
        if (confirmPassword !== password) {
            setError("Passwords do not match")
            return
        }
        if (password.length < 8) {
            setError("Password has to be at least 8 characters");
            return;
        }

        axios.post(BACKEND_URL + 'user/register', {
            username,
            password,
            isApplicant: true,
            name,
            location,
            contactInfo: contact,
            minimumStay: period,
            additionalInfo: additional
        })
        .catch((error) => {
            console.log(error)
            // setError(error.response.data.message)
        });

        history.push("/")
    }

    return (
        <div className="register">
            <div className="register__heading">
                <h2>register as<br/> applicant</h2>
                <Link to="/">back to login</Link>

            </div>
            <div className="register__form">
                <form onSubmit={handleSubmit}>
                    <div className="form-col">
                        <label>username</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}></input>
                        <label>name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
                        <label>password</label>
                        <input type="password" value={password} onChange={(e) => {
                            setPassword(e.target.value)}
                        }></input>
                        <label>confirm password</label>
                        <input type="password" value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}}></input>
                    </div>
                    <div className="form-col">
                        <label>current location</label>
                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}></input>
                        <label>contact information</label>
                        <input type="text" value={contact} onChange={(e) => setContact(e.target.value)}></input>
                        <label>minimum stay</label>
                        <input type="text" value={period} onChange={(e) => setPeriod(e.target.value)} placeholder="e.g. 3 weeks"></input>
                        <label>additional information</label>
                        <textarea value={additional} onChange={(e) => setAdditional(e.target.value)} className="additional-req"></textarea>
                        
                        { error.length ? <p className="error">{error}</p> : "" }
                        
                        <button className="register-submit">register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterApplicant
