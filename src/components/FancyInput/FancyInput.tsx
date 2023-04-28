import { forwardRef, ForwardedRef, InputHTMLAttributes } from "react";

export type FancyInputElement = HTMLInputElement & {
	shakeLabel: () => void;
};

export interface FancyInputProps extends InputHTMLAttributes<HTMLInputElement> {
	rotateIcon: number;
}

const FancyInput = forwardRef((props: FancyInputProps, ref: ForwardedRef<FancyInputElement>) => {
	const { rotateIcon, ...otherProps } = props;

	return (
		<input
			ref={ref}
			{...otherProps}
		/>
	);
});

export default FancyInput;
