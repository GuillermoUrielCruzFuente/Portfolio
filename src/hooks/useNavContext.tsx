import { Dispatch, SetStateAction } from 'react'
import { useOutletContext } from 'react-router-dom'

export type Navigation = {
	to: string | null
	from: string | null
}

export type ContextType = {
	nav: Navigation | null
	setReadyToNavigate: Dispatch<SetStateAction<boolean>>
	navigateTo: (to: string) => void
}

/**
 * custom hook to provide structure to the outlet context by react router
 * @returns context
 */
const useNavContext = () => useOutletContext<ContextType>()

export default useNavContext
