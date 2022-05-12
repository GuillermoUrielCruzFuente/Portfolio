import { useLayoutEffect, useRef, useState } from "react"
import { CSSTransition } from "react-transition-group"
// import '../scss/Home.scss'

import Nav from '../components/Nav/Nav'

export default function Contact() {
    let [titleState, setTitlestate] = useState(false)
    let b = useRef(null)

    useLayoutEffect(() => {
        setTitlestate(true)
    }, [])

    const c = () => console.log('c')

    return (
        <>
            <Nav transitionTime={10} runBeforeNavigate={() => { }} currentRoute='/contact' />
            <header>
                <CSSTransition in={titleState} classNames='video-anim' timeout={{ enter: 1000, exit: 500 }} mountOnEnter nodeRef={b}>
                    <h1 ref={b}>Contact</h1>
                </CSSTransition>
            </header>
        </>
    )
}