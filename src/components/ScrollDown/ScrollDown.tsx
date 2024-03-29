import { AnimatePresence, motion, Transition } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./ScrollDown.module.scss";

const ScrollDown = () => {
	const [scrollState, setScrollState] = useState(false);

	const hideOnScroll = () => {
		const needToBeVisible = !(window.scrollY >= 100);
		setScrollState(needToBeVisible);
	};

	useEffect(() => {
		// invoke the funtion at the first render in order
		// to avoid render the component on a previous saved scroll state
		hideOnScroll();

		window.addEventListener("scroll", hideOnScroll);

		return () => {
			window.removeEventListener("scroll", hideOnScroll);
		};
	}, []);

	const transitionConfig: Transition = { type: "tween", duration: 1, ease: "anticipate" };

	return (
		<AnimatePresence>
			{scrollState && (
				<motion.div
					initial={{ y: -40, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: "100%", opacity: 0 }}
					transition={transitionConfig}
					className={styles["scroll"]}
				>
					<p>scroll</p>

					<div className={styles["line-container"]}>
						<span className={styles["line"]}></span>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default ScrollDown;
