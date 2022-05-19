import { useLayoutEffect, useRef, useState } from "react"
import { CSSTransition } from "react-transition-group"
// import '../scss/Home.scss'


export default function Contact() {
    let [titleState, setTitlestate] = useState(false)
    let b = useRef(null)

    useLayoutEffect(() => {
        setTitlestate(true)
    }, [])


    return (
        <>
            <header>
                <CSSTransition in={titleState} classNames='video-anim' timeout={{ enter: 1000, exit: 500 }} mountOnEnter nodeRef={b}>
                    <h1 ref={b}>Contact</h1>
                </CSSTransition>
            </header>
        </>
    )
}