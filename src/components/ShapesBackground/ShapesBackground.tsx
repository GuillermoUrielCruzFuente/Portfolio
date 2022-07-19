import { FC, useEffect } from 'react'
import './ShapesBackground.scss'

type BackgroundPos = {
	pos: number
}

const ShapesBackground: FC<BackgroundPos> = ({ pos }) => {
	useEffect(() => {
		document.getElementById('triangle')!.style.opacity = '0.2'
	})

	useEffect(() => {
		let tri = document.getElementById('triangle')!

		tri.classList.remove('triangle-pos-02', 'triangle-pos-01')
		tri.classList.add(`triangle-pos-0${pos}`)

		console.log('actualizacion de pos', pos)
		return () => {}
	}, [pos])

	return (
		<div className="bg-container">
			<svg
				id="triangle"
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
