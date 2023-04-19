import { useState, useEffect, SyntheticEvent } from "react";

//styles
import "./Contact.scss";

//custom components and hooks
import useInput, { InputValidation } from "@components/useInput/useInput";
import useTextarea from "@components/useTextarea/useTextarea";

import sendEmail, { UserInfo } from "@/helpers/SendMail";
import SocialMedia from "@components/SocialMedia/SocialMedia";
import DownloadPDF from "@components/DownloadPDF/DownloadPDF";

//iconst for UI
import emailIcon from "@images/icons/contact/email.svg";
import userIcon from "@images/icons/contact/user.svg";
import messageIcon from "@images/icons/contact/message.svg";
import telIcon from "@images/icons/contact/tel.svg";
import sendIcon from "@images/icons/home-buttons/plane.svg";

import { ModalConfirmation } from "@components/ModalConfirmation";
import changeScrollbarState from "@/helpers/ChangeScrollbarState";
import { AnimatePresence } from "framer-motion";
import { LoadingNotification } from "@components/LoadingNotification";
import { Veil } from "@components/Veil";
import { Button } from "@components/Button";

const Contact = () => {
	const isDevMode = import.meta.env.DEV;

	useEffect(() => {
		window.addEventListener("close-modal", handleCloseModal);

		return () => {
			window.removeEventListener("close-modal", handleCloseModal);
		};
	}, []);

	const handleCloseModal = () => changeModalState({ isOpen: false });

	const changeModalState = ({ isOpen }: { isOpen: boolean }) => {
		setIsModalOpen(isOpen);
		changeScrollbarState({ isVisible: !isOpen });
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

	const [isSendingMessage, setIsSendingMessage] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [successMessage, setSuccessMessage] = useState(false);

	const removeCurrentFocus = () => {
		const currentFocusedComponent = document.activeElement as HTMLElement;
		currentFocusedComponent.blur();
	};

	/**
	 * todo: intercept the tab key event and make a preventDefault
	 */
	const disableTabNavigation = () => {};

	const initModalSequence = () => {
		changeModalState({ isOpen: true });

		removeCurrentFocus();
		disableTabNavigation();
	};

	const shakeInvalidInput = () => {
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

		if (inputsAreValid || isDevMode) {
			initModalSequence();

			setIsSendingMessage(true);

			const messageStatus = await sendEmail({
				userInfo: getDataFromInputs(),
				devMode: isDevMode ? { fakeRequestDelay: 1000, fakeStatus: false } : undefined,
			});

			setIsSendingMessage(false);

			setSuccessMessage(messageStatus);
		} else {
			shakeInvalidInput();
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

						<Button
							className="send"
							icon={sendIcon}
						>
							enviar
						</Button>
					</form>
				</div>
			</div>

			<AnimatePresence>
				{isModalOpen && (
					<Veil>
						<AnimatePresence mode="wait">
							{isSendingMessage ? (
								<LoadingNotification
									key="loading-notification"
									message="Tu mensaje se está enviando..."
								/>
							) : (
								<ModalConfirmation
									key="modal-confirmation"
									messages={{
										success:
											"Tu mensaje ha sido enviado con exito! Pronto me comunicaré contigo.",
										error: "Hubo un error al enviar el mensaje, inténtalo más tarde, por favor.",
									}}
									success={successMessage}
								/>
							)}
						</AnimatePresence>
					</Veil>
				)}
			</AnimatePresence>
		</header>
	);
};

export default Contact;
