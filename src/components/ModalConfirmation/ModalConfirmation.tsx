import { Button } from "@components/Button";
import styles from "./ModalConfirmation.module.scss";
import { Variants, motion } from "framer-motion";

import successIcon from "@images/icons/ok.svg";
import errorIcon from "@images/icons/error.svg";

import { ANTICIPATE_TRANSITION } from "@/data/TransitionConfigurations";
import { AnimationConfigWithData } from "lottie-web";
import useLottie from "@/hooks/useLottie";

export type ModalConfirmationProps = {
	success: boolean;
	messages: {
		success: string;
		error: string;
	};
	animationData: {
		data:
			| Pick<AnimationConfigWithData, "animationData">
			| Pick<AnimationConfigWithData, "animationData">[];
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

const ModalConfirmation = ({ messages, success, animationData }: ModalConfirmationProps) => {
	const emitCloseModalEvent = () => {
		dispatchEvent(new CustomEvent("close-modal"));
	};

	const generateAnimations = () => {};

	return (
		<motion.div
			initial="unmounted"
			animate="mounted"
			exit="unmounted"
			variants={modalConfirmationVariants}
			className={`${styles["modal-container"]} ${
				success ? styles["success-state"] : styles["error-state"]
			}`}
		>
			<div className={styles["animation-container"]}></div>

			<div className={styles["description-container"]}>
				<p
					className={
						success ? styles["success-description"] : styles["error-description"]
					}
				>
					{success ? messages.success : messages.error}
				</p>

				<Button
					icon={success ? successIcon : errorIcon}
					onClick={emitCloseModalEvent}
				>
					Entendido
				</Button>
			</div>
		</motion.div>
	);
};

export default ModalConfirmation;
