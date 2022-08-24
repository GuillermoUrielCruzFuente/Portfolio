import { FC, useEffect, useRef } from 'react'
import './ProjectImages.scss'

export type CollagePath = {
	fullImagePath: string
	thumbnailPath: string
}

const ProjectImages: FC<CollagePath> = ({ fullImagePath, thumbnailPath }) => {
	const collageRef = useRef<HTMLImageElement>(null)

	const intersectionOptions: IntersectionObserverInit = {
		root: null,
		rootMargin: '0px',
		threshold: 0.75,
	}

	useEffect(() => {
		const observer = new IntersectionObserver(computeEntries, intersectionOptions)

		collageRef.current
			? observer.observe(collageRef.current)
			: console.log('download image failed')

		return () => {
			observer.unobserve(collageRef.current)
		}
	}, [])

	const computeEntries = (entries: Array<IntersectionObserverEntry>) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				console.log('intersection', fullImagePath)
			}
		})
	}

	return (
		<div className="project-collage-main">
			<div className="project-collage-img-container">
				<div className="project-collage screen-blur"></div>

				<img
					className="project-collage"
					src={thumbnailPath}
					src-set={fullImagePath}
					alt="project image"
					ref={collageRef}
				/>
			</div>
		</div>
	)
}

export default ProjectImages
