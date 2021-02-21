import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const RegisterApplicant = () => {
    const [ username, setUsername ] = useState("")
    const [ name, setName ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ location, setLocation ] = useState("")
    const [ contact, setContact ] = useState("")
    const [ period, setPeriod ] = useState("")
    const [ additional, setAdditional ] = useState("")
    const [ error, setError ] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/user/register', {
            username: username,
            password: password,
            isApplicant: true,
        })
        .then(async (response) => {
            // const body = await response.json();
            // // console.log(body);
            // if (!response.ok) {
            // //   setError(body.message)
            // } else {
            // //   setCookie("token", body.token);
            // }
        })
        .catch((error) => {
            console.log(error.response.data.message[0].msg) 
            // console.log(error.response.status)
            setError(error.body.message)
        });
    }
    
    return (
        <div className="register">
            <div className="register__heading">
                <h2>register as<br/> host</h2>
                <Link to="/">back to login</Link>
            </div>
            <div className="register__form">
                <form onSubmit={handleSubmit}>
                    <div className="form-col">
                        <label>username</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}></input>
                        {
                            error.length ? <p>{error}</p> : ""
                        }
                        <label>name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
                        <label>password</label>
                        <input type="password" value={password} onChange={(e) => {
                            setPassword(e.target.value)}
                        }></input>
                        <label>confirm password</label>
                        <input type="password"></input>
                    </div>
                    <div className="form-col">
                        <label>current location</label>
                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}></input>
                        <label>contact information</label>
                        <input type="text" value={contact} onChange={(e) => setContact(e.target.value)}></input>
                        <label>minimum stay</label>
                        <input type="text" value={period} onChange={(e) => setPeriod(e.target.value)} placeholder="e.g. 3 weeks"></input>
                        <label>additional information</label>
                        <input type="text" value={additional} onChange={(e) => setAdditional(e.target.value)} className="additional-req"></input>
                        <button className="register-submit">register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterApplicant
