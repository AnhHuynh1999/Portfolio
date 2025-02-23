import { useMemo, useRef } from 'react'
import Lottie, { useLottie } from 'lottie-react'

const AnimitionLottie = ({ animationPath, width = '95%' }: { animationPath: any; width?: string }) => {
  // const lottieRef = useRef(null)
  const { View } = useLottie({
    loop: true,
    autoplay: true,
    animationData: animationPath,
    style: {
      width
    }
    // lottieRef: lottieRef
  })
  // const defaultOptions = useMemo(() => {
  //   return {
  //     loop: true,
  //     autoplay: true,
  //     animationData: animationPath,
  //     style: {
  //       width
  //     },
  //     lottieRef: lottieRef
  //   }
  // })
  return <>{View}</>
}

export default AnimitionLottie
