import Button from "../Button/Button";
import styles from "./ModalConfirmation.module.scss";
import { Transition, motion } from "framer-motion";
import okIcon from "@images/icons/ok.svg";

export type ModalConfirmationProps = {
	message: string;
};

const ModalConfirmation = ({ message }: ModalConfirmationProps) => {
	const transitionConfig: Transition = { type: "keyframes", duration: 0.35 };

	const emitCloseModalEvent = () => {
		dispatchEvent(new CustomEvent("close-modal"));
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={transitionConfig}
			className={styles.veil}
		>
			<div className={styles["modal-container"]}>
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
			</div>
		</motion.div>
	);
};

export default ModalConfirmation;
