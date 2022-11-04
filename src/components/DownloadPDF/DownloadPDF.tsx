import cv from '/GuillermoUrielCruzFuente-Resume.pdf'
import './DownloadPDF.scss'
import downloadIcon from '../../static/img/icons/contact/download.svg'

const DownloadPDF = () => {
	return (
		<a className="download-cv" href={cv} target="_blank">
			<div className="icon-container">
				<p className="icon">cv</p>
			</div>

			<div className="label-container">
				<img
					className="download-icon"
					src={downloadIcon}
					alt="descargar"
				/>
				<p className="button-label">descargar</p>
			</div>
		</a>
	)
}

export default DownloadPDF
