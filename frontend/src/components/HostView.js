import React from 'react'
import ProfileCard from './ProfileCard'
import DetailCard from './DetailCard'

const HostView = () => {
    return (
        <div className="dashboard">
            <div className="dashboard__overview">
                <h2>Hey Christian!</h2>
                <p>You have 3 applicants waiting for your approval!</p>
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

export default HostView
