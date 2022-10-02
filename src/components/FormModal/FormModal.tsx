import { Dispatch, FC, SetStateAction, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

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

	const [innerSuccess, setInnerSucces] = useState(false)

	const hideScrollBar = () => {
		document.getElementsByTagName('html')[0].style.overflow = 'hidden'
	}

	const showScrollBar = () => {
		document.getElementsByTagName('html')[0].style.overflow = 'hidden auto'
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
						<h1>
							Su mensaje esta <br /> siendo enviado
						</h1>
					</div>
				</CSSTransition>

				<CSSTransition
					mountOnEnter
					unmountOnExit
					nodeRef={successRef}
					timeout={400}
					in={innerSuccess}
					classNames="success"
				>
					<div className="success" ref={successRef}>
						<h1>
							Muchas gracias por su mensaje, pronto me comunicaré
							con usted.
						</h1>
						<div className="animations-container">
							<div id="message-success"></div>
						</div>
						<button
							className="modal-button"
							onClick={() => {
								modalControl[1](false)
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
