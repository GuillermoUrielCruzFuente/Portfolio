import { useState } from 'react'
import useLottie from '@/hooks/useLottie'
import hamMenu from '@lottie/hamburger-menu.json'
import '@styles/components/ResponsiveMenu.scss'
import { AnimatePresence, motion } from 'framer-motion'

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

			<AnimatePresence>
				{isOpen && (
					<motion.div
						key="menu"
						className="bubble"
						initial={{
							scale: 0,
							top: 0,
							right: 0,
							y: '-50%',
							x: '50%',
						}}
						animate={{ scale: 1 }}
						exit={{ scale: 0 }}
						transition={{ duration: 0.45, type: 'tween' }}
					></motion.div>
				)}
			</AnimatePresence>
		</>
	)
}

export default ResponsiveMenu
