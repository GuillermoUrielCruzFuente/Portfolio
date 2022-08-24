import { FC } from 'react'
import './ProjectImages.scss'

export type CollagePath = {
	fullImagePath: string
	thumbnailPath: string
}

const ProjectImages: FC<CollagePath> = ({ fullImagePath, thumbnailPath }) => {
	return (
		<div className="project-collage-main">
			<div className="project-collage-img-container">
				<div className="project-collage screen-blur"></div>

				<img
					className="project-collage"
					src={thumbnailPath}
					src-set={fullImagePath}
					alt="project image"
				/>
			</div>
		</div>
	)
}

export default ProjectImages
