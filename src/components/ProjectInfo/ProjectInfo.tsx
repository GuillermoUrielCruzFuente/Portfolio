import { FC } from 'react'
import './ProjectInfo.scss'
import { techImages } from '../../helpers/exports/AboutExports'
import Button from '../Button/Button'

import webIcon from '../../static/img/icons/social-media/web.svg'
import githubIcon from '../../static/img/icons/social-media/github.svg'

type Technology = 'html' | 'scss' | 'js' | 'ts' | 'react' | 'vite'

export type ProjectContent = {
	order: number
	name: string
	description: string
	techStack: Array<Technology>
	repository: string
	url: string
}

export const projects: Array<ProjectContent> = [
	{
		order: 1,
		name: 'harBest',
		description:
			'Empresa dedicada a la producción y comercialización de fertilizantes commodities y multiminerales. Una clásica landing page, con la información necesaria para clientes potenciales.',
		techStack: ['html', 'scss', 'js', 'vite'],
		repository: 'https://github.com/GuillermoCruzFuente/harBest',
		url: 'https://harbest.mx/',
	},
	{
		order: 2,
		name: 'iNTELLiGENTiA',
		description:
			'Agencia de marketing político enfocado en el tratamiento integral del proceso electoral. Realiza actividades que comprenden desde el análisis estadístico hasta el desarrollo de la marca personal de sus clientes. Una landing page enfocada en demostrar seriedad, minimalismo y creatividad.',
		techStack: ['html', 'scss', 'ts', 'vite'],
		repository: 'https://github.com/GuillermoCruzFuente/intelligentia',
		url: 'https://intelligentia.mx/',
	},
	{
		order: 3,
		name: 'Campo Fuerte',
		description:
			'Empresa dedicada a la comercialización de agroinsumos y servicios de vanguardia. Realicé un rediseño de su presencia en la web, buscando expresar una identidad fresca y a la vez seria.',
		techStack: ['html', 'scss', 'ts', 'vite'],
		repository: 'https://github.com/GuillermoCruzFuente/CampoFuerte',
		url: 'https://campofuerte.com.mx/',
	},
	{
		order: 4,
		name: '{Guillermo}',
		description:
			'Portafolio Frontend developer. Mediante mi portafolio busco expresar mi verdadero estilo de diseño y desarrollo, sin ataduras, fechas límite o clientes con cambios de diseño.',
		techStack: ['react', 'scss', 'ts', 'vite'],
		repository: 'https://github.com/GuillermoCruzFuente/Portfolio',
		url: 'https://guillermo.onrender.com/',
	},
]

const ProjectInfo: FC<ProjectContent> = ({
	order,
	name,
	description,
	techStack,
	repository,
	url,
}) => {
	const getTechnologyImage = (name: Technology) => {
		switch (name) {
			case 'html':
				return (
					<img
						key={name}
						className="project-tech-icon"
						src={techImages[0]}
						alt="html icon"
					/>
				)
			case 'scss':
				return (
					<img
						key={name}
						className="project-tech-icon"
						src={techImages[2]}
						alt="scss icon"
					/>
				)
			case 'js':
				return (
					<img
						key={name}
						className="project-tech-icon"
						src={techImages[3]}
						alt="js icon"
					/>
				)
			case 'ts':
				return (
					<img
						key={name}
						className="project-tech-icon"
						src={techImages[4]}
						alt="ts icon"
					/>
				)
			case 'vite':
				return (
					<img
						key={name}
						className="project-tech-icon"
						src={techImages[5]}
						alt="vite icon"
					/>
				)
			case 'react':
				return (
					<img
						key={name}
						className="project-tech-icon"
						src={techImages[6]}
						alt="react icon"
					/>
				)
			default:
				return (
					<img key={name} className="project-tech-icon" src={'no image'} alt="no image" />
				)
		}
	}

	return (
		<article className="project-info">
			<p className="project-number">💼 Proyecto #{order}</p>
			<h1 className="project-name">{name}</h1>
			<p className="project-description">{description}</p>
			<p className="project-techs">🔧 Tecnologías empleadas</p>
			<div className="project-tech-icons-container">
				{techStack.map((technology: Technology) => {
					return getTechnologyImage(technology)
				})}
			</div>

			<div className="project-buttons-container">
				<Button img={webIcon} className="appear1">
					visitar
				</Button>

				<Button img={githubIcon} className="appear1" secondary>
					repositorio
				</Button>
			</div>
		</article>
	)
}

export default ProjectInfo
