import '../../scss/pages/About/About.scss'

import HTMLImg from '../../static/img/icons/about-experience/html.svg'
import CSSImg from '../../static/img/icons/about-experience/css.svg'
import SCSSImg from '../../static/img/icons/about-experience/sass.svg'
import JSImg from '../../static/img/icons/about-experience/js.svg'
import TSImg from '../../static/img/icons/about-experience/ts.svg'
import ViteImg from '../../static/img/icons/about-experience/vite.svg'
import ReactImg from '../../static/img/icons/about-experience/react.svg'
import VueImg from '../../static/img/icons/about-experience/vue.svg'

import Aquarium from '../../static/img/photos/hobbies/aquarium.jpg'
import Origami from '../../static/img/photos/hobbies/origami.jpg'
import Videogames from '../../static/img/photos/hobbies/mine.jpg'
import Music from '../../static/img/photos/hobbies/music.jpg'

export const techImages = [
	HTMLImg,
	CSSImg,
	SCSSImg,
	JSImg,
	TSImg,
	ViteImg,
	ReactImg,
	VueImg,
]

export type ImageProps = {
	src: string
	alt: string
	title: string
}

export const hobbiesImages: Array<ImageProps> = [
	{
		src: Aquarium,
		alt: 'foto acuario',
		title: 'Foto de Pugga (mi gatita) frente a mi Acuario (2018).',
	},
	{
		src: Videogames,
		alt: 'minecraft screenshot',
		title: 'Captura de mi survival en Minecraft (1.18 Técnico), mi juego favorito.',
	},
	{
		src: Origami,
		alt: 'algunos modelos de origami',
		title: 'Algunos modelos de origami doblados por mi. Arriba: variación con escamas del pez creado por Davor Vinko, abajo: Tortuga marina de Satoshi Kamiya.',
	},
	{
		src: Music,
		alt: 'Audífonos viejos',
		title: 'Crusher Wireless 2, los mejores audífonos que he tenido, hasta ahora.',
	},
]
