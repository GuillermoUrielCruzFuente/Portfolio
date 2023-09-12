import socialMediaSites from "@/data/SocialMediaData";
import { SocialMediaLink } from "@components/SocialMediaLink";
import styles from "./SocialMedia.module.scss";

type SocialMediaProps = {
	containerClass: string;
	state?: boolean;
};

export const SocialMedia = ({ containerClass }: SocialMediaProps) => (
	<div className={`${styles["social-media-main-container"]} ${containerClass}`}>
		{socialMediaSites.map((site) => (
			<SocialMediaLink
				key={site.name}
				{...site}
			/>
		))}
	</div>
);
