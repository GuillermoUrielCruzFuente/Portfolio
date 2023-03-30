import styles from "./ModalConfirmation.module.scss";

export type ModalConfirmationProps = {
	message: string;
};

const ModalConfirmation = ({ message }: ModalConfirmationProps) => {
	return (
		<div className={styles.veil}>
			<section>
				<p>{message}</p>
			</section>
		</div>
	);
};

export default ModalConfirmation;
