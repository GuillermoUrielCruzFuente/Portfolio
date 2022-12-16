import { motion, Variants } from 'framer-motion'
import { useEffect } from 'react'

const variants: Variants = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
	},
	exit: {
		opacity: 0,
	},
}

const PageTransition = ({ children }: { children: JSX.Element }) => {
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	return (
		<motion.div {...variants} transition={{ duration: 0.35 }}>
			{children}
		</motion.div>
	)
}

export default PageTransition
