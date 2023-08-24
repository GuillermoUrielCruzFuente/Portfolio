import { useLayoutEffect } from "react";
import monsterAnimationData from "@lottie/404-pet.json";
import useLottie from "@/hooks/useLottie";
import { PageContainer } from "@components/PageContainer";
import "./NoMatch.scss";

export default function NoMatch() {
	const [Monster, MonsterLottie] = useLottie({
		data: monsterAnimationData,
	});

	useLayoutEffect(() => {
		MonsterLottie.current.autoplay = true;
		MonsterLottie.current.loop = true;
		MonsterLottie.current.play();
	}, []);

	return (
		<PageContainer
			fillVerticalViewport
			addNavbarMarginTop
			id="no-match"
		>
			<div className="monster-container">
				<Monster className="monster-animation" />
			</div>

			<h1 className="error-text">Error 404</h1>

			<p>La página a la que intentas acceder nunca existió, o quizás sí...</p>
		</PageContainer>
	);
}
