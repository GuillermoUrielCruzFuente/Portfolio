import { ButtonHTMLAttributes, FC, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Lottie, { AnimationItem } from "lottie-web";

import './Button.scss'

import confettiAnimation from '../../static/lottie/confetti.json'

type ButtonProps = {
    callback: () => void,
    children: string,
    marginTop: string,
    className: string,
    id: string,
    NavigateTo?: string,
}

const Button: FC<ButtonProps> = ({ callback, children, marginTop = '0px', className, id, NavigateTo = undefined }: ButtonProps) => {
    let container = useRef<HTMLDivElement>(null)
    let lottieInstance = useRef(Lottie.loadAnimation({ container: container.current as HTMLElement }))
    const [buttonState, setButtonState ] = useState(false)
    // let buttonRef = useRef<HTMLButtonElement>(null)

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

    const navigateToNow = () => {
        setButtonState(true)
        
        setTimeout(() => {
            setButtonState(false)
        }, 1000);

        if (NavigateTo) {
            callback()
            playConfetti()
            navigate(NavigateTo)
        } else {    
            playConfetti()
            callback()
        }
    }

    return (
        <div className={`button-container ${className}`} style={{ marginTop }}>
            <button className='Button' onClick={navigateToNow} disabled={buttonState} >
                {children}
            </button>

            <div className="confetti" ref={container}></div>
        </div>

    )
}

export default Button