import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

//third party libraries
import Lottie from 'lottie-web'

//data
import logoAnimation from '../static/lottie/logo.json'

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
            preloader.style.transform = 'translateY(-100%)'

            preloader.addEventListener('transitionend', () => {
                preloader.style.visibility = 'hidden'
            })
            
        }, 500);
    }, [])



    return (
        <nav className='no-blur-bg'>
            <div id="nav-container">
                <a href="/">
                    <div id="nav-logo"></div>
                </a>

                <div id="navigator">
                    <NavLink to="/">home</NavLink>
                    <NavLink to="/about">about</NavLink>
                    <NavLink to="/work">work</NavLink>
                    <NavLink to="/contact">contact</NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Nav

