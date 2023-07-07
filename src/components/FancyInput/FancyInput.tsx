import {
	forwardRef,
	ForwardedRef,
	useImperativeHandle,
	useRef,
	useState,
	ChangeEventHandler,
	KeyboardEventHandler,
} from "react";
import { FancyInputAttributes, FancyInputElement } from "@typing/FancyInputTypes";
import styles from "./FancyInput.module.scss";

const FancyInput = (props: FancyInputAttributes, ref: ForwardedRef<FancyInputElement>) => {
	const { labelText, feedbackText, iconSrc, type, ...otherProps } = props;

	const inputRef = useRef<HTMLInputElement>(null);
	const iconRef = useRef<HTMLImageElement>(null);
	const labelInfoRef = useRef<HTMLParagraphElement>(null);

	const [inputValue, setInputValue] = useState("");

	useImperativeHandle(
		ref,
		() => {
			return {
				shakeInfoLabel,
				iconComputedSize: iconRef.current?.offsetHeight,
				validity: inputRef.current?.validity,
				value: inputValue,
				name: inputRef.current?.name,
			} as FancyInputElement;
		},
		[
			inputRef.current?.validity,
			inputRef.current?.name,
			inputValue,
			iconRef.current?.offsetHeight,
		]
	);

	const handleFeedbackParagraphAnimationEnd = (event: AnimationEvent) => {
		if (event.animationName === styles["shake"]) {
			labelInfoRef.current!.classList.remove(styles["shake"]);
			labelInfoRef.current!.removeEventListener(
				"animationend",
				handleFeedbackParagraphAnimationEnd
			);
		}
	};

	const shakeInfoLabel = () => {
		labelInfoRef.current?.classList.add(styles["shake"]);
		labelInfoRef.current?.addEventListener("animationend", handleFeedbackParagraphAnimationEnd);
	};

	const handleInputChange: ChangeEventHandler<HTMLInputElement> = (changeEvent) => {
		setInputValue(changeEvent.target.value);
	};

	const parseFeedbackParagraphClasses = () => {
		const isValid = inputRef.current?.validity.valid;

		const stateColor = isValid ? styles["success-color"] : styles["error-color"];

		return `${styles["feedback-paragraph"]} ${isValid === undefined ? "" : stateColor}`;
	};

	const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (keyDownEvent) => {
		const { key } = keyDownEvent;

		//todo: let the user copy and paste the input value
		//todo: intercept the autocomplete input
		//todo: insert separators automatically ( "-" or " ")

		const validModifierKeys = [
			"Control",
			"Backspace",
			"Shift",
			"Alt",
			"Enter",
			"Tab",
			"ArrowLeft",
			"ArrowRight",
			"Delete",
			"Meta",
		];

		const validCharsForPhoneNumber = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

		if (type === "tel") {
			const isValidKey =
				validCharsForPhoneNumber.includes(keyDownEvent.key) ||
				validSpecialKeys.includes(keyDownEvent.key);

			// todo: verify selection and the valid insertion into that selection
			const selection = document?.getSelection()?.toString() ?? "";

			if (isValidKey) {
				if (inputValue.length === 10 && !validSpecialKeys.includes(keyDownEvent.key)) {
					keyDownEvent.preventDefault();
				}
			} else {
				keyDownEvent.preventDefault();
			}
		}
	};

	return (
		<div>
			<div className={styles["input-container"]}>
				<input
					ref={inputRef}
					placeholder={labelText}
					onChange={handleInputChange}
					type={type}
					onKeyDown={handleKeyDown}
					{...otherProps}
				/>

				<label>{labelText}</label>

				<img
					src={iconSrc}
					alt={labelText + " input icon"}
					ref={iconRef}
				/>
			</div>

			<p
				className={parseFeedbackParagraphClasses()}
				ref={labelInfoRef}
			>
				{feedbackText}
			</p>
		</div>
	);
};

export default forwardRef(FancyInput);
