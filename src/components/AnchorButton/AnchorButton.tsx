type AnchorButtonType = {
	children: string
	href: string
	icon: string
	primary?: true
}

const AnchorButton = ({ children, href, icon, primary }: AnchorButtonType) => (
	<a
		className={`project-button ${primary ? 'primary' : 'secondary'}`}
		href={href}
		target="_blank"
	>
		<img src={icon} alt="project info icon" />
		{children}
	</a>
)

export default AnchorButton
