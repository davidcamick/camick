import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import davidImage from '../assets/davidpng.png';
import { InteractiveHoverButton } from '../components/InteractiveHoverButton';
import vid1 from '../assets/VID1.mp4';
import vid2 from '../assets/VID2.mp4';
import vid3 from '../assets/VID3.mp4';

function Videography() {
  const [fadeIn, setFadeIn] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [showArrow, setShowArrow] = useState(false);

  // For cycling words in the top section
  const words = ["Film", "Edit", "Code", "Develop", "Design", "Create"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [wordFade, setWordFade] = useState(true);

  useEffect(() => {
    const arrowTimer = setTimeout(() => setShowArrow(true), 3000);
    const fadeTimer = setTimeout(() => setFadeIn(true), 500);
    const handleScroll = () => {
      setParallaxOffset(window.scrollY * 0.5);
    };
    window.addEventListener('scroll', handleScroll);
    const interval = setInterval(() => {
      setWordFade(false);
      setTimeout(() => {
        setCurrentWordIndex(prev => (prev + 1) % words.length);
        setWordFade(true);
      }, 500);
    }, 2000);
    return () => {
      clearTimeout(arrowTimer);
      clearTimeout(fadeTimer);
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // --- Sticky Video Section Scroll Logic ---
  const videoSectionRef = useRef(null);
  const [videoProgress, setVideoProgress] = useState(0);
  useEffect(() => {
    const handleVideoScroll = () => {
      if (videoSectionRef.current) {
        const rect = videoSectionRef.current.getBoundingClientRect();
        const progress = Math.min(Math.max((window.innerHeight - rect.top) / rect.height, 0), 1);
        setVideoProgress(progress);
      }
    };
    window.addEventListener('scroll', handleVideoScroll);
    return () => window.removeEventListener('scroll', handleVideoScroll);
  }, []);

  // Define thresholds for video fade transitions:
  const t1 = 0.33, t2 = 0.38, t3 = 0.66, t4 = 0.71;
  let video1Opacity = 0, video2Opacity = 0, video3Opacity = 0;
  if (videoProgress <= t1) {
    video1Opacity = 1;
  } else if (videoProgress > t1 && videoProgress < t2) {
    video1Opacity = 1 - ((videoProgress - t1) / (t2 - t1));
  } else {
    video1Opacity = 0;
  }
  if (videoProgress <= t1) {
    video2Opacity = 0;
  } else if (videoProgress > t1 && videoProgress < t2) {
    video2Opacity = (videoProgress - t1) / (t2 - t1);
  } else if (videoProgress >= t2 && videoProgress <= t3) {
    video2Opacity = 1;
  } else if (videoProgress > t3 && videoProgress < t4) {
    video2Opacity = 1 - ((videoProgress - t3) / (t4 - t3));
  } else {
    video2Opacity = 0;
  }
  if (videoProgress <= t3) {
    video3Opacity = 0;
  } else if (videoProgress > t3 && videoProgress < t4) {
    video3Opacity = (videoProgress - t3) / (t4 - t3);
  } else {
    video3Opacity = 1;
  }

  // Overall fade for the video layer (and lower-thirds)
  const videoFadeInStart = 0.1, videoFadeInEnd = 0.15, videoFadeOutStart = 0.85, videoFadeOutEnd = 0.9;
  let overallVideoOpacity = 0;
  if (videoProgress < videoFadeInStart) {
    overallVideoOpacity = 0;
  } else if (videoProgress < videoFadeInEnd) {
    overallVideoOpacity = (videoProgress - videoFadeInStart) / (videoFadeInEnd - videoFadeInStart);
  } else if (videoProgress < videoFadeOutStart) {
    overallVideoOpacity = 1;
  } else if (videoProgress < videoFadeOutEnd) {
    overallVideoOpacity = 1 - ((videoProgress - videoFadeOutStart) / (videoFadeOutEnd - videoFadeOutStart));
  } else {
    overallVideoOpacity = 0;
  }

  // Header Text Overlay Logic
  const secondLineFadeStart = 0.52, secondLineFadeEnd = 0.57;
  const firstLineOpacity = 1;
  const secondLineOpacity = videoProgress < secondLineFadeStart
    ? 0
    : videoProgress < secondLineFadeEnd
      ? (videoProgress - secondLineFadeStart) / (secondLineFadeEnd - secondLineFadeStart)
      : 1;
  const headerFadeInStart = 0.1, headerFadeInEnd = 0.2;
  const headerOpacity = videoProgress < headerFadeInStart
    ? 0
    : videoProgress < headerFadeInEnd
      ? (videoProgress - headerFadeInStart) / (headerFadeInEnd - headerFadeInStart)
      : 1;

  const headerTextStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 10,
    width: '100%',
    textAlign: 'center',
    padding: '20px',
    transition: 'opacity 0.5s',
    opacity: headerOpacity
  };

  const computeColor = (opacity) => {
    const val = Math.round(128 + 127 * opacity);
    return `rgb(${val}, ${val}, ${val})`;
  };

  return (
    <>
      {/* Gradient Background Section */}
      <div className="relative">
        <section
          className="w-full h-[80vh]"
          style={{ background: 'linear-gradient(45deg, #003049, #669BBC)' }}
        >
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

      {/* Spacer */}
      <div className="h-[20vh]"></div>

      {/* Main Content on Black Background */}
      <div className="bg-black text-white">
        {/* Top Left-aligned Cycling Text */}
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
        {/* Right-aligned Descriptive Text */}
        <section className="py-16 mx-[15%] text-right">
          <p className="text-2xl">
            If I'm not on the sideline <span className="text-[#669BBC]">shooting</span>, in the creative room <span className="text-[#669BBC]">editing</span>,<br />
            or in my studio <span className="text-[#669BBC]">coding</span>, then I'm probably sleeping<br />
            because <span className="text-[#669BBC]">I don't do much else.</span>
          </p>
        </section>
        {/* Centered Title and Button Grid */}
        <section className="py-16 mx-[15%] flex flex-col items-center gap-8">
          <h2 className="text-6xl font-bold text-white mb-8 text-center">
            Now let me show you<br /> some of what I do
          </h2>
          <div className="grid grid-cols-2 gap-x-12 gap-y-8">
            <button
              onClick={() => window.location.href = "/thefishbowl"}
              className="group relative w-auto cursor-pointer overflow-hidden rounded-full border border-white bg-black p-2 px-6 text-center font-semibold transition-colors duration-300 hover:bg-[#C1121F] text-2xl"
            >
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-black transform transition-all duration-300 group-hover:scale-150 group-hover:bg-[#C1121F]"></div>
                <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
                  My Videography Work
                </span>
              </div>
              <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100">
                <span>My Videography Work</span>
              </div>
            </button>
            <button
              onClick={() => window.location.href = "/software"}
              className="group relative w-auto cursor-pointer overflow-hidden rounded-full border border-white bg-black p-2 px-6 text-center font-semibold transition-colors duration-300 hover:bg-[#C1121F] text-2xl"
            >
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-black transform transition-all duration-300 group-hover:scale-150 group-hover:bg-[#C1121F]"></div>
                <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
                  Software I've Developed
                </span>
              </div>
              <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100">
                <span>Software I've Developed</span>
              </div>
            </button>
          </div>
        </section>

        {/* NEW: Sticky Video Section */}
        <section ref={videoSectionRef} className="relative bg-black" style={{ height: '750vh' }}>
          <div className="sticky top-0 h-screen" style={{ width: '100%' }}>
            {/* Dark overlay */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.3)',
                zIndex: 5,
                opacity: overallVideoOpacity,
                transition: 'opacity 0.5s'
              }}
            ></div>
            {/* Background Video Container */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 4,
                opacity: overallVideoOpacity,
                transition: 'opacity 0.5s'
              }}
            >
              <video
                src={vid1}
                autoPlay
                muted
                loop
                playsInline
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: videoProgress <= t1 ? 1 : videoProgress < t2 ? 1 - ((videoProgress - t1) / (t2 - t1)) : 0,
                  transition: 'opacity 0.5s'
                }}
              />
              <video
                src={vid2}
                autoPlay
                muted
                loop
                playsInline
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity:
                    videoProgress <= t1
                      ? 0
                      : videoProgress > t1 && videoProgress < t2
                        ? (videoProgress - t1) / (t2 - t1)
                        : videoProgress >= t2 && videoProgress <= t3
                          ? 1
                          : videoProgress > t3 && videoProgress < t4
                            ? 1 - ((videoProgress - t3) / (t4 - t3))
                            : 0,
                  transition: 'opacity 0.5s'
                }}
              />
              <video
                src={vid3}
                autoPlay
                muted
                loop
                playsInline
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: videoProgress <= t3 ? 0 : videoProgress > t3 && videoProgress < t4 ? (videoProgress - t3) / (t4 - t3) : 1,
                  transition: 'opacity 0.5s'
                }}
              />
            </div>
            {/* Header Text Overlay */}
            <div style={headerTextStyle}>
              <div style={{ marginBottom: '20px', opacity: firstLineOpacity, transition: 'opacity 0.5s' }}>
                <h2 className="text-6xl font-bold" style={{ color: 'white' }}>
                  For the past 8 years I've been creating films...
                </h2>
              </div>
              <div style={{ opacity: secondLineOpacity, transition: 'opacity 0.5s' }}>
                <h2 className="text-6xl font-bold" style={{ color: 'white' }}>
                  and I have loved every second of it.
                </h2>
              </div>
            </div>
            {/* Lower-Thirds Text */}
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                zIndex: 20,
                textAlign: 'left',
                lineHeight: '1.5rem',
                transition: 'opacity 0.5s',
                opacity: overallVideoOpacity
              }}
            >
              <div style={{ fontSize: '1.25rem', color: computeColor(video1Opacity) }}>
                2018 - Gaming gave me the chance to learn how to edit
              </div>
              <div style={{ fontSize: '1.25rem', color: computeColor(video2Opacity) }}>
                2021 - Now owning a camera, I got a chance to make videos IRL
              </div>
              <div style={{ fontSize: '1.25rem', color: computeColor(video3Opacity) }}>
                2023 - Loved making sports edits for my favorite athletes
              </div>
            </div>
          </div>
        </section>

        {/* Horizontal Gradient Section */}
        <section className="relative">
          <div
            className="w-full"
            style={{
              height: '400px',
              background: 'linear-gradient(to bottom, #000000, #003049)'
            }}
          ></div>
        </section>

        {/* Cover Video Section */}
        <section className="py-16" style={{ backgroundColor: '#003049', color: '#FDF0D5' }}>
          <div className="mx-[15%] flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-5xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
                Here's what I did in 2024.
              </h3>
              <p className="text-2xl mb-4">
                2024 was a year full of great experiences, thrilling games and a <br />
                year where I would capture some of my favorite shots ever. The <br />
                only hard part about 2024 was fitting it all into one video.
              </p>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <div className="w-full max-w-lg rounded-lg overflow-hidden">
                <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
                  <iframe
                    src="https://player.vimeo.com/video/1048024218?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    title="SPX Football Banquet Video 2024-25"
                  ></iframe>
                </div>
              </div>
              <div className="mt-4 text-xl text-center">
                Cover Video 2024 - David Camick
              </div>
            </div>
          </div>
        </section>

        {/* Individual Projects Section */}
        <section className="py-16" style={{ backgroundColor: '#003049', color: '#FDF0D5' }}>
          <div className="mx-[15%]">
            <h3 className="text-4xl font-bold text-center mb-8">
              My Individual Projects
            </h3>
            <div className="flex flex-col items-center gap-8">
              <button
                onClick={() => window.location.href = "/thefishbowl"}
                className="group relative w-auto cursor-pointer overflow-hidden rounded-full border border-white bg-black p-2 px-6 text-center font-semibold transition-colors duration-300 hover:bg-[#C1121F] text-2xl"
              >
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-black transform transition-all duration-300 group-hover:scale-150 group-hover:bg-[#C1121F]"></div>
                  <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
                    The Fish Bowl, Marist Video
                  </span>
                </div>
                <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100">
                  <span>The Fish Bowl, Marist Video</span>
                </div>
              </button>
              <button
                onClick={() => window.location.href = "/backtobusiness"}
                className="group relative w-auto cursor-pointer overflow-hidden rounded-full border border-white bg-black p-2 px-6 text-center font-semibold transition-colors duration-300 hover:bg-[#C1121F] text-2xl"
              >
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-black transform transition-all duration-300 group-hover:scale-150 group-hover:bg-[#C1121F]"></div>
                  <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
                    Back To Business Ft. Liam Mullins
                  </span>
                </div>
                <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100">
                  <span>Back To Business Ft. Liam Mullins</span>
                </div>
              </button>
              <button
                onClick={() => window.location.href = "/ourmpv"}
                className="group relative w-auto cursor-pointer overflow-hidden rounded-full border border-white bg-black p-2 px-6 text-center font-semibold transition-colors duration-300 hover:bg-[#C1121F] text-2xl"
              >
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-black transform transition-all duration-300 group-hover:scale-150 group-hover:bg-[#C1121F]"></div>
                  <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
                    The Final Ride - My last Highschool Football Video
                  </span>
                </div>
                <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100">
                  <span>The Final Ride - My last Highschool Football Video</span>
                </div>
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Videography;
