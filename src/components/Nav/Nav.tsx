import { BaseSyntheticEvent, useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import timer from '../../helpers/Timer'
import routes from '../../routes/routes'
import { CSSTransition } from 'react-transition-group'

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
    let [menuDeviceState, setMenuDeviceState] = useState(false)
    const menuMobileRef = useRef<HTMLDivElement>(null)

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

        window.innerWidth <= 700 ? toggleMenu() : undefined

        if (currentRoute === route) {
            window.scrollTo(0, 0)
        }
        else {
            timerImplementation(route)
        }
    }

    const menuRef = useRef<HTMLDivElement>(null)
    const toggleMenu = () => {
        setMenuDeviceState(!menuDeviceState)

        const a = document.getElementsByTagName('html')[0]
        a.style.overflow = !menuDeviceState ? 'hidden hidden' : 'hidden auto'

        const hideMenuOnResize = (): void => {
            if (window.innerWidth > 700 && !menuDeviceState) {
                setMenuDeviceState(false)
            }
        }

        !menuDeviceState ? window.addEventListener('resize', hideMenuOnResize) : window.removeEventListener('resize', hideMenuOnResize)
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

                    <div className="links-container-desk" ref={menuRef} >
                        {
                            routes.map(route => {
                                return (
                                    <NavLink
                                        onClick={event => navLinkClickHandler(event, route.route)}
                                        to={route.route}
                                        key={route.text}
                                        className='nav-link-item-desk'
                                    >
                                        {route.text}
                                    </NavLink>
                                )
                            })
                        }
                    </div>

                    {/* {
                        menuDeviceState ?
                            <div className="links-container-mobile">
                                {
                                    routes.map(route => {
                                        return (
                                            <NavLink
                                                onClick={event => navLinkClickHandler(event, route.route)}
                                                to={route.route}
                                                key={route.text}
                                                className='nav-link-item-mob'
                                            >
                                                {route.text}
                                            </NavLink>
                                        )
                                    })
                                }
                            </div>
                            :
                            undefined


                    } */}

                    {
                        <CSSTransition
                            in={menuDeviceState}
                            classNames='appear'
                            timeout={{ enter: 500, exit: 300 }}
                            mountOnEnter
                            unmountOnExit
                            nodeRef={menuMobileRef}
                        >
                            <div className="links-container-mobile" ref={menuMobileRef}>
                                {
                                    routes.map(route => {
                                        return (
                                            <NavLink
                                                onClick={event => navLinkClickHandler(event, route.route)}
                                                to={route.route}
                                                key={route.text}
                                                className='nav-link-item-mob'
                                            >
                                                {route.text}
                                            </NavLink>
                                        )
                                    })
                                }
                            </div>
                        </CSSTransition>
                    }

                    <div id="menu-button" onClick={toggleMenu}></div>
                </div>
            </div>
        </nav>
    )
}

export default Nav

