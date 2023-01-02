import { useRef, useState, useEffect, SyntheticEvent } from 'react'
import { useLocation } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

//styles
import './Contact.scss'

//custom components and hooks
import useInput, { InputValidation } from '../../components/useInput/useInput'
import useTextarea from '../../components/useTextarea/useTextarea'
import sendEmail, { UserInfo } from '../../helpers/SendMail'
import FormModal from '../../components/FormModal/FormModal'
import useNavContext, { ContextType } from '../../hooks/useNavContext'
import SocialMedia from '../../components/SocialMedia/SocialMedia'
import DownloadPDF from '../../components/DownloadPDF/DownloadPDF'

//iconst for UI
import emailIcon from '../../static/img/icons/social-media/email.svg'
import userIcon from '../../static/img/icons/contact/user.svg'
import messageIcon from '../../static/img/icons/contact/message.svg'
import telIcon from '../../static/img/icons/contact/tel.svg'
import sendIcon from '../../static/img/icons/home-buttons/plane.svg'

export default function Contact() {
	// const { nav, setReadyToNavigate, navigateTo }: ContextType = useNavContext()
	// const location = useLocation()
	// const refContainer = useRef<HTMLDivElement>(null)
	// const [sectionState, setSectionState] = useState(false)

	const [socialState, setSocialState] = useState(false)

	useEffect(() => {
		setSocialState(true)
		// showContent()
	}, [])

	// useEffect(() => {
	// 	if (nav) {
	// 		if (nav.to != location.pathname) {
	// 			hideContent()
	// 		}
	// 	}
	// }, [nav])

	const nameInput = useInput({
		name: 'nombre',
		img: userIcon,
		inputType: 'text',
		required: true,
	})

	const messageTextArea = useTextarea({
		name: 'mensaje',
		img: messageIcon,
		required: true,
	})

	const emailInput = useInput({
		name: 'correo',
		img: emailIcon,
		inputType: 'email',
		required: false,
	})

	const phoneInput = useInput({
		name: 'teléfono',
		img: telIcon,
		inputType: 'tel',
		required: false,
	})

	let inputsAreValid = false

	useEffect(() => {
		inputsAreValid =
			nameInput.isValid &&
			messageTextArea.isValid &&
			thereIsAtLeastAWayOfContact()
	}, [nameInput, messageTextArea, emailInput, phoneInput])

	const thereIsAtLeastAWayOfContact = (): boolean => {
		const isEmailValidNFilled = isValidAndFilled(emailInput)
		const isPhoneValidNFilled = isValidAndFilled(phoneInput)

		const isEmailInvalid = !emailInput.isValid
		const isPhoneInvalid = !phoneInput.isValid

		if (isEmailInvalid || isPhoneInvalid) return false

		if (isEmailValidNFilled || isPhoneValidNFilled) return true

		return false
	}

	const isValidAndFilled = (input: InputValidation): boolean =>
		input.isValid && input.getValue() != ''

	// const showContent = () => {
	// 	setSectionState(true)

	// 	setTimeout(() => {
	// 		setSocialState(true)
	// 	}, 200)
	// }

	// const hideContent = () => {
	// 	setSectionState(false)
	// 	setSocialState(false)
	// }

	//form submit modal state
	// const [modalState, setModalState] = useState(false)
	const modalControl = useState(false)

	const [success, setSuccess] = useState(false)
	const [waiting, setWaiting] = useState(false)

	//form send mail confirmation

	const openModal = () => {
		// setModalState(true)
		modalControl[1](true)
	}

	const closeModal = () => {
		// setModalState(false)
		modalControl[1](false)
	}

	const showWrongInput = () => {
		if (!nameInput.isValid) nameInput.shakeLabel()
		else if (!messageTextArea.isValid) messageTextArea.shakeLabel()
		else if (!emailInput.isValid) emailInput.shakeLabel()
		else if (!phoneInput.isValid) phoneInput.shakeLabel()
		else if (!thereIsAtLeastAWayOfContact()) emailInput.shakeLabel()
	}

	const getDataFromInputs = (): UserInfo => ({
		name: nameInput.getValue(),
		message: messageTextArea.getValue(),
		mail: emailInput.getValue(),
		tel: phoneInput.getValue(),
	})

	const handleSubmit = async (event: SyntheticEvent) => {
		//prevent page reload
		event.preventDefault()

		//check the inputs validity
		if (inputsAreValid) {
			openModal()

			// await timer(200)
			setWaiting(true)
			setSuccess(false)

			const isSuccessful = await sendEmail(getDataFromInputs())

			if (isSuccessful) {
				//change the confirmation state
				setWaiting(false)
				setSuccess(true)
			} else {
				alert(
					'hubo un error al enviar el mensaje, intente más tarde, por favor.'
				)

				closeModal()
			}
		} else {
			showWrongInput()
		}
	}

	return (
		// <CSSTransition
		// 	in={sectionState}
		// 	nodeRef={refContainer}
		// 	timeout={500}
		// 	classNames="page-anim"
		// 	mountOnEnter
		// 	unmountOnExit
		// 	onExited={() => setReadyToNavigate(true)}
		// >
		// <header id="contact" ref={refContainer}>
		<header id="contact">
			<div className="split-container">
				<div className="split">
					<h1 className="page-main-title">Contáctame!</h1>

					<p>
						Puedes encontrarme en distintas redes sociales, usa
						aquella con la que te sientas más cómodo, te regresaré
						el mensaje tan pronto como me sea posible. Apreciaré
						cualquier sugerencia o propuesta de trabajo, siéntete
						libre de compartirla conmigo.
					</p>

					<SocialMedia
						containerClass="contact-social-media"
						state={socialState}
					/>

					<p>
						Una llamada también será bien recibida, he aqui mi
						número personal
					</p>

					<a className="tel-tag" href="tel:+52-5551588911">
						555 158 8911
					</a>

					<p>
						Y por último, puedes darle un vistazo a mi CV, esta es
						la versión más reciente, con toda mi información en él.
					</p>

					<DownloadPDF />
				</div>

				<div className="split">
					<form id="contact-form" onSubmit={handleSubmit} noValidate>
						<h1 className="form-title">Envíame un mensaje</h1>

						{nameInput.render}
						{messageTextArea.render}

						<p className="form-text">
							Permíteme devolverte el mensaje. Por favor, rellena
							al menos uno de los siguientes campos, si lo deseas
							pueden ser ambos.
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
					modalControl={modalControl}
					wainting={waiting}
					success={success}
					onExit={() => setSuccess(false)}
				/>
			</div>
		</header>
		// </CSSTransition>
	)
}