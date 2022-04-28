import { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

//third party libraries
import Lottie from 'lottie-web'

//data
import logoAnimation from '../../static/lottie/logo-2.json'

//styles
import './Nav.scss'

type NavProps = {
    transitionTime: number,
    callback: () => void,
    isHome?: boolean
}

type NavRoutes = {
    text: string,
    route: string
}

const Nav = ({ transitionTime, callback, isHome = false }: NavProps) => {
    const routes: Array<NavRoutes> = [
        {
            text: 'inicio',
            route: '/'
        },
        {
            text: 'sobre mi',
            route: '/about'
        },
        {
            text: 'trabajos',
            route: '/work'
        },
        {
            text: 'contacto',
            route: '/contact'
        }
    ]

    useEffect(() => {
        if (!isHome) {
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
                logo.playSegments([60, 140], true)
            }, 500);
        }
    }, [])

    const timer = (ms: number) => { return new Promise(res => setTimeout(res, ms)) }
    const navigate = useNavigate()

    const timerImplementation = async (route: string) => {
        callback()
        await timer(transitionTime)
        navigate(route)
    }

    return (
        <nav className='no-blur-bg'>
            <div id="nav-container">
                {
                    !isHome ?
                        <a href="/" id='nav-logo-link'>
                            <div id="nav-logo"></div>
                        </a>
                        :
                        <span></span>
                }

                <div id="navigator">
                    {
                        routes.map(route => {
                            return (
                                <NavLink
                                    onClick={(event) => {
                                        event.preventDefault()
                                        timerImplementation(route.route)
                                    }}
                                    to={route.route}
                                    key={route.text}
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

