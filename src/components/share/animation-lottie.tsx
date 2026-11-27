import { ComponentType, useEffect, useRef, useState } from 'react'
import type { LottieComponentProps } from 'lottie-react'

type TLoader = () => Promise<{ default: unknown }>

// Lottie JSON + player are ~4 MB, so both load after first paint instead of sitting in the main bundle.
const AnimitionLottie = ({ load, width = '95%' }: { load: TLoader; width?: string }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [player, setPlayer] = useState<{ Lottie: ComponentType<LottieComponentProps>; data: unknown } | null>(null)

  // Load only when the animation is about to scroll into view.
  useEffect(() => {
    let alive = true
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        Promise.all([import('lottie-react'), load()])
          .then(([lib, json]) => alive && setPlayer({ Lottie: lib.default, data: json.default }))
          .catch(() => {})
      },
      { rootMargin: '200px' }
    )
    if (ref.current) io.observe(ref.current)
    return () => {
      alive = false
      io.disconnect()
    }
  }, [load])

  const still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  return (
    <div ref={ref} style={{ width, margin: '0 auto', aspectRatio: '1 / 1' }} aria-hidden>
      {player && <player.Lottie animationData={player.data} loop={!still} autoplay={!still} />}
    </div>
  )
}

export default AnimitionLottie
