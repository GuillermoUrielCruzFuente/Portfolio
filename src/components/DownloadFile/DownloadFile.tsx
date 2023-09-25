import downloadIcon from "@images/icons/contact/download.svg";
import styles from "./DownloadFile.module.scss";

type DownloadFileAttributes = {
	/**
	 * The source file path
	 */
	src: string;

	/**
	 * Acts as a hint for the user, it is used
	 * on the left side of the component as an icon.
	 */
	stringIcon: string;
};

export const DownloadFile = ({ src, stringIcon }: DownloadFileAttributes) => {
	return (
		<a
			className={styles["download-file"]}
			href={src}
			target="_blank"
		>
			<div className={styles["icon-container"]}>
				<p className={styles["icon"]}>{stringIcon}</p>
			</div>

			<div className={styles["label-container"]}>
				<img
					className={styles["download-icon"]}
					src={downloadIcon}
					alt="descargar"
				/>

				<p className={styles["button-label"]}>Descargar</p>
			</div>
		</a>
	);
};
