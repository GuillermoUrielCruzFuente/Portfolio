import { useLayoutEffect } from "react";
import monsterAnimationData from "@lottie/404-pet.json";
import useLottie from "@/hooks/useLottie";
import { PageContainer } from "@components/PageContainer";
import styles from "./NoMatch.module.scss";

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
			className={styles["no-match"]}
		>
			<div className={styles["monster-container"]}>
				<Monster className={styles["monster-animation"]} />
			</div>

			<h1 className={styles["error-title"]}>Error 404</h1>

			<p>La página a la que intentas acceder nunca existió, o quizás sí...</p>
		</PageContainer>
	);
}
