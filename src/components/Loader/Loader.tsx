import styles from "./Loader.module.scss";

type LoaderProps = {
	className?: string;
	shadow?: true;
	size?: "small" | "medium" | "large";
};

export const Loader = ({ shadow, size = "small", className }: LoaderProps) => {
	const tileClasses = (tileNumber: number) => {
		const classes = [styles["tile-base"], styles["tile-" + tileNumber]];
		return classes.join(" ");
	};

	const squareTiles = () => {
		const SQUARE_SIZE = 9;
		const tiles = [...Array(SQUARE_SIZE).keys()];

		return tiles.map((tileIndex) => {
			const tileNumber = ++tileIndex;

			return (
				<div
					className={tileClasses(tileNumber)}
					key={"tile-" + tileNumber}
				></div>
			);
		});
	};

	const containerClasses = () => {
		const base = [styles[size], styles["tile-grid"]];
		const classes = className ? [...base, className] : [...base];
		return classes.join(" ");
	};

	return (
		<div
			className={containerClasses()}
			title="loading..."
		>
			{shadow ? <div className={styles["central-shadow"]}></div> : ""}

			{squareTiles()}
		</div>
	);
};
