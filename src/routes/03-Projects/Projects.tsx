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
import ProjectImages, {
	CollagePath,
} from '../../components/ProjectImages/ProjectImages'

//styles
import './Projects.scss'

//project images
import harbestImg from '../../static/img/web-images/harbest-collage.png'
import intelligentiaImg from '../../static/img/web-images/intelligentia-collage.png'
import campoFuerteImg from '../../static/img/web-images/campo-fuerte-collage.png'
import guillermoImg from '../../static/img/web-images/guillermo-collage.png'

import harbestThumb from '../../static/img/web-images/thumbnails/harbest-thumb.jpg'
import intelligentiaThumb from '../../static/img/web-images/thumbnails/intelligentia-thumb.jpg'
import campoFuerteThumb from '../../static/img/web-images/thumbnails/campo-fuerte-thumb.jpg'
import guillermoThumb from '../../static/img/web-images/thumbnails/guillermo-thumb.jpg'

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

const proImgs: Array<CollagePath> = [
	{
		fullImagePath: harbestImg,
		thumbnailPath: harbestThumb,
	},
	{
		fullImagePath: intelligentiaImg,
		thumbnailPath: intelligentiaThumb,
	},
	{
		fullImagePath: campoFuerteImg,
		thumbnailPath: campoFuerteThumb,
	},
	{
		fullImagePath: guillermoImg,
		thumbnailPath: guillermoThumb,
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
			classNames="page-a"
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
											/>

											<ProjectImages
												fullImagePath={
													proImgs[index].fullImagePath
												}
												thumbnailPath={
													proImgs[index].thumbnailPath
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
