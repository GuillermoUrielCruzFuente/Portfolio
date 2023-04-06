import { ButtonHTMLAttributes, MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import "./Button.scss";

interface ButtonType extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon: string;
	secondary?: true;
	navigateTo?: string;
}

const Button = (props: ButtonType) => {
	const { icon, secondary, children, className, navigateTo, onClick, ...otherProps } = props;

	const navigate = useNavigate();

	const buttonClasses = `base-button ${
		secondary ? "secondary-button" : "primary-button"
	} ${className}`;

	const clickHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
		navigateTo && navigate(navigateTo);

		onClick && onClick(event);
	};

	return (
		<button
			className={buttonClasses}
			onClick={clickHandler}
			{...otherProps}
		>
			<img
				src={icon}
				alt=""
				className="button-icon"
			/>
			{children}
		</button>
	);
};

export default Button;
