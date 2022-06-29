//react imports
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

//outlet custom hook
import { useNavSignal, ContextType } from '../../components/Nav/Nav'
import { CSSTransition } from 'react-transition-group'

const Projects = () => {
	const { nav, setReadyToNavigate: reactiveFunc }: ContextType = useNavSignal()
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
			onExited={() => reactiveFunc(true)}
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
