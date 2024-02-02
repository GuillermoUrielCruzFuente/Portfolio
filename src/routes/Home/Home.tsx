import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@components/Button";
import { PageContainer } from "@components/PageContainer";
import { useLogoAnimationState } from "@/context/LogoAnimationState";
import useLottie from "@/hooks/useLottie";
import styles from "./Home.module.scss";
import logoAnimationData from "@lottie/logo.json";
import projectsIcon from "@images/icons/home-buttons/portfolio.svg";
import contactIcon from "@images/icons/home-buttons/plane.svg";
import logoImage from "@images/identity/logo-white.svg";

const Home = () => {
	const [logoAnimationState, setLogoAnimationState] = useLogoAnimationState();
	const [LogoAnimationComponent, logoLottieRef, componentRef] = useLottie({
		data: logoAnimationData,
	});

	useEffect(() => {
		setTimeout(() => {
			logoLottieRef.current?.play();
		}, 100);

		logoLottieRef.current?.addEventListener("complete", () => {
			setLogoAnimationState({ isComplete: true });
		});
	}, []);

	const guillermoLogoTemplate = () => {
		return (
			<motion.div
				className={styles["logo-animation-container"]}
				initial={{ opacity: 0 }}
				animate={{
					opacity: 1,
					transition: {
						duration: 0.5,
						ease: "linear",
					},
				}}
				exit={{ opacity: 0 }}
				key="logo-container"
			>
				<LogoAnimationComponent className={styles["lottie-animation"]} />
			</motion.div>
		);
	};

	const homeContentTemplate = () => {
		return (
			<motion.div
				key="home-content"
				initial={{ opacity: 0 }}
				animate={{
					opacity: 1,
					transition: { duration: 0.4 },
				}}
				exit={{ opacity: 0 }}
				className={styles["home-content"]}
			>
				<div>
					<p className={styles["greeting-text"]}>Hola! 👋🏾, soy</p>

					<img
						src={logoImage}
						alt="logo"
						className={styles["logo-image"]}
					/>
				</div>

				<p className={styles["description"]}>
					<span className={styles["accent"]}>Desarrollador Frontend</span> de tiempo
					completo, con más de 3 años de experiencia. Mexicano, con intervención en
					distintos proyectos profesionales, una gran creatividad y atención a los
					detalles.
				</p>

				<div className={styles["buttons-container"]}>
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
			</motion.div>
		);
	};

	return (
		<PageContainer
			addNavbarMarginTop
			fillVerticalViewport
			className={styles["home-page-container"]}
		>
			<AnimatePresence mode="wait">
				{logoAnimationState.isComplete ? homeContentTemplate() : guillermoLogoTemplate()}
			</AnimatePresence>
		</PageContainer>
	);
};

export default Home;
