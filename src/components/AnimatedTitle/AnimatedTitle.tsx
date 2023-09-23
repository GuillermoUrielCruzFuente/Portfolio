import { CSSProperties, MutableRefObject, useLayoutEffect, useRef } from "react";
import styles from "./AnimatedTitle.module.scss";

type textArray = {
	items: Array<string>;
	alignment: "left" | "right";
	textClass: string;
};

type textItem = {
	item: string;
	ref: MutableRefObject<HTMLSpanElement | null>;
};

export const AnimatedTitle = ({ items, alignment, textClass }: textArray) => {
	const titleRef = useRef<HTMLHeadingElement>(null);

	const itemsWithRef: Array<textItem> = items.map((item: string) => {
		const itemWithRef: textItem = {
			item: item,
			ref: useRef<HTMLSpanElement>(null),
		};
		return itemWithRef;
	});

	useLayoutEffect(() => {
		const observerOptions: IntersectionObserverInit = {
			root: null,
			rootMargin: "0px",
			threshold: 1,
		};

		const setFinalStyles = () => {
			itemsWithRef.forEach((item: textItem) => {
				const currentItem = item?.ref?.current;

				if (currentItem) {
					currentItem.style.opacity = "1";
					currentItem.style.transform = "translateY(0px)";
				}
			});
		};

		const observerCallback = (entries: Array<IntersectionObserverEntry>) => {
			entries.forEach((entry) => entry.isIntersecting && setFinalStyles());
		};

		const observer = new IntersectionObserver(observerCallback, observerOptions);

		observer.observe(titleRef.current as HTMLHeadingElement);
	}, []);

	const containerAlignment: CSSProperties = {
		alignItems: alignment === "left" ? "flex-start" : "flex-end",
	};

	return (
		<h1
			ref={titleRef}
			style={containerAlignment}
			className={styles["animated-title"]}
		>
			{itemsWithRef.map((item, index) => (
				<span
					className={`${styles["animated-segment"]} ${textClass}`}
					ref={item.ref}
					style={{ transitionDelay: `${index * 200}ms` }}
					key={item.item}
				>
					{item.item}
				</span>
			))}
		</h1>
	);
};
