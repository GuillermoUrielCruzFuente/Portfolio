import { motion, Variants } from "framer-motion";
import { useEffect } from "react";

const variants: Variants = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
	},
	exit: {
		opacity: 0,
	},
};

const PageTransition = ({ children }: { children: JSX.Element }) => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	/**
	 * While using css-transition was posible to make animations without affect
	 * the stacking context, although, the framer-motion migration has been broken
	 * that stacking context. Now, is imposible to put the modal window in front of
	 * navbar.
	 *
	 * It is possible that I can get rid of this by removing the setted transition
	 * attributes (not really sure)
	 *
	 * Also, I can put the modal outside and increase the z-index in order to
	 * achieve this behavior
	 *
	 * Or even better, I can make a cool transition in order to hide the navbar every
	 * time a modal shows up
	 *
	 */
	return (
		<motion.div
			{...variants}
			transition={{ duration: 0.35 }}
		>
			{children}
		</motion.div>
	);
};

export default PageTransition;
