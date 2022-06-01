import { MutableRefObject, useLayoutEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

//styles
import './SocialMedia.scss'

//images
import githubIcon from '../../static/img/icons/social-media/github.svg'
import linkedinIcon from '../../static/img/icons/social-media/linkedin.svg'
import emailIcon from '../../static/img/icons/social-media/email.svg'
import whatsappIcon from '../../static/img/icons/social-media/whatsapp.svg'

type imgLink = {
	url: string
	src: string
	ref: MutableRefObject<null>
}

type SocialMediaProp = {
	containerClass: string
	state: boolean
}

const SocialMedia = ({ containerClass, state }: SocialMediaProp) => {
	const SocialMediaIcons: Array<imgLink> = [
		{
			url: 'https://github.com/GuillermoCruzFuente',
			src: githubIcon,
			ref: useRef(null),
		},
		{
			url: 'https://www.linkedin.com/in/guillermo-uriel-cruz-fuente-b01378236/',
			src: linkedinIcon,
			ref: useRef(null),
		},
		{
			url: 'mailto:guillermo.uriel.cruz.fuente@gmail.com',
			src: emailIcon,
			ref: useRef(null),
		},
		{
			url: 'https://api.whatsapp.com/send?phone=525951224620&text=Hola%2C%20vengo%20de%20tu%20p%C3%A1gina%20web.',
			src: whatsappIcon,
			ref: useRef(null),
		},
	]

	useLayoutEffect(() => {
		SocialMediaIcons.forEach((icon) => {
			const img = new Image()
			img.src = icon.src
		})
	}, [])

	return (
		<div className={`social-media-main-container ${containerClass}`}>
			{SocialMediaIcons.map((link: imgLink, i: number) => {
				return (
					<CSSTransition
						in={state}
						classNames="container"
						timeout={{ enter: 500 + i * 50, exit: 500 }}
						mountOnEnter
						unmountOnExit
						nodeRef={link.ref}
						key={link.url}
					>
						<a
							className="social-media-anchor-tag"
							href={link.url}
							target={'_blank'}
							ref={link.ref}
							style={{ transitionDelay: `${i * 50}ms` }}
						>
							<img className="social-media-icon" src={link.src} alt="" />
						</a>
					</CSSTransition>
				)
			})}
		</div>
	)
}

export default SocialMedia
