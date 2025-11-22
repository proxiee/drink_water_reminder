import React from 'react'

const WaterControls = ({ onAdd, onReset }) => {
    return (
        <div className="controls">
            <button className="btn-primary" onClick={() => onAdd(250)}>+ 250ml</button>
            <button className="btn-primary" onClick={() => onAdd(500)}>+ 500ml</button>
            <button className="btn-primary" onClick={() => onAdd(1000)}>+ 1L</button>
            <button className="btn-secondary" onClick={onReset} style={{ marginLeft: 'auto' }}>Reset Day</button>
        </div>
    )
}

export default WaterControls
