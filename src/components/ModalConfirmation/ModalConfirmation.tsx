import Button from "../Button/Button";
import styles from "./ModalConfirmation.module.scss";
import { Variants, motion } from "framer-motion";
import okIcon from "@images/icons/ok.svg";
import { ANTICIPATE_TRANSITION } from "@/data/TransitionConfigurations";

export type ModalConfirmationProps = {
	message: string;
};

const modalConfirmationVariants: Variants = {
	unmounted: {
		opacity: 0,
		scale: 0.35,
		rotate: 20,
		transition: ANTICIPATE_TRANSITION,
	},
	mounted: {
		opacity: 1,
		scale: 1,
		rotate: 0,
		transition: ANTICIPATE_TRANSITION,
	},
};

const ModalConfirmation = ({ message }: ModalConfirmationProps) => {
	const emitCloseModalEvent = () => {
		dispatchEvent(new CustomEvent("close-modal"));
	};

	return (
		<motion.div
			initial="unmounted"
			animate="mounted"
			exit="unmounted"
			variants={modalConfirmationVariants}
			className={styles["modal-container"]}
		>
			<div className={styles["animation-container"]}></div>

			<div className={styles["description-container"]}>
				<p>{message}</p>

				<Button
					icon={okIcon}
					onClick={emitCloseModalEvent}
				>
					Entendido
				</Button>
			</div>
		</motion.div>
	);
};

export default ModalConfirmation;
