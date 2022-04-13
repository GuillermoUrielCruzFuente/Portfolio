import Lottie, { AnimationItem } from "lottie-web";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import confettiAnimation from '../../static/lottie/confetti.json'

import './AnimatedButton.scss'

type AnimatedButtonProps = {
    text: string,
    isLink?: boolean,
    to?: string,
    buttonId: string,
    buttonClassName?: string,
    animateOnHover?: boolean,
    animateOnLoad?: boolean,
    delay?: number
}

export default function AnimatedButton({ text, isLink = true, to, buttonId, buttonClassName = '', animateOnHover = true, animateOnLoad = false, delay = undefined }: AnimatedButtonProps) {
    let animation: AnimationItem

    const a = () => {
        animation.playSegments([0, 90], true)
    }


    useEffect(() => {
        animation = Lottie.loadAnimation({
            container: document.getElementById(`confetti-${buttonId}`) as HTMLElement,
            animationData: confettiAnimation,
            autoplay: animateOnLoad,
            loop: false,
            name: `animatedButton-${buttonId}`
        })
    })

    return (
        <div className={`button-container ${buttonClassName}`}>
            <div id={`confetti-${buttonId}`} className="confetti" ></div>

            {isLink ? <Link to={to ? to : '/'} onMouseEnter={a}>{text}</Link> : <button onMouseEnter={a}>{text}</button>}
        </div>
    )
}