import type { SocialMediaSite } from "@/data/SocialMediaData";
import { useRef } from "react";
import styles from "./SocialMediaLink.module.scss";

export const SocialMediaLink = ({ name, url, iconSrc }: SocialMediaSite) => {
	const linkRef = useRef<HTMLAnchorElement>(null);

	const handleLoad = () => {
		linkRef.current!.style.opacity = "1";
	};

	return (
		<a
			ref={linkRef}
			className={styles["social-media-link"]}
			href={url}
			target="_blank"
			style={{ opacity: 0 }}
		>
			<img
				className={styles["social-media-icon"]}
				src={iconSrc}
				alt={`logo de ${name}`}
				title={name}
				onLoad={handleLoad}
			/>
		</a>
	);
};
