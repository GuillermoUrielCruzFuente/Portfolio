import { CSSProperties, useRef, useState } from "react";

export type UseInput = {
	render: JSX.Element;
	getValue: () => string;
	isValid: boolean;
	shakeLabel: () => void;
};

export type InputValidation = Pick<UseInput, "getValue" | "isValid">;

export type InputConfig = {
	name: string;
	img: string;
	required: boolean;
	inputType: "text" | "email" | "tel";
};

/**
 * Create an animated input field with the required configuration
 * @param InputConfig object with all the necessary information for  the input.
 * - name: submit name and placeholder
 * - img: input left icon
 * - required: if the input is required, the unrequired inputs will validate data only if it is not empty
 * - inputType: can be 'text', 'email' and 'tel'
 * @returns Object that contains:
 * - Component to render
 * - getValue() method that provide to the parent an easy way to access the input value
 * - isValid property
 * - shakeLabel() method that provide to the parent an easy way to give visual feedback to user on invalid inputs
 */
export const useInput = ({ name, img, required, inputType }: InputConfig): UseInput => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [inputState, setInputState] = useState(!required);
	const labelRef = useRef<HTMLSpanElement>(null);

	const getValue = () => (inputRef.current ? inputRef.current.value : "");
	const isInputFilled = () => getValue() != "";
	const isInputValid = () => inputRef.current?.validity.valid;

	const shakeLabel = () => {
		labelRef.current!.style.animation = "shake 400ms ease";

		labelRef.current!.addEventListener("animationend", (event: AnimationEvent) => {
			if (event.animationName === "shake") {
				labelRef.current!.style.animation = "unset";
			}
		});
	};

	const handleInputContentChange = () => {
		if (isInputValid()) {
			if (isInputFilled()) {
				setInputState(true);
			} else {
				//a weird way to force the re render
				setInputState(false);
				setTimeout(() => setInputState(true), 10);
			}
		} else {
			setInputState(false);
		}
	};

	const VALIDATION_DESCRIPTIONS = {
		text: "Ingresa tu nombre.",
		tel: "Ingresa tu número telefónico a 10 dígitos. Ej. 5551588911",
		email: "Ingresa una dirección de correo válida. Ej. correo@gmail.com",
	};

	const LABEL_STATE_COLORS = {
		OK: "#99fb9c",
		ERROR: "#fb9999",
		NEUTRAL: "#f5c8ff",
	};

	const getInlineValidationDescription = (): string => {
		return VALIDATION_DESCRIPTIONS[inputType];
	};

	const computeLabelColor = (): CSSProperties => {
		if (inputState) {
			if (isInputFilled()) {
				return { color: LABEL_STATE_COLORS.OK };
			} else {
				return { color: LABEL_STATE_COLORS.NEUTRAL };
			}
		} else if (required) {
			return { color: LABEL_STATE_COLORS.ERROR };
		} else {
			return { color: LABEL_STATE_COLORS.NEUTRAL };
		}
	};

	const input = (
		<>
			<div className="input-container">
				<input
					autoComplete="off"
					className="form-input"
					ref={inputRef}
					name={name}
					placeholder={name}
					type={inputType}
					onChange={handleInputContentChange}
					pattern={inputType === "tel" ? "[0-9]{10}" : undefined}
					required={required}
				/>

				<label>{name}</label>

				<img
					className="label-icon"
					src={img}
					alt={`${name} icon`}
				/>
			</div>

			<span
				className="error-label"
				style={computeLabelColor()}
				ref={labelRef}
			>
				{getInlineValidationDescription()}
			</span>
		</>
	);

	return {
		render: input,
		getValue: getValue,
		isValid: inputState,
		shakeLabel: shakeLabel,
	};
};

export default useInput;
