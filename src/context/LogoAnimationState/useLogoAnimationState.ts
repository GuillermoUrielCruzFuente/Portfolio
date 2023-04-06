import { useContext } from "react";
import LogoAnimationContext from "./context";

export const useLogoAnimationState = () => {
	const context = useContext(LogoAnimationContext);

	if (!context) {
		throw new Error(
			"useLogoAnimationState must be used inside a LogoAnimationContext Provider"
		);
	}

	return context;
};
