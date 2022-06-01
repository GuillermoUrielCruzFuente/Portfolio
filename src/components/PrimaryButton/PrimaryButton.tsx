import { FC } from 'react'

import './PrimaryButton.scss'

type PrimaryButtonType = {
	children: string
	img: string
}

const PrimaryButton: FC<PrimaryButtonType> = ({ children, img }) => {
	return (
		<button className="primary-button">
			<img src={img} alt="" className="button-icon" />
			{children}
		</button>
	)
}

export default PrimaryButton
