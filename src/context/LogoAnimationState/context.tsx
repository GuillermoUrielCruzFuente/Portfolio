import { createContext, SetStateAction, Dispatch } from "react";

export type LogoStateType = { isComplete: boolean };

export type SetLogoStateType = Dispatch<SetStateAction<LogoStateType>>;

export const logoInitialState: LogoStateType = { isComplete: false };

export type LogoStateContextType = [LogoStateType, SetLogoStateType] | null;

const LogoAnimationContext = createContext<LogoStateContextType>(null);

export default LogoAnimationContext;
