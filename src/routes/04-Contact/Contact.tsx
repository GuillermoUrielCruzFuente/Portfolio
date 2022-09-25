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
import sendEmail from '../../helpers/SendMail'

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
		Lottie.setQuality('low')
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

	const openModal = () => {
		//open the modal to show the user that his message is sending
		//and also disable the vertical scroll
		setModalState(true)
		document.getElementsByTagName('html')[0].style.overflow = 'hidden'
	}

	const closeModal = () => {
		setModalState(false)
		document.getElementsByTagName('html')[0].style.overflow = 'hidden auto'
	}

	const handleSubmit = async (event: SyntheticEvent) => {
		//prevent page reload
		event.preventDefault()

		//get all the information from inputs
		const name = nameInput.current!.value
		const mail = mailInput.current!.value
		const message = messageInput.current!.value

		//show to ther user that the send process has been started
		openModal()

		const isSuccessful = await sendEmail({ name, mail, message })

		if (isSuccessful) {
			//change the confirmation state
			setConfirmation(true)

			//this is probably hacky and comes here for my lack of knowledge
			//but if we don't await for a minimum amount of time the next step just broke
			await timer(100)

			//load the animation
			const messageAnimation = Lottie.loadAnimation({
				container: document.getElementById('message-success')!,
				animationData: messageSuccessAnimation,
				renderer: 'svg',
				autoplay: true,
				loop: false,
			})

			//close the modal window once the animation has been completed
			messageAnimation.addEventListener('complete', () => {
				closeModal()
				//better on exit transition
				setConfirmation(false)
			})
		} else {
			alert('hubo un error al enviar el mensaje, intente más tarde, por favor.')
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
							posible. Apreciaré cualquier sugerencia o propuesta de trabajo, siéntete
							libre de compartirla conmigo.
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
