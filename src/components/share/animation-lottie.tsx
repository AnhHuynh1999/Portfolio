import { ComponentType, useEffect, useState } from 'react'
import type { LottieComponentProps } from 'lottie-react'

type TLoader = () => Promise<{ default: unknown }>

// Lottie JSON + player are ~4 MB, so both load after first paint instead of sitting in the main bundle.
const AnimitionLottie = ({ load, width = '95%' }: { load: TLoader; width?: string }) => {
  const [player, setPlayer] = useState<{ Lottie: ComponentType<LottieComponentProps>; data: unknown } | null>(null)

  useEffect(() => {
    let alive = true
    Promise.all([import('lottie-react'), load()])
      .then(([lib, json]) => alive && setPlayer({ Lottie: lib.default, data: json.default }))
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [load])

  const still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  return (
    <div style={{ width, margin: '0 auto', aspectRatio: '1 / 1' }} aria-hidden>
      {player && <player.Lottie animationData={player.data} loop={!still} autoplay={!still} />}
    </div>
  )
}

export default AnimitionLottie
