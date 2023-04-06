import { CSSProperties, PropsWithChildren, useLayoutEffect, useRef } from "react";

export type IntersectionContainerAttributes = {
	transitionTime: number;
	from: CSSProperties;
	to: CSSProperties;
};

type IntersectionContainerProps = PropsWithChildren<IntersectionContainerAttributes>;

const IntersectionContainer = ({
	children,
	from,
	to,
	transitionTime,
}: IntersectionContainerProps) => {
	const containerRef = useRef<HTMLDivElement>(null);

	const computeEntries: IntersectionObserverCallback = (entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				for (let key in to) {
					const value = to[key as keyof typeof to] as string; //type assertion -> https://bobbyhadz.com/blog/typescript-no-index-signature-with-parameter-of-type-string
					const property = key as any;
					containerRef.current!.style[property] = value;
				}

				observer.disconnect();
			}
		});
	};

	const intersectionOptions: IntersectionObserverInit = {
		root: null,
		rootMargin: "0px",
		threshold: 0.5,
	};

	const setContainerTransition = () => {
		if (containerRef.current) {
			containerRef.current.style.transitionProperty = Object.keys(to).join();

			containerRef.current.style.transitionDuration = `${transitionTime}ms`;
		}
	};

	useLayoutEffect(() => {
		setContainerTransition();

		const observer = new IntersectionObserver(computeEntries, intersectionOptions);

		observer.observe(containerRef.current!);
	}, []);

	return (
		<div
			style={from}
			ref={containerRef}
		>
			{children}
		</div>
	);
};

export default IntersectionContainer;
