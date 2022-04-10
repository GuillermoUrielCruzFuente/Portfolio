import { useEffect } from 'react'
import { Link } from 'react-router-dom'

//third party libraries
import Lottie from 'lottie-web'

//data
import logoAnimation from '../static/logo.json'

//styles
import '../scss/Nav.scss'

function Nav() {

    useEffect(() => {
        Lottie.loadAnimation({
            container: document.getElementById('nav-logo') as HTMLElement,
            animationData: logoAnimation,
            autoplay: false,
            loop: false,
            name: 'navLogo'
        })

        const preloader = document.getElementById('preloader') as HTMLElement
        setTimeout(() => {
            preloader.style.visibility = 'hidden'
            Lottie.play('navLogo')
        }, 5000);
    }, [])



    return (
        <nav className='no-blur-bg'>
            <div id="nav-container">
                <a href="/">
                    <div id="nav-logo"></div>
                </a>

                <div id="navigator">
                    <Link to="/">home</Link>
                    <Link to="/about">about</Link>
                    <Link to="/work">work</Link>
                    <Link to="/contact">contact</Link>
                </div>
            </div>
        </nav>
    )
}

export default Nav

