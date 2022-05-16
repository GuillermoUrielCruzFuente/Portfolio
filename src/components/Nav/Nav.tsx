import { BaseSyntheticEvent, MutableRefObject, useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

//
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

type RoutesWithRefs = {
    text: string,
    route: string,
    ref: MutableRefObject<HTMLAnchorElement | null>
}

const Nav = ({ transitionTime, runBeforeNavigate, currentRoute }: NavProps) => {
    const navigate = useNavigate()

    const [menuDeviceState, setMenuDeviceState] = useState(false)
    const [mobItems, setMobItems] = useState(false)

    const menuMobileRef = useRef<HTMLDivElement>(null)
    const logoAnimationContainerRef = useRef<HTMLDivElement>(null)

    const logoAnimationRef = useRef(
        Lottie.loadAnimation({
            container: logoAnimationContainerRef.current as HTMLDivElement
        })
    )

    let routesWithRefs: Array<RoutesWithRefs> = []
    for (const key in routes) {
        if (Object.prototype.hasOwnProperty.call(routes, key)) {
            const route = routes[key];
            const mRef = useRef<HTMLAnchorElement>(null)
            let newObj: RoutesWithRefs = { ...route, ref: mRef }

            routesWithRefs.push(newObj)
        }
    }

    useEffect(() => {
        if (currentRoute != '/') {
            logoAnimationRef.current = Lottie.loadAnimation({
                container: logoAnimationContainerRef.current as HTMLDivElement,
                animationData: logoAnimation,
                autoplay: false,
                loop: false
            })


            setTimeout(() => {
                logoAnimationRef.current ? logoAnimationRef.current.playSegments([0, 180], true) : undefined
            }, 500);
        }
    }, [])

    const timerImplementation = async (route: string) => {
        runBeforeNavigate()
        if (currentRoute != '/') {
            logoAnimationContainerRef.current ? logoAnimationContainerRef.current.style.opacity = '0' : undefined
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
                                <div id="nav-logo" ref={logoAnimationContainerRef}></div>
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

                    {
                        <CSSTransition
                            in={menuDeviceState}
                            classNames='appear'
                            timeout={{ enter: 500, exit: 500 }}
                            mountOnEnter
                            unmountOnExit
                            nodeRef={menuMobileRef}
                            addEndListener={() => setMobItems(!mobItems)}
                        >
                            <div className="links-container-mobile" ref={menuMobileRef}>
                                {
                                    routesWithRefs.map((route, i) => {
                                        return (
                                            <CSSTransition
                                                in={mobItems}
                                                classNames="link-item-app"
                                                timeout={{ enter: 500 + i * 80, exit: 500 + i * 80 }}
                                                nodeRef={route.ref}
                                                mountOnEnter
                                                unmountOnExit
                                                key={route.text}
                                                onExit={() => { }}
                                            >
                                                <NavLink
                                                    onClick={event => navLinkClickHandler(event, route.route)}
                                                    to={route.route}
                                                    className="nav-link-item-mob"
                                                    ref={route.ref}
                                                    style={{ transitionDelay: mobItems ? `${i * 80}ms` : `${i * 80}ms` }}
                                                >
                                                    {route.text}
                                                </NavLink>
                                            </CSSTransition>
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

