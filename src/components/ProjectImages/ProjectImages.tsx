import { FC } from 'react'
import './ProjectImages.scss'

type PathImages = {
	paths: Array<string>
}

const ProjectImages: FC<PathImages> = ({ paths }) => {
	return (
		<div className="project-images">
			{paths.map((path) => {
				return <img className="project-image" src={path} alt="project image" />
			})}
		</div>
	)
}

export default ProjectImages
