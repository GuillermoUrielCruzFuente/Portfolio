import { FC } from 'react'

import './Button.scss'

type PrimaryButtonType = {
	children: string
	img: string
	className: string
	secondary?: true
}

const Button: FC<PrimaryButtonType> = ({ children, img, className, secondary }) => {
	const buttonClasses = secondary
		? `base-button secondary-button ${className}`
		: `base-button primary-button ${className}`

	return (
		<button className={buttonClasses}>
			<img src={img} alt="" className="button-icon" />
			{children}
		</button>
	)
}

export default Button
