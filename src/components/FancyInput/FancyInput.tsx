import {
	forwardRef,
	ForwardedRef,
	useImperativeHandle,
	useRef,
	useState,
	ChangeEventHandler,
} from "react";
import { FancyInputAttributes, FancyInputElement } from "@typing/FancyInputTypes";
import styles from "./FancyInput.module.scss";

const FancyInput = (props: FancyInputAttributes, ref: ForwardedRef<FancyInputElement>) => {
	const { labelText, feedbackText, iconSrc, ...otherProps } = props;

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

	return (
		<div>
			<div className={styles["input-container"]}>
				<input
					ref={inputRef}
					placeholder={labelText}
					onChange={handleInputChange}
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
