import { NavLink, NavLinkProps } from 'react-router-dom'
import '@styles/components/FancyLink.scss'

interface FancyLinkProps extends Omit<NavLinkProps, 'children' | 'className'> {
	children: string
}

const classNameProperty = 'className'
type LinkClassHandlerUnion = NavLinkProps[typeof classNameProperty]
type LinkClassHandler = Extract<LinkClassHandlerUnion, Function>

const FancyLink = (props: FancyLinkProps) => {
	const { children, ...otherProps } = props

	const classHandler: LinkClassHandler = ({ isActive, isPending }) => {
		return `fancy-link-base${isActive ? ' fancy-link-active' : ''}${
			isPending ? ' fancy-link-pending' : ''
		}`
	}

	return (
		<NavLink className={classHandler} {...otherProps}>
			<span className="text">{children}</span>
			<span className="text-hover">{children}</span>
		</NavLink>
	)
}

export default FancyLink
