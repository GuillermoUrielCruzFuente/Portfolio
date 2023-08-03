import {
	forwardRef,
	ForwardedRef,
	useImperativeHandle,
	useRef,
	useState,
	ChangeEventHandler,
	KeyboardEventHandler,
	ClipboardEventHandler,
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

		//todo: intercept the autocomplete input
		//todo: insert separator after delete

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
			"F1",
			"F2",
			"F3",
			"F4",
			"F5",
			"F6",
			"F7",
			"F8",
			"F9",
			"F10",
			"F11",
			"F12",
		];

		const validKeysForPhoneNumber = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

		if (type === "tel") {
			const isExecutingSpecialCommands = keyDownEvent.ctrlKey || keyDownEvent.metaKey;

			const isValidKey =
				validKeysForPhoneNumber.includes(key) ||
				validModifierKeys.includes(key) ||
				isExecutingSpecialCommands;

			const selection = document?.getSelection()?.toString();
			const { selectionStart, selectionEnd } = keyDownEvent.currentTarget;

			const thereIsASelectionInsideInput =
				selectionStart !== selectionEnd && selection !== "";

			if (isValidKey) {
				if (
					inputValue.length >= 12 &&
					!validModifierKeys.includes(key) &&
					!thereIsASelectionInsideInput &&
					!isExecutingSpecialCommands
				) {
					keyDownEvent.preventDefault();
					shakeInfoLabel();
				}
			} else {
				keyDownEvent.preventDefault();
				shakeInfoLabel();
			}
		}
	};

	const handleKeyUp: KeyboardEventHandler<HTMLInputElement> = (keyUpEvent) => {
		if (type === "tel") {
			const { length: inputContentLength } = keyUpEvent.currentTarget.value;

			if (
				(inputContentLength === 3 || inputContentLength === 7) &&
				keyUpEvent.key !== "Backspace"
			) {
				keyUpEvent.currentTarget.value += " ";
			}
		}
	};

	/**
	 * probably you receive the phone number in a weird format
	 * with letters or other symbols.
	 * this function handle that and returns a valid phone number to put
	 * inside the input
	 *
	 * 9511131780 -> 951 113 1780
	 * 951-113-1780 -> 951 113 1780
	 * +52 9511131780 -> 951 113 1780
	 * 951 113 1780 -> 951 113 1780
	 *
	 *
	 * @param phoneNumber
	 * @returns formatted phone string
	 */
	const formatPhoneNumber = (phoneNumber: string): string => {
		const numberRegexp = new RegExp(/^\d+$/);

		const isOnlyNumbers = numberRegexp.test(phoneNumber);

		if (isOnlyNumbers && phoneNumber.length === 10) {
			return insertSpaces(phoneNumber);
		}

		return "";
	};

	const insertSpaces = (tenDigitPhone: string) => {
		const FIRST_SPACE = 3;
		const firstSpaceInsertion = insertSpaceIntoIndex(FIRST_SPACE, tenDigitPhone);

		const SECOND_SPACE = 7;
		const secondSpaceInsertion = insertSpaceIntoIndex(SECOND_SPACE, firstSpaceInsertion);

		return secondSpaceInsertion;
	};

	const insertSpaceIntoIndex = (index: number, string: string) => {
		return [string.slice(0, index), " ", string.slice(index)].join("");
	};

	const handlePaste: ClipboardEventHandler<HTMLInputElement> = (clipboardEvent) => {
		if (type === "tel") {
			clipboardEvent.preventDefault();

			const pastedString = clipboardEvent.clipboardData.getData("text");
			const formattedPhone = formatPhoneNumber(pastedString);
			setInputValue(formattedPhone);
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
					onKeyUp={handleKeyUp}
					onPaste={handlePaste}
					{...otherProps}
					value={inputValue}
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
