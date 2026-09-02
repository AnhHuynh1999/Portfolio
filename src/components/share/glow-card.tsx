import React, { useEffect, useRef, useState } from 'react'
import './glow-card.scss'

const GlowCard = ({ children, identifier }: { children: React.ReactNode; identifier: string }) => {
  const [activeCard, setActiveCard] = useState<number>(0)
  const [start, setStart] = useState<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    setActiveCard(1)
  }

  const handleMouseLeave = () => {
    setActiveCard(0)
  }

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        // Tính góc (radian) giữa tâm và vị trí con trỏ
        const radian = Math.atan2(event.clientY - centerY, event.clientX - centerX)
        // Chuyển đổi sang độ
        const degree = radian * (180 / Math.PI) + 90
        setStart(degree)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Cleanup khi component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div
      className={`glow-container ${identifier}`}
      style={{ '--gap': 32, '--blur': 12, '--spread': 80, '--direction': 'row' } as React.CSSProperties}
      ref={containerRef}
    >
      <article
        className={`glow-card ${identifier}`}
        style={{ '--active': activeCard, '--start': start } as React.CSSProperties}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className='glows'></div>
        {children}
      </article>
    </div>
  )
}

export default GlowCard
