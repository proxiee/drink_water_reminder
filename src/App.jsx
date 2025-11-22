import { useState, useEffect } from 'react'
import Creature3D from './components/Creature3D'
import WaterControls from './components/WaterControls'
import ProgressBar from './components/ProgressBar'
import './App.css'

function App() {
  const [dailyGoal, setDailyGoal] = useState(() => {
    const saved = localStorage.getItem('dailyGoal')
    return saved ? parseInt(saved) : 0
  })

  const [currentIntake, setCurrentIntake] = useState(() => {
    // Check if it's a new day, if so reset (simple logic for now)
    const lastDate = localStorage.getItem('lastDate')
    const today = new Date().toDateString()
    if (lastDate !== today) {
      localStorage.setItem('lastDate', today)
      return 0
    }
    const saved = localStorage.getItem('currentIntake')
    return saved ? parseInt(saved) : 0
  })

  useEffect(() => {
    localStorage.setItem('dailyGoal', dailyGoal)
  }, [dailyGoal])

  useEffect(() => {
    localStorage.setItem('currentIntake', currentIntake)
  }, [currentIntake])

  const addWater = (amount) => {
    setCurrentIntake(prev => prev + amount)
  }

  const resetDay = () => {
    setCurrentIntake(0)
  }

  const setGoal = (goal) => {
    setDailyGoal(goal)
  }

  const hydrationPercentage = dailyGoal > 0 ? Math.min((currentIntake / dailyGoal) * 100, 100) : 0

  return (
    <div className="glass-panel">
      <h1>HydraPet</h1>

      {dailyGoal === 0 ? (
        <div className="setup-screen">
          <h2>Let's set your daily goal!</h2>
          <p>Recommended: 2000ml - 3000ml</p>
          <form onSubmit={(e) => {
            e.preventDefault()
            const val = parseInt(e.target.elements.goal.value)
            if (val > 0) setGoal(val)
          }}>
            <input name="goal" type="number" placeholder="Enter goal in ml (e.g. 2500)" autoFocus />
            <br />
            <button type="submit" className="btn-primary">Start Hydrating</button>
          </form>
        </div>
      ) : (
        <>
          <div className="stats">
            <span>Goal: {dailyGoal}ml</span>
          </div>

          <Creature3D percentage={hydrationPercentage} />

          <div className="stats">
            <strong>{currentIntake}ml</strong> / {dailyGoal}ml
          </div>

          <ProgressBar percentage={hydrationPercentage} />

          <WaterControls onAdd={addWater} onReset={resetDay} />

          <button
            className="btn-secondary"
            style={{ marginTop: '2rem', fontSize: '0.8rem' }}
            onClick={() => setDailyGoal(0)}
          >
            Change Goal
          </button>
        </>
      )}
    </div>
  )
}

export default App
