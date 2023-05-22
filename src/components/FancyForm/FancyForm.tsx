import { FormEventHandler, FormHTMLAttributes, useRef } from "react";
import styles from "./FancyForm.module.scss";
import { FancyInput } from "@components/FancyInput";
import { FancyTextArea } from "@components/FancyTextArea";
import userIcon from "@images/icons/contact/user.svg";
import telIcon from "@images/icons/contact/tel.svg";
import mailIcon from "@images/icons/contact/email.svg";
import messageIcon from "@images/icons/contact/message.svg";
import sendIcon from "@images/icons/home-buttons/plane.svg";
import { Button } from "@components/Button";
import type { FancyInputElement } from "@/typing/FancyInputTypes";
import type { FancyTextAreaElement } from "@/typing/FancyTextArea";

const FancyForm = (props: FormHTMLAttributes<HTMLFormElement>) => {
	const { className, onSubmit, ...otherProps } = props;

	const nameInputRef = useRef<FancyInputElement>(null);
	const messageTextAreaRef = useRef<FancyTextAreaElement>(null);
	const emailInputRef = useRef<FancyInputElement>(null);
	const phoneInputRef = useRef<FancyInputElement>(null);

	const handleSubmit: FormEventHandler<HTMLFormElement> = (submitEvent) => {
		submitEvent.preventDefault();

		onSubmit && onSubmit(submitEvent);

		console.log(isInputInfoValid());
	};

	const isInputInfoValid = () => {
		const inputStates = [nameInputRef, emailInputRef, phoneInputRef].map((infoInput) => {
			if (!infoInput.current?.validity.valid) {
				infoInput.current?.shakeInfoLabel();
				return false;
			}

			return true;
		});

		return !inputStates.some((isValid) => isValid === false);
	};

	const parseClassName = () => styles["fancy-form"] + " " + (className ?? "");

	return (
		<form
			className={parseClassName()}
			onSubmit={handleSubmit}
			noValidate
			{...otherProps}
		>
			<h1>Envíame un mensaje!</h1>

			<FancyInput
				feedbackText="ingresa tu nombre"
				iconSrc={userIcon}
				labelText="Nombre"
				ref={nameInputRef}
				required
			/>

			<FancyTextArea
				feedbackText="ingresa tu mensaje"
				iconSrc={messageIcon}
				labelText="Mensaje"
				ref={messageTextAreaRef}
				required
				iconSize={28}
				rows={7}
			/>

			<p className={styles["form-description"]}>
				Permíteme devolverte el mensaje. Por favor, rellena al menos uno de los siguientes
				campos, si lo deseas pueden ser ambos.
			</p>

			<FancyInput
				feedbackText="ingresa tu correo"
				iconSrc={mailIcon}
				labelText="Correo"
				ref={emailInputRef}
				type="email"
			/>

			<FancyInput
				feedbackText="ingresa tu teléfono"
				iconSrc={telIcon}
				labelText="Teléfono"
				ref={phoneInputRef}
				pattern="[0-9]{10}"
			/>

			<Button
				type="submit"
				icon={sendIcon}
				className={styles["send-button"]}
			>
				Enviar
			</Button>
		</form>
	);
};

export default FancyForm;
