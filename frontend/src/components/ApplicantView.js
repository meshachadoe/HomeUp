import {React, useState, useEffect} from 'react'
import ProfileCard from './ProfileCard'
import DetailCard from './DetailCard'
import DefaultCard from './DefaultCard'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import jwt_decode from 'jwt-decode'

const BACKEND_URL = 'http://localhost:5000/'

const ApplicantView = () => {
    const [user, setUser] = useState("")
    const [selected, setSelected] = useState(-1)
    const [confirmed, setConfirmed] = useState("")
    const [hosts, setHosts] = useState([])
    const history = useHistory()

    useEffect(() => {
        axios.get(BACKEND_URL + 'host/getAllCards', {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then((response) => {
            setUser(response.data.userCard[0].name)
            setHosts(response.data.cards)
        })
        .catch((error) => {
            console.log(error.response)
        });
    }, [])

    useEffect(() => {
        if (confirmed === "") {
            return
        }
        axios.put(BACKEND_URL + 'app/updateCard', {
            hostUsername: confirmed
        }, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then((response) => {
            console.log(response.data)
            localStorage.setItem('name', user)
            localStorage.setItem('hostObject', JSON.stringify(response.data))
            history.push("/status-applicant")
        })
        .catch((error) => {
            console.log(error)
        });
    }, [confirmed])

    const displayOverview = (selected) => {
        if (selected === -1) {
            return <DefaultCard isApplicant={false} />
        } else {
            const host = hosts[selected]
            return <DetailCard 
                name={host.name}
                isApplicant={false}
                location={host.location}
                contact={host.phone}
                period={host.maximumStay}
                additional={host.description}
                username={host.username}
                confirmHandler={setConfirmed}
            />
        }
    }

    return (
        <div className="dashboard">
            <div className="dashboard__overview">
                <h2>Hello {user}!</h2>
                {displayOverview(selected)}
            </div>
            <div className="dashboard__grid">
                {
                    hosts ?
                    hosts.map((host, index) => (
                        <ProfileCard
                            name={host.name}
                            isApplicant={false}
                            location={host.location}
                            period={host.maximumStay}
                            index={index}
                            selectHandler={setSelected}
                        />
                    )) : ""
                }
            </div>
        </div>
    )
}

export default ApplicantView
