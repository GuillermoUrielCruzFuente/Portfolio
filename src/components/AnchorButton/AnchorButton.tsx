import { AnchorHTMLAttributes } from "react";
import styles from "./AnchorButton.module.scss";

type AnchorButtonProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "target"> & {
	children: string;
	icon: string;
	secondary?: true;
};

export const AnchorButton = (props: AnchorButtonProps) => {
	const { children, href, icon, secondary, className, ...otherProps } = props;

	const classParser = () => {
		const {
			"anchor-button": base,
			"primary": primaryStyles,
			"secondary": secondaryStyles,
		} = styles;

		const classes = className ? [className, base] : [base];
		const anchorButtonType = secondary ? secondaryStyles : primaryStyles;
		classes.push(anchorButtonType);

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
