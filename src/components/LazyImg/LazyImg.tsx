import { FC, useEffect, useRef } from 'react'

export type LazyImgPath = {
	fullImagePath: string
	thumbnailPath: string
}

const LazyImg: FC<LazyImgPath> = ({ fullImagePath, thumbnailPath }) => {
	const collageRef = useRef<HTMLImageElement>(null)
	const blur = useRef<HTMLDivElement>(null)

	const intersectionOptions: IntersectionObserverInit = {
		root: null,
		rootMargin: '200px',
		threshold: 0,
	}

	useEffect(() => {
		const observer = new IntersectionObserver(
			computeEntries,
			intersectionOptions
		)

		collageRef.current
			? observer.observe(collageRef.current)
			: console.log('download image failed')

		return () => {
			collageRef.current
				? observer.unobserve(collageRef.current!)
				: undefined
		}
	}, [])

	const computeEntries: IntersectionObserverCallback = (
		entries: Array<IntersectionObserverEntry>,
		observer: IntersectionObserver
	) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				loadFullImage()
				observer.unobserve(collageRef.current!)
			}
		})
	}

	const loadFullImage = () => {
		collageRef.current
			? (collageRef.current.src = fullImagePath)
			: undefined
	}

	const handleImageLoad = () => {
		const currentPath = collageRef.current!.src.slice(
			collageRef.current!.src.length - fullImagePath.length,
			collageRef.current!.src.length
		)

		if (currentPath === fullImagePath) {
			deleteBlur()
		}
	}

	const deleteBlur = () => {
		blur.current
			? blur.current.classList.replace('screen-blur', 'screen-noblur')
			: undefined
	}

	return (
		<div className="project-collage-main">
			<div className="project-collage-img-container">
				<div ref={blur} className="project-collage screen-blur"></div>

				<img
					ref={collageRef}
					className="project-collage"
					src={thumbnailPath}
					onLoad={handleImageLoad}
					alt="project image"
				/>
			</div>
		</div>
	)
}

export default LazyImg
