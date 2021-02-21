import React from 'react'

const DefaultCard = ({isApplicant}) => {
    return (
        <div className={isApplicant ? "defaultcard" : "defaultcard blue"}>
            <h3>Click on card to view more details!</h3>
        </div>
    )
}

export default DefaultCard
