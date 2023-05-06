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

		const { labelText, rotateIcon, iconSrc, ...otherProps } = props;

		useImperativeHandle(
			ref,
			() =>
				({
					shakeInfoLabel: () => {
						fancyInputRef.current?.focus();

						if (labelInfoRef.current) {
							labelInfoRef.current.style.color = "crimson";
							labelInfoRef.current.style.transition = "color 300ms";

							setTimeout(() => {
								labelInfoRef.current!.style.color = "white";
							}, 300);
						}
					},
					isValid,
				} as FancyInputElement)
		);

		const handleOnChange: ChangeEventHandler<HTMLInputElement> = (keyEvent) => {
			if (fancyInputRef.current?.value === "") {
				setIsValid(false);
			} else {
				setIsValid(true);
			}
		};

		return (
			<>
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
