import { useEffect, useRef, useState } from "react";
import { NavLogo } from "@components/NavLogo";
import { NavLinksDesktop } from "@components/NavLinksDesktop";
import { ResponsiveMenu } from "@components/ResponsiveMenu";
import styles from "./Nav.module.scss";
import { computeHorizontalBoxesCollision } from "@/helpers/computeHorizontalBoxesCollision";

export const Nav = () => {
	const navRef = useRef<HTMLElement>(null);
	const [hasEnoughSpace, setHasEnoughSpace] = useState(false);

	const changeStyleOnScroll = () => {
		const userHasBeenScrolled = window.scrollY >= 100;

		changeNavBlurVisibility({ show: userHasBeenScrolled });
	};

	const changeNavBlurVisibility = ({ show }: { show: boolean }) => {
		const { "no-blur-bg": noBlur, "blur-bg": blur } = styles;

		show
			? navRef.current?.classList.replace(noBlur, blur)
			: navRef.current?.classList.replace(blur, noBlur);
	};

	const screenResizeHandler = () => {
		setHasEnoughSpace(window.innerWidth > 860);
	};

	useEffect(() => {
		screenResizeHandler();
		changeStyleOnScroll();

		window.addEventListener("scroll", changeStyleOnScroll);
		window.addEventListener("resize", screenResizeHandler);

		return () => {
			window.removeEventListener("scroll", changeStyleOnScroll);
			window.removeEventListener("resize", screenResizeHandler);
		};
	}, []);

	return (
		<nav
			ref={navRef}
			className={styles["no-blur-bg"]}
		>
			<div className={styles["nav-container"]}>
				<div
					className={styles["nav-logo-container"]}
					ref={navLogoContainerRef}
				>
					<NavLogo />
				</div>

				<div
					className={styles["navigator"]}
					ref={linksContainerRef}
				>
					{hasEnoughSpace ? <NavLinksDesktop /> : <ResponsiveMenu />}
				</div>
			</div>
		</nav>
	);
};
