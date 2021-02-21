import React from 'react'
import ProfileCard from './ProfileCard'
import DetailCard from './DetailCard'
import axios from 'axios'

const BACKEND_URL = 'http://localhost:5000/'

const getHosts = () => {
    e.preventDefault()
    axios.post(BACKEND_URL + 'host/getAllCards', {
        username: username,
        password: password,
        isApplicant: true,
    })
    .then(async (response) => {
        axios.post(BACKEND_URL + 'app/addCard', {
            
        })
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


const ApplicantView = () => {
    return (
        <div className="dashboard">
            <div className="dashboard__overview">
                <h2>Hey James!</h2>
                <DetailCard />
            </div>
            <div className="dashboard__grid">
                    <ProfileCard />
                    <ProfileCard />
                    <ProfileCard />
                    <ProfileCard />
                    <ProfileCard />
                    <ProfileCard />
            </div>
        </div>
    )
}

export default ApplicantView
