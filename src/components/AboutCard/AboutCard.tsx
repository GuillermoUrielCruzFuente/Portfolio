import styles from "./AboutCard.module.scss";

export type AboutCardAttributes = {
	main: string;
	middle: string;
	bottom: string;
};

const AboutCard = ({ main, middle, bottom }: AboutCardAttributes) => {
	return (
		<div className={styles["about-card"]}>
			<p className={styles["main"]}>{main}</p>
			<p className={styles["middle"]}>{middle}</p>
			<p className={styles["bottom"]}>{bottom}</p>
			<span className={styles["bottom-line"]}></span>
		</div>
	);
};

export default AboutCard;
