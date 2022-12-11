import { AppRoutes } from '@/routes'
import '@styles/components/NavLinksDesktop.scss'
import FancyLink from './FancyLink'

const NavLinksDesktop = () => {
	return (
		<ol className="links-desk-container">
			{Object.values(AppRoutes).map((route) => (
				<li key={route.path}>
					<FancyLink to={route.path}>{route.text}</FancyLink>
				</li>
			))}
		</ol>
	)
}

export default NavLinksDesktop
