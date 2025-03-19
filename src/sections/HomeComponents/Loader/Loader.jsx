"use client"

import { useEffect, useState } from "react"
import "./loader.css"

const Loader = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress((prev) => Math.min(prev + 1, 100))
      } else {
        onLoadingComplete()
      }
    }, 30)

    return () => clearTimeout(timer)
  }, [progress, onLoadingComplete])

  return (
    <div className="loader-container">
      <div className="loader-content">
        <div className="logo-container">
          <svg className="crypto-logo" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <path
              className="logo-path"
              d="M32 0C14.327 0 0 14.327 0 32c0 17.673 14.327 32 32 32s32-14.327 32-32C64 14.327 49.673 0 32 0zm0 5.333c14.727 0 26.667 11.94 26.667 26.667 0 14.727-11.94 26.667-26.667 26.667-14.727 0-26.667-11.94-26.667-26.667C5.333 17.273 17.273 5.333 32 5.333z"
            />
            <path
              className="logo-path"
              d="M42.667 29.333h-8V16c0-1.473-1.194-2.667-2.667-2.667-1.473 0-2.667 1.194-2.667 2.667v13.333h-8c-1.473 0-2.667 1.194-2.667 2.667 0 1.473 1.194 2.667 2.667 2.667h8V48c0 1.473 1.194 2.667 2.667 2.667 1.473 0 2.667-1.194 2.667-2.667V34.667h8c1.473 0 2.667-1.194 2.667-2.667 0-1.473-1.194-2.667-2.667-2.667z"
            />
          </svg>
        </div>

        <h1 className="loader-title">AION-AI</h1>

        <div className="loader-subtitle">Professional Trading Solutions</div>

        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}>
            <div className="progress-glow"></div>
          </div>
          <div className="progress-text">{progress}%</div>
        </div>

        <div className="loader-blocks">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="loader-block"
              style={{
                opacity: progress > index * 16 ? 1 : 0.2,
                transform: progress > index * 16 ? "translateY(0)" : "translateY(10px)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Loader
