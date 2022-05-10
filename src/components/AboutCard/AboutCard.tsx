import Lottie from 'lottie-web'
import { useLayoutEffect, useRef } from 'react'
import './AboutCard.scss'
import eyeAnimation from '../../static/lottie/eye.json'

export type AboutCardContent = {
    main: string,
    middle: string,
    bottom: string
}

const AboutCard = (Content: AboutCardContent) => {

    let buttonRef = useRef<HTMLDivElement>(null)
    let eyeAnim = useRef(
        Lottie.loadAnimation({
            container: buttonRef.current as HTMLDivElement
        })
    )

    useLayoutEffect(() => {
        eyeAnim.current = Lottie.loadAnimation({
            container: buttonRef.current as HTMLDivElement,
            animationData: eyeAnimation,
            autoplay: false,
            loop: false
        })
    }, [])

    const openEye = () => {
        eyeAnim.current.playSegments([15, 30], true)
    }

    const closeEye = () => {
        eyeAnim.current.playSegments([64, 90], true)
    }

    return (
        <div className="about-card" onMouseEnter={openEye} onMouseLeave={closeEye}>
            <div className="lottie-eye-container">
                <div className="eye" ref={buttonRef}></div>
            </div>
            <hr />
            <p className="main">{Content.main}</p>
            <p className="middle">{Content.middle}</p>
            <p className="bottom">{Content.bottom}</p>

            {/* <button onMouseEnter={openEye} onMouseLeave={closeEye}>
                <div className="lottie-eye-container">
                    <div className="eye" ref={buttonRef}></div>
                </div>
                ver
            </button> */}
        </div>
    )
}

export default AboutCard