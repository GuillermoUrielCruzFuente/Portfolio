import type { LottieData } from "@typing/LottieTypes";
import Lottie from "lottie-web";
import { useEffect, useRef } from "react";

type AnimationSequenceProps = {
	animationFiles: LottieData[];
	containerClass?: string;
	keepLastAnimationFrame?: true;
};

const LottieAnimationSequence = ({
	animationFiles,
	containerClass,
	keepLastAnimationFrame,
}: AnimationSequenceProps) => {
	const containerRef = useRef(null);

	useEffect(() => {
		let animationIndex = 0;

		let animation = Lottie.loadAnimation({
			container: containerRef.current!,
		});

		const playAnimation = () => {
			animation = Lottie.loadAnimation({
				container: containerRef.current!,
				renderer: "svg",
				loop: false,
				autoplay: true,
				animationData: animationFiles[animationIndex],
			});

			animation.addEventListener("complete", () => {
				animationIndex++;

				const notTheLastAnimation = animationIndex < animationFiles.length;
				const isLastAnimation = animationIndex === animationFiles.length;

				if (notTheLastAnimation) {
					animation.destroy();

					playAnimation();
				}

				if (isLastAnimation) {
					keepLastAnimationFrame ? undefined : animation.destroy();
				}
			});
		};

		playAnimation();

		return () => {
			animation.destroy();
		};
	}, []);

	return (
		<div
			className={containerClass}
			ref={containerRef}
		></div>
	);
};

export default LottieAnimationSequence;
