import { FC, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import './ShapesBackground.scss'

type BackgroundPos = {
	pos: number
}

const ShapesBackground: FC = () => {
	const triangleRef = useRef<SVGSVGElement>(null)
	const location = useLocation()

	useEffect(() => {
		document.getElementById('triangle')!.style.opacity = '0.2'
	}, [])

	useEffect(() => {
		setCurrentBGPosition(location.pathname)
	}, [location])

	const setCurrentBGPosition = (currentPage: string) => {}

	return (
		<div className="bg-container">
			<svg
				id="triangle"
				ref={triangleRef}
				className="triangle-pos-01"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 324.718 303.931"
			>
				<path
					d="M132.027,0,264.053,230.523H0Z"
					transform="translate(-30 85.967) rotate(-19)"
				/>
			</svg>
		</div>
	)
}

export default ShapesBackground
