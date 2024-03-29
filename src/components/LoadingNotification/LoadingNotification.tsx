import styles from "./LoadingNotification.module.scss";
import { Loader } from "@components/Loader";
import { motion, Variants } from "framer-motion";
import { ANTICIPATE_TRANSITION } from "@/data/TransitionConfigurations";

export type NotificationProps = {
	message: string;
	className?: string;
};

const loadingNotificationVariants: Variants = {
	unmounted: {
		opacity: 0,
		scale: 0.35,
		rotate: 20,
		transition: {
			...ANTICIPATE_TRANSITION,
			duration: 0.5,
			delay: 1,
		},
	},
	mounted: {
		opacity: 1,
		scale: 1,
		rotate: 0,
		transition: ANTICIPATE_TRANSITION,
	},
};

const LoadingNotification = ({ message, className }: NotificationProps) => {
	return (
		<motion.div
			initial="unmounted"
			animate="mounted"
			exit="unmounted"
			variants={loadingNotificationVariants}
			className={`${styles.container}${className ? " " + className : ""}`}
		>
			<Loader
				className={styles.loader}
				size="small"
			/>

			<p className={styles.message}>{message}</p>
		</motion.div>
	);
};

export default LoadingNotification;
