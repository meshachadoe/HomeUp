import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ProfileCard from './ProfileCard'
import DetailCard from './DetailCard'
import DefaultCard from './DefaultCard'
const BACKEND_URL = 'http://localhost:5000/'

const HostView = () => {
    const [user, setUser] = useState("")
    const [applicants, setApplicants] = useState([])
    const [selected, setSelected] = useState(-1)

    useEffect(() => {
        axios.get(BACKEND_URL + 'app/getCard', {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then((response) => {
            setApplicants(response)
        })
        .catch((error) => {
            console.log(error.response)
        });
    }, [])

    const displayOverview = (selected) => {
        if (selected === -1) {
            return <DefaultCard isApplicant={true}/>
        } else {
            const applicant = applicants.data[selected]
            console.log(applicant)
            return <DetailCard name={applicant.name}  isApplicant={true} contact={applicant.contactInfo} period={applicant.minimumStay} additional={applicant.additionalInfo}/>
        }
    }

    return (
        <div className="dashboard">
            <div className="dashboard__overview">
                <h2>Hey James!</h2>
                <p>You have {applicants.data ? applicants.data.length : ""} applicants waiting for your approval!</p>
                {displayOverview(selected)}
            </div>
            <div className="dashboard__grid">
                {
                    applicants.data ?
                    applicants.data.map((applicant, index) => (
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
