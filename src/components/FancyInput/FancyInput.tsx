import { forwardRef, ForwardedRef, useImperativeHandle } from "react";

export type FancyInputExtension = HTMLInputElement & {
	errorAnimation: () => void;
};

type FancyInputProps = {
	ref: ForwardedRef<FancyInputExtension>;
};

const FancyInput = forwardRef(({ ref }: FancyInputProps) => {
	return <input ref={ref} />;
});

export default FancyInput;
