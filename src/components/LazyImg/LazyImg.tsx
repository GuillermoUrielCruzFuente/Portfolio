import { useEffect, useRef, useState } from 'react'
import Loader from '../Loader/Loader'
import { CSSTransition } from 'react-transition-group'

export type LazyImgPath = {
	imagePath: string
}

// this observer config has a big margin ir order to
// fire the image downloading before it enters the viewport
const observerDownloaderOptions: IntersectionObserverInit = {
	root: null,
	rootMargin: '400px',
	threshold: 0,
}

// this observer config has no margin and a threshold value > 0 in order to
// fire the enter animation when the element is within the viewport
const observerEnterAnimationOptions: IntersectionObserverInit = {
	root: null,
	rootMargin: '0px',
	threshold: 0.25,
}

const LazyImg = ({ imagePath }: LazyImgPath) => {
	const imageRef = useRef<HTMLImageElement>(null)
	const loaderRef = useRef<HTMLDivElement>(null)
	const [isLoaded, setIsLoaded] = useState(false)

	const downloaderObserverCallback: IntersectionObserverCallback = (
		entries: Array<IntersectionObserverEntry>
	) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				downloadImage()

				//once the download action is fired it is no longer necessary to observe it
				imageRef.current && downloadObserver.unobserve(imageRef.current)
				downloadObserver.disconnect()
			}
		})
	}

	const downloadObserver = new IntersectionObserver(
		downloaderObserverCallback,
		observerDownloaderOptions
	)

	/**
	 * Switch between classes to create an enter animation effect
	 * css classes defined in Projects.scss file
	 */
	const runEnterAnimation = () => {
		imageRef.current &&
			imageRef.current.classList.replace('no-loaded', 'loaded')
	}

	const enterAnimationObserverCallback: IntersectionObserverCallback = (
		entries: Array<IntersectionObserverEntry>
	) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				runEnterAnimation()

				imageRef.current &&
					enterAnimationObserver.unobserve(imageRef.current)
			}
		})
	}

	const enterAnimationObserver = new IntersectionObserver(
		enterAnimationObserverCallback,
		observerEnterAnimationOptions
	)

	/**
	 * Once the component is mounted register it to the downloadObserver
	 * and if it will be unmounted disconnect all existing observers
	 */
	useEffect(() => {
		imageRef.current && downloadObserver.observe(imageRef.current)

		return () => {
			downloadObserver.disconnect()
			enterAnimationObserver.disconnect()

			// imageRef.current && downloadObserver.unobserve(imageRef.current)
		}
	}, [])

	/**
	 * Download is triggered by setting the src property in the img element
	 */
	const downloadImage = () => {
		imageRef.current && (imageRef.current.src = imagePath)
	}

	/**
	 * since the loader visibility depends on isLoaded state
	 * hide it by setting that value to false
	 */
	const hideLoader = () => {
		setIsLoaded(true)
	}

	/**
	 * Function triggered when the image is completly loaded
	 */
	const handleImageLoad = () => {
		hideLoader()

		//once the image is completely loaded
		//active the enterAnimationObserver to
		//run the animation at the right moment
		imageRef.current && enterAnimationObserver.observe(imageRef.current)
	}

	return (
		<div className="project-collage-main">
			<div className="project-collage-img-container">
				<img
					ref={imageRef}
					className="project-collage no-loaded"
					onLoad={handleImageLoad}
					alt="project image"
				/>

				<CSSTransition
					in={!isLoaded}
					mountOnEnter
					unmountOnExit
					classNames="loader"
					timeout={300}
					nodeRef={loaderRef}
				>
					<div ref={loaderRef} className="img-loader">
						<Loader />
						<p className="loader-text">loading image...</p>
					</div>
				</CSSTransition>
			</div>
		</div>
	)
}

export default LazyImg
