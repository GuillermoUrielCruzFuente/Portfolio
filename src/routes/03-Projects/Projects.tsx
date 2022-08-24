//react imports
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

//outlet custom hook
import useNavContext, { ContextType } from '../../hooks/useNavContext'

//components
import ScrollDown from '../../components/ScrollDown/ScrollDown'
import ProjectInfo, { ProjectContent, projects } from '../../components/ProjectInfo/ProjectInfo'
import ProjectImages, { CollagePath } from '../../components/ProjectImages/ProjectImages'

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

									<ProjectImages
										fullImagePath={proImgs[index].fullImagePath}
										thumbnailPath={proImgs[index].thumbnailPath}
									/>
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
