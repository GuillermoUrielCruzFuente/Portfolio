import getTechnologyIcon, { Technology } from './Technologies'

import webIcon from '@images/icons/social-media/web.svg'
import githubIcon from '@images/icons/social-media/github.svg'

import { ProjectContent } from '@/data/ProjectsData'
import AnchorButton from '@components/AnchorButton/AnchorButton'
import IntersectionContainer from '@components/IntersectionContainer/IntersectionContainer'
import { CSSProperties } from 'react'

const fromProperties: CSSProperties = {
	transform: 'translateY(30px)',
	opacity: 0,
}

const toProperties: CSSProperties = {
	transform: 'translateY(0px)',
	opacity: 1,
}

const transition = 1000

const ProjectInfo = ({
	id,
	name,
	description,
	techStack,
	repository,
	url,
}: ProjectContent) => (
	<article className="project-info">
		<IntersectionContainer
			transitionTime={transition}
			from={fromProperties}
			to={toProperties}
		>
			<p className="project-number">Proyecto #{id}</p>
		</IntersectionContainer>
		<IntersectionContainer
			transitionTime={transition}
			from={fromProperties}
			to={toProperties}
		>
			{name}
		</IntersectionContainer>

		<IntersectionContainer
			transitionTime={transition}
			from={fromProperties}
			to={toProperties}
		>
			<p className="project-description">{description}</p>
		</IntersectionContainer>

		<IntersectionContainer
			transitionTime={transition}
			from={fromProperties}
			to={toProperties}
		>
			<p className="project-techs">Tecnologías empleadas</p>
		</IntersectionContainer>

		<IntersectionContainer
			transitionTime={transition}
			from={fromProperties}
			to={toProperties}
		>
			<div className="project-tech-icons-container">
				{techStack.map((technology: Technology) =>
					getTechnologyIcon(technology)
				)}
			</div>
		</IntersectionContainer>

		<IntersectionContainer
			transitionTime={transition}
			from={fromProperties}
			to={toProperties}
		>
			<div className="project-buttons-container">
				<AnchorButton href={url} icon={webIcon} primary>
					visitar
				</AnchorButton>

				<AnchorButton href={repository} icon={githubIcon}>
					repositorio
				</AnchorButton>
			</div>
		</IntersectionContainer>
	</article>
)

export default ProjectInfo
