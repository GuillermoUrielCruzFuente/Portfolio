import { useRef, useState, useEffect, SyntheticEvent } from 'react'
import { useLocation } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import useInput from '../../components/Input/Input'

import './Contact.scss'

//outlet custom hook
import useNavContext, { ContextType } from '../../hooks/useNavContext'
import SocialMedia from '../../components/SocialMedia/SocialMedia'
import DownloadPDF from '../../components/DownloadPDF/DownloadPDF'

//iconst for UI
import emailIcon from '../../static/img/icons/social-media/email.svg'
import userIcon from '../../static/img/icons/contact/user.svg'
import messageIcon from '../../static/img/icons/contact/message.svg'
import telIcon from '../../static/img/icons/contact/tel.svg'
import sendIcon from '../../static/img/icons/home-buttons/plane.svg'

import timer from '../../helpers/Timer'

import Lottie from 'lottie-web'
import messageSuccessAnimation from '../../static/lottie/message-success.json'
import sendEmail from '../../helpers/SendMail'
import FormModal from '../../components/FormModal/FormModal'

export default function Contact() {
	const { nav, setReadyToNavigate, navigateTo }: ContextType = useNavContext()
	const location = useLocation()
	const refContainer = useRef<HTMLDivElement>(null)
	const [sectionState, setSectionState] = useState(false)
	const [socialState, setSocialState] = useState(false)

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

	//form submit modal state
	const [modalState, setModalState] = useState(false)

	const [success, setSuccess] = useState(false)
	const [waiting, setWaiting] = useState(false)

	//form send mail confirmation

	const openModal = () => {
		setModalState(true)
	}

	const closeModal = () => {
		setModalState(false)
	}

	const handleSubmit = async (event: SyntheticEvent) => {
		//prevent page reload
		event.preventDefault()

		openModal()

		await timer(200)
		setWaiting(true)
		setSuccess(false)

		//get all the information from inputs
		const name = nameInput.getValue()
		const mail = emailInput.getValue()
		const message = messageTextArea.getValue()
		const tel = phoneInput.getValue()

		const isSuccessful = await sendEmail({ name, mail, message, tel }, true)

		if (isSuccessful) {
			//change the confirmation state
			setWaiting(false)
			setSuccess(true)

			//this is probably hacky and comes here for my lack of knowledge
			//but if we don't await for a minimum amount of time the next step just broke
			//I think it could be due to the time that takes to react to mount the animation container
			await timer(1000)
			closeModal()

			//load the animation
			// const messageAnimation = Lottie.loadAnimation({
			// 	container: document.getElementById('message-success')!,
			// 	animationData: messageSuccessAnimation,
			// 	renderer: 'svg',
			// 	autoplay: true,
			// 	loop: false,
			// })

			//close the modal window once the animation has been completed
			// messageAnimation.addEventListener('complete', () => {
			// 	closeModal()
			// 	messageAnimation.destroy()
			// })
		} else {
			alert(
				'hubo un error al enviar el mensaje, intente más tarde, por favor.'
			)

			closeModal()
		}
	}

	const nameInput = useInput({
		name: 'nombre',
		img: userIcon,
		validation: 'required',
		inputType: 'text',
	})

	const messageTextArea = useInput({
		name: 'mensaje',
		img: messageIcon,
		inputType: 'textarea',
		validation: 'required',
	})

	const emailInput = useInput({
		name: 'correo',
		img: emailIcon,
		inputType: 'email',
		validation: 'semi-required',
	})

	const phoneInput = useInput({
		name: 'teléfono',
		img: telIcon,
		inputType: 'tel',
		validation: 'semi-required',
	})

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
				<div className="split-container">
					<div className="split">
						<h1 className="page-main-title">Contáctame!</h1>
						<p className="contact-text">
							Puedes encontrarme en distintas redes sociales, usa
							aquella con la que te sientas más cómodo, te
							regresaré el mensaje tan pronto como me sea posible.
							Apreciaré cualquier sugerencia o propuesta de
							trabajo, siéntete libre de compartirla conmigo.
						</p>
						<SocialMedia
							containerClass="contact-social-media"
							state={socialState}
						/>

						<div className="phone-number-container">
							<p>celular</p>
							<a className="tel-tag" href="tel:+52-5551588911">
								555 158 8911
							</a>
						</div>

						<p className="contact-text">
							También puedes darle un vistazo a mi CV, esta es la
							versión más reciente, con toda mi información en el.
						</p>

						<DownloadPDF />
					</div>

					<div className="split">
						<form id="contact-form" onSubmit={handleSubmit}>
							<h1 className="form-title">Envíame un mensaje</h1>

							{nameInput.render}
							{messageTextArea.render}

							<p className="form-text">
								Permíteme devolverte el mensaje. Por favor,
								rellena al menos un campo, si lo deseas pueden
								ser ambos
							</p>

							{emailInput.render}
							{phoneInput.render}

							<button className="send" type="submit">
								<img src={sendIcon} alt="send icon" />
								enviar
							</button>
						</form>
					</div>

					<FormModal
						modalState={modalState}
						wainting={waiting}
						success={success}
						onExit={() => setSuccess(false)}
					/>
				</div>
			</header>
		</CSSTransition>
	)
}
