import { FC } from 'react'

type Technologies = 'HTML' | 'SCSS' | 'JS' | 'TS' | 'React' | 'Vite'

export type ProjectContent = {
	order: number
	name: string
	description: string
	techStack: Array<Technologies>
	repository: string
	url: string
}

export const projects: Array<ProjectContent> = [
	{
		order: 1,
		name: 'harBest',
		description:
			'Empresa dedicada a la producción y comercialización de fertilizantes commodities y multiminerales. Una clásica landing page, con la información necesaria para clientes potenciales.',
		techStack: ['SCSS', 'HTML', 'JS', 'Vite'],
		repository: 'https://github.com/GuillermoCruzFuente/harBest',
		url: 'https://harbest.mx/',
	},
	{
		order: 2,
		name: 'INTELLIGENTIA',
		description:
			'Agencia de marketing político enfocado en el tratamiento integral del proceso electoral. Realiza actividades que comprenden desde el análisis estadístico hasta el desarrollo de la marca personal de sus clientes. Una landing page enfocada en demostrar seriedad, minimalismo y creatividad.',
		techStack: ['HTML', 'SCSS', 'TS', 'Vite'],
		repository: 'https://github.com/GuillermoCruzFuente/intelligentia',
		url: 'https://intelligentia.mx/',
	},
	{
		order: 3,
		name: 'Campo Fuerte',
		description:
			'Empresa dedicada a la comercialización de agroinsumos y servicios de vanguardia. Realicé un rediseño de su presencia en la web, buscando expresar una identidad fresca y a la vez seria.',
		techStack: ['HTML', 'SCSS', 'TS', 'Vite'],
		repository: 'https://github.com/GuillermoCruzFuente/CampoFuerte',
		url: 'https://campofuerte.com.mx/',
	},
	{
		order: 4,
		name: '{Guillermo}',
		description:
			'Portafolio Frontend developer. Mediante mi portafolio busco expresar mi verdadero estilo de diseño y desarrollo, sin ataduras, fechas límite o clientes con cambios de diseño.',
		techStack: ['React', 'SCSS', 'TS', 'Vite'],
		repository: 'https://github.com/GuillermoCruzFuente/Portfolio',
		url: 'https://guillermo.onrender.com/',
	},
]

const ProjectInfo: FC<ProjectContent> = ({ order, name, description, techStack, repository, url }) => {
	return (
		<article>
			<p>💼Proyecto #{order}</p>
			<h1>{name}</h1>
			<p>{description}</p>
			<p>🔧Tecnologías empleadas</p>
			{techStack.map((technology: Technologies) => {
				return <p>{technology}</p>
			})}
		</article>
	)
}

export default ProjectInfo
