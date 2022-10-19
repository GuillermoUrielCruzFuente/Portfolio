import {
	Dispatch,
	FC,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react'
import { CSSTransition } from 'react-transition-group'

//Lottie animations
import Lottie, { AnimationItem } from 'lottie-web'
import succesAnimation from '../../static/lottie/message-success.json'
// import okAnimation from '../../static/lottie/confetti.json'
import okAnimation from '../../static/lottie/ok-02.json'

type Modal = {
	modalControl: [boolean, Dispatch<SetStateAction<boolean>>]
	wainting: boolean
	success: boolean
	onExit?: () => void
}

const FormModal: FC<Modal> = ({ modalControl, wainting, success, onExit }) => {
	const modalRef = useRef<HTMLDivElement>(null)
	const waintingRef = useRef<HTMLDivElement>(null)
	const successRef = useRef<HTMLDivElement>(null)

	const successAnimationContainerRef = useRef<HTMLDivElement>(null)
	const successAnimationLottie = useRef<AnimationItem>(
		Lottie.loadAnimation({
			container: successAnimationContainerRef.current!,
		})
	)

	const okAnimationContainerRef = useRef<HTMLDivElement>(null)
	const okAnimationLottie = useRef<AnimationItem>(
		Lottie.loadAnimation({
			container: okAnimationContainerRef.current!,
		})
	)

	const [innerSuccess, setInnerSucces] = useState(false)

	useEffect(() => {
		Lottie.setQuality('low')

		return () => {
			okAnimationLottie.current.destroy()
			successAnimationLottie.current.destroy()
		}
	}, [])

	const hideScrollBar = () => {
		document.getElementsByTagName('html')[0].style.overflow = 'hidden'
	}

	const showScrollBar = () => {
		document.getElementsByTagName('html')[0].style.overflow = 'hidden auto'
	}

	const loadAnimations = () => {
		successAnimationLottie.current = Lottie.loadAnimation({
			container: successAnimationContainerRef.current!,
			animationData: succesAnimation,
			autoplay: true,
			loop: false,
			renderer: 'svg',
		})

		successAnimationLottie.current.addEventListener('complete', () => {
			successAnimationLottie.current.destroy()

			okAnimationLottie.current = Lottie.loadAnimation({
				container: okAnimationContainerRef.current!,
				animationData: okAnimation,
				autoplay: true,
				loop: false,
				renderer: 'svg',
			})
		})
	}

	return (
		<CSSTransition
			mountOnEnter
			unmountOnExit
			nodeRef={modalRef}
			timeout={400}
			in={modalControl[0]}
			classNames="modal"
			onEnter={hideScrollBar}
			onExit={showScrollBar}
			onExited={() => {
				setInnerSucces(false)
				onExit!()
			}}
		>
			<div className="modal" ref={modalRef}>
				<CSSTransition
					mountOnEnter
					unmountOnExit
					nodeRef={waintingRef}
					timeout={400}
					in={wainting}
					classNames="modal"
					onExited={() => {
						//change the inner success
						success && setInnerSucces(true)
					}}
				>
					<div className="waiting" ref={waintingRef}>
						<div className="sk-cube-grid loader-modal">
							<div className="sk-cube sk-cube1"></div>
							<div className="sk-cube sk-cube2"></div>
							<div className="sk-cube sk-cube3"></div>
							<div className="sk-cube sk-cube4"></div>
							<div className="sk-cube sk-cube5"></div>
							<div className="sk-cube sk-cube6"></div>
							<div className="sk-cube sk-cube7"></div>
							<div className="sk-cube sk-cube8"></div>
							<div className="sk-cube sk-cube9"></div>
						</div>
						<h1>
							Su mensaje esta <br /> siendo enviado
						</h1>
					</div>
				</CSSTransition>

				<CSSTransition
					mountOnEnter
					unmountOnExit
					nodeRef={successRef}
					timeout={800}
					in={innerSuccess}
					classNames="success"
					onEntered={loadAnimations}
					onExited={() => {
						okAnimationLottie.current.destroy()
						successAnimationLottie.current.destroy()
					}}
				>
					<div className="success" ref={successRef}>
						<p>
							Muchas gracias por su mensaje, pronto me comunicaré
							con usted.
						</p>
						<div className="animations-container">
							<div
								id="message-success"
								ref={successAnimationContainerRef}
							></div>

							<div id="ok" ref={okAnimationContainerRef}></div>
						</div>
						<button
							className="modal-button"
							onClick={() => {
								modalControl[1](false)
								setInnerSucces(false)
							}}
						>
							OK
						</button>
					</div>
				</CSSTransition>
			</div>
		</CSSTransition>
	)
}

export default FormModal
