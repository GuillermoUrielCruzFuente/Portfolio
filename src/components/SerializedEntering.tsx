import { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

export type SerializedEnteringProps = {
	children: Array<JSX.Element>
	enter: boolean
	classNames: string
	timeout: number
	delay: number
	containerClassName?: string
}

/**
 * receive an array of elements and a apply a serialized enter transition
 * @param {SerializedEnteringProps} props - Object with CSSTransition properties and more
 * @param {Array<JSX.Element>} props.children - Array of Elements to apply the transition, key is requiered
 * @param {boolean} props.enter - state value for enter and leave
 * @param {string} props.classNames - CSSTransition classes to apply
 * @param {number} props.timeout - animation duration
 * @param {number} props.delay - animation delay between elements
 * @param {string} props.containerClassName - class for the container div
 * @returns Encapsulated elements with a CSSTransition configured
 */
const SerializedEntering = ({
	children,
	enter,
	classNames,
	timeout,
	delay,
	containerClassName,
}: SerializedEnteringProps) => {
	return (
		<div className={`${containerClassName ?? ''}`}>
			{children.map((child: JSX.Element, index: number) => {
				const containerRef = useRef<HTMLDivElement>(null)

				return (
					<div key={child.key}>
						<CSSTransition
							in={enter}
							classNames={classNames}
							timeout={timeout + index * delay}
							mountOnEnter
							unmountOnExit
							nodeRef={containerRef}
						>
							<div
								ref={containerRef}
								style={{
									transitionDelay: `${index * delay}ms`,
								}}
							>
								{child}
							</div>
						</CSSTransition>
					</div>
				)
			})}
		</div>
	)
}

export default SerializedEntering
