import { useLayoutEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLogoAnimationState } from "@/context/LogoAnimationState";
import useLottie from "@/hooks/useLottie";
import logoAnimationData from "@lottie/logo.json";
import "@styles/components/NavLogo.scss";

const NavLogo = () => {
	const [LogoAnimation, lottieLogoAnimation] = useLottie({
		data: logoAnimationData,
	});
	const [_, setLogoAnimationState] = useLogoAnimationState();
	const location = useLocation();
	const isHomePage = location.pathname === "/";
	const linkRef = useRef<HTMLAnchorElement>(null);

	useLayoutEffect(() => {
		setAnimationInitialFrame();
		addLogoLinkListeners();

		return () => {
			removeLogoLinkListeners();
		};
	}, []);

	useLayoutEffect(() => {
		isHomePage ? hideLogo() : showLogo();
	}, [location.pathname]);

	const addLogoLinkListeners = () => {
		linkRef.current?.addEventListener("transitionend", handleLinkTransition);

		lottieLogoAnimation.current.addEventListener("complete", () =>
			setLogoAnimationState({ isComplete: true })
		);
	};

	const removeLogoLinkListeners = () => {
		linkRef.current?.removeEventListener("transitionend", handleLinkTransition);
	};

	const setAnimationInitialFrame = () => lottieLogoAnimation.current.goToAndStop(74, true);

	const isLinkInvisible = () => linkRef.current!.style.opacity === "0";

	const changeLogoLinkVisibility = ({ isVisible }: { isVisible: boolean }) =>
		(linkRef.current!.style.opacity = isVisible ? "1" : "0");

	const wasLinkTurnedToInvisible = (event: TransitionEvent) =>
		event.propertyName === "opacity" && isLinkInvisible();

	const handleLinkTransition = (event: globalThis.TransitionEvent) =>
		wasLinkTurnedToInvisible(event) && setAnimationInitialFrame();

	const changeLogoLinkInteractivity = ({ isInteractive }: { isInteractive: boolean }) => {
		linkRef.current!.blur();
		linkRef.current!.tabIndex = isInteractive ? 1 : -1;
		linkRef.current!.style.pointerEvents = isInteractive ? "all" : "none";
	};

	const hideLogo = () => {
		changeLogoLinkVisibility({ isVisible: false });
		changeLogoLinkInteractivity({ isInteractive: false });
	};

	const showLogo = () => {
		changeLogoLinkVisibility({ isVisible: true });
		changeLogoLinkInteractivity({ isInteractive: true });
		lottieLogoAnimation.current.play();
	};

	return (
		<Link
			className="nav-logo"
			to="/"
			ref={linkRef}
		>
			<LogoAnimation className="logo" />
		</Link>
	);
};

export default NavLogo;
