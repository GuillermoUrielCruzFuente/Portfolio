import { MutableRefObject, useRef } from 'react'

export type RouteWithRef = {
	text: string
	path: string
	ref: MutableRefObject<HTMLAnchorElement | null>
}

const getRoutesWithRef = () => {
	return [
		{
			text: 'inicio',
			path: '/',
			ref: useRef<HTMLAnchorElement>(null),
		},
		{
			text: 'sobre mí',
			path: '/sobre-mi',
			ref: useRef<HTMLAnchorElement>(null),
		},
		{
			text: 'proyectos',
			path: '/proyectos',
			ref: useRef<HTMLAnchorElement>(null),
		},
		{
			text: 'contacto',
			path: '/contacto',
			ref: useRef<HTMLAnchorElement>(null),
		},
	]
}

export default getRoutesWithRef
