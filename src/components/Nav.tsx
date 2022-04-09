import { useEffect } from 'react'

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
                        <a href="#">1</a>
                        <a href="#">2</a>
                        <a href="#">3</a>
                </div>
            </div>
        </nav>
    )
}

export default Nav

