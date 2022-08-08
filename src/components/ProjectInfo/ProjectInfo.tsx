type Technologies = 'HTML' | 'SCSS' | 'JS' | 'TS' | 'React'

type ProjectContent = {
	name: string
	description: string
    tech: Array<string>
}

const projects = [{}]

const ProjectInfo = () => {
	return (
		<article>
			<p></p>

			<p>💼Proyecto #1</p>
			<h1>harBest</h1>
			<p>
				Empresa dedicada a la producción y comercialización de fertilizantes commodities y
				multiminerales. Una clásica landing page, con la información necesaria para clientes
				potenciales.
			</p>
			<p>🔧Tecnologías empleadas</p>
			<p>HTML</p>
			<p>SCSS</p>
			<p>JavaScript</p>
			<p>ViteJS</p>
		</article>
	)
}

export default ProjectInfo
