import { Dispatch, SetStateAction } from 'react'
import { useLocation } from 'react-router-dom'

type Navigation = {
	to: string | null
	from: string | null
}

type NavigateTo = {
	setClickedLink: Dispatch<SetStateAction<Navigation | null>>
	animationHandler: {
		show: () => void
		hide: () => void
	}
	disableLinks: () => void
	noReadyToNavigate: Dispatch<SetStateAction<boolean>>
}

const useNavigateTo = ({
	setClickedLink,
	animationHandler,
	disableLinks,
	noReadyToNavigate,
}: NavigateTo) => {
	const location = useLocation()

	return (to: string) => {
		if (to != location.pathname) {
			// change the reactive value for clicked link
			setClickedLink({
				from: location.pathname,
				to: to,
			})

			// run navbar animation depends on destination route
			if (to === '/') {
				animationHandler.hide()
			} else {
				animationHandler.show()
			}

			// disable all links in order to avoid multiple clicks
			disableLinks()

			// change the reactive value that handles the navigation to false, in order to listen for animation finish
			noReadyToNavigate(false)
		}
	}
}

export default useNavigateTo
