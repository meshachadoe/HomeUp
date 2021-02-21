import React from 'react'

const DetailCard = ({name, isApplicant, location, contact, period, additional, username, confirmHandler}) => {
    return (
        <div className={isApplicant ? "detailcard" : "detailcard blue"}>
            <h3>{name}</h3>
            {location ? <p className="detailcard-location">{location}</p> : ""}
            <ul>
                <li><span className="detailcard-subheading">PHONE NUMBER</span><br/>{contact}</li>
                <li><span className="detailcard-subheading">MINIMUM STAY</span><br/>{period}</li>
            </ul>
            <p>{additional}</p>
            <button onClick={(e) => confirmHandler(username)}>{isApplicant ? "confirm stay" : "i'm interested"}</button>
        </div>
    )
}

export default DetailCard
