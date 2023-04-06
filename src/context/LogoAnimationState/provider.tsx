import { useState } from "react";
import LogoAnimationContext, { LogoStateType, logoInitialState } from "./context";

type LogoProviderProps = {
	children: JSX.Element;
};

const LogoAnimationStateProvider = ({ children }: LogoProviderProps) => (
	<LogoAnimationContext.Provider value={useState<LogoStateType>(logoInitialState)}>
		{children}
	</LogoAnimationContext.Provider>
);

export default LogoAnimationStateProvider;
