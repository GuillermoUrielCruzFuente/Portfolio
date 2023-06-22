import { PropsWithChildren } from "react";
import styles from "./Veil.module.scss";
import { Transition, motion } from "framer-motion";

const Veil = ({ children }: PropsWithChildren) => {
	const transitionConfig: Transition = { type: "keyframes", duration: 0.5 };

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={transitionConfig}
			className={styles["veil"]}
		>
			{children}
		</motion.div>
	);
};

export default Veil;
