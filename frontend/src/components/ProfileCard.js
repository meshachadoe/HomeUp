import React from 'react'

const ProfileCard = ({name, isApplicant, location, period, index, selectHandler}) => {
    return (
        <div className={isApplicant ? "profilecard" : "profilecard blue"} onClick={(e) => selectHandler(index)}>
            <h3>{name}</h3>
            {
                location ?
                <p>{location}</p> :
                ""
            }
            <p>{period}</p>
        </div>
    )
}

export default ProfileCard
