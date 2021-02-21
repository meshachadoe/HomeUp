import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'

const BACKEND_URL = 'http://localhost:5000/'

const AppStatus = () => {
    const [applicant, setApplicant] = useState("");
    const history = useHistory()
    const user = localStorage.getItem('name')

    useEffect(() => {
        setApplicant(JSON.parse(localStorage.getItem('appObject')))
        console.log(applicant)
    }, [])

    const resetFields = () => {
        axios.put(BACKEND_URL + 'host/endStay', {}, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        history.push("/")
    }

    return(
        <div className="statuspage">
            <h2>Hey {user}!</h2>
            <p>You are currently hosting</p>
            <div className="statuscard green">
                <div className="statuscard__info">
                    <h3>{applicant.name}</h3>
                    <ul>
                        <li><span className="label">PHONE NUMBER</span><br/>{applicant.contactInfo}</li>
                        <li><span className="label">MAX AVAILABILITY</span><br/>{applicant.minimumStay}</li>
                    </ul>
                </div>
                <button className="statuscard__button green" onClick={resetFields}>end stay</button>
            </div>
        </div>
    )
}

export default AppStatus