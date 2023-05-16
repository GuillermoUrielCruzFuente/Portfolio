import { FormEventHandler } from "react";
import styles from "./FancyForm.module.scss";

const FancyForm = () => {
	const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
	};

	return (
		<form
			className={styles["fancy-form"]}
			onSubmit={handleSubmit}
		></form>
	);
};

export default FancyForm;
