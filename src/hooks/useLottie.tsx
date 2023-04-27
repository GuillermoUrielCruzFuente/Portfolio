import { LottieData } from "@/typing/LottieTypes";
import Lottie, { AnimationItem } from "lottie-web";
import { MutableRefObject, useCallback, useLayoutEffect, useRef, HTMLAttributes } from "react";

type useLottieReturns = [
	lottieElement: (props: HTMLAttributes<HTMLDivElement>) => JSX.Element,
	lottieInstanceRef: MutableRefObject<AnimationItem>
];

const useLottie = ({ data }: LottieData): useLottieReturns => {
	const animationContainerRef = useRef<HTMLDivElement>(null);
	const lottieInstanceRef = useRef<AnimationItem>(
		Lottie.loadAnimation({
			container: animationContainerRef.current!,
		})
	);

	useLayoutEffect(() => {
		lottieInstanceRef.current = Lottie.loadAnimation({
			container: animationContainerRef.current!,
			animationData: data,
			autoplay: false,
			loop: false,
			renderer: "svg",
		});

		return () => {
			lottieInstanceRef.current!.destroy();
		};
	}, []);

	const lottieElement = useCallback(
		(props: HTMLAttributes<HTMLDivElement>) => (
			<div
				{...props}
				ref={animationContainerRef}
			/>
		),
		[]
	);

	return [lottieElement, lottieInstanceRef];
};

export default useLottie;
