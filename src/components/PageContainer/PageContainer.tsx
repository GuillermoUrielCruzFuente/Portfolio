import styles from "./PageContainer.module.scss";

const PageContainer = ({
	children,
	marginTop = 0,
}: {
	children: JSX.Element;
	marginTop?: number;
}) => {
	return (
		<div
			style={{ marginTop }}
			className={styles["page-container"]}
		>
			{children}
		</div>
	);
};

export default PageContainer;
