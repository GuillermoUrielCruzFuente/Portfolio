export const removeCurrentFocus = () => {
	const currentFocusedComponent = document.activeElement as HTMLElement;
	currentFocusedComponent?.blur();
};
