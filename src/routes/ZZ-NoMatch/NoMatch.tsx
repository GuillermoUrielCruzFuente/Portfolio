import { useRef, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import './NoMatch.scss'

//outlet custom hook
import useNavContext, { ContextType } from '../../hooks/useNavContext'

import monsterAnimationData from '../../static/lottie/404-pet.json'
import Lottie from 'lottie-web'
import SerializedEntering from '../../components/SerializedEntering'

export default function NoMatch() {
	const { nav, setReadyToNavigate, navigateTo }: ContextType = useNavContext()
	const location = useLocation()
	const refContainer = useRef<HTMLDivElement>(null)
	const [sectionState, setSectionState] = useState(false)

	const [serialState, setSerialState] = useState(false)

	useEffect(() => {
		showContent()
		setTimeout(() => {
			setSerialState(true)
		}, 500)
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

	const loadMonsterAnimation = () => {
		Lottie.loadAnimation({
			container: document.getElementById('monster-animation')!,
			animationData: monsterAnimationData,
			loop: true,
			autoplay: true,
			renderer: 'svg',
		})
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
			onExited={() => setReadyToNavigate(true)}
			onEntered={loadMonsterAnimation}
		>
			<header id="no-match">
				<div id="monster-animation"></div>

				<SerializedEntering
					classNames="serial"
					enter={serialState}
					timeout={1500}
					delay={100}
				>
					<h1 className="error-text" key="error-text">
						Error 404
					</h1>
					<p key="error-desc">
						La página a la que intentas acceder nunca existió, o
						quizás sí...
					</p>
				</SerializedEntering>
			</header>
		</CSSTransition>
	)
}
