import { AnimationConfigWithData } from 'lottie-web'
import logoAnimationData from '@lottie/logo.json'

type CreateLottieConfig = (container: HTMLElement) => AnimationConfigWithData

const createLogoAnimationConfig: CreateLottieConfig = (container) => ({
	container: container,
	autoplay: false,
	loop: false,
	animationData: logoAnimationData,
	renderer: 'svg',
})

export default createLogoAnimationConfig
