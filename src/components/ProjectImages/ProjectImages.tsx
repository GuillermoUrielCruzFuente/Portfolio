import { FC } from 'react'
import './ProjectImages.scss'

type CollagePath = {
	path: string
}

const ProjectImages: FC<CollagePath> = ({ path }) => {
	return (
		<div className="project-collage">
			<img className="project-image" src={path} alt="project image" />
		</div>
	)
}

export default ProjectImages
