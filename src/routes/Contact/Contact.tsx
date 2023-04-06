import { useState, useEffect, SyntheticEvent } from "react";

//styles
import "./Contact.scss";

//custom components and hooks
import useInput, { InputValidation } from "../../components/useInput/useInput";
import useTextarea from "../../components/useTextarea/useTextarea";
import sendEmail, { UserInfo } from "../../helpers/SendMail";
// import FormModal from "../../components/FormModal/FormModal";
import SocialMedia from "../../components/SocialMedia/SocialMedia";
import DownloadPDF from "../../components/DownloadPDF/DownloadPDF";

//iconst for UI
import emailIcon from "../../static/img/icons/social-media/email.svg";
import userIcon from "../../static/img/icons/contact/user.svg";
import messageIcon from "../../static/img/icons/contact/message.svg";
import telIcon from "../../static/img/icons/contact/tel.svg";
import sendIcon from "../../static/img/icons/home-buttons/plane.svg";
import { FormModal } from "@/components/FormModal";
import { ModalConfirmation } from "@/components/ModalConfirmation";
import changeScrollbarState from "@/helpers/ChangeScrollbarState";
import { AnimatePresence } from "framer-motion";

export default function Contact() {
	useEffect(() => {
		window.addEventListener("close-modal", closeModalHandler);

		return () => {
			window.removeEventListener("close-modal", closeModalHandler);
		};
	}, []);

	const closeModalHandler = () => {
		console.log("closing modal...");
		setIsMounted(false);
	};

	const nameInput = useInput({
		name: "nombre",
		img: userIcon,
		inputType: "text",
		required: true,
	});

	const messageTextArea = useTextarea({
		name: "mensaje",
		img: messageIcon,
		required: true,
	});

	const emailInput = useInput({
		name: "correo",
		img: emailIcon,
		inputType: "email",
		required: false,
	});

	const phoneInput = useInput({
		name: "teléfono",
		img: telIcon,
		inputType: "tel",
		required: false,
	});

	let inputsAreValid = false;

	useEffect(() => {
		inputsAreValid =
			nameInput.isValid && messageTextArea.isValid && thereIsAtLeastAWayOfContact();
	}, [nameInput, messageTextArea, emailInput, phoneInput]);

	const thereIsAtLeastAWayOfContact = (): boolean => {
		const isEmailValidNFilled = isValidAndFilled(emailInput);
		const isPhoneValidNFilled = isValidAndFilled(phoneInput);

		const isEmailInvalid = !emailInput.isValid;
		const isPhoneInvalid = !phoneInput.isValid;

		if (isEmailInvalid || isPhoneInvalid) return false;

		if (isEmailValidNFilled || isPhoneValidNFilled) return true;

		return false;
	};

	const isValidAndFilled = (input: InputValidation): boolean =>
		input.isValid && input.getValue() != "";

	const modalControl = useState(false);

	const [success, setSuccess] = useState(false);
	const [waiting, setWaiting] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

	//form send mail confirmation

	const openModal = () => {
		// setModalState(true)
		modalControl[1](true);
	};

	const closeModal = () => {
		// setModalState(false)
		modalControl[1](false);
	};

	const showWrongInput = () => {
		if (!nameInput.isValid) nameInput.shakeLabel();
		else if (!messageTextArea.isValid) messageTextArea.shakeLabel();
		else if (!emailInput.isValid) emailInput.shakeLabel();
		else if (!phoneInput.isValid) phoneInput.shakeLabel();
		else if (!thereIsAtLeastAWayOfContact()) emailInput.shakeLabel();
	};

	const getDataFromInputs = (): UserInfo => ({
		name: nameInput.getValue(),
		message: messageTextArea.getValue(),
		mail: emailInput.getValue(),
		tel: phoneInput.getValue(),
	});

	const handleSubmit = async (event: SyntheticEvent) => {
		//prevent page reload
		event.preventDefault();

		//check the inputs validity
		if (inputsAreValid) {
			openModal();

			// await timer(200)
			setWaiting(true);
			setSuccess(false);

			const isSuccessful = await sendEmail(getDataFromInputs(), true);

			if (isSuccessful) {
				//change the confirmation state
				setWaiting(false);
				setSuccess(true);
			} else {
				alert("hubo un error al enviar el mensaje, intente más tarde, por favor.");

				closeModal();
			}
		} else {
			showWrongInput();
		}
	};

	return (
		<header id="contact">
			<div className="split-container">
				<div className="split">
					<h1 className="page-main-title">Contáctame!</h1>

					<p>
						Puedes encontrarme en distintas redes sociales, usa aquella con la que te
						sientas más cómodo, te regresaré el mensaje tan pronto como me sea posible.
						Apreciaré cualquier sugerencia o propuesta de trabajo, siéntete libre de
						compartirla conmigo.
					</p>

					<SocialMedia containerClass="contact-social-media" />

					<p>Una llamada también será bien recibida, he aqui mi número personal</p>

					<a
						className="tel-tag"
						href="tel:+52-5551588911"
					>
						555 158 8911
					</a>

					<p>
						Y por último, puedes darle un vistazo a mi CV, esta es la versión más
						reciente, con toda mi información en él.
					</p>

					<DownloadPDF />
				</div>

				<div className="split">
					<form
						id="contact-form"
						onSubmit={handleSubmit}
						noValidate
					>
						<h1 className="form-title">Envíame un mensaje</h1>

						{nameInput.render}
						{messageTextArea.render}

						<p className="form-text">
							Permíteme devolverte el mensaje. Por favor, rellena al menos uno de los
							siguientes campos, si lo deseas pueden ser ambos.
						</p>

						{emailInput.render}
						{phoneInput.render}

						<button
							className="send"
							type="submit"
							onClick={() => {
								setIsMounted(!isMounted);
								changeScrollbarState({ isVisible: false });
							}}
						>
							<img
								src={sendIcon}
								alt="send icon"
							/>
							enviar
						</button>
					</form>
				</div>
			</div>

			<AnimatePresence>
				{isMounted && (
					<ModalConfirmation message="Tu mensaje ha sido enviado exitosamente" />
				)}
			</AnimatePresence>
		</header>
	);
}
