import { useState, useEffect } from "react";

//styles
import "./Contact.scss";

import sendEmail, { DevModeConfig } from "@/helpers/SendMail";
import { SocialMedia } from "@components/SocialMedia";
import DownloadPDF from "@components/DownloadPDF/DownloadPDF";

import { ModalConfirmation } from "@components/ModalConfirmation";
import changeScrollbarState from "@/helpers/ChangeScrollbarState";
import { AnimatePresence } from "framer-motion";
import { LoadingNotification } from "@components/LoadingNotification";
import { Veil } from "@components/Veil";
import { disableTabNavigation, enableTabNavigation } from "@/helpers/PreventTabNavigation";
import { removeCurrentFocus } from "@/helpers/RemoveCurrentFocus";
import { isDevMode } from "@/helpers/IsDevMode";

import okAnimationData from "@lottie/ok.json";
import messageAnimationData from "@lottie/message-success.json";
import { FancyForm } from "@components/FancyForm";
import { SubmitHandler } from "@/components/FancyForm/FancyForm";
import { PageContainer } from "@components/PageContainer";

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

	const [isSendingMessage, setIsSendingMessage] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [successMessage, setSuccessMessage] = useState(false);

	const initModalSequence = () => {
		changeModalState({ isOpen: true });
		removeCurrentFocus();
	};

	const getDevModeEmailConfig = () => {
		const config: DevModeConfig = {
			fakeRequestDelay: 1500,
			fakeStatus: true,
		};

		return isDevMode ? config : undefined;
	};

	const handleFormSubmit: SubmitHandler = async (messageData) => {
		initModalSequence();

		setIsSendingMessage(true);

		const messageStatus = await sendEmail({
			userInfo: messageData,
			devMode: getDevModeEmailConfig(),
		});

		setIsSendingMessage(false);

		setSuccessMessage(messageStatus);
	};

	return (
		<PageContainer
			fillVerticalViewport
			addNavbarMarginTop
			id="contact"
		>
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
				</div>

				<div className="split">
					<FancyForm
						className="contact-form"
						submitHandler={handleFormSubmit}
					/>
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
									animationData={[messageAnimationData, okAnimationData]}
								/>
							)}
						</AnimatePresence>
					</Veil>
				)}
			</AnimatePresence>
		</PageContainer>
	);
};

export default Contact;
