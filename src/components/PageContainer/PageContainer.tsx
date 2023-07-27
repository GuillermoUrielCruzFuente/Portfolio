import { HTMLAttributes } from "react";
import styles from "./PageContainer.module.scss";

type PageContainerAttributes = HTMLAttributes<HTMLDivElement> & {};

const PageContainer = ({ children, className, ...otherAttributes }: PageContainerAttributes) => {
	const getClassNames = () => {
		const thereIsClassNameAttr = !!className || false;

		if (thereIsClassNameAttr) {
			return " " + className;
		}

		return "";
	};

	return (
		<div
			className={styles["page-container"] + getClassNames()}
			{...otherAttributes}
		>
			{children}
		</div>
	);
};

export default PageContainer;
