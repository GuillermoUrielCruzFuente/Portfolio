import { AnchorButton } from "@components/AnchorButton";
import IntersectionContainer, {
	IntersectionContainerAttributes,
} from "@components/IntersectionContainer/IntersectionContainer";

import getTechnologyIcon from "@/data/Technologies";
import { ProjectContent } from "@/data/ProjectsData";

import webIcon from "@images/icons/social-media/web.svg";
import githubIcon from "@images/icons/social-media/github.svg";

const intersectionConfig: IntersectionContainerAttributes = {
	from: {
		transform: "translateY(30px)",
		opacity: 0,
	},
	to: {
		transform: "translateY(0px)",
		opacity: 1,
	},
	transitionTime: 1000,
};

const ProjectInfo = ({ id, name, description, techStack, repository, url }: ProjectContent) => (
	<article className="project-info">
		<IntersectionContainer {...intersectionConfig}>
			<p className="project-number">Proyecto #{id}</p>
		</IntersectionContainer>

		<IntersectionContainer {...intersectionConfig}>{name}</IntersectionContainer>

		<IntersectionContainer {...intersectionConfig}>
			<p className="project-description">{description}</p>
		</IntersectionContainer>

		<IntersectionContainer {...intersectionConfig}>
			<p className="project-techs">Tecnologías empleadas</p>
		</IntersectionContainer>

		<IntersectionContainer {...intersectionConfig}>
			<div className="project-tech-icons-container">
				{techStack.map((technology) => getTechnologyIcon(technology))}
			</div>
		</IntersectionContainer>

		<IntersectionContainer {...intersectionConfig}>
			<div className="project-buttons-container">
				<AnchorButton
					href={url}
					icon={webIcon}
				>
					visitar
				</AnchorButton>

				<AnchorButton
					href={repository}
					icon={githubIcon}
					secondary
				>
					repositorio
				</AnchorButton>
			</div>
		</IntersectionContainer>
	</article>
);

export default ProjectInfo;
