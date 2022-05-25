import { useRef, useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

import { useNavSignal, ContextType } from "../../components/Nav/Nav"
import { CSSTransition } from "react-transition-group"

export default function Contact() {
	const { nav, reactiveFunc }: ContextType = useNavSignal()
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
			classNames="page"
			mountOnEnter
			unmountOnExit
			onExited={() => reactiveFunc(true)}
		>
			<header ref={refContainer}>
				<h1>Contact</h1>
			</header>
		</CSSTransition>
	)
}
