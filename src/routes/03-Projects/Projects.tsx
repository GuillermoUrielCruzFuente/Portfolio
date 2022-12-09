//react imports
import { SyntheticEvent, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

//outlet custom hook
import useNavContext, { ContextType } from '../../hooks/useNavContext'

//components
import ProjectInfo from '../../components/ProjectInfo/ProjectInfo'
import projectsData, { ProjectContent } from './ProjectsData'

import ScrollDown from '../../components/ScrollDown/ScrollDown'
import LazyImg, { LazyImgPath } from '../../components/LazyImg/LazyImg'

//styles
import './Projects.scss'

//project images
import harbestImg from '../../static/img/web-images/collages/harbest-collage.png'
import intelligentiaImg from '../../static/img/web-images/collages/intelligentia-collage.png'
import campoFuerteImg from '../../static/img/web-images/collages/campofuerte-collage.png'
import guillermoImg from '../../static/img/web-images/collages/guillermo-collage.png'

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
	// const { nav, setReadyToNavigate, navigateTo }: ContextType = useNavContext()
	// const location = useLocation()
	// const refContainer = useRef<HTMLDivElement>(null)
	// const [sectionState, setSectionState] = useState(false)

	// useEffect(() => {
	// showContent()
	// }, [])

	// useEffect(() => {
	// 	if (nav) {
	// 		if (nav.to != location.pathname) {
	// 			hideContent()
	// 		}
	// 	}
	// }, [nav])

	// const showContent = () => {
	// 	setSectionState(true)
	// }

	// const hideContent = () => {
	// 	setSectionState(false)
	// }

	const revealProjectIconOnLoad = (event: SyntheticEvent) => {
		const iconElement = event.target as HTMLImageElement
		iconElement.style.opacity = '1'
	}

	return (
		// <CSSTransition
		// 	in={sectionState}
		// 	nodeRef={refContainer}
		// 	timeout={500}
		// 	classNames="page-anim"
		// 	mountOnEnter
		// 	unmountOnExit
		// 	onExited={() => setReadyToNavigate(true)}
		// >
		// <div ref={refContainer}>
		<div>
			<header id="projects">
				<h1 className="page-title">Proyectos</h1>
				<p className="page-description">
					Comencé hace ya un tiempo en el{' '}
					<span className="accent">desarrollo web</span>, tras varias
					iteraciones estos son mis{' '}
					<span className="accent">proyectos destacados</span>,
					aquellos en los que he colocado esfuerzo y dedicación, te
					agradezco el tiempo que te tome revisarlos.
				</p>

				<div className="works">
					{projectsData.map((project: ProjectContent) => (
						<img
							key={project.id}
							className="project-logo"
							src={project.logoImgPath}
							alt={`logo ${project.id}`}
							onLoad={revealProjectIconOnLoad}
						/>
					))}
				</div>

				<ScrollDown />
			</header>

			<main id="projects-main">
				<section className="projects">
					{projectsData.map(
						(project: ProjectContent, index: number) => (
							<div key={project.url} className="project-box">
								<div className="project-container">
									<ProjectInfo
										id={project.id}
										name={project.name}
										description={project.description}
										techStack={project.techStack}
										repository={project.repository}
										url={project.url}
									/>

									<LazyImg
										imagePath={
											projectCollages[index].imagePath
										}
									/>
								</div>
							</div>
						)
					)}
				</section>
			</main>
		</div>
		// </CSSTransition>
	)
}

export default Projects
