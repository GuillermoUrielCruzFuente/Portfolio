//react imports
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

//outlet custom hook
import useNavContext, { ContextType } from '../../hooks/useNavContext'

const Projects = () => {
	const { nav, setReadyToNavigate, navigateTo }: ContextType = useNavContext()
	const location = useLocation()
	const refContainer = useRef<HTMLDivElement>(null)
	const [sectionState, setSectionState] = useState(false)

	useEffect(() => {
		showContent()
	}, [])

	useEffect(() => {
		if (nav) {
			if (nav.to != location.pathname) {
				hideContent()
			}
		}
	}, [nav])

	const showContent = () => {
		setSectionState(true)
	}

	const hideContent = () => {
		setSectionState(false)
	}

	return (
		<CSSTransition
			in={sectionState}
			nodeRef={refContainer}
			timeout={350}
			classNames="page-a"
			mountOnEnter
			unmountOnExit
			onExited={() => setReadyToNavigate(true)}
		>
			<header ref={refContainer}>
				<h1>Work</h1>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas nihil suscipit
					quidem enim aspernatur veritatis dicta illum iure reprehenderit explicabo.
					Architecto voluptatem placeat quasi, nostrum quam eveniet ipsa illum inventore.
				</p>
			</header>
		</CSSTransition>
	)
}

export default Projects
