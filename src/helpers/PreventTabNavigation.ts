export const preventTabNavigation = (keyEvent: globalThis.KeyboardEvent) => {
	if (keyEvent.key === "Tab") keyEvent.preventDefault();
};

export const disableTabNavigation = () => {
	document.addEventListener("keydown", preventTabNavigation);
};

export const enableTabNavigation = () => {
	document.removeEventListener("keydown", preventTabNavigation);
};
