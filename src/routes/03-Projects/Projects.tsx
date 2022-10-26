//react imports
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

//outlet custom hook
import useNavContext, { ContextType } from '../../hooks/useNavContext'

//components
import ScrollDown from '../../components/ScrollDown/ScrollDown'
import ProjectInfo, {
	ProjectContent,
	projects,
} from '../../components/ProjectInfo/ProjectInfo'
import LazyImg, { LazyImgPath } from '../../components/LazyImg/LazyImg'

//styles
import './Projects.scss'

//project images
import harbestImg from '../../static/img/web-images/collages/harbest-collage.png'
import intelligentiaImg from '../../static/img/web-images/collages/intelligentia-collage.png'
import campoFuerteImg from '../../static/img/web-images/collages/campofuerte-collage.png'
import guillermoImg from '../../static/img/web-images/collages/guillermo-collage.png'

import harbestLogo from '../../static/img/icons/project-logos/harbest.svg'
import intelligentiaLogo from '../../static/img/icons/project-logos/intelligentia.svg'
import campoFuerteLogo from '../../static/img/icons/project-logos/campo-fuerte.svg'
import guillermoLogo from '../../static/img/icons/project-logos/guillermo.svg'

const projectLogos = [
	harbestLogo,
	intelligentiaLogo,
	campoFuerteLogo,
	guillermoLogo,
]

const projectCollages: Array<LazyImgPath> = [
	{
		imagePath: harbestImg,
	},
	{
		imagePath: intelligentiaImg,
	},
	{
		imagePath: campoFuerteImg,
	},
	{
		imagePath: guillermoImg,
	},
]

const Projects = () => {
	const { nav, setReadyToNavigate, navigateTo }: ContextType = useNavContext()
	const location = useLocation()
	const refContainer = useRef<HTMLDivElement>(null)
	const [sectionState, setSectionState] = useState(false)

	const projectsLogos = useRef<HTMLDivElement>(null)

	useEffect(() => {
		showContent()

		//delay to await for the icons to load
		setTimeout(() => {
			projectsLogos.current
				? (projectsLogos.current.style.opacity = '1')
				: undefined
		}, 500)
	}, [])

	useEffect(() => {
		if (nav) {
			if (nav.to != location.pathname) {
				hideContent()
			}
		}
	}, [nav])

	const showContent = () => {
		setSectionState(true)
	}

	const hideContent = () => {
		setSectionState(false)
	}

	return (
		<CSSTransition
			in={sectionState}
			nodeRef={refContainer}
			timeout={350}
			classNames="page-anim"
			mountOnEnter
			unmountOnExit
			onExited={() => setReadyToNavigate(true)}
		>
			<div ref={refContainer}>
				<header id="projects">
					<h1 className="page-title">Proyectos</h1>
					<p className="page-description">
						Comencé hace ya un tiempo en el{' '}
						<span className="accent">desarrollo web</span>, tras
						varias iteraciones estos son mis{' '}
						<span className="accent">proyectos destacados</span>,
						aquellos en los que he colocado esfuerzo y dedicación,
						te agradezco el tiempo que te tome revisarlos.
					</p>

					<div className="works" ref={projectsLogos}>
						{projectLogos.map((logo: string, index: number) => {
							return (
								<img
									key={logo}
									className="project-logo"
									src={logo}
									alt="harbest logo"
									style={{
										animationDelay: `${100 * index}ms`,
									}}
								/>
							)
						})}
					</div>

					<ScrollDown />
				</header>

				<main id="projects-main">
					<section className="projects">
						{projects.map(
							(project: ProjectContent, index: number) => {
								return (
									<div
										key={project.url}
										className="project-box"
									>
										<div className="project-container">
											<ProjectInfo
												order={project.order}
												name={project.name}
												description={
													project.description
												}
												techStack={project.techStack}
												repository={project.repository}
												url={project.url}
												animation={project.animation}
											/>

											<LazyImg
												imagePath={
													projectCollages[index]
														.imagePath
												}
											/>
										</div>

										<hr className="project-separator" />
									</div>
								)
							}
						)}
					</section>
				</main>
			</div>
		</CSSTransition>
	)
}

export default Projects
