import { useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Lottie from "lottie-web";
import timer from '../../helpers/Timer';

import './Button.scss'

import confettiAnimation from '../../static/lottie/confetti.json'

type ButtonProps = {
    transitionTime: number,
    callback: () => void,
    children: string,
    className: string,
    NavigateTo?: string,
}

const Button = ({ transitionTime, callback, children, className, NavigateTo = undefined }: ButtonProps) => {
    let container = useRef<HTMLDivElement>(null)
    let lottieInstance = useRef(Lottie.loadAnimation({ container: container.current as HTMLElement }))
    const [buttonState, setButtonState] = useState(false)

    useLayoutEffect(() => {
        lottieInstance.current = Lottie.loadAnimation({
            container: container.current as HTMLElement,
            animationData: confettiAnimation,
            autoplay: false,
            loop: false
        })

        lottieInstance.current.goToAndStop(90, true)
    }, [])

    const playConfetti = () => {
        lottieInstance.current.playSegments([0, 90], true)
    }

    const navigate = useNavigate()

    const navigateTo = async () => {
        setButtonState(true)

        setTimeout(() => {
            setButtonState(false)
        }, 500);

        if (NavigateTo) {
            callback()
            playConfetti()
            await timer(transitionTime)
            navigate(NavigateTo)
        } else {
            playConfetti()
            callback()
        }
    }

    return (
        <div className={`button-container ${className}`}>
            <button className='Button' onClick={navigateTo} disabled={buttonState} >
                {children}
            </button>

            <div className="confetti" ref={container}></div>
        </div>

    )
}

export default Button