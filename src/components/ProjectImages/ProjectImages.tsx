import { FC, useEffect, useRef } from 'react'
import './ProjectImages.scss'

export type CollagePath = {
	fullImagePath: string
	thumbnailPath: string
}

const ProjectImages: FC<CollagePath> = ({ fullImagePath, thumbnailPath }) => {
	const collageRef = useRef<HTMLImageElement>(null)
	const blur = useRef<HTMLDivElement>(null)

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
			observer.unobserve(collageRef.current as HTMLImageElement)
		}
	}, [])

	const computeEntries: IntersectionObserverCallback = (
		entries: Array<IntersectionObserverEntry>,
		observer: IntersectionObserver
	) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				loadFullImage()

				deleteBlur()

				observer.unobserve(collageRef.current!)
			}
		})
	}

	const loadFullImage = () => {
		collageRef.current ? (collageRef.current.src = fullImagePath) : undefined
	}

	const deleteBlur = () => {
		blur.current ? blur.current.classList.replace('screen-blur', 'screen-noblur') : undefined
	}

	return (
		<div className="project-collage-main">
			<div className="project-collage-img-container">
				<div ref={blur} className="project-collage screen-blur"></div>

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
