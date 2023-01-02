import { routes } from '@routes/index'
import { motion } from 'framer-motion'
import FancyLink from './FancyLink'

type AppLinksProps = {
	direction: 'vertical' | 'horizontal'
}

/**
 *
 * @returns An array on FancyLinks with the respective data from routes
 */
const AppLinks = ({ direction }: AppLinksProps) => {
	return (
		<motion.ol >
			{routes.map((route) => (
				<motion.li>
					<FancyLink to={route.path}>{route.text}</FancyLink>
				</motion.li>
			))}
		</motion.ol>
	)
}

export default AppLinks
