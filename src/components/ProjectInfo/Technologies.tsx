import { techImages } from '../../helpers/exports/AboutExports'

export type Technology =
	| 'html'
	| 'css'
	| 'scss'
	| 'js'
	| 'ts'
	| 'react'
	| 'vue'
	| 'vite'

type TechnologyDictionary = { [key in Technology]: string }

const Technologies: TechnologyDictionary = {
	html: techImages[0],
	css: techImages[1],
	scss: techImages[2],
	js: techImages[3],
	ts: techImages[4],
	react: techImages[6],
	vue: techImages[7],
	vite: techImages[5],
}

const getTechnologyIcon = (identifier: Technology) => {
	return (
		<img
			className="project-tech-icon"
			src={Technologies[identifier]}
			alt={`${identifier} icon`}
			key={identifier}
		/>
	)
}

export default getTechnologyIcon
