const changeScrollbarState = ({ isVisible }: { isVisible: boolean }) => {
	document.getElementsByTagName("html")[0].style.overflow = isVisible
		? "hidden auto"
		: "hidden hidden";
};

export default changeScrollbarState;
