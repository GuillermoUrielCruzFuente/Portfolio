import { forwardRef, ForwardedRef, InputHTMLAttributes, useImperativeHandle, useRef } from "react";
import styles from "./FancyInput.module.scss";

/**
 *
 */
export type FancyInputElement = HTMLInputElement & {
	shakeInfoLabel: () => void;
};

/**
 * An union type that include the input attributes
 * that will be omitted in the final FancyInputAttributes type
 */
type InputExclusion = "placeholder";

/**
 *
 */
type InputInheritedAttributes = Omit<InputHTMLAttributes<HTMLInputElement>, InputExclusion>;

/**
 *
 */
export interface FancyInputAttributes extends InputInheritedAttributes {
	labelText: string;
	feedbackText: string;
	iconSrc?: string;
}

/**
 *
 */
const FancyInput = forwardRef(
	(props: FancyInputAttributes, ref: ForwardedRef<FancyInputElement>) => {
		const { labelText, feedbackText, iconSrc, ...otherProps } = props;
		const fancyInputRef = useRef<FancyInputElement>(null);
		const labelInfoRef = useRef<HTMLParagraphElement>(null);

		const shakeInfoLabel = () => {
			const handleAnimationEnd = (event: AnimationEvent) => {
				if (event.animationName === styles["shake"]) {
					labelInfoRef.current!.classList.remove(styles["shake"]);
					labelInfoRef.current!.removeEventListener("animationend", handleAnimationEnd);
				}
			};

			if (labelInfoRef.current) {
				labelInfoRef.current.classList.add(styles["shake"]);

				labelInfoRef.current.addEventListener("animationend", handleAnimationEnd);
			}
		};

		useImperativeHandle(ref, () => {
			return { shakeInfoLabel } as FancyInputElement;
		});

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
						alt=""
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
	}
);

export default FancyInput;
