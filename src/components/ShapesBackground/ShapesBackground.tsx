import { FC, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import './ShapesBackground.scss'

type BackgroundPos = {
	pos: number
}

const ShapesBackground: FC = () => {
	const triangleRef = useRef<SVGSVGElement>(null)
	const location = useLocation()

	/**
	 * change opacity on first load
	 */
	useEffect(() => {
		document.getElementById('triangle')!.style.opacity = '0.2'
		document.getElementById('square')!.style.opacity = '0.2'
		document.getElementById('pentagon')!.style.opacity = '0.2'
		document.getElementById('hexagon')!.style.opacity = '0.2'
		document.getElementById('circle')!.style.opacity = '0.2'
	}, [])

	useEffect(() => {
		setCurrentBGPosition(location.pathname)
	}, [location])

	const setCurrentBGPosition = (currentPage: string) => {
		switch (currentPage) {
			case '/':
				changeClass(1)
				break
			case '/sobre-mi':
				changeClass(2)
				break
			case '/proyectos':
				changeClass(3)
				break
			case '/contacto':
				changeClass(4)
				break
			default:
				break
		}
	}

	const changeClass = (position: number) => {
		triangleRef.current!.classList.replace(
			triangleRef.current!.classList.value,
			`position-0${position}`
		)
	}

	return (
		<div className="bg-container">
			{/* <svg
				id="triangle"
				ref={triangleRef}
				className="position-01"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 324.718 303.931"
			>
				<path
					d="M132.027,0,264.053,230.523H0Z"
					transform="translate(-30 85.967) rotate(-19)"
				/>
			</svg> */}

			<svg
				id="triangle"
				className="position-01"
				ref={triangleRef}
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 371.776 324.566"
			>
				<path d="M185.888,0,371.776,324.566H0Z"/>
			</svg>

			<svg
				id="square"
				className="position-02"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 302 302"
			>
				<rect width="302" height="302" />
			</svg>

			<svg
				id="pentagon"
				className="position-03"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 336 320"
			>
				<path d="M168,0,336,122.229,271.83,320H64.17L0,122.229Z" />
			</svg>

			<svg
				id="hexagon"
				className="position-04"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 370 320"
			>
				<path data-name="Polígono 5" d="M277.5,0,370,160,277.5,320H92.5L0,160,92.5,0Z" />
			</svg>

			<svg
				id="circle"
				className="position-05"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 351 351"
			>
				<circle cx="175.5" cy="175.5" r="175.5" />
			</svg>
		</div>
	)
}

export default ShapesBackground
