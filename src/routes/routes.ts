import { MutableRefObject, useRef } from 'react'

export type RouteWithRef = {
	text: string
	path: string
	ref: MutableRefObject<null>
}

export type Pages = 'home' | 'about' | 'projects' | 'contact'

export type PagesDictionary<T> = {
	[page in Pages]: T
}

export type Route = {
	text: string
	path: string
}

export const appRoutes: PagesDictionary<Route> = {
	home: {
		text: 'inicio',
		path: '/',
	},
	about: {
		text: 'sobre mí',
		path: '/acerca',
	},
	projects: {
		text: 'proyectos',
		path: '/proyectos',
	},
	contact: {
		text: 'contacto',
		path: '/contacto',
	},
}

const getRoutesWithRef = () => {
	return [
		{
			text: 'inicio',
			path: '/',
			ref: useRef(null),
		},
		{
			text: 'sobre mí',
			path: '/sobre-mi',
			ref: useRef(null),
		},
		{
			text: 'proyectos',
			path: '/proyectos',
			ref: useRef(null),
		},
		{
			text: 'contacto',
			path: '/contacto',
			ref: useRef(null),
		},
	]
}

export default getRoutesWithRef
