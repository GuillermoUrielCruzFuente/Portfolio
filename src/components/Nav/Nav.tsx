import { useEffect, useRef, useState } from "react";
import NavLogo from "@components/NavLogo";
import { NavLinksDesktop } from "@components/NavLinksDesktop";
import ResponsiveMenu from "../ResponsiveMenu";
import "./Nav.scss";

const Nav = () => {
	const navRef = useRef<HTMLElement>(null);
	const [isLargeScreen, setIsLargeScreen] = useState(false);

	const changeStyleOnScroll = () => {
		if (window.scrollY >= 100) {
			navRef.current?.classList.replace("no-blur-bg", "blur-bg");
		} else {
			navRef.current?.classList.replace("blur-bg", "no-blur-bg");
		}
	};

	const screenResizeHandler = () => {
		window.innerWidth > 860 ? setIsLargeScreen(true) : setIsLargeScreen(false);
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
			className="no-blur-bg"
		>
			<div id="nav-container">
				<NavLogo />

				<div id="navigator">{isLargeScreen ? <NavLinksDesktop /> : <ResponsiveMenu />}</div>
			</div>
		</nav>
	);
};

export default Nav;
