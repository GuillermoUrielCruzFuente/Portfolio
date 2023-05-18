import type { TextareaHTMLAttributes } from "react";

/**
 *
 */
export type FancyTextAreaElement = HTMLTextAreaElement & {
	shakeInfoLabel: () => void;
};

/**
 * An union type that include the input attributes
 * that will be omitted in the final FancyInputAttributes type
 */
export type TextAreaExclusion = "placeholder";

/**
 *
 */
export type TextAreaInheritedAttributes = Omit<
	TextareaHTMLAttributes<HTMLTextAreaElement>,
	TextAreaExclusion
>;

/**
 *
 */
export interface FancyTextAreaAttributes extends TextAreaInheritedAttributes {
	labelText: string;
	feedbackText: string;
	iconSrc: string;
	iconSize: number;
}
