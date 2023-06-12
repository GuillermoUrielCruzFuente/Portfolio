import type { TextareaHTMLAttributes } from "react";

/**
 *
 */
export type FancyTextareaElement = HTMLTextAreaElement & {
	shakeInfoLabel: () => void;
};

/**
 * An union type that include the input attributes
 * that will be omitted in the final FancyInputAttributes type
 */
export type TextareaExclusion = "placeholder";

/**
 *
 */
export type TextareaInheritedAttributes = Omit<
	TextareaHTMLAttributes<HTMLTextAreaElement>,
	TextareaExclusion
>;

/**
 *
 */
export type FancyTextareaAttributes = TextareaInheritedAttributes & {
	labelText: string;
	feedbackText: string;
	iconSrc: string;
	iconSize: number;
};
