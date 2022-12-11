import { useLayoutEffect } from 'react'
import monsterAnimationData from '@lottie/404-pet.json'
import useLottie from '@/hooks/useLottie'
import './NoMatch.scss'

export default function NoMatch() {
	const [Monster, MonsterLottie] = useLottie({
		classContainer: 'monster-animation',
		data: monsterAnimationData,
	})

	useLayoutEffect(() => {
		MonsterLottie.current.autoplay = true
		MonsterLottie.current.loop = true
		MonsterLottie.current.play()
	}, [])

	return (
		<header id="no-match">
			<Monster />

			<h1 className="error-text">Error 404</h1>

			<p>
				La página a la que intentas acceder nunca existió, o quizás
				sí...
			</p>
		</header>
	)
}
