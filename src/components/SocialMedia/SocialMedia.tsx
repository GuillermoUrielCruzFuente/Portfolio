import socialMediaSites from '@/data/SocialMediaData'
import SocialMediaLink from '@components/SocialMediaLink'
import './SocialMedia.scss'

type SocialMediaProps = {
	containerClass: string
	state?: boolean
}

const SocialMedia = ({ containerClass }: SocialMediaProps) => (
	<div className={`social-media-main-container ${containerClass}`}>
		{socialMediaSites.map((site) => (
			<SocialMediaLink key={site.name} {...site} />
		))}
	</div>
)

export default SocialMedia
