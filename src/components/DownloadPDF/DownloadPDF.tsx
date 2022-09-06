import CVThumb from '../../static/img/photos/cv-thumb.jpg'
import './DownloadPDF.scss'

const DownloadPDF = () => {
	return (
		<article className="download-pdf">
			<div className="thumb-container">
				<img src={CVThumb} alt="resume-thumbnail" />
			</div>
			<div className="button-container">
				<a download={true} href="">
					descargar
				</a>
			</div>
		</article>
	)
}

export default DownloadPDF
