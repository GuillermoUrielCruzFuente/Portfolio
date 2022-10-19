import { useRef, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import AnimatedTitle from '../../components/AnimatedTitle/AnimatedTitle'
import './NoMatch.scss'

//outlet custom hook
import useNavContext, { ContextType } from '../../hooks/useNavContext'

import monsterAnimationData from '../../static/lottie/404-pet.json'
import Lottie from 'lottie-web'

export default function NoMatch() {
	const { nav, setReadyToNavigate, navigateTo }: ContextType = useNavContext()
	const location = useLocation()
	const refContainer = useRef<HTMLDivElement>(null)
	const [sectionState, setSectionState] = useState(false)

	useEffect(() => {
		showContent()

		return () => {
			// monsterAnimationLottie.destroy()
		}
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
		const monsterAnimationLottie = Lottie.loadAnimation({
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
				<AnimatedTitle
					alignment="right"
					items={['Error', '404']}
					textClass="error-text"
				/>

				<p>La página a la que intentas acceder no existe</p>

				<div id="monster-animation"></div>
			</header>
		</CSSTransition>
	)
}
