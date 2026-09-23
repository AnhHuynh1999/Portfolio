import React, { useState, useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  FaHeart,
  FaHome,
  FaMusic,
  FaVolumeMute,
  FaShareAlt,
  FaCheck,
  FaRegPaperPlane,
  FaGlassCheers,
  FaShieldAlt,
  FaUtensils,
  FaKissWinkHeart,
  FaRegHeart,
  // FaCalendarAlt,
  FaClock
} from 'react-icons/fa'
import { BsStars, BsEnvelopeHeartFill } from 'react-icons/bs'
import Typewriter from 'typewriter-effect'
import 'styles/love.scss'

const NO_TEXT_LIST = [
  'Từ chối',
  'Ơ kìa, suy nghĩ lại đii mà 🥺',
  'Nút này bị kẹt rùi á :<',
  'Đừng bấm nút này mà huhu',
  'Chỉ được chọn Đồng Ý thuii',
  'Bấm Yes đi, tớ bao trà sữa cả đời! 🧋',
  'Tớ nấu ăn siêu ngon luôn á 🍳',
  'Thương tớ một xíu đii 💕',
  'Cậu trốn không thoát tớ đâuuu 😜',
  'Cho một cơ hội điii mà 🥺❤️'
]

const LovePage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const rawCrushName = searchParams.get('name')
  const rawFromName = searchParams.get('from')

  const [crushName, setCrushName] = useState(rawCrushName || 'Cậu')
  const [fromName, setFromName] = useState(rawFromName || 'Tớ')

  const [inputCrush, setInputCrush] = useState('')
  const [inputFrom, setInputFrom] = useState('')
  const [showConfig, setShowConfig] = useState(false)

  // Stages: 'envelope' | 'question' | 'accepted'
  const [stage, setStage] = useState<'envelope' | 'question' | 'accepted'>('envelope')
  const [noCount, setNoCount] = useState(0)
  const [noBtnPos, setNoBtnPos] = useState<{ x: number; y: number } | null>(null)
  const [isCopied, setIsCopied] = useState(false)
  const [isMsgCopied, setIsMsgCopied] = useState(false)

  // Live timer since "Yes" clicked
  const [acceptedTime, setAcceptedTime] = useState<Date | null>(null)
  const [timeElapsed, setTimeElapsed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  // Music synthesis state
  const [isPlayingMusic, setIsPlayingMusic] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const musicTimerRef = useRef<number | null>(null)

  // Canvas refs
  const heartsCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const confettiCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const letterRef = useRef<HTMLDivElement | null>(null)

  // Storage key helper for persistence
  const FOUR_HOURS_MS = 4 * 60 * 60 * 1000

  // Storage key helper for persistence
  const getStorageKey = (cName = crushName, fName = fromName) => {
    return `love_accepted_v2_${encodeURIComponent(cName)}_${encodeURIComponent(fName)}`
  }

  // Sync params with URL if changed
  useEffect(() => {
    if (rawCrushName) setCrushName(rawCrushName)
    if (rawFromName) setFromName(rawFromName)
  }, [rawCrushName, rawFromName])

  // Check if love proposal was already accepted previously (activated only once, persists continuously)
  useEffect(() => {
    if (searchParams.get('reset') === 'true') {
      const key = getStorageKey()
      localStorage.removeItem(key)
      localStorage.removeItem('love_accepted_v2_global')
      localStorage.removeItem('love_accepted_v1_global')
      return
    }

    const key = getStorageKey()
    const savedTime =
      localStorage.getItem(key) ||
      localStorage.getItem('love_accepted_v2_global')

    if (savedTime) {
      const parsedDate = new Date(savedTime)
      if (!isNaN(parsedDate.getTime())) {
        setAcceptedTime(parsedDate)
        setStage('accepted')
        return
      }
    }

    // Auto-migrate any previously saved v1 timestamp by shifting back 4 hours
    const v1SavedTime =
      localStorage.getItem(`love_accepted_v1_${encodeURIComponent(crushName)}_${encodeURIComponent(fromName)}`) ||
      localStorage.getItem('love_accepted_v1_global')
    if (v1SavedTime) {
      const parsedV1 = new Date(v1SavedTime)
      if (!isNaN(parsedV1.getTime())) {
        const offsetDate = new Date(parsedV1.getTime() - FOUR_HOURS_MS)
        localStorage.setItem(key, offsetDate.toISOString())
        localStorage.setItem('love_accepted_v2_global', offsetDate.toISOString())
        setAcceptedTime(offsetDate)
        setStage('accepted')
      }
    }
  }, [crushName, fromName, searchParams])

  // Timer tick effect when stage === 'accepted' (runs continuously from the saved moment)
  useEffect(() => {
    if (stage !== 'accepted' || !acceptedTime) return

    const updateTimer = () => {
      const now = new Date().getTime()
      const diff = Math.max(0, now - acceptedTime.getTime())

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeElapsed({ days, hours, minutes, seconds })
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [stage, acceptedTime])

  // Auto-scroll screen so the currently typed text / cursor stays centered in viewport
  useEffect(() => {
    if (stage !== 'question') return

    const handleScrollToActiveText = () => {
      if (!letterRef.current) return
      const cursor = letterRef.current.querySelector('.Typewriter__cursor') as HTMLElement | null
      const target = cursor || letterRef.current
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }

    let scrollTimer: number | null = null
    const observer = new MutationObserver(() => {
      if (scrollTimer) return
      scrollTimer = window.setTimeout(() => {
        scrollTimer = null
        handleScrollToActiveText()
      }, 100)
    })

    if (letterRef.current) {
      observer.observe(letterRef.current, {
        childList: true,
        subtree: true,
        characterData: true
      })
      // Initial smooth scroll to center the letter card
      letterRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    return () => {
      observer.disconnect()
      if (scrollTimer) clearTimeout(scrollTimer)
    }
  }, [stage])

  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      audioCtxRef.current = new AudioCtx()
    }
    const ctx = audioCtxRef.current
    if (ctx.state === 'suspended') {
      ctx.resume()
    }
    return ctx
  }

  // Play romantic music box notes using Web Audio API (Stage 1 & 2)
  const playRomanticChords = () => {
    const ctx = getAudioContext()

    // Romantic music box pentatonic / lyrical notes in Hz
    const melodyNotes = [
      523.25, 659.25, 783.99, 987.77, 1046.5, // C5, E5, G5, B5, C6
      880.0, 783.99, 659.25, 587.33, 659.25,  // A5, G5, E5, D5, E5
      698.46, 880.0, 1046.5, 987.77, 783.99,  // F5, A5, C6, B5, G5
      587.33, 783.99, 880.0, 659.25, 523.25   // D5, G5, A5, E5, C5
    ]

    let noteIdx = 0
    const playNext = () => {
      if (!audioCtxRef.current || !ctx || ctx.state === 'closed' || ctx.state === 'suspended') return
      const freq = melodyNotes[noteIdx % melodyNotes.length]
      noteIdx++

      // Create primary harmonic oscillator
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      // Bell-like chime: sine with subtle harmonic
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, ctx.currentTime)

      gain.gain.setValueAtTime(0.0001, ctx.currentTime)
      gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 1.9)

      musicTimerRef.current = window.setTimeout(playNext, 550)
    }

    playNext()
  }

  // Play celebratory love theme with upbeat rhythm & harmony (Stage 3)
  const playCelebrationTheme = () => {
    const ctx = getAudioContext()

    // Upbeat joyous love melody (C - G - Am - F celebratory theme)
    const celebrationNotes = [
      { freq: 523.25, harm: 261.63 }, // C5 + C4
      { freq: 659.25, harm: 329.63 }, // E5 + E4
      { freq: 783.99, harm: 392.0 },  // G5 + G4
      { freq: 1046.5, harm: 523.25 }, // C6 + C5
      { freq: 987.77, harm: 493.88 }, // B5 + B4
      { freq: 783.99, harm: 392.0 },  // G5 + G4
      { freq: 880.0, harm: 440.0 },   // A5 + A4
      { freq: 1046.5, harm: 523.25 }, // C6 + C5
      { freq: 880.0, harm: 440.0 },   // A5 + A4
      { freq: 783.99, harm: 392.0 },  // G5 + G4
      { freq: 659.25, harm: 329.63 }, // E5 + E4
      { freq: 783.99, harm: 392.0 },  // G5 + G4
      { freq: 698.46, harm: 349.23 }, // F5 + F4
      { freq: 880.0, harm: 440.0 },   // A5 + A4
      { freq: 1046.5, harm: 523.25 }, // C6 + C5
      { freq: 1174.66, harm: 587.33 },// D6 + D5
      { freq: 1046.5, harm: 523.25 }, // C6 + C5
      { freq: 987.77, harm: 493.88 }, // B5 + B4
      { freq: 1046.5, harm: 523.25 }  // C6 + C5
    ]

    let noteIdx = 0
    const playNextNote = () => {
      if (!audioCtxRef.current || !ctx || ctx.state === 'closed' || ctx.state === 'suspended') return
      const note = celebrationNotes[noteIdx % celebrationNotes.length]
      noteIdx++

      // Lead melodic chime (bright triangle wave)
      const osc1 = ctx.createOscillator()
      const gain1 = ctx.createGain()
      osc1.type = 'triangle'
      osc1.frequency.setValueAtTime(note.freq, ctx.currentTime)
      gain1.gain.setValueAtTime(0.0001, ctx.currentTime)
      gain1.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.04)
      gain1.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2)
      osc1.connect(gain1)
      gain1.connect(ctx.destination)
      osc1.start()
      osc1.stop(ctx.currentTime + 1.3)

      // Warm harmony bass/pad (smooth sine wave)
      const osc2 = ctx.createOscillator()
      const gain2 = ctx.createGain()
      osc2.type = 'sine'
      osc2.frequency.setValueAtTime(note.harm, ctx.currentTime)
      gain2.gain.setValueAtTime(0.0001, ctx.currentTime)
      gain2.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.05)
      gain2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.0)
      osc2.connect(gain2)
      gain2.connect(ctx.destination)
      osc2.start()
      osc2.stop(ctx.currentTime + 1.1)

      musicTimerRef.current = window.setTimeout(playNextNote, 320)
    }

    playNextNote()
  }

  // Play a celebratory chime sound when accepted
  const playCelebrationChime = () => {
    const ctx = getAudioContext()

    const chords = [523.25, 659.25, 783.99, 1046.5, 1318.51]
    chords.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1)

      gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.1)
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + idx * 0.1 + 0.03)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.1 + 1.2)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(ctx.currentTime + idx * 0.1)
      osc.stop(ctx.currentTime + idx * 0.1 + 1.3)
    })
  }

  const stopMusic = () => {
    if (musicTimerRef.current) {
      clearTimeout(musicTimerRef.current)
      musicTimerRef.current = null
    }
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.suspend()
      } catch {
        // ignore
      }
    }
    setIsPlayingMusic(false)
  }

  const toggleMusic = () => {
    if (isPlayingMusic) {
      stopMusic()
    } else {
      if (stage === 'accepted') {
        playCelebrationTheme()
      } else {
        playRomanticChords()
      }
      setIsPlayingMusic(true)
    }
  }

  // Stop music and close AudioContext when component unmounts (user navigates to another page)
  useEffect(() => {
    return () => {
      if (musicTimerRef.current) {
        clearTimeout(musicTimerRef.current)
        musicTimerRef.current = null
      }
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close()
        } catch {
          // ignore
        }
        audioCtxRef.current = null
      }
    }
  }, [])

  // Floating Hearts background canvas animation
  useEffect(() => {
    const canvas = heartsCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    interface HeartParticle {
      x: number
      y: number
      size: number
      speedY: number
      speedX: number
      opacity: number
      hue: number
    }

    const hearts: HeartParticle[] = Array.from({ length: 32 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 16 + 10,
      speedY: Math.random() * 0.9 + 0.4,
      speedX: (Math.random() - 0.5) * 0.6,
      opacity: Math.random() * 0.45 + 0.2,
      hue: 330 + Math.random() * 30
    }))

    const drawHeart = (x: number, y: number, size: number, opacity: number, hue: number) => {
      ctx.save()
      ctx.beginPath()
      ctx.translate(x, y)
      ctx.scale(size / 30, size / 30)
      ctx.fillStyle = `hsla(${hue}, 90%, 65%, ${opacity})`

      ctx.moveTo(0, 0)
      ctx.bezierCurveTo(-15, -15, -30, 10, 0, 30)
      ctx.bezierCurveTo(30, 10, 15, -15, 0, 0)
      ctx.fill()
      ctx.restore()
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      hearts.forEach((h) => {
        drawHeart(h.x, h.y, h.size, h.opacity, h.hue)
        h.y -= h.speedY
        h.x += h.speedX
        if (h.y < -40) {
          h.y = height + 20
          h.x = Math.random() * width
        }
      })
      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Confetti / Fireworks effect when accepted
  useEffect(() => {
    if (stage !== 'accepted') return
    const canvas = confettiCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    const width = (canvas.width = window.innerWidth)
    const height = (canvas.height = window.innerHeight)

    interface Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
      alpha: number
      decay: number
      rotation: number
      vRot: number
    }

    const colors = ['#ff2a85', '#ff758c', '#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff', '#ffffff']
    const particles: Particle[] = []

    const spawnBurst = (originX: number, originY: number) => {
      for (let i = 0; i < 75; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 8 + 3
        particles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2,
          size: Math.random() * 8 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: Math.random() * 0.015 + 0.008,
          rotation: Math.random() * 360,
          vRot: (Math.random() - 0.5) * 10
        })
      }
    }

    // Launch multiple celebratory bursts
    spawnBurst(width / 2, height / 2 - 50)
    spawnBurst(width * 0.25, height * 0.35)
    spawnBurst(width * 0.75, height * 0.35)

    const interval = setInterval(() => {
      spawnBurst(Math.random() * width, Math.random() * (height * 0.6))
    }, 1100)

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.12 // gravity
        p.alpha -= p.decay
        p.rotation += p.vRot

        if (p.alpha <= 0) {
          particles.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6)
        ctx.restore()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      clearInterval(interval)
      cancelAnimationFrame(animationFrameId)
    }
  }, [stage])

  // Move "Từ chối" button to a random position
  const dodgeNoButton = () => {
    setNoCount((prev) => prev + 1)
    const randomX = (Math.random() - 0.5) * 280
    const randomY = (Math.random() - 0.5) * 180
    setNoBtnPos({ x: randomX, y: randomY })
  }

  // Handle Envelope Open
  const handleOpenEnvelope = () => {
    setStage('question')
    if (!isPlayingMusic) {
      toggleMusic()
    }
  }

  // Handle Yes click
  const handleAccept = () => {
    setStage('accepted')

    // Activated only once: starts from 4 hours ago, locked to the first time "Đồng ý" is clicked
    const key = getStorageKey()
    const existing =
      localStorage.getItem(key) ||
      localStorage.getItem('love_accepted_v2_global')

    let targetDate = new Date(Date.now() - FOUR_HOURS_MS)
    if (existing) {
      const parsed = new Date(existing)
      if (!isNaN(parsed.getTime())) {
        targetDate = parsed
      }
    } else {
      localStorage.setItem(key, targetDate.toISOString())
      localStorage.setItem('love_accepted_v2_global', targetDate.toISOString())
    }

    setAcceptedTime(targetDate)

    // Stop previous romantic melody
    stopMusic()

    // Play sparkling fanfare chord, then automatically switch to celebratory love theme
    playCelebrationChime()
    setTimeout(() => {
      playCelebrationTheme()
      setIsPlayingMusic(true)
    }, 600)
  }

  // Share link handler
  const handleShareLink = () => {
    const url = new URL(window.location.href)
    if (crushName && crushName !== 'Cậu') {
      url.searchParams.set('name', crushName)
    }
    if (fromName && fromName !== 'Tớ') {
      url.searchParams.set('from', fromName)
    }
    navigator.clipboard.writeText(url.toString())
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2500)
  }

  // Copy love response to clipboard
  const handleCopyLoveMsg = () => {
    const msg = `Dạ tớ đồng ý làm người yêu của ${fromName} rồi đó nha! ❤️ Hẹn gặp nhau ở buổi hẹn đầu tiên nha 🥰`
    navigator.clipboard.writeText(msg)
    setIsMsgCopied(true)
    setTimeout(() => setIsMsgCopied(false), 2500)
  }

  // Save custom names
  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault()
    const newCrush = inputCrush.trim() || crushName
    const newFrom = inputFrom.trim() || fromName

    setCrushName(newCrush)
    setFromName(newFrom)

    const params: Record<string, string> = {}
    if (newCrush && newCrush !== 'Cậu') params.name = newCrush
    if (newFrom && newFrom !== 'Tớ') params.from = newFrom
    setSearchParams(params)

    setShowConfig(false)
    setInputCrush('')
    setInputFrom('')
  }

  // Calculate dynamic scale for Yes button
  const yesScale = Math.min(1 + noCount * 0.16, 2.2)

  return (
    <div className='love-page-wrapper'>
      {/* Ambient Orbs */}
      <div className='love-bg-ambient'>
        <div className='love-orb orb-1' />
        <div className='love-orb orb-2' />
        <div className='love-orb orb-3' />
      </div>

      {/* Background Hearts */}
      <canvas ref={heartsCanvasRef} className='love-hearts-canvas' />

      {/* Confetti Canvas */}
      {stage === 'accepted' && <canvas ref={confettiCanvasRef} className='love-confetti-canvas' />}

      <div className='love-container'>
        {/* Discreet Navigation Bar */}
        <nav className='love-nav-bar'>
          <Link to='/' onClick={stopMusic} className='back-home-btn' title='Về lại Portfolio'>
            <FaHome /> <span>Về trang chủ</span>
          </Link>

          <div className='d-flex align-items-center gap-2'>
            <button
              onClick={toggleMusic}
              className={`music-btn ${isPlayingMusic ? 'playing' : ''}`}
              title={isPlayingMusic ? 'Tắt giai điệu' : 'Bật điệu nhạc lãng mạn'}
            >
              {isPlayingMusic ? <FaMusic className='animate-spin' /> : <FaVolumeMute />}
              <span>{isPlayingMusic ? 'Đang bật nhạc' : 'Bật nhạc'}</span>
            </button>

            <button onClick={handleShareLink} className='share-btn' title='Sao chép link gửi cho crush'>
              {isCopied ? <FaCheck className='text-success' /> : <FaShareAlt />}
              <span>{isCopied ? 'Đã sao chép link!' : 'Chia sẻ link'}</span>
            </button>
          </div>
        </nav>

        {/* STAGE 1: ENVELOPE INVITATION */}
        {stage === 'envelope' && (
          <div className='love-card-glass'>
            <div className='love-badge'>
              <BsStars /> <span>Thông điệp bí mật gửi riêng cho {crushName}</span>
            </div>

            <h1 className='love-title'>Gửi {crushName} thân mến! ✨</h1>
            <p className='love-subtitle'>
              Có một bức thư được gói ghém bằng tất cả sự chân thành của {fromName} đang chờ cậu mở ra...
            </p>

            <div className='envelope-wrapper' onClick={handleOpenEnvelope}>
              <div className='envelope-box'>
                <div className='envelope-flap' />
                <div className='envelope-seal'>
                  <BsEnvelopeHeartFill />
                </div>
              </div>
            </div>

            <p className='text-white-50 mt-3 pulse-hint' style={{ fontSize: '0.9rem' }}>
              👉 Chạm vào chiếc phong bì để mở thư nhé!
            </p>

            {/* Custom Name Option */}
            <div className='mt-3'>
              <button
                type='button'
                className='name-customizer-toggle'
                onClick={() => setShowConfig(!showConfig)}
              >
                {showConfig ? 'Đóng tùy chỉnh' : '✏️ Tùy chỉnh tên người gửi / người nhận'}
              </button>

              {showConfig && (
                <form onSubmit={handleSaveConfig} className='name-config-card'>
                  <div className='input-row'>
                    <label>Tên Crush:</label>
                    <input
                      type='text'
                      placeholder={crushName}
                      value={inputCrush}
                      onChange={(e) => setInputCrush(e.target.value)}
                    />
                  </div>
                  <div className='input-row'>
                    <label>Tên của bạn:</label>
                    <input
                      type='text'
                      placeholder={fromName}
                      value={inputFrom}
                      onChange={(e) => setInputFrom(e.target.value)}
                    />
                  </div>
                  <button type='submit' className='save-config-btn'>
                    Lưu & Cập nhật link
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* STAGE 2: THE CONFESSION QUESTION */}
        {stage === 'question' && (
          <div className='love-card-glass'>
            <div className='love-badge'>
              <FaHeart /> <span>Lời tỏ tình chân thành từ {fromName}</span>
            </div>

            <h1 className='love-title'>{crushName} ơiii! ❤️</h1>

            {/* Typewriter Effect for romantic letter */}
            <div className='love-letter-paper' ref={letterRef}>
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .changeDelay(30)
                    .typeString(
                      `Từ ngày biết đến ${crushName}, ${fromName} nhận ra mình bắt đầu có thêm một người để mong chờ, để quan tâm và để nhớ đến mỗi ngày. ❤️<br />
${fromName} không giỏi nói những lời hoa mỹ, chỉ biết rằng ${fromName} thật lòng muốn ở bên, quan tâm và cùng ${crushName} chia sẻ thật nhiều điều trên chặng đường phía trước. Nếu ${crushName} đồng ý, cho ${fromName} một cơ hội để biến những điều đó thành thật nha. ❤️`
                    )
                    .callFunction(() => {
                      // Smoothly center the question and buttons after typing completes
                      setTimeout(() => {
                        const arena = document.querySelector('.proposal-action-arena')
                        if (arena) {
                          arena.scrollIntoView({ behavior: 'smooth', block: 'center' })
                        }
                      }, 400)
                    })
                    .start()
                }}
                options={{
                  delay: 30,
                  cursor: '❤️'
                }}
              />
            </div>

            <h2 className='my-4 fw-bold question-heading'>
              {crushName} có đồng ý làm người yêu của {fromName} không? 💖
            </h2>

            {/* Interactive Yes / No Area */}
            <div className='proposal-action-arena'>
              <button
                onClick={handleAccept}
                className='btn-yes'
                style={{
                  transform: `scale(${yesScale})`,
                  padding: `${0.85 * yesScale}rem ${1.8 * yesScale}rem`,
                  fontSize: `${1 + (yesScale - 1) * 0.25}rem`
                }}
              >
                <FaHeart />
                <span>{noCount > 3 ? 'Đồng Ý Liền Luôn! 🥰' : 'Đồng Ý! ❤️'}</span>
              </button>

              <button
                onMouseEnter={dodgeNoButton}
                onTouchStart={dodgeNoButton}
                onClick={dodgeNoButton}
                className='btn-no'
                style={{
                  transform: noBtnPos ? `translate(${noBtnPos.x}px, ${noBtnPos.y}px)` : 'none',
                  transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
              >
                {NO_TEXT_LIST[noCount % NO_TEXT_LIST.length]}
              </button>
            </div>

            {noCount > 0 && (
              <p className='mt-3 text-white-50 hint-subtext'>
                💡 Gợi ý: Nút "Đồng ý" to hơn rồi kìa, chỉ có một lựa chọn đúng đắn thuii á! 😉
              </p>
            )}
          </div>
        )}

        {/* STAGE 3: CELEBRATION */}
        {stage === 'accepted' && (
          <div className='love-card-glass celebration-box'>
            <div className='big-heart-icon'>
              <FaKissWinkHeart />
            </div>

            <h1 className='love-title'>Yayyy! Cảm ơn {crushName} vì đã đồng ý! 🎉</h1>
            <p className='love-subtitle'>
              Từ khoảnh khắc này, {crushName} và {fromName} chính thức trở thành một cặp đôi siêu cấp ngọt ngào! 💑
            </p>

            {/* Live Love Stopwatch Counter */}
            <div className='love-timer-card'>
              <div className='timer-header'>
                <FaClock /> <span>Thời gian chúng mình thuộc về nhau:</span>
              </div>
              <div className='timer-grid'>
                <div className='timer-box'>
                  <span className='timer-num'>{timeElapsed.days}</span>
                  <span className='timer-label'>Ngày</span>
                </div>
                <div className='timer-sep'>:</div>
                <div className='timer-box'>
                  <span className='timer-num'>{String(timeElapsed.hours).padStart(2, '0')}</span>
                  <span className='timer-label'>Giờ</span>
                </div>
                <div className='timer-sep'>:</div>
                <div className='timer-box'>
                  <span className='timer-num'>{String(timeElapsed.minutes).padStart(2, '0')}</span>
                  <span className='timer-label'>Phút</span>
                </div>
                <div className='timer-sep'>:</div>
                <div className='timer-box'>
                  <span className='timer-num'>{String(timeElapsed.seconds).padStart(2, '0')}</span>
                  <span className='timer-label'>Giây</span>
                </div>
              </div>
            </div>

            {/* Love Contract */}
            <div className='contract-card'>
              <h5 className='fw-bold mb-3 text-center' style={{ color: '#ff758c' }}>
                📜 BẢN CAM KẾT HẠNH PHÚC
              </h5>
              <div className='contract-item'>
                <FaShieldAlt /> <span>Luôn lắng nghe, thấu hiểu và tôn trọng mọi cảm xúc của {crushName}.</span>
              </div>
              <div className='contract-item'>
                <FaUtensils /> <span>Sẵn sàng dắt cậu đi ăn đồ ngon, uống trà sữa bất cứ khi nào cậu thèm.</span>
              </div>
              <div className='contract-item'>
                <FaGlassCheers /> <span>Cùng nhau đón chào những ngày lễ, sinh nhật và kỷ niệm thật đáng nhớ.</span>
              </div>
              <div className='contract-item'>
                <FaHeart /> <span>Mỗi ngày đều yêu thương {crushName} nhiều hơn ngày hôm qua một chút!</span>
              </div>
            </div>

            {/* First Date Note */}
            {/* <div className='first-date-card'>
              <FaCalendarAlt className='me-2 text-warning' />
              <span>
                <strong>Hẹn ước buổi hẹn đầu tiên:</strong> Cuối tuần này lúc 19:30 (Trà sữa & xem phim nhé! 🎬🧋)
              </span>
            </div> */}

            {/* Actions for the Crush */}
            <div className='d-flex flex-column flex-sm-row justify-content-center gap-3 mt-4'>
              <button onClick={handleCopyLoveMsg} className='btn-yes py-2 px-4' style={{ fontSize: '0.95rem' }}>
                <FaRegPaperPlane />
                <span>{isMsgCopied ? 'Đã chép lời nhắn! Gửi ngay nào 💕' : `Gửi tin nhắn cho ${fromName}`}</span>
              </button>

              <Link
                to='/'
                onClick={stopMusic}
                className='btn-no py-2 px-4 text-decoration-none d-inline-flex align-items-center justify-content-center gap-2'
              >
                <FaHome /> <span>Ghé thăm Portfolio</span>
              </Link>
            </div>

            <p className='mt-3 text-white-50' style={{ fontSize: '0.85rem' }}>
              Ngày bắt đầu: {acceptedTime ? acceptedTime.toLocaleDateString('vi-VN') : new Date().toLocaleDateString('vi-VN')} <FaRegHeart className='text-danger ms-1' />
            </p>

            <button
              type='button'
              onClick={() => setStage('envelope')}
              className='name-customizer-toggle mt-1'
              style={{ opacity: 0.7 }}
            >
              💌 Xem lại thư tỏ tình
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default LovePage
