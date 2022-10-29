import { Technology } from '../../components/ProjectInfo/Technologies'

import harbestLogo from '../../static/img/icons/project-logos/harbest.svg'
import intelligentiaLogo from '../../static/img/icons/project-logos/intelligentia.svg'
import campoFuerteLogo from '../../static/img/icons/project-logos/campo-fuerte.svg'
import guillermoLogo from '../../static/img/icons/project-logos/guillermo.svg'

export type ProjectContent = {
	id: number
	name: JSX.Element
	description: string
	techStack: Array<Technology>
	repository: string
	url: string
	logoImgPath?: string
}

const projectsData: Array<ProjectContent> = [
	{
		id: 1,
		name: (
			<h1 className="project-name">
				<span className="harbest-blue">har</span>Best
			</h1>
		),
		description:
			'Empresa dedicada a la producción y comercialización de fertilizantes commodities y multiminerales. Una clásica landing page, con la información necesaria para clientes potenciales.',
		techStack: ['html', 'scss', 'js', 'vite'],
		repository: 'https://github.com/GuillermoCruzFuente/harBest',
		url: 'https://harbest.mx/',
		logoImgPath: harbestLogo,
	},
	{
		id: 2,
		name: <h1 className="project-name">Intelligentia</h1>,
		description:
			'Agencia de marketing político enfocado en el tratamiento integral del proceso electoral. Realiza actividades que comprenden desde el análisis estadístico hasta el desarrollo de la marca personal de sus clientes. Una landing page enfocada en demostrar seriedad, minimalismo y creatividad.',
		techStack: ['html', 'scss', 'ts', 'vite'],
		repository: 'https://github.com/GuillermoCruzFuente/intelligentia',
		url: 'https://intelligentia.onrender.com/',
		logoImgPath: intelligentiaLogo,
	},
	{
		id: 3,
		name: (
			<h1 className="project-name">
				<span className="campofuerte-brown">Campo</span>
				<span className="campofuerte-green">Fuerte</span>
			</h1>
		),
		description:
			'Empresa dedicada a la comercialización de agroinsumos y servicios de vanguardia. Realicé un rediseño de su presencia en la web, buscando expresar una identidad fresca y a la vez seria.',
		techStack: ['html', 'scss', 'ts', 'vite'],
		repository: 'https://github.com/GuillermoCruzFuente/CampoFuerte',
		url: 'https://campofuerte.onrender.com/',
		logoImgPath: campoFuerteLogo,
	},
	{
		id: 4,
		name: <h1 className="project-name">Guillermo</h1>,
		description:
			'Portafolio Frontend developer. Mediante mi portafolio busco expresar mi verdadero estilo de diseño y desarrollo, sin ataduras, fechas límite o clientes con cambios de diseño.',
		techStack: ['react', 'scss', 'ts', 'vite'],
		repository: 'https://github.com/GuillermoCruzFuente/Portfolio',
		url: 'https://guillermo.onrender.com/',
		logoImgPath: guillermoLogo,
	},
]

export default projectsData
