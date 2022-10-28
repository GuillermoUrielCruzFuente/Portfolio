import { useEffect, useRef } from 'react'
import getTechnologyIcon, { Technology } from './Technologies'

import webIcon from '../../static/img/icons/social-media/web.svg'
import githubIcon from '../../static/img/icons/social-media/github.svg'

import Lottie, { AnimationItem } from 'lottie-web'

export type ProjectContent = {
	order: number
	name: JSX.Element
	description: string
	techStack: Array<Technology>
	repository: string
	url: string
	animation?: any
}

export const projects: Array<ProjectContent> = [
	{
		order: 1,
		name: (
			<h1 className="project-name">
				<span className="harbest-blue">har</span>Best
			</h1>
		),
		description:
			'Empresa dedicada a la producción y comercialización de fertilizantes commodities y multiminerales. Una clásica landing page, con la información necesaria para clientes potenciales.',
		techStack: ['html', 'scss', 'js', 'vite'],
		repository: 'https://github.com/GuillermoCruzFuente/harBest',
		url: 'https://harbest.mx/',
	},
	{
		order: 2,
		name: <h1 className="project-name">Intelligentia</h1>,
		description:
			'Agencia de marketing político enfocado en el tratamiento integral del proceso electoral. Realiza actividades que comprenden desde el análisis estadístico hasta el desarrollo de la marca personal de sus clientes. Una landing page enfocada en demostrar seriedad, minimalismo y creatividad.',
		techStack: ['html', 'scss', 'ts', 'vite'],
		repository: 'https://github.com/GuillermoCruzFuente/intelligentia',
		url: 'https://intelligentia.onrender.com/',
	},
	{
		order: 3,
		name: (
			<h1 className="project-name">
				<span className="campofuerte-brown">Campo</span>
				<span className="campofuerte-green">Fuerte</span>
			</h1>
		),
		description:
			'Empresa dedicada a la comercialización de agroinsumos y servicios de vanguardia. Realicé un rediseño de su presencia en la web, buscando expresar una identidad fresca y a la vez seria.',
		techStack: ['html', 'scss', 'ts', 'vite'],
		repository: 'https://github.com/GuillermoCruzFuente/CampoFuerte',
		url: 'https://campofuerte.onrender.com/',
	},
	{
		order: 4,
		name: <h1 className="project-name">Guillermo</h1>,
		description:
			'Portafolio Frontend developer. Mediante mi portafolio busco expresar mi verdadero estilo de diseño y desarrollo, sin ataduras, fechas límite o clientes con cambios de diseño.',
		techStack: ['react', 'scss', 'ts', 'vite'],
		repository: 'https://github.com/GuillermoCruzFuente/Portfolio',
		url: 'https://guillermo.onrender.com/',
	},
]

const ProjectInfo = ({
	order,
	name,
	description,
	techStack,
	repository,
	url,
	animation,
}: ProjectContent) => {
	const animContainerRef = useRef<HTMLDivElement>(null)
	const animLottieRef = useRef<AnimationItem>(
		Lottie.loadAnimation({
			container: animContainerRef.current!,
		})
	)

	useEffect(() => {
		if (animation) {
			animLottieRef.current = Lottie.loadAnimation({
				container: animContainerRef.current!,
				animationData: animation,
				autoplay: true,
				loop: true,
			})
		} else {
			console.log('no animation provided')
		}

		return () => {
			animLottieRef.current.destroy()
		}
	}, [])

	return (
		<article className="project-info">
			<p className="project-number">💼 Proyecto #{order}</p>
			{name}

			<p className="project-description">{description}</p>
			<p className="project-techs">🔧 Tecnologías empleadas</p>
			<div className="project-tech-icons-container">
				{techStack.map((technology: Technology) => {
					return getTechnologyIcon(technology)
				})}
			</div>

			<div className="project-buttons-container">
				<a
					className="project-button primary"
					href={url}
					target="_blank"
				>
					<img src={webIcon} alt="button web icon" />
					visitar
				</a>

				<a
					className="project-button secondary"
					href={repository}
					target="_blank"
				>
					<img src={githubIcon} alt="button web icon" />
					repositorio
				</a>
			</div>
		</article>
	)
}

export default ProjectInfo
