import { useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import './ScrollDown.scss'

const ScrollDown = () => {
	const [scrollState, setScrollState] = useState(false)
	const scrollRef = useRef<HTMLDivElement>(null)

	const hideOnScroll = () => {
		if (window.scrollY >= 100) {
			setScrollState(false)
		} else {
			setScrollState(true)
		}
	}

	useEffect(() => {
		setTimeout(() => setScrollState(true), 300)

		window.addEventListener('scroll', hideOnScroll)

		return () => {
			window.removeEventListener('scroll', hideOnScroll)
		}
	}, [])

	return (
		<CSSTransition
			mountOnEnter
			unmountOnExit
			in={scrollState}
			timeout={800}
			nodeRef={scrollRef}
			classNames="scroll"
		>
			<div className="scroll" ref={scrollRef}>
				<p>scroll</p>
				<div className="line-container">
					<span id="line"></span>
				</div>
			</div>
		</CSSTransition>
	)
}

export default ScrollDown
