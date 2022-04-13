import Lottie from "lottie-web";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import confettiAnimation from '../../static/lottie/confetti.json'

import './AnimatedButton.scss'

type AnimatedButtonConfig = {
    text: string,
    isLink?: boolean,
    to?: string,
    buttonId: string,
    animateOnHover?: boolean,
    animateOnLoad?: boolean,
    delay?: number
}

export default function AnimatedButton({ text, isLink = true, to, buttonId, animateOnHover = true, animateOnLoad = false, delay = undefined }: AnimatedButtonConfig) {
    useEffect(() => {
        Lottie.loadAnimation({
            container: document.getElementById(`confetti-${buttonId}`) as HTMLElement,
            animationData: confettiAnimation,
            autoplay: animateOnLoad,
            loop: false
        })
    }, [])

    return (
        <div className="button-container">
            <div id={`confetti-${buttonId}`} className="confetti"></div>

            {isLink ? <Link to={to ? to : '/'}>{text}</Link> : <button>{text}</button>}
        </div>
    )
}