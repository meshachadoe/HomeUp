import React, { useState, useEffect } from 'react'
import { Link, useHistory } from "react-router-dom"
import axios from 'axios'

const Login = () => {
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState("")
    const [ token, setToken ] = useState("")

    const history = useHistory()

    const handleSubmit = (e) => {
        if (username === undefined || password === undefined) {
            setError("Make sure to fill out both fields")
        } else {
            e.preventDefault()
            axios.post('http://localhost:5000/user/login', {
                username: username,
                password: password
            })
            .then((response) => {
                console.log("success")
                console.log(response)
                setToken(response.data.token)
                history.push("/applicant")
                // const body = await response.json();
                // // console.log(body);
                // if (!response.ok) {
                // //   setError(body.message)
                // } else {
                // //   setCookie("token", body.token);
                // }
            })
            .catch((error) => {
                console.log(error)
                if (error) {
                    setError(error.response.data.message) 
                }
                // if (error.response.data.message) {
                //     setError(error.response.data.message)
                // }
                // setError(error.body.message)
            });
        }
    }

    useEffect(() => {
        localStorage.setItem('token', token)
    }, [token])

    return (
        <div className="login">
            <div className="login__graphic">
            </div>
            <div className="login__form">
                <h2>hey there!</h2>
                <form onSubmit={handleSubmit}>
                    <label>username</label>
                    <input type="text" value={username} required onChange={(e) => {setUsername(e.target.value)}}></input>
                    <label>password</label>
                    <input type="password" value={password} required onChange={(e) => {setPassword(e.target.value)}}></input>
                    {
                        error.length ? <p>{error}</p> : ""
                    }
                    <button>login</button>
                </form>
                
                <div className="login__form__register">
                    <p>not registered yet?</p>
                    <Link to="/register-applicant">register as applicant</Link>
                    <Link to="/register-host">register as host</Link>
                </div>
            </div>

        </div>
    )
}

export default Login
