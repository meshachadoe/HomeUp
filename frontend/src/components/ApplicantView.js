import React from 'react'
import ProfileCard from './ProfileCard'
import DetailCard from './DetailCard'

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
