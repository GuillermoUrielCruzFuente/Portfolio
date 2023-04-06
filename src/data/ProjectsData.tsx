import { Technology } from "@/data/Technologies";

import harbestLogo from "@images/icons/project-logos/harbest.svg";
import intelligentiaLogo from "@images/icons/project-logos/intelligentia.svg";
import campoFuerteLogo from "@images/icons/project-logos/campo-fuerte.svg";
import guillermoLogo from "@images/icons/project-logos/guillermo.svg";

import harbestImg from "@images/web-images/collages/harbest-collage.png";
import intelligentiaImg from "@images/web-images/collages/intelligentia-collage.png";
import campoFuerteImg from "@images/web-images/collages/campofuerte-collage.png";
import guillermoImg from "@images/web-images/collages/guillermo-collage.png";

export type ProjectContent = {
	id: number;
	name: JSX.Element;
	description: string;
	techStack: Array<Technology>;
	repository: string;
	url: string;
	collageSrcPath: string;
	logoSrcPath: string;
};

const projectsData: Array<ProjectContent> = [
	{
		id: 1,
		name: (
			<h1 className="project-name">
				<span className="harbest-blue">har</span>Best
			</h1>
		),
		description:
			"Empresa dedicada a la producción y comercialización de fertilizantes commodities y multiminerales. Una clásica landing page, con la información necesaria para clientes potenciales.",
		techStack: ["html", "scss", "js", "vite"],
		repository: "https://github.com/GuillermoCruzFuente/harBest",
		url: "https://harbest.mx/",
		logoSrcPath: harbestLogo,
		collageSrcPath: harbestImg,
	},
	{
		id: 2,
		name: <h1 className="project-name">Intelligentia</h1>,
		description:
			"Agencia de marketing político enfocado en el tratamiento integral del proceso electoral. Realiza actividades que comprenden desde el análisis estadístico hasta el desarrollo de la marca personal de sus clientes. Una landing page enfocada en demostrar seriedad, minimalismo y creatividad.",
		techStack: ["html", "scss", "ts", "vite"],
		repository: "https://github.com/GuillermoCruzFuente/intelligentia",
		url: "https://intelligentia.onrender.com/",
		logoSrcPath: intelligentiaLogo,
		collageSrcPath: intelligentiaImg,
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
			"Empresa dedicada a la comercialización de agroinsumos y servicios de vanguardia. Realicé un rediseño de su presencia en la web, buscando expresar una identidad fresca y a la vez seria.",
		techStack: ["html", "scss", "js", "vite"],
		repository: "https://github.com/GuillermoCruzFuente/CampoFuerte",
		url: "https://campofuerte.onrender.com/",
		logoSrcPath: campoFuerteLogo,
		collageSrcPath: campoFuerteImg,
	},
	{
		id: 4,
		name: <h1 className="project-name">Guillermo</h1>,
		description:
			"Portafolio Frontend developer. Mediante mi portafolio busco expresar mi verdadero estilo de diseño y desarrollo, sin ataduras, fechas límite o clientes con cambios de diseño.",
		techStack: ["react", "scss", "ts", "vite"],
		repository: "https://github.com/GuillermoCruzFuente/Portfolio",
		url: "https://guillermo.onrender.com/",
		logoSrcPath: guillermoLogo,
		collageSrcPath: guillermoImg,
	},
];

export default projectsData;
