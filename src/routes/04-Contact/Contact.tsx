import { useRef, useState, useEffect, SyntheticEvent } from 'react'
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
import timer from '../../helpers/Timer'

import Lottie, { AnimationItem } from 'lottie-web'
import messageSuccessAnimation from '../../static/lottie/message-success.json'

export default function Contact() {
	const { nav, setReadyToNavigate, navigateTo }: ContextType = useNavContext()
	const location = useLocation()
	const refContainer = useRef<HTMLDivElement>(null)
	const [sectionState, setSectionState] = useState(false)
	const [socialState, setSocialState] = useState(false)

	// const messageSuccessContainer = useRef<HTMLDivElement>(null)
	// const messageSuccessLottie = useRef<AnimationItem>(
	// 	Lottie.loadAnimation({
	// 		container: messageSuccessContainer.current as HTMLDivElement,
	// 		animationData: messageSuccessAnimation,
	// 		renderer: 'svg',
	// 		autoplay: true,
	// 		loop: true,
	// 	})
	// )

	useEffect(() => {
		showContent()
		// Lottie.setQuality('low')
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

	const nameInput = useRef<HTMLInputElement>(null)
	const mailInput = useRef<HTMLInputElement>(null)
	const messageInput = useRef<HTMLTextAreaElement>(null)

	const [modalState, setModalState] = useState(false)
	const [confirmation, setConfirmation] = useState(false)

	const openSendConfirmationModal = (responseState: boolean) => {
		//open the modal to show the user that his message is sending
		//and also disable the vertical scroll
		setModalState(!responseState)
		//load lottie animation to show the next step
		//based on response state, show a new screen with the lottie animation
		//this must be loaded before start, Idk what would be the best approach
		//load as soon as the user enter contact page or
		//when the message has been send
		//in fact, make it once the page is fully loaded would be the best
	}

	const handleSubmit = async (event: SyntheticEvent) => {
		event.preventDefault()

		const name = nameInput.current!.value
		const mail = mailInput.current!.value
		const message = messageInput.current!.value

		try {
			openSendConfirmationModal(false)

			const response = await fetch(
				'https://formsubmit.co/ajax/27ef0d32aeaebbc2c310fb46c09ca772',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
					body: JSON.stringify({
						name: name,
						mail: mail,
						message: message,
					}),
				}
			)

			const data = await response.json()

			console.log(data)

			// await timer(1500)
			// openSendConfirmationModal(true)
			setConfirmation(true)

			// messageSuccessLottie.current.destroy()
			//even when the component has been mounted
			//it must await certain time to complete the the process to make it
			//available for the dom query selectors
			await timer(100)

			const messageAnimation = Lottie.loadAnimation({
				container: document.getElementById('message-success')!,
				animationData: messageSuccessAnimation,
				renderer: 'svg',
				autoplay: true,
				loop: false,
			})

			messageAnimation.addEventListener('complete', () => {
				// data.success ? openSendConfirmationModal(true) : undefined
				openSendConfirmationModal(true)
			})

			// messageSuccessLottie.current!.play()
		} catch (error) {
			console.log(error)
		}
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
				{modalState ? (
					<div className="modal">
						{confirmation ? (
							<>
								<h1>
									su mensaje ha sido enviado, pronto me comunicaré con usted,
									gracias!
								</h1>
								<div id="message-success"></div>
							</>
						) : (
							<>
								<h1>Estamos enviando su mensaje...</h1>
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
							</>
						)}
					</div>
				) : undefined}

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

						<form id="contact-form" onSubmit={handleSubmit}>
							<h1 className="form-title">Envíame un mensaje</h1>

							<div className="input-container">
								<input
									id="name_input"
									className="form-input"
									type="text"
									placeholder="nombre"
									autoComplete="off"
									required
									name="name"
									ref={nameInput}
								/>
								<label htmlFor="name_input">nombre</label>

								<img className="label-icon" src={userIcon} alt="" />
							</div>

							<div className="input-container">
								<input
									id="mail_input"
									className="form-input"
									type="email"
									placeholder="mail"
									required
									autoComplete="off"
									name="email"
									ref={mailInput}
								/>
								<label htmlFor="name_input">mail</label>

								<img className="label-icon" src={emailIcon} alt="" />
							</div>

							<div className="input-container">
								<textarea
									className="form-input"
									id="form-message"
									placeholder="mensaje"
									required
									rows={4}
									name="message"
									ref={messageInput}
								></textarea>
								<label htmlFor="name_input">mensaje</label>

								<img className="label-icon" src={messageIcon} alt="" />
							</div>

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
