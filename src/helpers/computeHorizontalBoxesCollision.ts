type HorizontalCollisionArgs = {
	leftBox: HTMLElement;
	rightBox: HTMLElement;
	margin?: number;
};

export const computeHorizontalBoxesCollision = ({
	leftBox,
	rightBox,
	margin,
}: HorizontalCollisionArgs) => {
	const rightRect = rightBox.getBoundingClientRect();
	const leftRect = leftBox.getBoundingClientRect();

	const leftBoxRightSideEdge = leftRect.width + leftRect.x;
	const rightBoxleftSideEdge = rightRect.x;

	return leftBoxRightSideEdge === rightBoxleftSideEdge;
};