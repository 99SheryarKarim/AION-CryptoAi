"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import Home from "./pages/Home"
import ContactUs from "./pages/ContactUs/Contact"
import Coins from "./pages/Coins/Coins"
import Predict from "./pages/Predict/Predict"
import GoPro from "./pages/GoPro/GoPro"
import Portfolio from "./pages/Portfolio/Portfolio"
import Signup from "./pages/Signup/Signup"
import Info from "./pages/Info/Info"
import Header from "./pages/Header/Header"
import Loader from "./sections/HomeComponents/Loader/Loader"

function App() {
  const [showButton, setShowButton] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleLoadingComplete = () => {
    // Add a small delay before hiding the loader for a smoother transition
    setTimeout(() => {
      setLoading(false)
      // Enable scrolling on the body once loaded
      document.body.style.overflow = "auto"
    }, 500)
  }

  // Disable scrolling while loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden"
    }
  }, [loading])

  return (
    <>
      {loading && <Loader onLoadingComplete={handleLoadingComplete} />}

      <div style={{ opacity: loading ? 0 : 1, transition: "opacity 0.5s ease" }}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/coins" element={<Coins />} />
            <Route path="/predict" element={<Predict />} />
            <Route path="/gopro" element={<GoPro />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/info" element={<Info />} />
          </Routes>

          {showButton && (
            <button
              onClick={scrollToTop}
              style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                padding: "12px 18px",
                borderRadius: "8px",
                fontSize: "16px",
                cursor: "pointer",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                transition: "all 0.3s ease",
              }}
            >
              ↑
            </button>
          )}
        </Router>
      </div>
    </>
  )
}

export default App

