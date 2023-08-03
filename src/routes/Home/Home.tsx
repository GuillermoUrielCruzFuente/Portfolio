import { useRef, useEffect } from "react";
import SocialMedia from "@components/SocialMedia/SocialMedia";
import Button from "@components/Button/Button";
import useLottie from "@/hooks/useLottie";
import { useLogoAnimationState } from "@/context/LogoAnimationState";
import logoAnimationData from "@lottie/logo.json";
import projectsIcon from "@images/icons/home-buttons/portfolio.svg";
import contactIcon from "@images/icons/home-buttons/plane.svg";
import collage from "@images/web-images/collage.png";
import "./Home.scss";

const Home = () => {
	const collageRef = useRef<HTMLImageElement>(null);
	const [_, setLogoAnimationState] = useLogoAnimationState();
	const [LogoAnimation, LogoLottie] = useLottie({
		data: logoAnimationData,
	});

	useEffect(() => {
		LogoLottie.current.play();

		LogoLottie.current.addEventListener("complete", dispatchCompleteLogoState);
	}, []);

	const dispatchCompleteLogoState = () => setLogoAnimationState({ isComplete: true });

	const showCollage = () => {
		collageRef.current!.classList.replace("collage-init", "collage-final");
	};

	return (
		<header id="home-main-container">
			<div className="home-content">
				<p className="big-text">Hola! 👋🏾 soy</p>

				<LogoAnimation className="lottie-animation" />

				<p className="description">
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
			</div>
		</header>
	);
};

export default Home;
