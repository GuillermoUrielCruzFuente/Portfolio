import { FC, useEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'
import './ShapesBackground.scss'

type BackgroundPos = {
	pos: number
}

const routesList = () => {
	return ['/', '/sobre-mi', 'proyectos', '/contacto']
}

const ShapesBackground: FC = () => {
	const triangleRef = useRef<SVGSVGElement>(null)
	const squareRef = useRef<SVGSVGElement>(null)
	const pentagonRef = useRef<SVGSVGElement>(null)
	const hexagonRef = useRef<SVGSVGElement>(null)
	// const circleRef = useRef<SVGSVGElement>(null)

	const shapes = [triangleRef, squareRef, pentagonRef, hexagonRef]
	const navType = useNavigationType()

	const location = useLocation()
	const routes = ['/', '/sobre-mi', '/proyectos', '/contacto']
	/**
	 * change opacity on first load
	 */
	useEffect(() => {
		shapes.forEach((shape) => {
			shape.current!.style.opacity = '0.3'
		})
	}, [])

	useEffect(() => {
		changeShapesPosition(routes.indexOf(location.pathname) + 1)
	}, [location])

	const changeShapesPosition = (position: number) => {
		shapes.forEach((shape) => {
			// console.log(`${shape.current!.id} -> ${shape.current!.classList.value.split(' ')[1]} -> ${navType}`)

			// if (navType === 'PUSH') {
				const currentClassPos = shape.current!.classList.value.split(' ')[1]
				// let position = parseInt(currentClassPos[currentClassPos.length - 1])
				const nextPosition = position >= 5 ? 1 : position++
				// console.log(nextPosition)

				shape.current!.classList.replace(
					currentClassPos,
					`position-0${nextPosition}`
				)
			// }
		})
	}

	return (
		<div className="bg-container">
			<svg
				id="triangle"
				className="shape position-01"
				ref={triangleRef}
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 371.776 324.566"
			>
				<path d="M185.888,0,371.776,324.566H0Z" />
			</svg>

			<svg
				id="square"
				ref={squareRef}
				className="shape position-02"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 302 302"
			>
				<rect width="302" height="302" />
			</svg>

			<svg
				id="pentagon"
				ref={pentagonRef}
				className="shape position-03"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 336 320"
			>
				<path d="M168,0,336,122.229,271.83,320H64.17L0,122.229Z" />
			</svg>

			<svg
				id="hexagon"
				ref={hexagonRef}
				className="shape position-04"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 370 320"
			>
				<path data-name="Polígono 5" d="M277.5,0,370,160,277.5,320H92.5L0,160,92.5,0Z" />
			</svg>

			{/* <svg
				id="circle"
				ref={circleRef}
				className="shape position-05"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 351 351"
			>
				<circle cx="175.5" cy="175.5" r="175.5" />
			</svg> */}
		</div>
	)
}

export default ShapesBackground
