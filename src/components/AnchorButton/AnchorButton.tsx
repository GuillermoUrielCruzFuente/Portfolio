import { AnchorHTMLAttributes } from "react";
import styles from "./AnchorButton.module.scss";

type AnchorButtonProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "target"> & {
	children: string;
	icon: string;
	primary?: true;
};

export const AnchorButton = (props: AnchorButtonProps) => {
	const { children, href, icon, primary, className, ...otherProps } = props;

	const classParser = () => {
		const {
			"project-button": base,
			"primary": primaryClass,
			"secondary": secondaryClass,
		} = styles;

		const classes = [className, base];

		classes.push(primary ? primaryClass : secondaryClass);

		return classes.join(" ");
	};

	return (
		<a
			className={classParser()}
			href={href}
			target="_blank"
			{...otherProps}
		>
			<img
				src={icon}
				alt="project info icon"
			/>

			{children}
		</a>
	);
};
