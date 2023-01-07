import githubIcon from '@images/icons/social-media/github.svg'
import linkedinIcon from '@images/icons/social-media/linkedin.svg'
import emailIcon from '@images/icons/social-media/email.svg'
import whatsappIcon from '@images/icons/social-media/whatsapp.svg'

export type SocialMediaSite = {
	name: string
	url: string
	iconSrc: string
}

const socialMediaSites: SocialMediaSite[] = [
	{
		name: 'GitHub',
		url: 'https://github.com/GuillermoCruzFuente',
		iconSrc: githubIcon,
	},
	{
		name: 'LinkedIn',
		url: 'https://www.linkedin.com/in/guillermo-uriel-cruz-fuente/',
		iconSrc: linkedinIcon,
	},
	{
		name: 'Gmail',
		url: 'mailto:guillermo.uriel.cruz.fuente@gmail.com',
		iconSrc: emailIcon,
	},
	{
		name: 'WhatsApp',
		url: 'https://api.whatsapp.com/send?phone=525551588911&text=Hola%2C%20vengo%20de%20tu%20p%C3%A1gina%20web.',
		iconSrc: whatsappIcon,
	},
]

export default socialMediaSites
