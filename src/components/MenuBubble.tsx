import '@styles/components/MenuBubble.scss'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { useState } from 'react'

type MenuBubbleProps = {
	children: JSX.Element | string
	isActive: boolean
}

type BubbleTransition = {
	scale: number
}

type onStartAnimation = (definition: BubbleTransition) => void

const bubbleVariants: Variants = {
	initial: {
		scale: 0,
		y: '-50%',
		x: '50%',
	},
	animate: {
		scale: 1,
	},
	exit: {
		scale: 0,
	},
}

const MenuBubble = ({ children, isActive }: MenuBubbleProps) => {
	const [childrenState, setChildrenState] = useState(false)

	const onStartHandler: onStartAnimation = (definition) => {
		if (definition.scale === 0) {
			setTimeout(() => {
				setChildrenState(false)
			}, 200)
		}

		if (definition.scale === 1) {
			setTimeout(() => {
				setChildrenState(true)
			}, 200)
		}
	}

	return (
		<>
			<AnimatePresence>
				{isActive && (
					<motion.div
						className="bubble"
						{...bubbleVariants}
						transition={{ duration: 0.5, type: 'tween' }}
						onAnimationStart={onStartHandler}
					/>
				)}
			</AnimatePresence>

			{childrenState && children}
		</>
	)
}

export default MenuBubble
