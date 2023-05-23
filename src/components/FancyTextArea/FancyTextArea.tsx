import { forwardRef, ForwardedRef, useImperativeHandle, useRef } from "react";
import { FancyTextAreaAttributes, FancyTextAreaElement } from "@typing/FancyTextArea";
import styles from "./FancyTextArea.module.scss";

/**
 *
 */
const FancyTextArea = (props: FancyTextAreaAttributes, ref: ForwardedRef<FancyTextAreaElement>) => {
	const { labelText, feedbackText, iconSrc, iconSize, ...otherProps } = props;

	const fancyTextAreaRef = useRef<FancyTextAreaElement>(null);
	const labelInfoRef = useRef<HTMLParagraphElement>(null);

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
				validity: fancyTextAreaRef.current?.validity,
			} as FancyTextAreaElement;
		},
		[fancyTextAreaRef.current?.validity]
	);

	return (
		<div>
			<div className={styles["textarea-container"]}>
				<textarea
					ref={fancyTextAreaRef}
					placeholder={labelText}
					rows={5}
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
