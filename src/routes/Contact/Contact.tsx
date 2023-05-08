import { useState, useEffect, FormEvent, useRef } from "react";

//styles
import "./Contact.scss";

//custom components and hooks
import useInput, { InputValidation } from "@components/useInput/useInput";
import useTextarea from "@components/useTextarea/useTextarea";

import sendEmail, { DevModeConfig, UserInfo } from "@/helpers/SendMail";
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
import { disableTabNavigation, enableTabNavigation } from "@/helpers/PreventTabNavigation";
import { removeCurrentFocus } from "@/helpers/RemoveCurrentFocus";
import { isDevMode } from "@/helpers/IsDevMode";

import animationData1 from "@lottie/ok.json";
import animationData2 from "@lottie/message-success.json";

import { FancyInput } from "@components/FancyInput";
import type { FancyInputElement } from "@typing/FancyInputTypes";

const Contact = () => {
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
		isOpen ? disableTabNavigation() : enableTabNavigation();
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

	const isValidAndFilled = (input: InputValidation) => input.isValid && input.getValue() != "";

	const [isSendingMessage, setIsSendingMessage] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [successMessage, setSuccessMessage] = useState(false);

	const initModalSequence = () => {
		changeModalState({ isOpen: true });

		removeCurrentFocus();
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

	const getDevModeEmailConfig = () => {
		const config: DevModeConfig = {
			fakeRequestDelay: 1500,
			fakeStatus: true,
		};

		return isDevMode ? config : undefined;
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		//prevent page reload
		event.preventDefault();

		if (inputsAreValid || isDevMode) {
			initModalSequence();

			setIsSendingMessage(true);

			const messageStatus = await sendEmail({
				userInfo: getDataFromInputs(),
				devMode: getDevModeEmailConfig(),
			});

			setIsSendingMessage(false);

			setSuccessMessage(messageStatus);
		} else {
			shakeInvalidInput();
		}
	};

	const fancyRef = useRef<FancyInputElement>(null);

	return (
		<header id="contact">
			<div className="split-container">
				<div className="split">
					<h1 className="page-main-title">Contáctame!</h1>

					<p className="description-text">
						Puedes encontrarme en distintas redes sociales, usa aquella con la que te
						sientas más cómodo, te regresaré el mensaje tan pronto como me sea posible.
						Apreciaré cualquier sugerencia o propuesta de trabajo, siéntete libre de
						compartirla conmigo.
					</p>

					<SocialMedia containerClass="contact-social-media" />

					<p className="description-text">
						Una llamada también será bien recibida, he aqui mi número personal
					</p>

					<a
						className="tel-tag"
						href="tel:+52-5551588911"
					>
						555 158 8911
					</a>

					<p className="description-text">
						Y por último, puedes darle un vistazo a mi CV, esta es la versión más
						reciente, con toda mi información en él.
					</p>

					<DownloadPDF />

					<form
						onSubmit={(e) => {
							e.preventDefault();
						}}
					>
						<FancyInput
							ref={fancyRef}
							labelText="nombre"
							feedbackText="Ingresa tu nombre en este campo."
							type="text"
							iconSrc={userIcon}
						></FancyInput>

						<button
							type="submit"
							onClick={() => {
								fancyRef.current?.shakeInfoLabel();
							}}
						>
							get button value
						</button>
					</form>
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
									animationData={[animationData2, animationData1]}
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
