import {
	forwardRef,
	ForwardedRef,
	InputHTMLAttributes,
	useImperativeHandle,
	useRef,
	useState,
	ChangeEventHandler,
} from "react";
import styles from "./FancyInput.module.scss";

export type FancyInputElement = HTMLInputElement & {
	isValid: boolean;
	shakeInfoLabel: () => void;
};

export interface FancyInputProps extends InputHTMLAttributes<HTMLInputElement> {
	rotateIcon: number;
}

const FancyInput = forwardRef((props: FancyInputProps, ref: ForwardedRef<FancyInputElement>) => {
	const fancyInputRef = useRef<FancyInputElement>(null);
	const labelInfoRef = useRef<HTMLParagraphElement>(null);
	const [isValid, setIsValid] = useState(false);

	const { rotateIcon, ...otherProps } = props;

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

	const calcHeight = () => {
		console.log(fancyInputRef.current?.offsetHeight);
	};

	return (
		<>
			<div className={styles["container"]}>
				<label>tu información</label>

				<input
					ref={fancyInputRef}
					onChange={handleOnChange}
					{...otherProps}
				/>
			</div>

			<button onClick={calcHeight}>height</button>

			<p ref={labelInfoRef}>this is the default label</p>
		</>
	);
});

export default FancyInput;
