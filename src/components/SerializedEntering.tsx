import { useRef } from 'react'
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
	return (
		<div>
			{children.map((child: JSX.Element, index: number) => {
				const containerRef = useRef<HTMLDivElement>(null)

				return (
					<div style={{ overflow: 'hidden', color: "#fff" }}>
						<CSSTransition
							in={enter}
							classNames={classNames}
							timeout={timeout + index * delay}
							mountOnEnter
							unmountOnExit
							nodeRef={containerRef}
							key={child.key}
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
