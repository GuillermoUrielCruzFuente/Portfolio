import Lottie, { AnimationConfigWithData, AnimationItem } from 'lottie-web'
import {
	MutableRefObject,
	useCallback,
	useLayoutEffect,
	useRef,
} from 'react'

type LottieProps = {
	classContainer: string
	data: AnimationConfigWithData['animationData']
}

type useLottieReturns = [
	lottieElement: () => JSX.Element,
	lottieInstanceRef: MutableRefObject<AnimationItem>
]

const useLottie = ({ classContainer, data }: LottieProps): useLottieReturns => {
	const animationContainerRef = useRef<HTMLDivElement>(null)
	const lottieInstanceRef = useRef<AnimationItem>(
		Lottie.loadAnimation({
			container: animationContainerRef.current!,
		})
	)

	useLayoutEffect(() => {
		lottieInstanceRef.current = Lottie.loadAnimation({
			container: animationContainerRef.current!,
			animationData: data,
			autoplay: false,
			loop: false,
			renderer: 'svg',
		})

		return () => {
			lottieInstanceRef.current!.destroy()
		}
	}, [])

	const lottieElement = useCallback(
		() => (
			<div className={classContainer} ref={animationContainerRef}></div>
		),
		[]
	)

	return [lottieElement, lottieInstanceRef]
}

export default useLottie
