import { FormEventHandler, useEffect, useRef, useState } from "react";
import styles from "./FancyForm.module.scss";
import { FancyInput } from "@components/FancyInput";
import { FancyTextArea } from "@components/FancyTextArea";
import userIcon from "@images/icons/contact/user.svg";
import telIcon from "@images/icons/contact/tel.svg";
import mailIcon from "@images/icons/contact/email.svg";
import messageIcon from "@images/icons/contact/message.svg";
import sendIcon from "@images/icons/home-buttons/plane.svg";
import { FancyInputElement } from "@/typing/FancyInputTypes";
import { Button } from "@components/Button";

const FancyForm = () => {
	const [inputIconSize, setInputIconSize] = useState(0);
	const nameInputRef = useRef<FancyInputElement>(null);

	const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		console.log(event);
	};

	useEffect(() => {
		nameInputRef.current && setInputIconSize(nameInputRef.current?.iconComputedSize);
	}, []);

	return (
		<form
			className={styles["fancy-form"]}
			onSubmit={handleSubmit}
		>
			<h1>Envíame un mensaje!</h1>

			<FancyInput
				feedbackText="ingresa tu nombre"
				iconSrc={userIcon}
				labelText="Nombre"
				ref={nameInputRef}
			/>

			<FancyTextArea
				feedbackText="ingresa tu mensaje"
				iconSrc={messageIcon}
				labelText="Mensaje"
				iconSize={inputIconSize}
			/>

			<p className={styles["form-description"]}>
				Permíteme devolverte el mensaje. Por favor, rellena al menos uno de los siguientes
				campos, si lo deseas pueden ser ambos.
			</p>

			<FancyInput
				feedbackText="ingresa tu correo"
				iconSrc={mailIcon}
				labelText="Correo"
			/>

			<FancyInput
				feedbackText="ingresa tu teléfono"
				iconSrc={telIcon}
				labelText="Teléfono"
			/>

			<Button
				type="submit"
				icon={sendIcon}
			>
				Enviar
			</Button>
		</form>
	);
};

export default FancyForm;
