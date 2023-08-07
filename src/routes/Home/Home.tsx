import { useRef, useEffect, useState } from "react";
import SocialMedia from "@components/SocialMedia/SocialMedia";
import Button from "@components/Button/Button";
import useLottie from "@/hooks/useLottie";
import { useLogoAnimationState } from "@/context/LogoAnimationState";
import logoAnimationData from "@lottie/logo.json";
import projectsIcon from "@images/icons/home-buttons/portfolio.svg";
import contactIcon from "@images/icons/home-buttons/plane.svg";
import collage from "@images/web-images/collage.png";
import { PageContainer } from "@components/PageContainer";
import "./Home.scss";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
	const collageRef = useRef<HTMLImageElement>(null);
	const [_, setLogoAnimationState] = useLogoAnimationState();
	const [LogoAnimationComponent, logoLottieRef] = useLottie({
		data: logoAnimationData,
	});

	useEffect(() => {
		setTimeout(() => {
			logoLottieRef.current.play();
		}, 500);

		logoLottieRef.current.addEventListener("complete", onLogoAnimationComplete);
	}, []);

	const logoAnimationContainerRef = useRef<HTMLDivElement>(null);
	const onLogoAnimationComplete = () => {
		setLogoAnimationState({ isComplete: true });

		setTimeout(() => {
			setHomeState(true);
		}, 500);
	};

	const showCollage = () => {
		collageRef.current!.classList.replace("collage-init", "collage-final");
	};

	const [homeState, setHomeState] = useState(false);

	return (
		<PageContainer
			addNavbarMarginTop
			fillVerticalViewport
			className="home-page-container"
		>
			<AnimatePresence mode="wait">
				{!homeState ? (
					<motion.div
						ref={logoAnimationContainerRef}
						className="logo-animation-container"
						initial={{ opacity: 0 }}
						animate={{
							opacity: 1,
							transition: {
								duration: 1,
								ease: "linear",
							},
						}}
						exit={{ opacity: 0 }}
						key="logo-container"
					>
						<LogoAnimationComponent className="lottie-animation" />
					</motion.div>
				) : (
					<motion.p
						key="home-content"
						initial={{ opacity: 0 }}
						animate={{
							opacity: 1,
							transition: {
								duration: 0.4,
							},
						}}
						exit={{ opacity: 0 }}
						className="big-text"
					>
						Hola! 👋🏾
					</motion.p>
				)}
			</AnimatePresence>

			{/* <motion.div
				layout
				className="layout-composer"
			>
				{isAnimationComplete.isComplete && (
					<motion.p
						initial={{ opacity: 0, y: "20%" }}
						animate={{
							opacity: 1,
							y: 0,
							transition: {
								duration: 0.4,
							},
						}}
						className="big-text"
					>
						Hola! 👋🏾 soy
					</motion.p>
				)}
			</motion.div> */}
			{/* <p className="description">
					<span className="accent">Desarrollador Frontend</span> de tiempo completo, con
					más de 3 años de experiencia. Mexicano, con intervención en distintos proyectos
					profesionales, una gran creatividad y atención a los detalles.
				</p>

				<div className="buttons-container">
					<Button
						icon={contactIcon}
						secondary
						navigateTo="/contacto"
					>
						contacto
					</Button>

					<Button
						icon={projectsIcon}
						navigateTo="/proyectos"
					>
						proyectos
					</Button>
				</div>

				<SocialMedia containerClass="social-media-container" />

				<div className="available">
					<span id="circle"></span>
					<p className="able-to-work">Disponible</p>
				</div>

				<div className="collage-container">
					<img
						src={collage}
						alt="Un collage con distintas capturas de mis proyectos destacados"
						className="collage collage-init"
						ref={collageRef}
						onLoad={showCollage}
					/>
				</div>
			</div> */}
		</PageContainer>
	);
};

export default Home;
