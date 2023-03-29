import styles from "./LoadingNotification.module.scss";
import Loader from "../Loader/Loader";

export type NotificationProps = {
	message: string;
	className?: string;
};

const LoadingNotification = ({ message, className }: NotificationProps) => {
	return (
		<div className={`${styles.container}${className ? " " + className : ""}`}>
			<Loader className={styles.loader} />

			<p className={styles.message}>{message}</p>
		</div>
	);
};

export default LoadingNotification;
