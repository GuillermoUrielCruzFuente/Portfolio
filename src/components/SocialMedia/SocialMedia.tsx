//styles
import './SocialMedia.scss'

//images
import githubIcon from '../../static/img/icons/social-media/github.svg'
import linkedinIcon from '../../static/img/icons/social-media/linkedin.svg'
import emailIcon from '../../static/img/icons/social-media/email.svg'
import whatsappIcon from '../../static/img/icons/social-media/whatsapp.svg'

type imgLink = {
    url: string,
    src: string
}

const SocialMedia = () => {
    const github: imgLink = {
        url: 'https://github.com/GuillermoCruzFuente',
        src: githubIcon
    }
    const linkedin: imgLink = {
        url: 'https://www.linkedin.com/in/guillermo-uriel-cruz-fuente-b01378236/',
        src: linkedinIcon
    }
    const email: imgLink = {
        url: 'mailto:guillermo.uriel.cruz.fuente@gmail.com',
        src: emailIcon
    }
    const whatsapp: imgLink = {
        url: 'https://api.whatsapp.com/send?phone=525951224620&text=asdfg',
        src: whatsappIcon
    }

    const socialMedia = [
        github,
        linkedin,
        email,
        whatsapp
    ]

    return (
        <div className="social-media-container">
            {
                socialMedia.map((link: imgLink, index: number) => {
                    return (
                        <a className='social-media-anchor-tag' href={link.url} target={'_blank'} key={index}>
                            <img className='social-media-icon' src={link.src} alt="" />
                        </a>
                    ) 
                })
            }
        </div>
    )
}

export default SocialMedia