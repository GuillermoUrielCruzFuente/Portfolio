import { CSSProperties, FC, useLayoutEffect, useRef } from 'react'

type ToAppear = {
	children: JSX.Element
	transitionTime: number
	from: CSSProperties
	to: CSSProperties
}

const IntersectionContainer: FC<ToAppear> = ({
	children,
	from,
	to,
	transitionTime,
}: ToAppear) => {
	const containerRef = useRef<HTMLDivElement>(null)

	const computeEntries = (entries: Array<IntersectionObserverEntry>) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				for (let key in to) {
					const value = to[key as keyof typeof to] as string //type assertion -> https://bobbyhadz.com/blog/typescript-no-index-signature-with-parameter-of-type-string
					const property = key as any
					containerRef.current!.style[property] = value
				}
			}
		})
	}

	const intersectionOptions: IntersectionObserverInit = {
		root: null,
		rootMargin: '0px',
		threshold: 0.5,
	}

	useLayoutEffect(() => {
		containerRef.current
			? (containerRef.current.style.transition = `all ${transitionTime}ms`)
			: undefined

		const observer = new IntersectionObserver(
			computeEntries,
			intersectionOptions
		)
		observer.observe(containerRef.current as Element)
	}, [])

	return (
		<div style={from} ref={containerRef}>
			{children}
		</div>
	)
}

export default IntersectionContainer
