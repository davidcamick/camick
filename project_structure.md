this is my project, please read the contents and understand its functionality. once done, let me know and await my requests.

`_files`
==============
`src`
==============
  - `index.css`
  - `main.jsx`
  - `app.jsx`

  `assets`
  ==============
    - `davidpng.png`

  `pages`
  ==============
    - `Landing.jsx`
    - `TheFishBowl.jsx`
    - `Software.jsx`
    - `BackToBusiness.jsx`
    - `TheFinalRide.jsx`
    - `OurMPV.jsx`


## Included Files with Code

### src/index.css

``` 
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: black;
}
```

### src/main.jsx

``` 
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './app'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
```

### src/app.jsx

``` 
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
```

### src/pages/Landing.jsx

``` 
import React, { useState, useEffect } from 'react'
import davidImage from '../assets/davidpng.png'

function Landing() {
  const [fadeIn, setFadeIn] = useState(false)
  const [parallaxOffset, setParallaxOffset] = useState(0)
  const [showArrow, setShowArrow] = useState(false)
  
  // For cycling words
  const words = ["Film", "Edit", "Code", "Develop", "Design", "Create"]
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [wordFade, setWordFade] = useState(true)

  useEffect(() => {
    const arrowTimer = setTimeout(() => setShowArrow(true), 3000)
    const fadeTimer = setTimeout(() => setFadeIn(true), 500)

    const handleScroll = () => {
      setParallaxOffset(window.scrollY * 0.5)
    }
    window.addEventListener('scroll', handleScroll)

    const interval = setInterval(() => {
      setWordFade(false)
      setTimeout(() => {
        setCurrentWordIndex(prev => (prev + 1) % words.length)
        setWordFade(true)
      }, 500)
    }, 2000)

    return () => {
      clearTimeout(arrowTimer)
      clearTimeout(fadeTimer)
      clearInterval(interval)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      {/* Container for the gradient background with parallax content */}
      <div className="relative">
        {/* Section 1: Gradient Background (80vh) */}
        <section
          className="w-full h-[80vh]"
          style={{
            background: 'linear-gradient(45deg, #003049, #669BBC)'
          }}
        >
          {/* Parallax container with 15% left/right margins */}
          <div
            className="absolute left-[15%] right-[15%] flex items-center justify-between transition-transform duration-300 hover:scale-105"
            style={{
              top: '50%',
              transform: `translateY(calc(-50% + ${parallaxOffset}px))`,
              opacity: fadeIn ? 1 : 0,
              transition: 'opacity 1s ease 0.5s',
              zIndex: 0
            }}
          >
            <img src={davidImage} alt="David" className="w-96 h-auto" />
            <div className="text-white text-6xl font-bold">
              Hi, I'm<br />David Camick
            </div>
          </div>
        </section>

        {/* Section 2: Black Bar with Arrow Prompt (20vh), overlaid on the bottom of the gradient */}
        <section
          className="absolute top-[80vh] left-0 w-full h-[20vh] bg-black z-10 flex items-center justify-center"
        >
          {showArrow && (
            <svg
              className="w-8 h-8 text-white animate-bounce"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </section>
      </div>

      {/* Spacer div to ensure subsequent content starts after the black bar */}
      <div className="h-[20vh]"></div>

      {/* Section 3: Lower Content on Black Background (Left-aligned cycling text) */}
      <div className="bg-black text-white">
        <section className="pt-0 pb-16 mx-[15%]">
          <div className="text-6xl font-bold mb-4">I live in Atlanta, Georgia</div>
          <div className="text-6xl font-bold">
            And I love to{' '}
            <span
              style={{
                transition: 'opacity 0.5s',
                opacity: wordFade ? 1 : 0,
                color: '#669BBC'
              }}
            >
              {words[currentWordIndex]}
            </span>
          </div>
        </section>

        {/* Section 4: Right-Aligned Text Block with Custom Line Breaks */}
        <section className="py-16 mx-[15%] text-right">
          <p className="text-2xl">
            If I'm not on the sideline <span className="text-[#669BBC]">shooting</span>, in the creative room <span className="text-[#669BBC]">editing</span>,<br/>
            or in my studio <span className="text-[#669BBC]">coding</span>, then I'm probably sleeping<br/>
            because <span className="text-[#669BBC]">I don't do much else.</span>
          </p>
        </section>
      </div>
    </>
  )
}

export default Landing
```

### src/pages/TheFishBowl.jsx

``` 
import React from 'react'
import { Link } from 'react-router-dom'

function TheFishBowl() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">The Fish Bowl, Marist Video</h1>
      <p className="text-lg mb-8">Details about The Fish Bowl project.</p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Back to Home
      </Link>
    </div>
  )
}

export default TheFishBowl
```

### src/pages/Software.jsx

``` 
import React from 'react'
import { Link } from 'react-router-dom'

function Software() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">Software I’ve Developed</h1>
      <p className="text-lg mb-8">This page will showcase my software projects.</p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Back to Home
      </Link>
    </div>
  )
}

export default Software
```

### src/pages/BackToBusiness.jsx

``` 
import React from 'react'
import { Link } from 'react-router-dom'

function BackToBusiness() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">Back To Business Ft. Liam Mullins</h1>
      <p className="text-lg mb-8">Details about the Back To Business project.</p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Back to Home
      </Link>
    </div>
  )
}

export default BackToBusiness
```

### src/pages/TheFinalRide.jsx

``` 
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
```

### src/pages/OurMPV.jsx

``` 
import React from 'react'
import { Link } from 'react-router-dom'

function OurMPV() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">Our MVP ft Overtime and Jahki Howard</h1>
      <p className="text-lg mb-8">Details about the Our MVP project.</p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Back to Home
      </Link>
    </div>
  )
}

export default OurMPV
```

