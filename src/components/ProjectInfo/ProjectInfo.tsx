import getTechnologyIcon, { Technology } from './Technologies'

import webIcon from '../../static/img/icons/social-media/web.svg'
import githubIcon from '../../static/img/icons/social-media/github.svg'

import { ProjectContent } from '../../routes/03-Projects/ProjectsData'
import AnchorButton from '../AnchorButton/AnchorButton'

const ProjectInfo = ({
	id,
	name,
	description,
	techStack,
	repository,
	url,
}: ProjectContent) => (
	<article className="project-info">
		<p className="project-number">Proyecto #{id}</p>
		{name}

		<p className="project-description">{description}</p>
		<p className="project-techs">Tecnologías empleadas</p>
		<div className="project-tech-icons-container">
			{techStack.map((technology: Technology) =>
				getTechnologyIcon(technology)
			)}
		</div>

		<div className="project-buttons-container">
			<AnchorButton href={url} icon={webIcon} primary>
				visitar
			</AnchorButton>

			<AnchorButton href={repository} icon={githubIcon}>
				repositorio
			</AnchorButton>
		</div>
	</article>
)

export default ProjectInfo
