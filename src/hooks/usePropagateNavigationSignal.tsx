import { Dispatch, SetStateAction } from 'react'
import { useLocation } from 'react-router-dom'

type Navigation = {
	to: string | null
	from: string | null
}

type PropagationType = {
	to: string
	stateHandler: Dispatch<SetStateAction<Navigation | null>>
}

const usePropagateNavigationSignal = ({ to, stateHandler }: PropagationType) => {
    const location = useLocation()

    stateHandler({
        from: location.pathname,
        to: to
    })
}

export default usePropagateNavigationSignal
