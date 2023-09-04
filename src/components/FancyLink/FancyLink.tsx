import { NavLink, NavLinkProps } from "react-router-dom";

import styles from "./FancyLink.module.scss";

interface FancyLinkProps extends Omit<NavLinkProps, "children" | "className"> {
	children: string;
}

const classNameProperty = "className";
type LinkClassHandlerUnion = NavLinkProps[typeof classNameProperty];
type LinkClassHandler = Extract<LinkClassHandlerUnion, Function>;

export const FancyLink = (props: FancyLinkProps) => {
	const { children, ...otherProps } = props;

	const classHandler: LinkClassHandler = ({ isActive, isPending }) => {
		const {
			"fancy-link-base": base,
			"fancy-link-active": active,
			"fancy-link-pending": pending,
		} = styles;

		const classes = [base];
		isActive && classes.push(active);
		isPending && classes.push(pending);

		return classes.join(" ");
	};

	return (
		<NavLink
			className={classHandler}
			{...otherProps}
		>
			<span className={styles["text"]}>{children}</span>
			<span className={styles["text-hover"]}>{children}</span>
		</NavLink>
	);
};
