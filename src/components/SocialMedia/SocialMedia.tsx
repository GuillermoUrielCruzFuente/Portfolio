import { CSSTransition } from 'react-transition-group'

//styles
import './SocialMedia.scss'

//images
import githubIcon from '../../static/img/icons/social-media/github.svg'
import linkedinIcon from '../../static/img/icons/social-media/linkedin.svg'
import emailIcon from '../../static/img/icons/social-media/email.svg'
import whatsappIcon from '../../static/img/icons/social-media/whatsapp.svg'
import { FC, MutableRefObject, useLayoutEffect, useRef, useState } from 'react'

type imgLink = {
    url: string,
    src: string,
    ref: MutableRefObject<null>
}

type SocialMediaProp = {
    state: boolean
}

const SocialMedia = ({ state }: SocialMediaProp) => {

    const github: imgLink = {
        url: 'https://github.com/GuillermoCruzFuente',
        src: githubIcon,
        ref: useRef(null)
    }
    const linkedin: imgLink = {
        url: 'https://www.linkedin.com/in/guillermo-uriel-cruz-fuente-b01378236/',
        src: linkedinIcon,
        ref: useRef(null)
    }
    const email: imgLink = {
        url: 'mailto:guillermo.uriel.cruz.fuente@gmail.com',
        src: emailIcon,
        ref: useRef(null)
    }
    const whatsapp: imgLink = {
        url: 'https://api.whatsapp.com/send?phone=525951224620&text=asdfg',
        src: whatsappIcon,
        ref: useRef(null)
    }

    const socialMedia = [
        github,
        linkedin,
        email,
        whatsapp
    ]

    // console.log('rerender', state)

    return (
        <div className="social-media-container">
            {
                socialMedia.map((link: imgLink, i: number) => {
                    return (
                        <CSSTransition in={state} classNames='container' timeout={{ enter: 500 + i*50, exit: 500 }} mountOnEnter unmountOnExit nodeRef={link.ref} key={link.url}>
                            <a className='social-media-anchor-tag' href={link.url} target={'_blank'} ref={link.ref} style={{transitionDelay: `${i*50}ms`}}>
                                <img className='social-media-icon' src={link.src} alt="" />
                            </a>
                        </CSSTransition>
                    )
                })
            }
        </div>
    )
}

export default SocialMedia