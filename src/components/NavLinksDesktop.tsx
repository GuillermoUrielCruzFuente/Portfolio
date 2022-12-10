import { NavLink } from 'react-router-dom'
import { AppRoutes } from '@/routes'
import '@styles/components/NavLinksDesktop.scss'

const NavLinksDesktop = () => {
	return (
		<ol className="links-desk-container">
			{Object.values(AppRoutes).map((route) => (
				<li key={route.path}>
					<NavLink className="nav-link-desk" to={route.path}>
						{route.text}
					</NavLink>
				</li>
			))}
		</ol>
	)
}

export default NavLinksDesktop
