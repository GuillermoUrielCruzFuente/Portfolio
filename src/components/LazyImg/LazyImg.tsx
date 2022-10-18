import { useEffect, useRef, useState } from 'react'

export type LazyImgPath = {
	imagePath: string
}

const intersectionOptions: IntersectionObserverInit = {
	root: null,
	rootMargin: '200px',
	threshold: [0, 0.5],
}

const LazyImg = ({ imagePath }: LazyImgPath) => {
	const imageRef = useRef<HTMLImageElement>(null)
	const blur = useRef<HTMLDivElement>(null)

	// const [isImageLoaded, setIsImageLoaded] = useState(false)
	let isImageLoaded = false

	const computeEntries: IntersectionObserverCallback = (
		entries: Array<IntersectionObserverEntry>
	) => {
		entries.forEach((entry) => {
			// console.log(`image -> ${imagePath} at ${entry.intersectionRatio}`)
			// if (entry.isIntersecting) {
			// 	downloadImage()
			// }

			if (entry.intersectionRatio > 0 && entry.intersectionRatio < 0.5) {
				downloadImage()
				console.log('entry at ratio 0', entry.intersectionRatio)
			} else if (entry.intersectionRatio >= 0.5 && isImageLoaded) {
				runEnterAnimation()
				imageRef.current && observer.unobserve(imageRef.current)
				console.log('entry at ratio 0.5', entry.intersectionRatio)
			}

			// if (entry. >= 1.5) {
			// 	console.log('1,5')
			// }
		})
	}

	const observer = new IntersectionObserver(
		computeEntries,
		intersectionOptions
	)

	useEffect(() => {
		imageRef.current
			? observer.observe(imageRef.current)
			: console.log('download image failed')

		return () => {
			imageRef.current && observer.unobserve(imageRef.current)
		}
	}, [])

	const downloadImage = () => {
		imageRef.current && (imageRef.current.src = imagePath)
	}

	const handleImageLoad = () => {
		// deleteBlur()
		// runEnterAnimation()
		// setIsImageLoaded(true)
		isImageLoaded = true
		//once the image is loaded the observer is unnecessary
		// imageRef.current && observer.unobserve(imageRef.current)
	}

	const deleteBlur = () => {
		blur.current
			? blur.current.classList.replace('screen-blur', 'screen-noblur')
			: undefined
	}

	const runEnterAnimation = () => {
		imageRef.current &&
			imageRef.current.classList.replace('no-loaded', 'loaded')
	}

	return (
		<div className="project-collage-main">
			<div className="project-collage-img-container">
				{/* <div ref={blur} className="project-collage screen-blur"></div> */}

				<img
					ref={imageRef}
					className="project-collage no-loaded"
					onLoad={handleImageLoad}
					alt="project image"
				/>
			</div>
		</div>
	)
}

export default LazyImg
