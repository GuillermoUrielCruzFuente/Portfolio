//react imports
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

//outlet custom hook
import useNavContext, { ContextType } from '../../hooks/useNavContext'

//components
import ScrollDown from '../../components/ScrollDown/ScrollDown'
import ProjectInfo, { ProjectContent, projects } from '../../components/ProjectInfo/ProjectInfo'
import ProjectImages from '../../components/ProjectImages/ProjectImages'

//styles
import './Projects.scss'

//project images
import harbestImg1 from '../../static/img/web-images/harbest/harbest-collage.png'
import intelligentiaImg1 from '../../static/img/web-images/intelligentia/intelligentia-collage.png'
import campoFuerteImg1 from '../../static/img/web-images/campo-fuerte/campo-fuerte-collage.png'
import guillermoImg1 from '../../static/img/web-images/guillermo/guillermo-collage.png'

const projectImages: Array<string[]> = [
	[harbestImg1],
	[intelligentiaImg1],
	[campoFuerteImg1],
	[guillermoImg1],
]

const Projects = () => {
	const { nav, setReadyToNavigate, navigateTo }: ContextType = useNavContext()
	const location = useLocation()
	const refContainer = useRef<HTMLDivElement>(null)
	const [sectionState, setSectionState] = useState(false)

	useEffect(() => {
		showContent()
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
			<>
				<header ref={refContainer} id="projects">
					<h1 className="page-title">Proyectos</h1>
					<p className="page-description">
						Comencé hace ya un tiempo en el desarrollo web, tras varias iteraciones
						estos son mis proyectos destacados, aquellos en los que he colocado esfuerzo
						y dedicación, te agradezco el tiempo que te tome revisarlos.
					</p>

					<div className="works">
						<p>
							<span className="harbest-blue">har</span>Best
						</p>
						<p>
							<span className="intelligentia-red">i</span>NTELLiGENTiA
						</p>
						<p>
							<span className="campofuerte-brown">Campo</span>{' '}
							<span className="campofuerte-green">Fuerte</span>
						</p>
					</div>

					<ScrollDown />
				</header>

				<main>
					<section className="projects">
						{projects.map((project: ProjectContent, index: number) => {
							return (
								<div className="project-container">
									<ProjectInfo
										key={project.name}
										order={project.order}
										name={project.name}
										description={project.description}
										techStack={project.techStack}
										repository={project.repository}
										url={project.url}
									/>

									<ProjectImages paths={projectImages[index]} />
								</div>
							)
						})}
					</section>
				</main>
			</>
		</CSSTransition>
	)
}

export default Projects
