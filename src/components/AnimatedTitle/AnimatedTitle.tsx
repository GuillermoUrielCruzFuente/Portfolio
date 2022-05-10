import { CSSProperties, MutableRefObject, StyleHTMLAttributes, useEffect, useLayoutEffect, useRef } from 'react'
import './AnimatedTitle.scss'

/**
 * Generar segmentos basado en un array
 * y realizar animaciones sobre esos segmentos
 * de esta manera no se generarán cortes letra por letra 
 * 
 * También es posible realizar cambios a la clase de
 * Animaciones, para generar segmentos basado en un
 * array de longitudes
 */

type textArray = {
    items: Array<string>,
    alignment: 'left' | 'right'
}

type textItem = {
    item: string,
    ref: MutableRefObject<HTMLSpanElement | null>
}

const AnimatedTitle = ({ items, alignment }: textArray) => {
    const titleRef = useRef<HTMLHeadingElement>(null)

    const itemsWithRef: Array<textItem> = items.map((item: string) => {
        const itemWithRef: textItem = {
            item: item,
            ref: useRef<HTMLSpanElement>(null)
        }
        return itemWithRef
    })

    useEffect(() => {

    }, [])

    useLayoutEffect(() => {
        setTimeout(() => {

        }, 800);

        const observerOptions: IntersectionObserverInit = {
            root: null,
            rootMargin: '0px',
            threshold: 1
        }

        const b = () => {
            itemsWithRef.forEach((item: textItem) => {
                if (item.ref.current) {
                    item.ref.current.style.opacity = '1'
                    item.ref.current.style.transform = 'translateY(0px)'
                }
            })
        }

        const a = (entries: Array<IntersectionObserverEntry>) => {
            entries.forEach(entry => {
                entry.isIntersecting ? b() : undefined
            })
        }

        const observer = new IntersectionObserver(a, observerOptions)

        observer.observe(titleRef.current as HTMLHeadingElement)
    }, [])

    const containerStyles: CSSProperties = {
        fontSize: '3rem',
        color: '#fff',
        // backgroundColor: 'chocolate',
        overflow: 'hidden',
        display: 'flex',
        flexFlow: 'column',
        alignItems: alignment === 'left' ? 'flex-start' : 'flex-end'
    }

    return (
        <h1 ref={titleRef} style={containerStyles} className='animated-title'>
            {
                itemsWithRef.map((item, index) => {
                    return (
                        <span className="animated-segment" ref={item.ref} style={{ transitionDelay: `${index * 200}ms` }} key={item.item}>{item.item}</span>
                    )
                })
            }
        </h1>
    )
}

export default AnimatedTitle