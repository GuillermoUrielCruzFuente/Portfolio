import styles from "./Loader.module.scss";

type LoaderProps = {
	className?: string;
};

export const Loader = ({ className }: LoaderProps) => {
	const tileClasses = (tileNumber: number): string => {
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

	return (
		<div
			className={styles["tile-grid"]}
			title="loading..."
		>
			{squareTiles()}
		</div>
	);
};
