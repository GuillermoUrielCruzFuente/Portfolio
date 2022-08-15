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
import harbestImg1 from '../../static/img/web-images/harbest/collage.png'
import harbestImg2 from '../../static/img/web-images/harbest/collage-01.png'
import harbestImg3 from '../../static/img/web-images/harbest/collage-02.png'
import harbestImg4 from '../../static/img/web-images/harbest/screen-04.jpg'

import intelligentiaImg1 from '../../static/img/web-images/intelligentia/screen-01.jpg'
import intelligentiaImg2 from '../../static/img/web-images/intelligentia/screen-02.jpg'
import intelligentiaImg3 from '../../static/img/web-images/intelligentia/screen-03.jpg'
import intelligentiaImg4 from '../../static/img/web-images/intelligentia/screen-04.jpg'

import campoFuerteImg1 from '../../static/img/web-images/campo-fuerte/screen-01.jpg'
import campoFuerteImg2 from '../../static/img/web-images/campo-fuerte/screen-02.jpg'
import campoFuerteImg3 from '../../static/img/web-images/campo-fuerte/screen-03.jpg'
import campoFuerteImg4 from '../../static/img/web-images/campo-fuerte/screen-04.jpg'

import guillermoImg1 from '../../static/img/web-images/guillermo/screen-01.jpg'
import guillermoImg2 from '../../static/img/web-images/guillermo/screen-02.jpg'
import guillermoImg3 from '../../static/img/web-images/guillermo/screen-03.jpg'
import guillermoImg4 from '../../static/img/web-images/guillermo/screen-04.jpg'

// const projectImages: Array<string[]> = [
// 	[harbestImg1],
// 	[intelligentiaImg1, intelligentiaImg2, intelligentiaImg3, intelligentiaImg4],
// 	[campoFuerteImg1, campoFuerteImg2, campoFuerteImg3, campoFuerteImg4],
// 	[guillermoImg1, guillermoImg2, guillermoImg3, guillermoImg4],
// ]

const projectImages: Array<string[]> = [[harbestImg3], [harbestImg1], [harbestImg2], [harbestImg2]]

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
