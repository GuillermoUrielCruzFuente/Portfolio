import { Button } from "@components/Button";
import styles from "./ModalConfirmation.module.scss";
import { Variants, motion } from "framer-motion";
import okIcon from "@images/icons/ok.svg";
import { ANTICIPATE_TRANSITION } from "@/data/TransitionConfigurations";

export type ModalConfirmationProps = {
	success: boolean;
	messages: {
		success: string;
		error: string;
	};
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

const ModalConfirmation = ({ messages, success }: ModalConfirmationProps) => {
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
				<p>{success ? messages.success : messages.error}</p>

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
