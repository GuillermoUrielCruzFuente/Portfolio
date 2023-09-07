import { routes } from "@/routes";
import { FancyLink } from "@components/FancyLink";
import { motion, Variants } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useLogoAnimationState } from "@/context/LogoAnimationState/useLogoAnimationState";
import styles from "./NavLinksDesktop.module.scss";

const mountingVariants: Variants = {
	unmount: {
		opacity: 0,
		y: "-100%",
	},
	mount: {
		opacity: 1,
		y: 0,
		transition: {
			type: "spring",
			bounce: 1,
			stiffness: 120,
			damping: 8,
			duration: 1,
		},
	},
};

export const NavLinksDesktop = () => {
	const { pathname } = useLocation();
	const isHome = pathname === "/";
	const [logoAnimationState] = useLogoAnimationState();
	const hasLogoAnimationBeenPlayed = logoAnimationState.isComplete;

	//manage the delay value based on 2 conditions
	//if it's home page or not
	//and if the logo animation has been completed (home or nav)
	const calculateDelay = (): number => {
		const delay = isHome ? 3.3 : 1.5;
		return hasLogoAnimationBeenPlayed ? 0 : delay;
	};

	return (
		<motion.ol
			className={styles["links-desk-container"]}
			initial="unmount"
			animate="mount"
			transition={{
				delayChildren: calculateDelay(),
				staggerChildren: 0.06,
			}}
		>
			{routes.map(({ path, text }) => (
				<motion.li
					key={path}
					variants={mountingVariants}
				>
					<FancyLink to={path}>{text}</FancyLink>
				</motion.li>
			))}
		</motion.ol>
	);
};
