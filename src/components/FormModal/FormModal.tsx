import { FC, useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

type Modal = {
	modalState: boolean
	wainting: boolean
	success: boolean
	onExit?: () => void
}

const FormModal: FC<Modal> = ({ modalState, wainting, success, onExit }) => {
	const modalRef = useRef<HTMLDivElement>(null)
	const waintingRef = useRef<HTMLDivElement>(null)
	const successRef = useRef<HTMLDivElement>(null)

	const [innerSuccess, setInnerSucces] = useState(false)

	const hideScrollBar = () => {
		document.getElementsByTagName('html')[0].style.overflow = 'hidden'
	}

	const showScrollBar = () => {
		document.getElementsByTagName('html')[0].style.overflow = 'hidden auto'
	}

	// useEffect(() => {
	// 	success &&
	// }, [success])

	return (
		<CSSTransition
			mountOnEnter
			unmountOnExit
			nodeRef={modalRef}
			timeout={400}
			in={modalState}
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
						//change the success
						success && setInnerSucces(true)
					}}
				>
					<div className="waiting" ref={waintingRef}>
						<div className="sk-cube-grid">
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
						<h1>Su mensaje esta siendo enviado.</h1>
					</div>
				</CSSTransition>

				<CSSTransition
					mountOnEnter
					unmountOnExit
					nodeRef={successRef}
					timeout={400}
					in={innerSuccess}
					classNames="modal"
				>
					<div className="waiting" ref={successRef}>
						<h1>Su mensaje ha sido enviado.</h1>
					</div>
				</CSSTransition>
			</div>
		</CSSTransition>
	)
}

export default FormModal
