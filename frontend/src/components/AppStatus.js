import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const BACKEND_URL = 'http://localhost:5000/'

const AppStatus = () => {
    const [host, setHost] = useState("")
    const [token, setToken] = useState("")
    const [approved, setApproved] = useState(false)
    const user = localStorage.getItem('name')
    const history = useHistory()
    
    useEffect(() => {
        setHost(JSON.parse(localStorage.getItem('hostObject')))
        setToken(localStorage.getItem('token'))
        axios.get(BACKEND_URL + "app/getStatus", {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then((response) => {
            console.log(response.data)
            setApproved(response.data)
        })
        .catch((error) => {
            console.log(error.response)
        })
    }, [])

    const redirect = () => {
        axios.put(BACKEND_URL + "app/resetStatus", {}, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        history.push("/")
    }

    return(
        <div className="statuspage">
            <h2>Hey {user}!</h2>
            <p>{approved ? "You have been confirmed for" : "You are currently applied to"}</p>
            <div className="statuscard">
                <div className="statuscard__info">
                    <h3>{host.name}</h3>
                    <ul>
                        <li><span className="label">PHONE NUMBER</span><br/>{host.phone}</li>
                        <li><span className="label">MAX AVAILABILITY</span><br/>{host.maximumStay}</li>
                    </ul>
                </div>
                <button className="statuscard__button" onClick={redirect}>find another stay</button>
            </div>
        </div>
    )
}

export default AppStatus