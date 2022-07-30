import Lottie from 'lottie-web'
import { useLayoutEffect, useRef } from 'react'
import './AboutCard.scss'

export type AboutCardContent = {
	main: string
	middle: string
	bottom: string
}

const AboutCard = (Content: AboutCardContent) => {
	let buttonRef = useRef<HTMLDivElement>(null)

	return (
		<div className="about-card">
			<p className="main">{Content.main}</p>
			<p className="middle">{Content.middle}</p>
			<p className="bottom">{Content.bottom}</p>
			<span className="bottom-line"></span>
		</div>
	)
}

export default AboutCard
