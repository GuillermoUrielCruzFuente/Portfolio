import { CSSProperties, FC, useLayoutEffect, useRef } from "react"

type ToAppear = {
    children: JSX.Element,
    transitionTime: number
    from: CSSProperties,
    to: CSSProperties
}

type CSSItem = {
    [key: string]: string
}

const IntersectionContainer: FC<ToAppear> = ({ children, from, to, transitionTime }: ToAppear) => {
    const containerRef = useRef<HTMLDivElement>(null)

    const computeEntries = (entries: Array<IntersectionObserverEntry>) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // containerRef.current ? containerRef.current.style.opacity = '1' : undefined

                containerRef.current ? containerRef.current.style.opacity = '1' : undefined

                for (let key in to) {
                    const value = to[key as keyof typeof to] //type assertion -> https://bobbyhadz.com/blog/typescript-no-index-signature-with-parameter-of-type-string

                    if (containerRef.current) {
                        switch (key) {
                            case 'opacity': {
                                containerRef.current.style.opacity = value as string
                                break
                            }
                            case 'transform': {
                                containerRef.current.style.transform = value as string
                                break
                            }
                        }
                    }
                }

            }
        })
    }

    const intersectionOptions: IntersectionObserverInit = {
        root: null,
        rootMargin: '0px',
        threshold: 1
    }

    useLayoutEffect(() => {
        containerRef.current ? containerRef.current.style.transition = `all ${transitionTime}ms` : undefined

        const observer = new IntersectionObserver(computeEntries, intersectionOptions)
        observer.observe(containerRef.current as Element)
    }, [])

    return (
        <div style={from} ref={containerRef}>
            {children}
        </div>
    )
}

export default IntersectionContainer