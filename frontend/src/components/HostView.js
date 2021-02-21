import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import ProfileCard from './ProfileCard'
import DetailCard from './DetailCard'
import DefaultCard from './DefaultCard'
const BACKEND_URL = 'http://localhost:5000/'

const HostView = () => {
    const [user, setUser] = useState("")
    const [applicants, setApplicants] = useState([])
    const [selected, setSelected] = useState(-1)
    const [confirmed, setConfirmed] = useState("")
    const history = useHistory()

    useEffect(() => {
        axios.get(BACKEND_URL + 'app/getCard', {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then((response) => {
            console.log(response)
            setUser(response.data.userCard[0].name)
            setApplicants(response.data.cards)
        })
        .catch((error) => {
            console.log(error.response)
        });
    }, [])

    useEffect(() => {
        if (confirmed === "") {
            return
        }
        console.log(confirmed)
        axios.put(BACKEND_URL + 'host/confirmStay', {
            appname: confirmed
        }, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then((response) => {
            console.log(response.data)
            localStorage.setItem('name', user)
            localStorage.setItem('appObject', JSON.stringify(response.data))
            history.push("/status-host")
        })
        .catch((error) => {
            console.log(error.response)
        });
    }, [confirmed])

    const displayOverview = (selected) => {
        if (selected === -1) {
            return <DefaultCard isApplicant={true}/>
        } else {
            const applicant = applicants[selected]
            return <DetailCard 
                name={applicant.name} 
                isApplicant={true}
                contact={applicant.contactInfo}
                period={applicant.minimumStay}
                additional={applicant.additionalInfo}
                username={applicant.username}
                confirmHandler={setConfirmed}
            />
        }
    }

    return (
        <div className="dashboard">
            <div className="dashboard__overview">
                <h2>Hello {user}!</h2>
                <p>You have {applicants.data ? applicants.data.length : ""} applicants waiting for your approval!</p>
                {displayOverview(selected)}
            </div>
            <div className="dashboard__grid">
                {
                    applicants ?
                    applicants.map((applicant, index) => (
                        <ProfileCard 
                            name={applicant.name}
                            isApplicant={true}
                            period={applicant.minimumStay}
                            index={index}
                            selectHandler={setSelected}
                        />
                    )) : ""
                }
            </div>
        </div>
    )
}

export default HostView
