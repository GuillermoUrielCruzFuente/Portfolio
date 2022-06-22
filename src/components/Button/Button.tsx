import { FC } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import './Button.scss'

type PrimaryButtonType = {
	children: string
	img: string
	className: string
	secondary?: true
	to?: string
}

type Navigation = {
	to: string | null
	from: string | null
}

const Button: FC<PrimaryButtonType> = ({ children, img, className, secondary, to }) => {
	const navigator = useNavigate()
	const location = useLocation()

	const buttonClasses = secondary
		? `base-button secondary-button ${className}`
		: `base-button primary-button ${className}`

	const navigateTo = () => {
		navigator(to!)
	}

	const clickHandler = () => {
		if (to) {
			navigateTo()
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
