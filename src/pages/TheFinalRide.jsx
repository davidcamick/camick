import React from 'react'
import { Link } from 'react-router-dom'

function TheFinalRide() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">The Final Ride - My last Highschool Football Video</h1>
      <p className="text-lg mb-8">Details about The Final Ride project.</p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Back to Home
      </Link>
    </div>
  )
}

export default TheFinalRide
