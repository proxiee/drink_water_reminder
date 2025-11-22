import React from 'react'
import thirstyImg from '../assets/creature_thirsty.png'
import moderateImg from '../assets/creature_moderate.png'
import fullImg from '../assets/creature_full.png'

const Creature = ({ percentage }) => {
    let imageSrc = thirstyImg
    let mood = "Thirsty"

    if (percentage >= 80) {
        imageSrc = fullImg
        mood = "Happy & Hydrated!"
    } else if (percentage >= 30) {
        imageSrc = moderateImg
        mood = "Feeling Okay"
    }

    return (
        <div className="creature-container">
            <img src={imageSrc} alt={`Creature is ${mood}`} className="creature-img" />
            <div style={{
                position: 'absolute',
                bottom: '-30px',
                background: 'rgba(0,0,0,0.5)',
                padding: '5px 15px',
                borderRadius: '20px',
                fontSize: '0.9rem'
            }}>
                {mood}
            </div>
        </div>
    )
}

export default Creature
