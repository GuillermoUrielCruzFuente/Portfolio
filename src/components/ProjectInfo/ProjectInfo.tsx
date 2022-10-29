import getTechnologyIcon, { Technology } from './Technologies'

import webIcon from '../../static/img/icons/social-media/web.svg'
import githubIcon from '../../static/img/icons/social-media/github.svg'

import { ProjectContent } from '../../routes/03-Projects/ProjectsData'

const ProjectInfo = ({
	id,
	name,
	description,
	techStack,
	repository,
	url,
}: ProjectContent) => (
	<article className="project-info">
		<p className="project-number">💼 Proyecto #{id}</p>
		{name}

		<p className="project-description">{description}</p>
		<p className="project-techs">🔧 Tecnologías empleadas</p>
		<div className="project-tech-icons-container">
			{techStack.map((technology: Technology) => {
				return getTechnologyIcon(technology)
			})}
		</div>

		<div className="project-buttons-container">
			<a className="project-button primary" href={url} target="_blank">
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

export default ProjectInfo
