import { AppRoutes } from '@/routes'
import '@styles/components/NavLinksDesktop.scss'
import FancyLink from '@components/FancyLink'
import { motion, Variants } from 'framer-motion'
import { useLocation } from 'react-router-dom'

const mountingVariants: Variants = {
	unmount: {
		opacity: 0,
		y: '-100%',
	},
	mount: {
		opacity: 1,
		y: 0,
		transition: {
			type: 'spring',
			bounce: 1,
			stiffness: 120,
			damping: 8,
			duration: 1,
		},
	},
}

const NavLinksDesktop = () => {
	const { pathname } = useLocation()

	return (
		<motion.ol
			className="links-desk-container"
			initial="unmount"
			animate="mount"
			transition={{
				delayChildren: pathname === '/' ? 2.8 : 1.5,
				staggerChildren: 0.06,
			}}
		>
			{Object.values(AppRoutes).map((route) => (
				<motion.li key={route.path} variants={mountingVariants}>
					<FancyLink to={route.path}>{route.text}</FancyLink>
				</motion.li>
			))}
		</motion.ol>
	)
}

export default NavLinksDesktop
