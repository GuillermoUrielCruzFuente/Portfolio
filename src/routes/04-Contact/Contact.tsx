import { useRef, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import './Contact.scss'

//outlet custom hook
import useNavContext, { ContextType } from '../../hooks/useNavContext'
import SocialMedia from '../../components/SocialMedia/SocialMedia'
import DownloadPDF from '../../components/DownloadPDF/DownloadPDF'

export default function Contact() {
	const { nav, setReadyToNavigate, navigateTo }: ContextType = useNavContext()
	const location = useLocation()
	const refContainer = useRef<HTMLDivElement>(null)
	const [sectionState, setSectionState] = useState(false)
	const [socialState, setSocialState] = useState(false)

	useEffect(() => {
		showContent()
	}, [])

	useEffect(() => {
		if (nav) {
			if (nav.to != location.pathname) {
				hideContent()
			}
		}
	}, [nav])

	const showContent = () => {
		setSectionState(true)

		setTimeout(() => {
			setSocialState(true)
		}, 800)
	}

	const hideContent = () => {
		setSectionState(false)
		setSocialState(false)
	}

	return (
		<CSSTransition
			in={sectionState}
			nodeRef={refContainer}
			timeout={350}
			classNames="page-contact"
			mountOnEnter
			unmountOnExit
			onExited={() => setReadyToNavigate(true)}
		>
			<header id="contact" ref={refContainer}>
				<div className="top-container">
					<h1 className="page-main-title">Contáctame</h1>
				</div>
				<div className="split-container">
					<div className="split">
						<p>
							Puedes encontrarme en distintas redes sociales, usa aquella con la que
							te sientas más cómodo, te regresaré el mensaje tan pronto como me sea
							posible.
						</p>
						<SocialMedia containerClass="contact-social-media" state={socialState} />
						<p>
							celular: <span className="phone-number">555 158 89 11</span>
						</p>

						<p>
							También puedes darle un vistazo a mi CV, esta es la versión más reciente, con toda mi información en el.
						</p>

						<DownloadPDF />
					</div>

					<div className="split">
						<p>
							O aun mejor, mándame un mensaje por este medio, tu información solo será
							utilizada para volver a contactarte.
							<br />
							<br />
							Apreciaré cualquier sugerencia o propuesta de trabajo, siéntete libre de
							compartirla conmigo.
						</p>

						<form action="" id="contact-form">
							<input className="form-input" type="text" placeholder="nombre" />
							<input className="form-input" type="mail" placeholder="correo" />

							<textarea
								className="form-input"
								name="message"
								id="form-message"
								cols={30}
								rows={10}
								placeholder="mensaje"
							></textarea>
						</form>
					</div>
				</div>
			</header>
		</CSSTransition>
	)
}
