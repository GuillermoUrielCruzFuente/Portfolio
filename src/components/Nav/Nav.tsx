import { BaseSyntheticEvent, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import timer from '../../helpers/Timer'
import routes from '../../routes/routes'

//third party libraries
import Lottie from 'lottie-web'

//data
import logoAnimation from '../../static/lottie/logo.json'

//styles
import './Nav.scss'

type NavProps = {
    transitionTime: number,
    runBeforeNavigate: () => void,
    currentRoute: string
}

const Nav = ({ transitionTime, runBeforeNavigate, currentRoute }: NavProps) => {

    const navigate = useNavigate()

    useEffect(() => {
        if (currentRoute != '/') {
            const navLogoContainer = document.getElementById('nav-logo') as HTMLElement
            let logo = Lottie.loadAnimation({
                container: navLogoContainer,
                animationData: logoAnimation,
                autoplay: false,
                loop: false,
                name: 'navLogo'
            })

            setTimeout(() => {
                navLogoContainer.style.opacity = '1'
                logo.playSegments([0, 180], true)
            }, 500);
        }
    }, [])

    const timerImplementation = async (route: string) => {
        runBeforeNavigate()
        if (currentRoute != '/') {
            const navLogoContainer = document.getElementById('nav-logo') as HTMLElement
            navLogoContainer.style.opacity = '0'
        }
        await timer(transitionTime)
        navigate(route)
    }

    const navLinkClickHandler = (event: BaseSyntheticEvent<MouseEvent, EventTarget & HTMLAnchorElement, EventTarget>, route: string) => {
        event.preventDefault()

        if (currentRoute === route) {
            window.scrollTo(0, 0)
        }
        else {
            timerImplementation(route)
        }
    }

    return (
        <nav className='no-blur-bg'>
            <div id="nav-container">
                {
                    currentRoute === '/' ?
                        <span></span>
                        :
                        <div id="nav-logo-container">
                            <a href="/" id="nav-logo-link">
                                <div id="nav-logo"></div>
                            </a>
                        </div>
                }

                <div id="navigator">
                    {
                        routes.map(route => {
                            return (
                                <NavLink
                                    onClick={event => navLinkClickHandler(event, route.route)}
                                    to={route.route}
                                    key={route.text}
                                    className='nav-link-item'
                                >
                                    {route.text}
                                </NavLink>
                            )
                        })
                    }

                    <div id="menu-button"></div>
                </div>
            </div>
        </nav>
    )
}

export default Nav

