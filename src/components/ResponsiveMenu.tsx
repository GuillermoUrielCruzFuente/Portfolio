import { useState } from 'react'
import useLottie from '@/hooks/useLottie'
import hamMenu from '@lottie/hamburger-menu.json'
import '@styles/components/ResponsiveMenu.scss'

const ResponsiveMenu = () => {
	const [HamMenu, HamMenuLottie] = useLottie({ data: hamMenu })
	const [isOpen, setIsOpen] = useState(false)

	const showBackArrow = () =>
		HamMenuLottie.current.playSegments([20, 70], true)

	const showHamburger = () =>
		HamMenuLottie.current.playSegments([120, 140], true)

	const toggler = (currentState: boolean): boolean => {
		currentState ? showHamburger() : showBackArrow()
		return !currentState
	}

	const toggle = () => {
		setIsOpen(toggler)
	}

	return (
		<>
			<div className="hamburger-menu-container">
				<HamMenu className="hamburger-animation" onClick={toggle} />
			</div>

			{isOpen && (
				<div className="menu-container">
					<h1>Elements</h1>
				</div>
			)}
		</>
	)
}

export default ResponsiveMenu
