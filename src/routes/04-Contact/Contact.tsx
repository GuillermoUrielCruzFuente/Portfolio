import { useRef, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import './Contact.scss'

//outlet custom hook
import useNavContext, { ContextType } from '../../hooks/useNavContext'
import SocialMedia from '../../components/SocialMedia/SocialMedia'
import DownloadPDF from '../../components/DownloadPDF/DownloadPDF'

//img
import emailIcon from '../../static/img/icons/social-media/email.svg'
import userIcon from '../../static/img/icons/contact/user.svg'
import messageIcon from '../../static/img/icons/contact/message.svg'

import sendIcon from '../../static/img/icons/home-buttons/plane.svg'

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
		}, 200)
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
						<p className="contact-text">
							Puedes encontrarme en distintas redes sociales, usa aquella con la que
							te sientas más cómodo, te regresaré el mensaje tan pronto como me sea
							posible.
						</p>
						<SocialMedia containerClass="contact-social-media" state={socialState} />

						<div className="phone-number-container">
							<p>celular</p>
							<a className="tel-tag" href="tel:+52-5551588911">
								555 158 8911
							</a>
						</div>

						<p className="contact-text">
							También puedes darle un vistazo a mi CV, esta es la versión más
							reciente, con toda mi información en el.
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

						<form
							action=""
							id="contact-form"
							onSubmit={(e) => {
								e.preventDefault()
								console.log('hola')
							}}
						>
							<h1 className='form-title'>Envíame un mensaje</h1>
							<div className="input-container">
								<input
									id="name_input"
									className="form-input"
									type="text"
									placeholder="nombre"
									required
								/>
								<label htmlFor="name_input">nombre</label>

								<img className="label-icon" src={userIcon} alt="asasdfad" />
							</div>

							<div className="input-container">
								<input
									id="mail_input"
									className="form-input"
									type="text"
									placeholder="mail"
									required
								/>
								<label htmlFor="name_input">mail</label>

								<img className="label-icon" src={emailIcon} alt="asasdfad" />
							</div>

							<div className="input-container">
								<textarea
									className="form-input"
									name="message"
									id="form-message"
									placeholder="mensaje"
									required
									rows={4}
								></textarea>
								<label htmlFor="name_input">mensaje</label>

								<img className="label-icon" src={messageIcon} alt="asasdfad" />
							</div>

							{/* <input type="submit" value="enviar" /> */}
							<button className="send" type="submit">
								<img src={sendIcon} alt="send icon" />
								enviar
							</button>
						</form>
					</div>
				</div>
			</header>
		</CSSTransition>
	)
}
