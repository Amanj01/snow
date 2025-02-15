"use client"

import { useState, useEffect } from "react"

export const useSlider = (images, interval = 5000) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [images, interval])

  return currentIndex
}

