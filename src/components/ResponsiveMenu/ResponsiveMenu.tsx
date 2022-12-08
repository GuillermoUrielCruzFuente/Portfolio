import './ResponsiveMenu.scss'
import { appRoutes } from '../../routes/routes'
import { NavLink } from 'react-router-dom'

const ResponsiveMenu = ({ isOpen }: { isOpen: boolean }) => {
	return (
		<div className="responsive-menu-container">
			<ul>
				{Object.values(appRoutes).map((route) => (
					<NavLink to={route.path}>{route.text}</NavLink>
				))}
			</ul>
		</div>
	)
}

export default ResponsiveMenu
