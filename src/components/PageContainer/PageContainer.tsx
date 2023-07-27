import type { HTMLAttributes } from "react";
import styles from "./PageContainer.module.scss";

type PageContainerAttributes = HTMLAttributes<HTMLDivElement> & {
	addNavbarMarginTop?: boolean;
};

const PageContainer = ({
	children,
	className,
	addNavbarMarginTop,
	...otherAttributes
}: PageContainerAttributes) => {
	const getClassNames = () => {
		const classes: Array<string> = [];

		className && classes.push(className);
		addNavbarMarginTop && classes.push(styles["navbar-margin-top"]);
		classes.push(styles["page-container"]);

		return classes.join(" ");
	};

	return (
		<div
			className={getClassNames()}
			{...otherAttributes}
		>
			{children}
		</div>
	);
};

export default PageContainer;
