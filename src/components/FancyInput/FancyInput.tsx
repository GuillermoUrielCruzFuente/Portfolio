import { forwardRef, ForwardedRef, useImperativeHandle, useRef } from "react";
import { FancyInputAttributes, FancyInputElement } from "@typing/FancyInputTypes";
import styles from "./FancyInput.module.scss";

const FancyInput = (props: FancyInputAttributes, ref: ForwardedRef<FancyInputElement>) => {
	const { labelText, feedbackText, iconSrc, ...otherProps } = props;

	const fancyInputRef = useRef<FancyInputElement>(null);
	const iconRef = useRef<HTMLImageElement>(null);
	const labelInfoRef = useRef<HTMLParagraphElement>(null);

	useImperativeHandle(
		ref,
		() => {
			return {
				shakeInfoLabel,
				iconComputedSize: iconRef.current?.offsetHeight,
				validity: fancyInputRef.current?.validity,
			} as FancyInputElement;
		},
		[fancyInputRef.current?.validity, iconRef.current?.offsetHeight]
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

	return (
		<div>
			<div className={styles["input-container"]}>
				<input
					ref={fancyInputRef}
					placeholder={labelText}
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
				className={styles["feedback-paragraph"]}
				ref={labelInfoRef}
			>
				{feedbackText}
			</p>
		</div>
	);
};

export default forwardRef(FancyInput);
