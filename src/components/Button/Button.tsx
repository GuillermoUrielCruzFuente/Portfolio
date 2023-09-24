import { ButtonHTMLAttributes, MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Button.module.scss";

interface ButtonType extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon: string;
	secondary?: true;
	navigateTo?: string;
}

export const Button = (props: ButtonType) => {
	const { icon, secondary, children, className, navigateTo, onClick, ...otherProps } = props;

	const navigate = useNavigate();

	const classParser = () => {
		const classes = className ? [className, styles["base-button"]] : [styles["base-button"]];
		classes.push(styles[secondary ? "secondary-button" : "primary-button"]);

		return classes.join(" ");
	};

	const clickHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
		navigateTo && navigate(navigateTo);

		onClick && onClick(event);
	};

	return (
		<button
			className={classParser()}
			onClick={clickHandler}
			{...otherProps}
		>
			<img
				src={icon}
				alt=""
				className={styles["button-icon"]}
			/>
			{children}
		</button>
	);
};
