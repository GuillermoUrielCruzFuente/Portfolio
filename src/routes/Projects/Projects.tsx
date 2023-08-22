//react imports
import { SyntheticEvent } from "react";

import projectsData, { ProjectContent } from "@/data/ProjectsData";

//components
import ProjectInfo from "@components/ProjectInfo/ProjectInfo";
import ScrollDown from "@components/ScrollDown/ScrollDown";
import LazyImg from "@components/LazyImg/LazyImg";
import { PageContainer } from "@components/PageContainer";

//styles
import "./Projects.scss";

const Projects = () => {
	const revealProjectIconOnLoad = (event: SyntheticEvent) => {
		const iconElement = event.target as HTMLImageElement;
		iconElement.style.opacity = "1";
	};

	return (
		<>
			<PageContainer
				addNavbarMarginTop
				fillVerticalViewport
				id="projects"
			>
				<h1 className="page-title">Proyectos</h1>
				<p className="page-description">
					Comencé hace ya un tiempo en el <span className="accent">desarrollo web</span>,
					tras varias iteraciones estos son mis{" "}
					<span className="accent">proyectos destacados</span>, aquellos en los que he
					colocado esfuerzo y dedicación, te agradezco el tiempo que te tome revisarlos.
				</p>

				<div className="works">
					{projectsData.map((project: ProjectContent) => (
						<img
							key={project.id}
							className="project-logo"
							src={project.logoSrcPath}
							alt={`logo ${project.id}`}
							onLoad={revealProjectIconOnLoad}
						/>
					))}
				</div>

				<ScrollDown />
			</PageContainer>

			<section className="projects-container">
				<PageContainer>
					{projectsData.map((project: ProjectContent) => (
						<div
							key={project.url}
							className="project-box"
						>
							<div className="project-container">
								<ProjectInfo {...project} />

								<LazyImg imagePath={project.collageSrcPath} />
							</div>
						</div>
					))}
				</PageContainer>
			</section>
		</>
	);
};

export default Projects;
