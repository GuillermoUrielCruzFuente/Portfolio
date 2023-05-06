import {
	forwardRef,
	ForwardedRef,
	InputHTMLAttributes,
	useImperativeHandle,
	useRef,
	useState,
	ChangeEventHandler,
	useEffect,
} from "react";
import styles from "./FancyInput.module.scss";

export type FancyInputElement = HTMLInputElement & {
	isValid: boolean;
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

export interface FancyInputAttributes extends InputInheritedAttributes {
	labelText: string;
	feedbackText: string;
	rotateIcon?: number;
	iconSrc?: string;
}

const FancyInput = forwardRef(
	(props: FancyInputAttributes, ref: ForwardedRef<FancyInputElement>) => {
		const fancyInputRef = useRef<FancyInputElement>(null);
		const labelInfoRef = useRef<HTMLParagraphElement>(null);
		const [isValid, setIsValid] = useState(false);

		useEffect(() => {
			document.documentElement.style.setProperty(
				"--input-height",
				`${fancyInputRef.current?.offsetHeight}px`
			);
		}, []);

		const { labelText, feedbackText, rotateIcon, iconSrc, ...otherProps } = props;

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

		const handleOnChange: ChangeEventHandler<HTMLInputElement> = (keyEvent) => {
			if (fancyInputRef.current?.value === "") {
				setIsValid(false);
			} else {
				setIsValid(true);
			}
		};

		useImperativeHandle(ref, () => {
			return {
				shakeInfoLabel,
				isValid,
			} as FancyInputElement;
		});

		return (
			<div className={styles["fancy-input"]}>
				<div className={styles["container"]}>
					<input
						ref={fancyInputRef}
						onChange={handleOnChange}
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
