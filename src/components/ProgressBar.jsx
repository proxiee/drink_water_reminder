import React from 'react'

const ProgressBar = ({ percentage }) => {
    return (
        <div className="progress-container">
            <div
                className="progress-bar"
                style={{ width: `${percentage}%` }}
            />
        </div>
    )
}

export default ProgressBar
