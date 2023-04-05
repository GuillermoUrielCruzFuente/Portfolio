import Button from "../Button/Button";
import styles from "./ModalConfirmation.module.scss";
import { Transition, motion } from "framer-motion";
import okIcon from "@images/icons/ok.svg";

export type ModalConfirmationProps = {
	message: string;
};

const ModalConfirmation = ({ message }: ModalConfirmationProps) => {
	const transitionConfig: Transition = { type: "keyframes", duration: 0.35 };

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={transitionConfig}
			className={styles.veil}
		>
			<div className={styles.modalContainer}>
				<p>{message}</p>
				
				<Button
					icon={okIcon}
					onClick={() => {
						const closeModalEvent = new CustomEvent("close-modal");

						dispatchEvent(closeModalEvent);
					}}
				>
					Entendido
				</Button>
			</div>
		</motion.div>
	);
};

export default ModalConfirmation;
