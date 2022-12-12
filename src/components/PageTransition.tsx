import { motion, Variants } from 'framer-motion'

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
	return (
		<motion.div {...variants} transition={{ duration: 0.35 }}>
			{children}
		</motion.div>
	)
}

export default PageTransition
