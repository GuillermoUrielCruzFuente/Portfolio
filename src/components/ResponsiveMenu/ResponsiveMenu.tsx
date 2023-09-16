import { useState } from "react";
import useLottie from "@/hooks/useLottie";
import hamMenu from "@lottie/hamburger-menu.json";
import styles from "./ResponsiveMenu.module.scss";
import changeScrollbarState from "@/helpers/ChangeScrollbarState";
import { ResponsiveMenuContainer } from "@components/ResponsiveMenuContainer";

export const ResponsiveMenu = () => {
	const [HamMenu, HamMenuLottie] = useLottie({ data: hamMenu });
	const [isOpen, setIsOpen] = useState(false);

	const showBackArrow = () => HamMenuLottie.current.playSegments([20, 70], true);

	const showHamburger = () => HamMenuLottie.current.playSegments([120, 140], true);

	const toggler = (currentState: boolean) => {
		changeScrollbarState({ isVisible: currentState });
		currentState ? showHamburger() : showBackArrow();
		return !currentState;
	};

	const toggle = () => setIsOpen(toggler);

	const hideMenu = () => {
		setIsOpen(false);
		showHamburger();
		changeScrollbarState({ isVisible: true });
	};

	return (
		<>
			<div className={styles["hamburger-menu-container"]}>
				<HamMenu
					className={styles["hamburger-animation"]}
					onClick={toggle}
				/>
			</div>

			<ResponsiveMenuContainer
				isOpen={isOpen}
				itemCallback={hideMenu}
			/>
		</>
	);
};
