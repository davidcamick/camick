import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Software from './pages/Software'
import TheFishBowl from './pages/TheFishBowl'
import BackToBusiness from './pages/BackToBusiness'
import OurMPV from './pages/OurMPV'
import TheFinalRide from './pages/TheFinalRide'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/software" element={<Software />} />
      <Route path="/thefishbowl" element={<TheFishBowl />} />
      <Route path="/backtobusiness" element={<BackToBusiness />} />
      <Route path="/ourmpv" element={<OurMPV />} />
      <Route path="/thefinalride" element={<TheFinalRide />} />
    </Routes>
  )
}

export default App
