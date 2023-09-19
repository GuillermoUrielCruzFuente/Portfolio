import { AnimatePresence, motion, Variants } from "framer-motion";
import { routes } from "@routes/index";
import { FancyLink } from "@components/FancyLink";
import styles from "./ResponsiveMenuContainer.module.scss";

type ResponsiveMenuProps = {
	isOpen: boolean;
	itemCallback: () => void;
};

const mountingVariants: Variants = {
	unmount: {
		opacity: 0,
		y: "-100%",
		transition: {
			type: "spring",
			bounce: 1.5,
			stiffness: 150,
			damping: 10,
		},
	},
	mount: {
		opacity: 1,
		y: 0,
		transition: {
			type: "spring",
			bounce: 1,
			stiffness: 120,
			damping: 8,
		},
	},
};

export const ResponsiveMenuContainer = ({ isOpen, itemCallback }: ResponsiveMenuProps) => {
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className={styles["side-menu"]}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{
						duration: 0.35,
						type: "tween",
					}}
				>
					<motion.ol
						className={styles["responsive-links"]}
						initial="unmount"
						animate="mount"
						exit="unmount"
						transition={{
							staggerChildren: 0.05,
						}}
					>
						{routes.map((route) => (
							<motion.li
								key={route.path}
								variants={mountingVariants}
							>
								<FancyLink
									to={route.path}
									onClick={itemCallback}
								>
									{route.text}
								</FancyLink>
							</motion.li>
						))}
					</motion.ol>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
