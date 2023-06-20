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
import type { FancyTextareaElement } from "@/typing/FancyTextArea";
import type { UserInfo } from "@/helpers/SendMail";

export type SubmitHandler = (messageData: UserInfo) => Promise<void>;

type FancyFormProps = Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> & {
	submitHandler?: SubmitHandler;
};

const FancyForm = ({ className, submitHandler, ...otherProps }: FancyFormProps) => {
	const nameInputRef = useRef<FancyInputElement>(null);
	const messageTextAreaRef = useRef<FancyTextareaElement>(null);
	const emailInputRef = useRef<FancyInputElement>(null);
	const phoneInputRef = useRef<FancyInputElement>(null);

	const getDataFromInputs = (): UserInfo => ({
		name: nameInputRef.current!.value,
		message: messageTextAreaRef.current!.value,
		email: emailInputRef.current?.value,
		tel: phoneInputRef.current?.value,
	});

	const handleSubmit: FormEventHandler<HTMLFormElement> = (submitEvent) => {
		submitEvent.preventDefault();

		if (areInputsValid()) {
			submitHandler && submitHandler(getDataFromInputs());
		}
	};

	const areInputsValid = () => {
		// check that all inputs in this array are valid
		const requiredInputStates = [nameInputRef, messageTextAreaRef].map((infoInput) => {
			if (!infoInput.current?.validity.valid) {
				infoInput.current?.shakeInfoLabel();

				return false;
			}

			return true;
		});

		// check that at leat 1 of the inputs in this array is valid
		// and also check for the validity in case the input has a user input value
		const semiRequiredInputStates = [emailInputRef, phoneInputRef].map((infoInput) => {
			const isInputInvalid = !infoInput.current?.validity.valid;
			const isInputPopulated = infoInput.current?.value !== "";
			const isPopulatedButInvalid = isInputPopulated && isInputInvalid;

			if (isInputInvalid || isPopulatedButInvalid) {
				infoInput.current?.shakeInfoLabel();
				return false;
			}

			return true;
		});

		return (
			!requiredInputStates.some((state) => state === false) &&
			!semiRequiredInputStates.some((state) => state === false)
		);
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
				name="name"
			/>

			<FancyTextArea
				feedbackText="ingresa tu mensaje"
				iconSrc={messageIcon}
				labelText="Mensaje"
				ref={messageTextAreaRef}
				required
				iconSize={28}
				rows={7}
				name="message"
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
				name="email"
			/>

			<FancyInput
				feedbackText="ingresa tu teléfono"
				iconSrc={telIcon}
				labelText="Teléfono"
				ref={phoneInputRef}
				pattern="[0-9]{10}"
				name="phone"
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
