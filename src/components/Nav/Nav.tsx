import { BaseSyntheticEvent, MutableRefObject, useEffect, useRef, useState } from 'react'
import { NavLink, Link, useLocation, useNavigate, Outlet } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import routes from '../../routes/routes'
import timer from '../../helpers/Timer'

//styles
import './Nav.scss'

//third party libraries
import Lottie, { AnimationItem } from 'lottie-web'

//data
import logoAnimationData from '../../static/lottie/logo.json'

type RoutesWithRefs = {
    text: string,
    path: string,
    ref: MutableRefObject<HTMLAnchorElement | null>
}

type Navigation = {
    to: string | null,
    from: string | null
}

const Nav = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [clickedLink, setClickedLink] = useState<Navigation | null>(null)

    const [menuDeviceState, setMenuDeviceState] = useState(false)
    const [mobItems, setMobItems] = useState(false)


    const logoAnimationContainerRef = useRef<HTMLDivElement>(null)
    const logoAnimationRef = useRef(Lottie.loadAnimation({
        container: logoAnimationContainerRef.current!
    }))
    //reference for CSSTransition NodeRef Attribute
    const menuMobileRef = useRef<HTMLDivElement>(null)

    let routesWithRefs: Array<RoutesWithRefs> = []
    for (const key in routes) {
        if (Object.prototype.hasOwnProperty.call(routes, key)) {
            const route = routes[key]
            const mRef = useRef<HTMLAnchorElement>(null)
            let newObj: RoutesWithRefs = { ...route, ref: mRef }

            routesWithRefs.push(newObj)
        }
    }

    useEffect(() => {
        logoAnimationRef.current = Lottie.loadAnimation({
            container: logoAnimationContainerRef.current!,
            animationData: logoAnimationData,
            autoplay: false,
            loop: false
        })

        return () => {
            logoAnimationRef.current.destroy()
            window.removeEventListener('resize', hideMenuOnResize)
            window.removeEventListener('keydown', hideMenuOnEsc)
        }
    }, [])

    useEffect(() => {
        if (location.pathname != '/') {
            setTimeout(() => {
                logoAnimationRef.current.play()
            }, 500)
        }
    }, [location])

    const hideMenuOnResize = () => {
        //if the menu is active and the window width is less than 700px
        //then the menu need to be invisible
        if (window.innerWidth > 700 && !menuDeviceState) {
            setMenuDeviceState(false)
        }
    }

    const hideMenuOnEsc = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            setMenuDeviceState(false)
        }
    }

    const navLinkClickHandler = async (event: BaseSyntheticEvent, path: string) => {
        event.preventDefault()
        if (path === '/') {
            logoAnimationRef.current.setDirection(-1)
            logoAnimationRef.current.playSegments([180, 0], true)
        } else {
            logoAnimationRef.current.setDirection(1)
            logoAnimationRef.current.play()
        }
        await timer(800)
        navigate(path)
    }

    const toggleMenu = () => {
        setMenuDeviceState(!menuDeviceState)

        const a = document.getElementsByTagName('html')[0]
        a.style.overflow = !menuDeviceState ? 'hidden hidden' : 'hidden auto'

        if (!menuDeviceState) {
            window.addEventListener('resize', hideMenuOnResize)
            window.addEventListener('keydown', hideMenuOnEsc)
        }
    }

    return (
        <>
            <nav className='no-blur-bg'>
                <div id="nav-container">
                    <div id="nav-logo-container">
                        <Link to="/" id="nav-logo-link">
                            <div id="nav-logo" ref={logoAnimationContainerRef} />
                        </Link>
                    </div>

                    <div id="navigator">

                        <div className="links-container-desk">
                            {
                                routes.map(route => {
                                    return (
                                        <NavLink
                                            onClick={event => navLinkClickHandler(event, route.path)}
                                            to={route.path}
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
                                                    timeout={{ enter: 500 + i * 100, exit: 500 + i * 80 }}
                                                    nodeRef={route.ref}
                                                    mountOnEnter
                                                    unmountOnExit
                                                    key={route.text}
                                                >
                                                    <NavLink
                                                        onClick={event => navLinkClickHandler(event, route.path)}
                                                        to={route.path}
                                                        className="nav-link-item-mob"
                                                        ref={route.ref}
                                                        style={{ transitionDelay: mobItems ? `${i * 100}ms` : `${i * 80}ms` }}
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

            <div>
                <Outlet context={clickedLink} />
            </div>
        </>
    )
}

export default Nav