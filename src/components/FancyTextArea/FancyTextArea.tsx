import {
	forwardRef,
	ForwardedRef,
	useImperativeHandle,
	useRef,
	useState,
	ChangeEventHandler,
} from "react";
import { FancyTextareaAttributes, FancyTextareaElement } from "@typing/FancyTextArea";
import styles from "./FancyTextArea.module.scss";

/**
 *
 */
const FancyTextArea = (props: FancyTextareaAttributes, ref: ForwardedRef<FancyTextareaElement>) => {
	const { labelText, feedbackText, iconSrc, iconSize, ...otherProps } = props;

	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const labelInfoRef = useRef<HTMLParagraphElement>(null);

	const [textAreaValue, setTextAreaValue] = useState("");

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
		if (labelInfoRef.current) {
			labelInfoRef.current.classList.add(styles["shake"]);
			labelInfoRef.current.addEventListener(
				"animationend",
				handleFeedbackParagraphAnimationEnd
			);
		}
	};

	useImperativeHandle(
		ref,
		() => {
			return {
				shakeInfoLabel,
				validity: textareaRef.current?.validity,
				value: textAreaValue,
				name: textareaRef.current?.name,
			} as FancyTextareaElement;
		},
		[textareaRef.current?.validity, textareaRef.current?.name, textAreaValue]
	);

	const handleTextAreaChange: ChangeEventHandler<HTMLTextAreaElement> = (changeEvent) => {
		setTextAreaValue(changeEvent.target.value);
	};

	return (
		<div>
			<div className={styles["textarea-container"]}>
				<textarea
					ref={textareaRef}
					placeholder={labelText}
					rows={5}
					onChange={handleTextAreaChange}
					{...otherProps}
				/>

				<label>{labelText}</label>

				<img
					src={iconSrc}
					alt=""
					width={iconSize}
				/>
			</div>

			<p
				className={styles["feedback-paragraph"]}
				ref={labelInfoRef}
			>
				{feedbackText}
			</p>
		</div>
	);
};

export default forwardRef(FancyTextArea);
