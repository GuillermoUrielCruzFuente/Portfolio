import { forwardRef, ForwardedRef, InputHTMLAttributes, useImperativeHandle, useRef } from "react";

export type FancyInputElement = HTMLInputElement & {
	shakeInfoLabel: () => void;
};

export interface FancyInputProps extends InputHTMLAttributes<HTMLInputElement> {
	rotateIcon: number;
}

const FancyInput = forwardRef((props: FancyInputProps, ref: ForwardedRef<FancyInputElement>) => {
	const fancyInputRef = useRef<FancyInputElement>(null);
	const labelInfoRef = useRef<HTMLParagraphElement>(null);

	const { rotateIcon, ...otherProps } = props;

	useImperativeHandle(
		ref,
		() =>
			({
				shakeInfoLabel() {
					fancyInputRef.current?.focus()

					if (labelInfoRef.current) {
						labelInfoRef.current.style.color = "crimson";
						labelInfoRef.current.style.transition = "color 300ms";

						setTimeout(() => {
							labelInfoRef.current!.style.color = "white";
						}, 300);
					}
				},
			} as FancyInputElement)
	);

	return (
		<>
			<input
				ref={fancyInputRef}
				{...otherProps}
			/>

			<p ref={labelInfoRef}>this is the default label</p>
		</>
	);
});

export default FancyInput;
