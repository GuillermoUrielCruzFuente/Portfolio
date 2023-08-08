import { useRef, type HTMLAttributes, useEffect } from "react";
import styles from "./PageContainer.module.scss";

type PageContainerAttributes = HTMLAttributes<HTMLDivElement> & {
	addNavbarMarginTop?: boolean;
	fillVerticalViewport?: boolean;
};

const PageContainer = ({
	children,
	className,
	addNavbarMarginTop,
	fillVerticalViewport,
	...otherAttributes
}: PageContainerAttributes) => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const containerElement = containerRef.current;

		addNavbarMarginTop
			? containerElement?.setAttribute("add-navbar-margin-top", "")
			: containerElement?.removeAttribute("add-navbar-margin-top");

		fillVerticalViewport
			? containerElement?.setAttribute("fill-vertical-viewport", "")
			: containerElement?.removeAttribute("fill-vertical-viewport");
	}, [addNavbarMarginTop, fillVerticalViewport]);

	const getClassNames = () => {
		const classes: Array<string> = [];

		className && classes.push(className);

		addNavbarMarginTop && classes.push(styles["navbar-margin-top"]);

		fillVerticalViewport && classes.push(styles["fill-vertical-viewport"]);

		classes.push(styles["page-container"]);

		return classes.join(" ");
	};

	return (
		<div
			className={getClassNames()}
			ref={containerRef}
			{...otherAttributes}
		>
			{children}
		</div>
	);
};

export default PageContainer;
