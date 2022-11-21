import { CSSTransition } from 'react-transition-group'

export type SerializedEnteringProps = {
	children: Array<JSX.Element>
	enter: boolean
	classNames: string
	timeout: number
	delay: number
}

const SerializedEntering = ({
	children,
	enter,
	classNames,
	timeout,
	delay,
}: SerializedEnteringProps) => { 

	return children.map((child: JSX.Element, index: number) => (
		<CSSTransition
			in={enter}
			classNames={classNames}
			timeout={timeout + index * delay}
			mountOnEnter
			unmountOnExit
		>
			{child}
		</CSSTransition>
	))
}

export default SerializedEntering
