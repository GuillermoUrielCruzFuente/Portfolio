import { CSSProperties } from "react";
import styles from "./Loader.module.scss";

type LoaderProps = {
	className?: string;
	shadow?: true;
	size?: "small" | "medium" | "large" | number;
};

export const Loader = ({ shadow, size = "small", className }: LoaderProps) => {
	const isNumberSize = typeof size === "number";

	const tileClasses = (tileNumber: number) => {
		const classes = [styles["tile-base"], styles["tile-" + tileNumber]];
		return classes.join(" ");
	};

	const tileGridClasses = () => {
		if (isNumberSize) {
			return className ? [className, styles["tile-grid"]].join(" ") : styles["tile-grid"];
		}

		const base = [styles[size], styles["tile-grid"]];
		const classes = className ? [...base, className] : [...base];
		return classes.join(" ");
	};

	const shadowStyles = (): CSSProperties | undefined => {
		if (isNumberSize) {
			return { boxShadow: `0 0 ${size}px ${size / 2}px #6f118580` };
		}
	};

	const shadowTemplate = () => {
		if (shadow) {
			return (
				<div
					className={styles["central-shadow"]}
					style={shadowStyles()}
				></div>
			);
		}
	};

	const squareTilesTemplate = () => {
		const SQUARE_AREA = 9;
		const tiles = [...Array(SQUARE_AREA + 1).keys()];
		tiles.shift();

		return tiles.map((tileNumber) => (
			<div
				className={tileClasses(tileNumber)}
				key={"tile-" + tileNumber}
			></div>
		));
	};

	return (
		<div
			className={tileGridClasses()}
			style={isNumberSize ? { width: size } : undefined}
		>
			{shadowTemplate()}

			{squareTilesTemplate()}
		</div>
	);
};
