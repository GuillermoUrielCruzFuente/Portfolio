import type { InputHTMLAttributes } from "react";

/**
 *
 */
export type FancyInputElement = HTMLInputElement & {
	shakeInfoLabel: () => void;
	iconComputedSize: number;
};

/**
 * An union type that include the input attributes
 * that will be omitted in the final FancyInputAttributes type
 */
export type InputExclusion = "placeholder";

/**
 *
 */
export type InputInheritedAttributes = Omit<InputHTMLAttributes<HTMLInputElement>, InputExclusion>;

/**
 *
 */
export interface FancyInputAttributes extends InputInheritedAttributes {
	labelText: string;
	feedbackText: string;
	iconSrc: string;
}
