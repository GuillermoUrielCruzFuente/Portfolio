import { FC, useEffect } from 'react'
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
    let confettiLottieAnimation: AnimationItem

    useEffect(() => {
        confettiLottieAnimation = Lottie.loadAnimation({
            container: document.getElementById(`confetti-${id}`) as HTMLElement,
            animationData: confettiAnimation,
            autoplay: false,
            loop: false,
            name: `animatedButton-${id}`
        })
        
        confettiLottieAnimation.goToAndStop(90, true)
    })

    const playConfetti = () => {
        console.log('a')
        confettiLottieAnimation.playSegments([0, 90], true)
    }

    const navigate = useNavigate()

    const navigateToNow = () => {
        if (NavigateTo) {
            navigate(NavigateTo)
            callback()
        } else {
            callback()
        }
    }

    return (
        <div className={`button-container ${className}`} style={{ marginTop }}>
            <div id={`confetti-${id}`} className="confetti" ></div>

            <button className='Button' onClick={navigateToNow} onMouseEnter={playConfetti}>
                {children}
            </button>
        </div>

    )
}

export default Button