import { useLottie } from 'lottie-react'

const AnimitionLottie = ({ animationPath, width = '95%' }: { animationPath: any; width?: string }) => {
  const { View } = useLottie({
    loop: true,
    autoplay: true,
    animationData: animationPath,
    style: {
      width
    }
  })
  return <>{View}</>
}

export default AnimitionLottie
