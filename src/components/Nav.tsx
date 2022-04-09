import { useEffect } from 'react'
import { Link } from 'react-router-dom'

//third party libraries
import Lottie from 'lottie-web'

//data
import logoAnimation from '../static/logo.json'

//styles
import '../scss/Nav.scss'

function Nav() {

    const a = () => {
        Lottie.play('navLogo')
    }

    useEffect(() => {
        Lottie.loadAnimation({
            container: document.getElementById('nav-logo') as HTMLElement,
            animationData: logoAnimation,
            autoplay: true,
            loop: false,
            name: 'navLogo'
        })
    }, [])



    return (
        <nav className='blur-bg'>
            <div id="nav-container">
                <a href="/">
                    <div id="nav-logo"></div>
                </a>

                <div id="navigator">
                        <Link to="/">home</Link>
                        <Link to="/contact">contact</Link>
                </div>
            </div>
        </nav>
    )
}

export default Nav

