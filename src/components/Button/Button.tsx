import { Dispatch, FC, SetStateAction } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import './Button.scss'

/**
 * this contain the main structure to navigate between pages
 * needs a Navigation object and a reactive function to change
 * the value of the new NavigationAction
 */
type ButtonType = {
	children: string
	img: string
	className: string
	secondary?: true
	navigator?: {
		to: string
		navigator: (to: string) => void
	}
}

export type Navigation = {
	to: string | null
	from: string | null
}

const Button: FC<ButtonType> = ({ children, img, className, secondary, navigator }) => {
	const buttonClasses = secondary
		? `base-button secondary-button ${className}`
		: `base-button primary-button ${className}`

	const clickHandler = () => {
		if (navigator) {
			navigator.navigator(navigator.to)
		} else {
			console.log(children)
		}
	}

	return (
		<button className={buttonClasses} onClick={clickHandler}>
			<img src={img} alt="" className="button-icon" />
			{children}
		</button>
	)
}

export default Button
